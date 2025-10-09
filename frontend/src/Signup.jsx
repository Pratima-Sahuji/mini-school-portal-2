import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';


function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",          
    studentClass: "",
    rollNumber: "",
    subject: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.role) {
      alert("Please select a role");
      return;
    }

    try {
      const res = await axios.post(
        `${API_URL}/api/user/signup`,
        form,
        { withCredentials: true }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
       localStorage.setItem("accessToken", res.data.accessToken);



      if (res.data.user.role.toLowerCase() === "student") navigate("/student-dashboard");
       else navigate("/teacher-dashboard");


    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ width: "350px" }}>
        <h2 className="text-center mb-1">Sign up</h2>
        <p className="text-center text-muted mb-4" style={{ fontSize: "0.9rem" }}>
          Sign up to continue
        </p>
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            placeholder="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-3"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <select
            className="form-select mb-3"
            name="role"
            value={form.role}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>

          {form.role === "student" && (
            <>
              <input
                className="form-control mb-3"
                placeholder="Class"
                name="studentClass"
                value={form.studentClass}
                onChange={handleChange}
                required
              />
              <input
                className="form-control mb-3"
                placeholder="Roll Number"
                name="rollNumber"
                value={form.rollNumber}
                onChange={handleChange}
                required
              />
            </>
          )}

          {form.role === "teacher" && (
            <input
              className="form-control mb-3"
              placeholder="Subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
            />
          )}

          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
