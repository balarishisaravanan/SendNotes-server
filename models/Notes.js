const mongoose = require("mongoose");
const NotesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: ["true", "please add title"],
    maxlength: 60,
  },
  slug: String,
  description: {
    type: String,
    required: false,
    maxlength: 300,
  },
  email: {
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter valid email",
    ],
  },
  department: {
    type: String,
    required: true,
  },
  subjectcode: {
    type: String,
    required: true,
  },
  regulation: {
    type: Number,
    required: true,
    enum: [2013, 2017, 2018],
  },
  averageRating: {
    type: Number,
    min: [1, "Rating must be atleast 1"],
    max: [5, "Rating must not exceed 5"],
  },
  preview: {
    type: String,
    required: true,
  },
  notesType: {
    type: String,
    enum: ["handwritten", "typed"],
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },

  uploadedFile: {
    type: String,
    required: [true, "Please select notes to upload!"],
  },
});

module.exports = mongoose.model("Notes", NotesSchema);
