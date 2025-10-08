const express = require("express");
const {
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController.js");
const { auth} = require("../middlewares/authMiddleware.js");
const { authorizeRoles } = require("../middlewares/authorizeRoles.js");

const router = express.Router();


router.get("/", auth, authorizeRoles("teacher"), getAllStudents);

router.get("/:id", auth, authorizeRoles("student", "teacher"), getStudentById);

router.put("/:id", auth, authorizeRoles("student", "teacher"), updateStudent);

router.delete("/:id", auth, authorizeRoles( "teacher"), deleteStudent);

module.exports = router;
