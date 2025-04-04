const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
require("dotenv").config();

// ✅ Middleware to verify JWT token
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ✅ Check if token is present and in correct format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ Token not provided or invalid format.");
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // ✅ Extract token after "Bearer "
    const token = authHeader.split(" ")[1];
    console.log("✅ Token from header:", token);

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_Secret);
    console.log("✅ Decoded Token:", decoded);

    // ✅ Find user from token payload
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      console.log("❌ User not found.");
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    // ✅ Attach authenticated user to req
    req.user = user;
    console.log("✅ Authenticated User:", req.user);
    next();
  } catch (error) {
    console.error("❌ Error verifying token:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
      error: error.message,
    });
  }
};

const verifyRole = (roles) => (req, res, next) => {
  console.log("✅ Authenticated User Role:", req.user?.role);
  console.log("✅ Required Roles:", roles);
  console.log("User Role:", req.user.role); // ✅ Debugging line

  if (!req.user || !roles.includes(req.user.role)) {
    console.log("❌ Access denied. Insufficient permissions.");
    return res.status(403).json({
      success: false,
      message: "Access denied. Insufficient permissions.",
    });
  }
  console.log("✅ Role-based access granted.");
  next();
};

// ## ✅ **Middleware to Restrict Access to Admins Only**

const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    console.log("❌ Access denied. Admin only.");
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin only.",
    });
  }
  console.log("✅ Admin access granted.");
  next();
};

module.exports = {
  verifyToken,
  adminOnly,
  verifyRole,
};