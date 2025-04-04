// const mongoose = require("mongoose");

// const vehicleSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true }, // e.g., Truck, Mini Van
//     type: { type: String, required: true }, // e.g., Open Truck, Closed Van
//     capacity: { type: Number, required: true }, // in kg or tons
//     registrationNumber: { type: String, required: true, unique: true },
//     availability: { type: Boolean, default: true },
//     assignedDriver: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to Driver
//     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Admin/Seller who added the vehicle
//   },
//   { timestamps: true }
// );

// const Vehicle = mongoose.model("Vehicle", vehicleSchema);
// module.exports = Vehicle;
