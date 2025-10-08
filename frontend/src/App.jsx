import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import Home from "./Home.jsx";

import TeacherDashboard from "./TeachersDashboard.jsx";
import TeacherStudents from "./TeacherStudents.jsx";
import EditStudent from "./EditStudent.jsx";
import StudentDashboard from "./StudentDashboard";
import Navbar from "./Navbar";
import TeacherAttendance from "./TeacherAttendance";

function App() {
  return (
    <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/students" element={<TeacherStudents />} />
        <Route path="/students/edit/:id" element={<EditStudent />} />
         <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher/attendance" element={<TeacherAttendance />} />
        
      </Routes>
    </Router>
  );
}

export default App;

