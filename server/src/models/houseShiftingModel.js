const mongoose = require("mongoose");

const houseShiftingSchema = new mongoose.Schema(
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
    pickupAddress: {
      type: String,
      required: [true, "Pickup address is required"],
    },
    dropAddress: {
      type: String,
      required: [true, "Drop address is required"],
    },
    houseSize: {
      type: String,
      required: [true, "House size is required"],
      enum: ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Villa", "Other"],
    },
    shiftingDate: {
      type: Date,
      required: [true, "Shifting date is required"],
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

module.exports = mongoose.model("HouseShifting", houseShiftingSchema);
