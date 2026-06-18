const express = require("express");
const router = express.Router();

const {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

// GET all users
router.get("/", getAllUsers);

// GET single user
router.get("/:id", getUserById);

// CREATE user
router.post("/", addUser);

// UPDATE user
router.put("/:id", updateUser);

// DELETE user
router.delete("/:id", deleteUser);

module.exports = router;