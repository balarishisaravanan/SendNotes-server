const mongoose = require("mongoose");
const slugify = require("slugify");
const NotesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please add title"],
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
    required: [true, "You must enter the department"],
  },
  subjectcode: {
    type: String,
    required: [true, "You must enter your subject code"],
  },
  regulation: {
    type: Number,
    required: [true, "You must enter the regulation for your notes"],
    enum: [2013, 2017, 2018],
  },
  averageRating: {
    type: Number,
    min: [1, "Rating must be atleast 1"],
    max: [5, "Rating must not exceed 5"],
  },

  notesType: {
    type: String,
    enum: ["handwritten", "typed"],
    required: [true, "Please choose handwritten or typed."],
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },

  uploadedFile: {
    type: text,
    required: [
      true,
      "Please upload the notes in google drive and paste the link.",
    ],
    contentType: String,
  },
});

//Create Slug
NotesSchema.pre("save", function () {
  this.slug =
    slugify(this.title, { lower: true, remove: undefined }) +
    "-" +
    this.id.slice(15, 23);
});

module.exports = mongoose.model("Notes", NotesSchema);
