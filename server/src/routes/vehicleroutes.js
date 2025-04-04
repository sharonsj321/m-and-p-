// const express = require("express");
// const router = express.Router();
// const Vehicle = require("../models/vehiclemodel");
// const { verifyToken, verifyRole } = require("../middlewares/authMiddleware"); // Middleware for authentication & authorization

// // **1. Create a new vehicle (Only Admin/Seller)**

// router.post("/", verifyToken, verifyRole(["admin", "seller"]), async (req, res) => {
//   try {
//     const { name, type, capacity, registrationNumber, availability, assignedDriver } = req.body;

//     const newVehicle = new Vehicle({
//       name,
//       type,
//       capacity,
//       registrationNumber,
//       availability,
//       assignedDriver,
//       createdBy: req.user.id,
//     });

//     await newVehicle.save();
//     res.json({ success: true, message: "Vehicle created successfully!" });

// } catch (error) {
//     res.status(500).json({ success: false, message: "Error adding vehicle", error: error.message });
//   }
// });

// // **2. Get all vehicles**
// router.get("/", verifyToken, async (req, res) => {
//   try {
//     const vehicles = await Vehicle.find().populate("assignedDriver", "name email");
//     res.status(200).json({ success: true, vehicles });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error fetching vehicles", error: error.message });
//   }
// });

// // **3. Get a single vehicle by ID**
// router.get("/:id", verifyToken, async (req, res) => {
//   try {
//     const vehicle = await Vehicle.findById(req.params.id).populate("assignedDriver", "name email");
//     if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });

//     res.status(200).json({ success: true, vehicle });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error fetching vehicle", error: error.message });
//   }
// });

// // **4. Update vehicle details (Only Admin/Seller)**
// router.put("/:id", verifyToken, verifyRole(["admin", "seller"]), async (req, res) => {
//   try {
//     const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedVehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });

//     res.status(200).json({ success: true, message: "Vehicle updated successfully", vehicle: updatedVehicle });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error updating vehicle", error: error.message });
//   }
// });

// // **5. Delete a vehicle (Only Admin/Seller)**
// router.delete("/:id", verifyToken, verifyRole(["admin", "seller"]), async (req, res) => {
//   try {
//     const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);
//     if (!deletedVehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });

//     res.status(200).json({ success: true, message: "Vehicle deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error deleting vehicle", error: error.message });
//   }
// });

// module.exports = router;
