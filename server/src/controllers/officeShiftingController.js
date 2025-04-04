const OfficeShifting = require("../models/officeShiftingModel");

// ✅ Create a new office shifting booking
exports.createOfficeShifting = async (req, res) => {
  try {
    const newBooking = new OfficeShifting(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json({
      success: true,
      message: "Office shifting booking created successfully!",
      booking: savedBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create office shifting booking",
      error: error.message,
    });
  }
};

// ✅ Get all office shifting bookings
exports.getAllOfficeShifting = async (req, res) => {
  try {
    const bookings = await OfficeShifting.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch office shifting bookings",
      error: error.message,
    });
  }
};

// ✅ Get office shifting booking by ID
exports.getOfficeShiftingById = async (req, res) => {
  try {
    const booking = await OfficeShifting.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Office shifting booking not found",
      });
    }
    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch office shifting booking",
      error: error.message,
    });
  }
};

// ✅ Update office shifting booking
exports.updateOfficeShifting = async (req, res) => {
  try {
    const updatedBooking = await OfficeShifting.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: "Office shifting booking not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Office shifting booking updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update office shifting booking",
      error: error.message,
    });
  }
};

// ✅ Delete office shifting booking
exports.deleteOfficeShifting = async (req, res) => {
  try {
    const deletedBooking = await OfficeShifting.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      return res.status(404).json({
        success: false,
        message: "Office shifting booking not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Office shifting booking deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete office shifting booking",
      error: error.message,
    });
  }
};
