const express = require("express");
const { auth} = require("../middlewares/authMiddleware.js");
const { authorizeRoles } = require("../middlewares/authorizeRoles.js");

const { markAttendance, getAttendance } = require("../controllers/attendanceController.js");

const router = express.Router();

router.post("/", auth, authorizeRoles("teacher"), markAttendance);

router.get("/:studentId", auth, authorizeRoles("teacher", "student"), getAttendance);

module.exports = router;
