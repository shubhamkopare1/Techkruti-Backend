const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const problemFormRoutes = require("./routes/problemFormRoutes");
const authRoute = require("./routes/authRoutes")
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Use API routes
app.use("/api/problem-form", problemFormRoutes);
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
