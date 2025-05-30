// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("../Schema/user");
require("dotenv").config();

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const exists = await Users.findOne({ username });
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash password
  const hashed = await bcrypt.hash(password, 10);
  if (!hashed) {
    return res.status(500).json({ message: "Password hashing failed" });
  }

  // Save user
  const newUser = new Users({ username, password: hashed });
  await newUser.save();

  return res.status(201).json({ message: "Signup successful" });
});

module.exports = router;
