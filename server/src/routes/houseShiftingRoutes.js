const express = require("express");
const {
  createHouseShifting,
  getAllHouseShiftings,
  getHouseShiftingById,
} = require("../controllers/houseShiftingController");
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");

const router = express.Router();

// ✅ Create House Shifting Booking (Only for authenticated users)
router.post("/", verifyToken, createHouseShifting);

// ✅ Get All House Shifting Bookings (Admin only)
router.get("/", verifyToken, verifyRole(["admin"]), getAllHouseShiftings);

// ✅ Get House Shifting by ID
router.get("/:id", verifyToken, getHouseShiftingById);

module.exports = router;
