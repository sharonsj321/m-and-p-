const express = require("express");
const router = express.Router();

// ✅ Import middlewares
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");

// ✅ Import controllers
const {
  getMyBookings,
  createBooking,
  getBookingById,
  updateBooking,
  deleteBooking,updateBookingStatus
} = require("../controllers/bookingController");

// ✅ Get All Bookings for User
router.get("/my-bookings", verifyToken, getMyBookings);
router.get("/", verifyToken, getMyBookings);


// ✅ Create Booking
router.post("/", verifyToken, createBooking);

// ✅ Get Booking by ID
router.get("/:id", verifyToken, getBookingById);

// ✅ Update Booking
router.put("/:id", verifyToken, updateBooking);

// ✅ Delete Booking
router.delete("/:id", verifyToken, deleteBooking);
router.put("/:id/update-status", verifyToken, updateBookingStatus);


module.exports = router;
