const Booking = require("../models/bookingmodel");
const Service = require("../models/service.model");
const User = require("../models/usermodel");

// ✅ Get User's Bookings
exports.getMyBookings = async (req, res) => {
  try {
    console.log("🔍 Fetching bookings for user:", req.user.id);

    const bookings = await Booking.find({ user: req.user.id })
      .populate({ path: "service", select: "title price description" })
      .populate({ path: "user", select: "name email" });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No bookings found",
      });
    }

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("❌ Error fetching bookings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};

// ✅ Create Booking
exports.createBooking = async (req, res) => {
  try {
    const { serviceId, date, address, contactNumber } = req.body;

    // ✅ Field Validation
    if (!serviceId || !date || !address || !contactNumber) {
      return res.status(400).json({
        success: false,
        message: "All fields (serviceId, date, address, contactNumber) are required",
      });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    const amount = service.price;

    const newBooking = new Booking({
      user: req.user.id,
      service: serviceId,
      date,
      address,
      contactNumber,
      amount,
      status: "Pending",
    });

    await newBooking.save();
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error("❌ Error creating booking:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: error.message,
    });
  }
};

// ✅ Get Booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      "service",
      "title price"
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // ✅ Optional Authorization Check
    if (booking.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Unauthorized access" });
    }

    res.status(200).json({ success: true, booking });
  } catch (error) {
    console.error("❌ Error fetching booking by ID:", error);
    res.status(500).json({ success: false, message: "Failed to fetch booking" });
  }
};

// ✅ Update Booking
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // ✅ Optional Authorization Check
    if (booking.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("❌ Error updating booking:", error);
    res.status(500).json({ success: false, message: "Failed to update booking" });
  }
};

// ✅ Delete Booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // ✅ Optional Authorization Check
    if (booking.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await booking.deleteOne();

    res.status(200).json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting booking:", error);
    res.status(500).json({ success: false, message: "Failed to delete booking" });
  }
};

// ✅ Update Booking Status After Payment
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required" });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({
      success: true,
      message: `Booking marked as ${status}`,
      booking,
    });
  } catch (error) {
    console.error("❌ Error updating booking status:", error);
    res.status(500).json({ success: false, message: "Failed to update booking status" });
  }
};
