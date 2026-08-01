const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  addReference,
  getAllReferences,
  getReferenceById,
  updateReference,
  deleteReference,
} = require("../controllers/references.controller");

// Public routes
router.get("/", getAllReferences);
router.get("/:id", getReferenceById);

// Protected routes (auth required)
router.post("/", auth, addReference);
router.put("/:id", auth, updateReference);
router.delete("/:id", auth, deleteReference);

module.exports = router;
