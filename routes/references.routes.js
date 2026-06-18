const express = require("express");
const router = express.Router();

const {
  addReference,
  getAllReferences,
  getReferenceById,
  updateReference,
  deleteReference,
} = require("../controllers/references.controller");

router.get("/", getAllReferences);
router.get("/:id", getReferenceById);
router.post("/", addReference);
router.put("/:id", updateReference);
router.delete("/:id", deleteReference);

module.exports = router;