const express = require("express");
const {
  createCarShiftingBooking,
  getAllCarShiftingBookings,
} = require("../controllers/carShiftingController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// ✅ Create Car Shifting Booking (POST)
router.post("/", verifyToken, createCarShiftingBooking);

// ✅ Get All Car Shifting Bookings (GET)
router.get("/", verifyToken, getAllCarShiftingBookings);

module.exports = router;
