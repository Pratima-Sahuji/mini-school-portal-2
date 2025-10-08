import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    class: "",
    roll_number: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(`http://localhost:5000/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch student data");
      navigate("/teacher/students");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const user = JSON.parse(localStorage.getItem("user"));
      
      await axios.put(`http://localhost:5000/api/students/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      alert("Profile updated successfully");
      
      // Navigate based on user role
      if (user.role === "student") {
        navigate("/student-dashboard");
      } else if (user.role === "teacher") {
        navigate("/teacher/students");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update student");
    }
};

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-5">
      <h2>Edit Student</h2>
      <form className="shadow p-4 rounded bg-light" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Class</label>
          <input
            type="text"
            name="class"
            className="form-control"
            value={form.class}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Roll Number</label>
          <input
            type="text"
            name="roll_number"
            className="form-control"
            value={form.roll_number}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Update</button>
       
<button
  type="button"
  className="btn btn-secondary ms-2"
  onClick={() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.role === "student") {
      navigate("/student-dashboard");
    } else if (user.role === "teacher") {
      navigate("/teacher/students");
    }
  }}
>
  Cancel
</button>
      </form>
    </div>
  );
}

export default EditStudent;
