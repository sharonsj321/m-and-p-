const Booking = require("../models/bookingmodel");
const Service = require("../models/service.model"); // ✅ Corrected Import
const User = require("../models/usermodel"); // ✅ Optional if you need user data

// ✅ Get User's Bookings
exports.getMyBookings = async (req, res) => {
  try {
    console.log("Fetching bookings for user:", req.user.id); // ✅ Debug log

    // ✅ Populate `service` and `user` fields
    const bookings = await Booking.find({ user: req.user.id })
      .populate({ path: "service", select: "title price description" }) // ✅ Get service details
      .populate({ path: "user", select: "name email" }); // Optional if needed

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
    console.error("Error fetching bookings:", error.message);
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

    // ✅ Check if Service Exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    // ✅ Calculate Amount (if amount is fixed or derived from service price)
    const amount = service.price; // ✅ Assuming price is stored in `service` model

    // ✅ Create New Booking
    const newBooking = new Booking({
      user: req.user.id,
      service: serviceId,
      date,
      address,
      contactNumber,
      amount, // ✅ Pass the amount
      status: "Pending",
    });

    await newBooking.save();
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error.message);
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
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({ success: true, booking });
  } catch (error) {
    console.error("Error fetching booking:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch booking" });
  }
};

// ✅ Update Booking
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      booking,
    });
  } catch (error) {
    console.error("Error updating booking:", error.message);
    res.status(500).json({ success: false, message: "Failed to update booking" });
  }
};

// ✅ Delete Booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error.message);
    res.status(500).json({ success: false, message: "Failed to delete booking" });
  }
};
// ✅ Update Booking Status After Payment
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
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
    console.error("Error updating booking status:", error.message);
    res.status(500).json({ success: false, message: "Failed to update booking status" });
  }
};
