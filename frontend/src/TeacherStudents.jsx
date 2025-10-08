import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import api from "./api";

function TeacherStudents() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAuth = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("accessToken");

      if (!user || !token) {
        navigate("/login");
        return false;
      }
      return true;
    };

    const fetchStudents = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        
        const res = await axios.get("http://localhost:5000/api/students", {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });

      
        const sortedStudents = res.data.sort((a, b) => 
          parseInt(a.roll_number) - parseInt(b.roll_number)
        );

        setStudents(sortedStudents);
        setError("");
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Failed to load students");
        if (err.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    if (checkAuth()) {
      fetchStudents();
    }

    return () => {
      setStudents([]);
      setLoading(true);
    };
  }, [navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:5000/api/students/${id}`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      
    
      const updatedStudents = students
        .filter(student => student.id !== id)
        .sort((a, b) => parseInt(a.roll_number) - parseInt(b.roll_number));
      
      setStudents(updatedStudents);
      alert("Student deleted successfully");
    } catch (err) {
      console.error("Error deleting student:", err);
      alert(err.response?.data?.message || "Failed to delete student");
    }
  };

  const handleEdit = (id) => {
    navigate(`/students/edit/${id}`);
  };

  if (loading) {
    return <div className="text-center mt-5">Loading students...</div>;
  }

  if (error) {
    return <div className="alert alert-danger m-5" role="alert">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>All Students</h2>
        <button 
          className="btn btn-secondary" 
          onClick={() => navigate("/teacher-dashboard")}
        >
          Back
        </button>
      </div>
      
      {students.length === 0 ? (
        <div className="alert alert-info">No students found</div>
      ) : (
        <table className="table table-striped table-hover shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Class</th>
              <th>Roll Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.class}</td>
                <td>{student.roll_number}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(student.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TeacherStudents;