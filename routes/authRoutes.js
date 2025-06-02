const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("../Schema/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
require("dotenv").config();

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const exists = await Users.findOne({ username });
  if (exists) {
    return res.status(200).json({ message: "User already exists" });
  }

  // Hash password
  const hashed = await bcrypt.hash(password, 10);
  if (!hashed) {
    return res.status(500).json({ message: "Password hashing failed" });
  }

  // Save user
  const newUser = new Users({ username, password: hashed });
  await newUser.save();

  const token = jwt.sign(
    { username: newUser.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
  res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
  return res.status(201).json({ message: "Signup successful" });
});

//Login Flow
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ username });
  res.cookie.user = username;
  if (user) {
    res.json({ message: "Login Successful" }).send(200);
  } else {
    res.json({ message: "User Does Not Exist Sign Up First" }).send(200);
  }
  const pass = await bcrypt.compare(password, user.password);

  if (!pass) {
    res.json({ message: "Incorrect Password" }).send(200);
  }
  // Generate JWT token
  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  return res.status(200).json({ message: "Login Successful", token });
});

module.exports = router;
