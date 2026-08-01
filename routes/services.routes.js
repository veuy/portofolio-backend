const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  addService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} = require("../controllers/services.controller");

// Public routes
router.get("/", getAllServices);
router.get("/:id", getServiceById);

// Protected routes (auth required)
router.post("/", auth, addService);
router.put("/:id", auth, updateService);
router.delete("/:id", auth, deleteService);

module.exports = router;
