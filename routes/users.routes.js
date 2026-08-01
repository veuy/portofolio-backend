const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  addUser,
  signIn,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

// Public routes
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", addUser);        // Sign Up
router.post("/signin", signIn);   // Sign In

// Protected routes (auth required)
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);

module.exports = router;
