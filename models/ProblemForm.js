const mongoose = require("mongoose");

const problemFormSchema = new mongoose.Schema({
  problemCode: { type: String, required: true },
  teamName: { type: String, required: true },
  link: { type: String, required: true }
}, { timestamps: true });

const ProblemForm = mongoose.model("ProblemForm", problemFormSchema);
module.exports = ProblemForm;
