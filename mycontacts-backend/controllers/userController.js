const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// @desc Register a user
// @route GET /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { fullName, email, password } = req.body;

  // if fullName or password or email not given throw error
  if (!fullName || !password || !email) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  // check is user exist with the given email
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered with the given email");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });

  if (user) {
    return res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data not valid");
  }
});

// @desc Login  user
// @route GET /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const user = await User.findOne({ email });
  console.log(user);

  // compare password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          fullName: user.fullName,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "100m" }
    );

    res.status(200).json({
      accessToken,
      id: user._id,
      name: user.fullName,
    });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }

  res.json({ message: "login the user" });
});

// @desc Current user info
// @route GET /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

// @desc Password change
// @route PATCH /api/users/passwordChange
// @access private

const changeUserPassword = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    res.status(400);
    throw new Error("All fields are necessary");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  await user.save();

  res.status(200).json({
    message: "Password updated successfully",
  });
});

module.exports = { registerUser, loginUser, currentUser, changeUserPassword };
