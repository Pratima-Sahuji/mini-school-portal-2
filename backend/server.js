const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");
const attendanceRoutes = require("./routes/attendanceRouter");
const cookieParser = require("cookie-parser");


const cors = require("cors");


dotenv.config();
const app = express();
// http://localhost:5173
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const allowedOrigins = [
  'http://localhost:5173',
  'https://mini-school-portal-frontend.onrender.com'
];

app.use(cors({ 
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true 
}));


app.use(express.json());
app.use(cookieParser());


app.use("/api/user", userRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);

// const authRoutes = require("./routes/authRoutes");
// app.use("/api/auth", authRoutes);



app.get("/", (req, res) => {
  res.send("Mini School Portal API running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
