const { json } = require("express");
const Notes = require("../models/Notes");
// @desc Get all notes
// @route GET /api/v1/notes/fetch
// @access Public
exports.getNotes = async (req, res, next) => {
  try {
    const notes = await Notes.find();
    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc Get single notes
// @route GET /api/v1/notes/fetch/:id
// @access Public
exports.getSingleNotes = async (req, res, next) => {
  try {
    const singleNotes = await Notes.findById(req.params.id);
    if (!singleNotes) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: singleNotes });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc Upload Notes
// @route POST /api/v1/notes/upload/
// @access Private
exports.uploadNotes = async (req, res, next) => {
  try {
    const notes = await Notes.create(req.body);
    res.status(201).json({
      success: true,
      data: notes,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: "bad request",
    });
  }
};

// @desc Update  Notes
// @route PUT /api/v1/notes/update/:id
// @access Private
exports.updateNotes = async (req, res, next) => {
  try {
    const notes = await Notes.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!notes) {
      return res.status(400).json("success:false");
    }
    res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};

// @desc Delete Notes
// @route DELETE /api/v1/notes/delete/:id
// @access Private
exports.deleteNotes = async (req, res, next) => {
  try {
    const notes = await Notes.findByIdAndDelete(req.params.id);
    if (!notes) {
      return res.status(400).json({
        success: false,
        msg: "not found",
      });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};
