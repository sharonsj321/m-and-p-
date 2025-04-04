const HouseShifting = require("../models/houseShiftingModel");

// ✅ Create House Shifting Booking
exports.createHouseShifting = async (req, res) => {
  try {
    const {
      customerName,
      contactNumber,
      email,
      pickupAddress,
      dropAddress,
      houseSize,
      shiftingDate,
      deliveryDate,
      price,
    } = req.body;

    // ✅ Create a new house shifting record
    const newBooking = new HouseShifting({
      customerName,
      contactNumber,
      email,
      pickupAddress,
      dropAddress,
      houseSize,
      shiftingDate,
      deliveryDate,
      price,
    });

    await newBooking.save();

    res.status(201).json({
      success: true,
      message: "House shifting booking created successfully!",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to create house shifting booking.",
      error: error.message,
    });
  }
};

// ✅ Get All House Shifting Bookings
exports.getAllHouseShiftings = async (req, res) => {
  try {
    const bookings = await HouseShifting.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch house shifting bookings.",
      error: error.message,
    });
  }
};

// ✅ Get Booking by ID
exports.getHouseShiftingById = async (req, res) => {
  try {
    const booking = await HouseShifting.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "House shifting booking not found.",
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching booking.",
      error: error.message,
    });
  }
};
