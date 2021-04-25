const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");
const { json } = require("express");
const User = require("../models/User");

//@desc    Register User
//@route   POST /api/v1/auth/register
//@access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  //create user
  const user = await User.create({
    name,
    email,
    password,
  });
  //create token
  const token = user.getSignedJwtToken();

  res.status(200).json({
    success: true,
    token,
  });
});
//@desc    Login User
//@route   POST /api/v1/auth/login
//@access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);

  //validate email and password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide email and password", 400));
  }

  //Check for user existance
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    res.status(401).json({
      success: false,
      msg: "invalid credentials",
    });
  }
  //Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    res.status(401).json({
      success: false,
      msg: "invalid credentials",
    });
  }

  //create token
  const token = user.getSignedJwtToken();

  res.status(200).json({
    success: true,
    token: token,
  });
});
