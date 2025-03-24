const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = decoded; // Store user data in request
    next(); // Proceed to next middleware or route
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = isLoggedIn;

