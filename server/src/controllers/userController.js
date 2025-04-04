const User = require("../models/usermodel");
const bcrypt = require("bcryptjs");

// userController.js
exports.updateUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Update user details
      user.name = req.body.name || user.name;
      user.phone = req.body.phone || user.phone;
      user.address = req.body.address || user.address;
  
      const updatedUser = await user.save();
      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          phone: updatedUser.phone,
          address: updatedUser.address,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update profile",
        error: error.message,
      });
    }
  };
  exports.updateUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user._id); // Get authenticated user
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }
  
      // Update fields from request body
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.contactNumber = req.body.contactNumber || user.contactNumber;
  
      const updatedUser = await user.save();
  
      res.status(200).json({
        success: true,
        message: "Profile updated successfully.",
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          contactNumber: updatedUser.contactNumber,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating profile.",
        error: error.message,
      });
    }
  };
  exports.getUserProfile = async (req, res) => {
    try {
      const user = req.user;
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({
        success: true,
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  