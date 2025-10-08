import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TeacherDashboard() {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("accessToken");

        if (!user || !token) {
          navigate("/login"); 
          return;
        }

        const res = await axios.get(
          `http://localhost:5000/api/teachers/${user.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setTeacher(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load teacher info");
      }
    };

    fetchTeacher();
  }, [navigate]);

  if (!teacher) return <p className="text-center mt-5">{error || "Loading..."}</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Teacher Dashboard</h2>

      <div className="card p-3 mb-4 shadow-sm">
        <h4>Profile</h4>
        <p><strong>Name:</strong> {teacher.name}</p>
        <p><strong>Email:</strong> {teacher.email}</p>
        <p><strong>Subject:</strong> {teacher.subject || "Not assigned"}</p>
      </div>

      <div className="card p-3 shadow-sm">
        <h4>Actions</h4>
        <button
          className="btn btn-primary me-2"
          onClick={() => navigate("/teacher/students")}
        >
          View Students
        </button>
        <button
          className="btn btn-success"
          onClick={() => navigate("/teacher/attendance")}
        >
          Mark Attendance
        </button>
      </div>
     

      
    </div>
  );
}

export default TeacherDashboard;
