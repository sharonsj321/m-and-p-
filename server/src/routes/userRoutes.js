const express = require("express");
const router = express.Router();
const { verifyToken, adminOnly, verifyRole } = require("../middlewares/authMiddleware");
const { updateUserProfile,getUserProfile } = require("../controllers/userController");


// Protect route for authenticated users
router.get("/profile", verifyToken, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

// Admin-only route
router.get("/admin", verifyToken, adminOnly, (req, res) => {
  res.status(200).json({ success: true, message: "Welcome, Admin!" });
});

// Route with role-based access (Admin & Seller allowed)
router.post("/create-service", verifyToken, verifyRole(["admin", "seller"]), (req, res) => {
  res.status(200).json({ success: true, message: "Service created successfully!" });
});
router.put("/profile", verifyToken, updateUserProfile);
router.get("/profile", verifyToken, getUserProfile);



module.exports = router;
