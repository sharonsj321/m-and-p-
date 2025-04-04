const mongoose = require("mongoose");

const carShiftingSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    pickupLocation: {
      type: String,
      required: [true, "Pickup location is required"],
    },
    dropLocation: {
      type: String,
      required: [true, "Drop location is required"],
    },
    carType: {
      type: String,
      required: [true, "Car type is required"],
      enum: ["Sedan", "SUV", "Hatchback", "Luxury", "Other"],
    },
    pickupDate: {
      type: Date,
      required: [true, "Pickup date is required"],
    },
    deliveryDate: {
      type: Date,
      required: [true, "Delivery date is required"],
    },
    status: {
      type: String,
      enum: ["Pending", "In Transit", "Delivered", "Cancelled"],
      default: "Pending",
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CarShifting", carShiftingSchema);
