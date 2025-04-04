const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
    date: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ Prevent Overwrite Error
module.exports =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
