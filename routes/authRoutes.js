const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
require("dotenv").config();

const router = express.Router();

// User Registration Route
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ message: "User already exists" });

//     user = new User({ name, email, password, role });
//     await user.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// User Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Protected Route (Only for logged-in users)
// router.get("/protected", authMiddleware, (req, res) => {
//   res.json({ message: `Welcome ${req.user.role}! You have access.` });
// });

module.exports = router;
