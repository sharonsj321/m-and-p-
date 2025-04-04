const mongoose = require("mongoose");

const domesticShiftSchema = new mongoose.Schema({
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  contactNumber: {
    type: String,
    required: [true, "Contact number is required"],
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v); // ✅ Validate 10-digit phone number
      },
      message: "Please enter a valid 10-digit phone number",
    },
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("DomesticShift", domesticShiftSchema);
