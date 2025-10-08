const bcrypt = require("bcryptjs");
const db = require("../db");
const jwt = require("jsonwebtoken");


const signup = async (req, res) => {
  const { name, email, password, role, studentClass, rollNumber, subject } = req.body;

  try {

    const userCheck = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

  
    const newUser = await db.query(
      `INSERT INTO users (name, email, password_hash, role)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, hashedPassword, role]
    );

    const userId = newUser.rows[0].id;

 
    if (role === "student") {
      await db.query(
        `INSERT INTO students (user_id, class, roll_number) VALUES ($1, $2, $3)`,
        [userId, studentClass, rollNumber]
      );
    }

 
    if (role === "teacher") {
      await db.query(
        `INSERT INTO teachers (user_id, subject) VALUES ($1, $2)`,
        [userId, subject || null]
      );
    }

    const userForToken = {
  id: newUser.rows[0].id,
  role: newUser.rows[0].role
};
const { accessToken, refreshToken } = generateTokens(userForToken);





    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
 
    });

   
    res.status(201).json({
       message: "User registered successfully",
       user: {
       id: newUser.rows[0].id,
       name: newUser.rows[0].name,
       email: newUser.rows[0].email,
       role: newUser.rows[0].role
      },
      accessToken
   });


  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
  );

  const refreshToken = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
  );

  return { accessToken, refreshToken };
};


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (!userResult.rows.length)
      return res.status(400).json({ message: "Invalid email or password" });

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });


    const { accessToken, refreshToken } = generateTokens(user);

 
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
 
    });

    res.json({
      message: "Login successful",
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


const refreshToken = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const newAccessToken = jwt.sign(
      { userId: payload.userId, role: payload.role },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

module.exports = { signup, login, refreshToken };




