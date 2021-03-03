// @desc Get all notes
// @route GET /api/v1/notes/fetch
// @access Public
exports.getNotes = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: "Show all notes.",
  });
};

// @desc Get single notes
// @route GET /api/v1/notes/fetch/:id
// @access Public
exports.getSingleNotes = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `fetch note ${req.params.id}`,
  });
};

// @desc Upload Notes
// @route POST /api/v1/notes/upload/
// @access Private
exports.uploadNotes = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: "Upload notes.",
  });
};

// @desc Update  Notes
// @route PUT /api/v1/notes/update/:id
// @access Private
exports.updateNotes = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `update note ${req.params.id}`,
  });
};

// @desc Delete Notes
// @route DELETE /api/v1/notes/delete/:id
// @access Private
exports.deleteNotes = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Delete note ${req.params.id}`,
  });
};
