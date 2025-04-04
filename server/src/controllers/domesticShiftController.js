const DomesticShift = require("../models/domesticShiftModel");

// Create Domestic Shift Booking
exports.createDomesticShiftBooking = async (req, res) => {
  try {
    console.log("Incoming domestic shift booking:", req.body);
    const { serviceId, address, contactNumber, date } = req.body;

    // Validate contact number format
    if (!/^[0-9]{10}$/.test(contactNumber)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number. Please enter a valid 10-digit number.",
      });
    }

    const booking = new DomesticShift({
      serviceId,
      address,
      contactNumber,
      date,
      user: req.user.id,
    });

    await booking.save();
    res.status(201).json({
      success: true,
      message: "Domestic shifting booked successfully!",
      booking,
    });
  } catch (error) {
    console.error("Error creating domestic shift booking:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to create domestic shifting booking",
      error: error.message,
    });
  }
};

// Get All Domestic Shift Bookings (Admin)
exports.getAllDomesticShiftBookings = async (req, res) => {
  try {
    const bookings = await DomesticShift.find().populate("user");
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching bookings" });
  }
};

// Get My Domestic Shift Bookings
exports.getMyDomesticShiftBookings = async (req, res) => {
  try {
    const bookings = await DomesticShift.find({ user: req.user.id });
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching your bookings" });
  }
};
