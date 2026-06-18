const express = require("express");
const router = express.Router();

const {
  addProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projects.controller");

// GET all projects
router.get("/", getAllProjects);

// GET single project
router.get("/:id", getProjectById);

// CREATE project
router.post("/", addProject);

// UPDATE project
router.put("/:id", updateProject);

// DELETE project
router.delete("/:id", deleteProject);

module.exports = router;