const express = require("express");
const {
  getNotes,
  getSingleNotes,
  uploadNotes,
  updateNotes,
  deleteNotes,
} = require("../controllers/notes");
const router = express.Router();

const { protect } = require("../middleware/auth");

router.route("/fetch").get(getNotes); //fetch notes
router.route("/fetch/:id").get(getSingleNotes); //get single notes
router.route("/upload").post(protect, uploadNotes); //upload notes
router.route("/update/:id").put(protect, updateNotes); //update existing notes
router.route("/delete/:id").delete(protect, deleteNotes); //delete notes

module.exports = router;
