const db = require("../db");


const markAttendance = async (req, res) => {
  const { student_id, date, status } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO attendance (student_id, date, status) VALUES ($1, $2, $3) RETURNING *",
      [student_id, date, status]
    );
    res.json({ success: true, attendance: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getAttendance = async (req, res) => {
  const { studentId } = req.params;
  try {
    const result = await db.query(
      "SELECT * FROM attendance WHERE student_id=$1 ORDER BY date DESC",
      [studentId]
    );
    res.json({ success: true, attendance: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { markAttendance, getAttendance };
