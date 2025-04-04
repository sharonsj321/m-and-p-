const User = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const Service = require("../models/service.model");
const Booking = require("../models/bookingmodel");
console.log("Booking Model:", Booking); // ✅ Debugging line

// Add User
exports.addUser = async (req, res) => {
  try {
    console.log(req.body);

    const { name, email, password, role } = req.body;
    const hashedpassword = await bcrypt.hash(password, 10);

    const newuser = new User({
      name,
      email,
      password: hashedpassword,
      role,
      createdBy: req.user.id,
    });

    console.log(newuser);
    await newuser.save();
    res.status(200).json({ message: "User added successfully" });
  } catch (error) {
    res.status(500).json({ message: "User creation failed", error: error.message });
  }
};

// View Single User
exports.viewUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(400).json({ message: "User not found" });

    return res.status(200).json({ message: "Success", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// View List of Users
exports.listUser = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0)
      return res.status(400).json({ message: "No users found" });

    return res.status(200).json({ message: "Success", users });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password
    res.status(200).json({
      success: true,
      data: users, // ✅ Return correct data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get users",
      error: error.message,
    });
  }
};
// Update User
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create Service

exports.createService = async (req, res) => {
  try {
    const { name, price, description, imgUrl } = req.body;

    // Check if service name already exists
    const existingService = await Service.findOne({ name });
    if (existingService) {
      return res
        .status(400)
        .json({ success: false, message: "Service already exists." });
    }

    // Create new service
    const service = new Service({
      name,
      price,
      description,
      imgUrl,
    });

    await service.save();
    res.status(201).json({
      success: true,
      message: "Service created successfully.",
      service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create service.",
      error: error.message,
    });
  }
};

// ✅ Get all services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({
      success: true,
      services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get services.",
      error: error.message,
    });
  }
};
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("service", "title price")
      .sort({ createdAt: -1 }); // Sort by latest booking

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};