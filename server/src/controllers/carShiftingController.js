const CarShifting = require("../models/carShiftingModel");

// ✅ Create Car Shifting Booking
exports.createCarShiftingBooking = async (req, res) => {
  try {
    const {
      customerName,
      contactNumber,
      email,
      pickupLocation,
      dropLocation,
      carType,
      pickupDate,
      deliveryDate,
      price,
    } = req.body;

    // ✅ Validate required fields
    if (
      !customerName ||
      !contactNumber ||
      !email ||
      !pickupLocation ||
      !dropLocation ||
      !carType ||
      !pickupDate ||
      !deliveryDate ||
      !price
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // ✅ Create new Car Shifting booking
    const carShifting = new CarShifting({
      customerName,
      contactNumber,
      email,
      pickupLocation,
      dropLocation,
      carType,
      pickupDate,
      deliveryDate,
      price,
    });

    await carShifting.save();

    res.status(201).json({
      success: true,
      message: "Car shifting booking created successfully.",
      carShifting,
    });
  } catch (error) {
    console.error("Error creating car shifting booking:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create car shifting booking.",
      error: error.message,
    });
  }
};

// ✅ Get All Car Shifting Bookings
exports.getAllCarShiftingBookings = async (req, res) => {
  try {
    const bookings = await CarShifting.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch car shifting bookings.",
      error: error.message,
    });
  }
};
