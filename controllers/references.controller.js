const Reference = require('../models/Reference');

exports.addReference = async (req, res) => {
  try {
    const reference = await Reference.create(req.body);
    res.status(201).json({
      success: true,
      message: "Reference added successfully.",
      data: reference,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllReferences = async (req, res) => {
  try {
    const references = await Reference.find();
    res.json({
      success: true,
      message: "References retrieved successfully.",
      data: references,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getReferenceById = async (req, res) => {
  try {
    const reference = await Reference.findById(req.params.id);
    if (!reference) {
      return res.status(404).json({
        success: false,
        message: "Reference not found",
      });
    }
    res.json({
      success: true,
      message: "Reference retrieved successfully.",
      data: reference,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateReference = async (req, res) => {
  try {
    await Reference.findByIdAndUpdate(req.params.id, req.body);
    res.json({
      success: true,
      message: "Reference updated successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteReference = async (req, res) => {
  try {
    await Reference.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Reference deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};