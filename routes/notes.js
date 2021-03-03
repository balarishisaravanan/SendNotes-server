const express = require("express");
const {
  getNotes,
  getSingleNotes,
  uploadNotes,
  updateNotes,
  deleteNotes,
} = require("../controllers/notes");
const router = express.Router();
router.route("/fetch").get(getNotes); //fetch notes
router.route("/fetch/:id").get(getSingleNotes); //get single notes
router.route("/upload").post(uploadNotes); //upload notes
router.route("/update/:id").put(updateNotes); //update existing notes
router.route("/delete/:id").delete(deleteNotes); //delete notes

module.exports = router;
