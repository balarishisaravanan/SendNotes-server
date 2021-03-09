const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");
const { json } = require("express");
const Notes = require("../models/Notes");

// @desc Get all notes
// @route GET /api/v1/notes/fetch
// @access Public
exports.getNotes = asyncHandler(async (req, res, next) => {
  const notes = await Notes.find();
  res.status(200).json({
    success: true,
    count: notes.length,
    data: notes,
  });
});

// @desc Get single notes
// @route GET /api/v1/notes/fetch/:id
// @access Public
exports.getSingleNotes = asyncHandler(async (req, res, next) => {
  const singleNotes = await Notes.findById(req.params.id);
  if (!singleNotes) {
    return next(error);
  }
  res.status(200).json({ success: true, data: singleNotes });
});

// @desc Upload Notes
// @route POST /api/v1/notes/upload/
// @access Private
exports.uploadNotes = asyncHandler(async (req, res, next) => {
  const notes = await Notes.create(req.body);
  res.status(201).json({
    success: true,
    data: notes,
  });
});

// @desc Update  Notes
// @route PUT /api/v1/notes/update/:id
// @access Private
exports.updateNotes = asyncHandler(async (req, res, next) => {
  const notes = await Notes.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!notes) {
    return next(error);
  }
  res.status(200).json({
    success: true,
    data: notes,
  });
});

// @desc Delete Notes
// @route DELETE /api/v1/notes/delete/:id
// @access Private
exports.deleteNotes = asyncHandler(async (req, res, next) => {
  const notes = await Notes.findByIdAndDelete(req.params.id);
  if (!notes) {
    next(error);
  }
  res.status(200).json({ success: true, data: {} });
});
