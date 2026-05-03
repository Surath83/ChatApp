// backend/controllers/authController.js
const User = require("../models/User");

exports.register = async (req, res) => {
  const { username, password } = req.body;

  const user = new User({ username, password });
  await user.save();

  res.json({ message: "User registered" });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });

  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  res.json(user);
};