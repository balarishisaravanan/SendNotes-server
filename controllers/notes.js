const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");
const { json } = require("express");
const Notes = require("../models/Notes");

// @desc Get all notes
// @route GET /api/v1/notes/fetch
// @access Public
exports.getNotes = asyncHandler(async (req, res, next) => {
  const notes = await Notes.find(req.query);
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
  //Add user to req.body
  req.body.user = req.user.id;
  //Add UploadedBy (username) to body
  req.body.uploadedBy = req.user.name;

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
  let notes = await Notes.findById(req.params.id);

  if (!notes) {
    return next(error);
  }
  //Make sure the user is owner of the uploaded notes.
  if (notes.user.toString() != req.user.id && req.user.role !== "mod") {
    return next(
      new ErrorResponse(`User is not authorized to update this`, 401)
    );
  }
  notes = await Notes.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: notes,
  });
});

// @desc Delete Notes
// @route DELETE /api/v1/notes/delete/:id
// @access Private
exports.deleteNotes = asyncHandler(async (req, res, next) => {
  const notes = await Notes.findById(req.params.id);
  if (!notes) {
    next(error);
  }
  //Make sure the user is owner of the uploaded notes.
  if (notes.user.toString() != req.user.id && req.user.role !== "mod") {
    return next(
      new ErrorResponse(`User is not authorized to delete this`, 401)
    );
  }

  notes.remove();
  res.status(200).json({ success: true, data: {} });
});
