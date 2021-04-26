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
  sendTokenResponse(user, 200, res);
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

  sendTokenResponse(user, 200, res);
});

//Get the token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  //create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ), //calculate it to 30 days.
    httpOnly: true,
  };
  //make it https when it is in production.
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};
