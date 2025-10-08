import React, { useEffect, useState } from "react";
import axios from "axios";


function TeacherAttendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("accessToken");

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Sort students by roll number
      const sortedStudents = res.data.sort((a, b) => 
        parseInt(a.roll_number) - parseInt(b.roll_number)
      );
      setStudents(sortedStudents);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (studentId, value) => {
    setAttendance({ ...attendance, [studentId]: value });
  };

  const handleSubmit = async () => {
    try {
      for (let student of students) {
        const status = attendance[student.id];
        if (!status) continue;

        await axios.post(
          "http://localhost:5000/api/attendance/",
          {
            student_id: student.id,
            date: new Date().toISOString().split("T")[0],
            status,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      setMessage("Attendance marked successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to mark attendance");
    }
  };

  if (!students.length) return <p>Loading students...</p>;

  return (
    <div className="container mt-5">
      <h2>Mark Attendance</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Student</th>
            <th>Class</th>
            <th>Roll Number</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>{student.roll_number}</td>
              <td>
                <div className="btn-group" role="group">
                  <input
                    type="radio"
                    className="btn-check"
                    name={`attendance-${student.id}`}
                    id={`present-${student.id}`}
                    checked={attendance[student.id] === "Present"}
                    onChange={() => handleChange(student.id, "Present")}
                  />
                  <label 
                    className="btn btn-outline-success btn-sm" 
                    htmlFor={`present-${student.id}`}
                  >
                    Present
                  </label>

                  <input
                    type="radio"
                    className="btn-check"
                    name={`attendance-${student.id}`}
                    id={`absent-${student.id}`}
                    checked={attendance[student.id] === "Absent"}
                    onChange={() => handleChange(student.id, "Absent")}
                  />
                  <label 
                    className="btn btn-outline-danger btn-sm" 
                    htmlFor={`absent-${student.id}`}
                  >
                    Absent
                  </label>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button 
        className="btn btn-primary mt-3" 
        onClick={handleSubmit}
      >
        Submit Attendance
      </button>
    </div>
  );
}

export default TeacherAttendance;