import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetchStudent();
  }, []);

  const handleEdit = (id) => {
    navigate(`/students/edit/${id}`);
  };

  const fetchStudent = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("accessToken");

      if (!user || !token || user.role !== "student") {
        console.log(error);
        navigate("/login");
        return;
      }

      const res = await axios.get(`http://localhost:5000/api/students/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStudent(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load profile");
      navigate("/login");
    }
  };

  if (!student) return <p className="text-center mt-5">Loading profile...</p>;

  return (
    <div className="container mt-5">
      <h2>Welcome, {student.name} </h2>
      <div className="card shadow p-4 mt-4">
        <h4>Profile Details</h4>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Class:</strong> {student.class}</p>
        <p><strong>Roll Number:</strong> {student.roll_number}</p>
         <button
            className="btn btn-sm btn-warning me-2"
            onClick={() => handleEdit(student.id)}
     >
                   Edit
        </button>
      </div>
    </div>
  );
}

export default StudentDashboard;
