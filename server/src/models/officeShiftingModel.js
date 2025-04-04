const mongoose = require("mongoose");

const officeShiftingSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    contactPerson: {
      type: String,
      required: [true, "Contact person is required"],
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
    officeSize: {
      type: String,
      required: [true, "Office size is required"],
    },
    shiftingDate: {
      type: Date,
      required: [true, "Shifting date is required"],
    },
    deliveryDate: {
      type: Date,
      required: [true, "Delivery date is required"],
    },
    numberOfEmployees: {
      type: Number,
      required: [true, "Number of employees is required"],
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

module.exports = mongoose.model("OfficeShifting", officeShiftingSchema);
