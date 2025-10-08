
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    console.log('Cookies:', req.cookies);
    console.log('Headers:', req.headers);

    let token;
    if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    } else if (req.headers?.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token missing"
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    
      req.user = {
        id: decode.id,
        role: decode.role
      };

      console.log('Decoded token:', decode);
      next();
    } catch (jwtError) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
        error: jwtError.message
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

module.exports = { auth };
