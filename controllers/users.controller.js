const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { formatDocument } = require('../utils/formatResponse');

// Helper: generate JWT token
const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET || 'portfolio_jwt_secret_key_2026_secure';
  return jwt.sign({ userId }, secret, { expiresIn: '7d' });
};

// Sign Up
exports.addUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = generateToken(user._id);
    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      token,
      data: formatDocument(user),
    });
  } catch (error) {
    // Handle duplicate email
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already registered.",
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Sign In
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = generateToken(user._id);
    res.json({
      success: true,
      message: "Signed in successfully.",
      token,
      data: formatDocument(user),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      success: true,
      message: "Users retrieved successfully.",
      data: users.map(formatDocument),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      message: "User retrieved successfully.",
      data: formatDocument(user),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    // Don't allow password update through this route (use a dedicated route for that)
    if (req.body.password) {
      delete req.body.password;
    }
    req.body.updated = new Date();
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      message: "User updated successfully.",
      data: formatDocument(user),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
