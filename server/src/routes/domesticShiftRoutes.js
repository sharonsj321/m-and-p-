const express = require("express");
const router = express.Router();
const {
  createDomesticShiftBooking,
  getAllDomesticShiftBookings,
  getMyDomesticShiftBookings,
} = require("../controllers/domesticShiftController");

const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");

// Create Domestic Shift Booking (User)
router.post("/", verifyToken, createDomesticShiftBooking);

// Get My Domestic Shift Bookings (User)
router.get("/my-bookings", verifyToken, getMyDomesticShiftBookings);

// Get All Domestic Shift Bookings (Admin)
router.get("/", verifyToken, verifyRole(["admin"]), getAllDomesticShiftBookings);

module.exports = router;
