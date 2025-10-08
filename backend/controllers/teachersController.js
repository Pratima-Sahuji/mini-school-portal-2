const db = require("../db");


const getTeacherById = async (req, res) => {
  const { id } = req.params;
  const user = req.user;


  try {
    const result = await db.query(
      `SELECT u.id, u.name, u.email, t.subject
       FROM users u
       JOIN teachers t ON u.id = t.user_id
       WHERE u.id = $1`,
      [id]
    );

    if (!result.rows.length)
      return res.status(404).json({ message: "Teacher not found" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateTeacher = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (parseInt(user.id) !== parseInt(id))
    return res.status(403).json({ message: "Forbidden" });

  const { name, email, subject } = req.body;

  try {
    await db.query(`UPDATE users SET name=$1, email=$2 WHERE id=$3`, [
      name,
      email,
      id,
    ]);

    await db.query(`UPDATE teachers SET subject=$1 WHERE user_id=$2`, [
      subject,
      id,
    ]);

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTeacher = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (parseInt(user.id) !== parseInt(id))
    return res.status(403).json({ message: "Forbidden" });

  try {
    await db.query(`DELETE FROM teachers WHERE user_id=$1`, [id]);
    await db.query(`DELETE FROM users WHERE id=$1`, [id]);
    res.json({ message: "Teacher profile deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};
