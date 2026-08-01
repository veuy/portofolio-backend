const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  addProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projects.controller");

// Public routes
router.get("/", getAllProjects);
router.get("/:id", getProjectById);

// Protected routes (auth required)
router.post("/", auth, addProject);
router.put("/:id", auth, updateProject);
router.delete("/:id", auth, deleteProject);

module.exports = router;
