const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// JWT Authentication Middleware
exports.authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, "9999", async (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    const userData = await User.findOne({ email: user.user });
    req.user = {
      _id: userData._id,
      email: userData.email,
      name: userData.name,
    };
    next();
  });
};

// Rate Limiting Middleware
exports.rateLimiter = require("express-rate-limit")({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
});
