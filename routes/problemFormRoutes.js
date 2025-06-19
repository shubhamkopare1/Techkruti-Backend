const express = require("express");
const router = express.Router();
const ProblemForm = require("../models/ProblemForm");
const {isLoggedIn} = require("../middleware/authMiddleware")
// 📌 POST API to submit form data
router.post("/submit", async (req, res) => {
  try {
    const {  problemCode, teamName, link } = req.body;

    // Validate input fields
    if ( !problemCode || !teamName || !link) {
      return res.status(400).json({ message: "All fields are required" });
    }
  const existingEntry = await ProblemForm.findOne({ link });
    if (existingEntry) {
      return res.status(409).json({ message: "This repo  has already been submitted" });
    }
    // Save form data to MongoDB
    const newEntry = new ProblemForm({  problemCode, teamName, link });
    await newEntry.save();

    res.status(201).json({ message: "Form submitted successfully", data: newEntry });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
router.get("/getTeamData", isLoggedIn,async (req, res) => {
    try {
      const submissions = await ProblemForm.find();
      res.status(200).json({ message: "Data fetched successfully", data: submissions });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });
  

module.exports = router;
