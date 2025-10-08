const db = require("../db");


const getAllStudents = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT u.id, u.name, u.email, s.class, s.roll_number
       FROM users u
       JOIN students s ON u.id = s.user_id`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


const getStudentById = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

//   if (user.role === "student" && parseInt(user.id) !== parseInt(id)) {
//     return res.status(403).json({ message: "Forbidden: Cannot view other students" });
//   }

  try {
    const result = await db.query(
      `SELECT u.id, u.name, u.email, s.class, s.roll_number
       FROM users u
       JOIN students s ON u.id = s.user_id
       WHERE u.id = $1`,
      [id]
    );

    if (!result.rows.length) return res.status(404).json({ message: "Student not found" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


const updateStudent = async (req, res) => {
  const { id } = req.params;
  const user = req.user;



  const { name, email, class: studentClass, roll_number } = req.body;

  try {
    await db.query(`UPDATE users SET name=$1, email=$2 WHERE id=$3`, [
      name,
      email,
      id,
    ]);

    await db.query(
      `UPDATE students SET class=$1, roll_number=$2 WHERE user_id=$3`,
      [studentClass, roll_number, id]
    );

    res.json({ message: "Student profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    await db.query(`DELETE FROM students WHERE user_id=$1`, [id]);
    await db.query(`DELETE FROM users WHERE id=$1`, [id]);
    res.json({ message: "Student profile deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
