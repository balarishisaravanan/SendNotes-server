const express = require("express");
const router = express.Router();

// api/v1/notes
router.get("/", (req, res) => {
  res.status(400).json({
    success: false,
    response: "Request not specific.",
  });
});

// api/v1/notes/fetch
router.get("/fetch", (req, res) => {
  res.status(200).json({
    success: true,
    msg: "Show all notes.",
  });
});
//api/v1/notes/fetch/:id
router.get("/fetch/:id", (req, res) => {
  res.status(200).json({
    success: true,
    msg: `fetch note ${req.params.id}`,
  });
});

// api/v1/notes/upload
router.post("/upload", (req, res) => {
  res.status(200).json({
    success: true,
    msg: "Upload notes.",
  });
});
//api/v1/notes/delete/:id
router.delete("/delete/:id", (req, res) => {
  res.status(200).json({
    success: true,
    msg: `Delete note ${req.params.id}`,
  });
});
//api/v1/notes/update/:id
router.put("/update/:id", (req, res) => {
  res.status(200).json({
    success: true,
    msg: `update note ${req.params.id}`,
  });
});

module.exports = router;
