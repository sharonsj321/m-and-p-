const express = require("express");
const router = express.Router();
const {
  createOfficeShifting,
  getAllOfficeShifting,
  getOfficeShiftingById,
  updateOfficeShifting,
  deleteOfficeShifting,
} = require("../controllers/officeShiftingController");

// ✅ Create Office Shifting Booking
router.post("/", createOfficeShifting);

// ✅ Get All Office Shifting Bookings
router.get("/", getAllOfficeShifting);

// ✅ Get Single Office Shifting Booking
router.get("/:id", getOfficeShiftingById);

// ✅ Update Office Shifting Booking
router.put("/:id", updateOfficeShifting);

// ✅ Delete Office Shifting Booking
router.delete("/:id", deleteOfficeShifting);

module.exports = router;
