const express = require("express");
const router = express.Router(); 

const {
  getTeacherById,
  updateTeacher,
  deleteTeacher,
 
} = require("../controllers/teachersController.js");




const { auth} = require("../middlewares/authMiddleware.js");
const { authorizeRoles } = require("../middlewares/authorizeRoles.js");

console.log("getTeacherById:", getTeacherById);
console.log("authenticateToken:", auth);
console.log("authorizeRoles('teacher'):", authorizeRoles("teacher"));

router.get("/:id", auth, authorizeRoles("teacher"), getTeacherById);
router.put("/:id", auth, authorizeRoles("teacher"), updateTeacher);
router.delete("/:id", auth, authorizeRoles("teacher"), deleteTeacher);


module.exports = router;
