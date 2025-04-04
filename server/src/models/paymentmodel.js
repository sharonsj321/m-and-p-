// const mongoose = require("mongoose");

// const paymentSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     orderId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Order",
//       required: true,
//     },
//     amount: {
//       type: Number,
//       required: true,
//     },
//     currency: {
//       type: String,
//       default: "INR",
//     },
//     paymentStatus: {
//       type: String,
//       enum: ["pending", "completed", "failed"],
//       default: "pending",
//     },
//     transactionId: {
//       type: String,
//       unique: true,
//     },
//     paymentMethod: {
//       type: String,
//       enum: ["card", "netbanking", "upi", "wallet"],
//     },
//     paymentGateway: {
//       type: String,
//       enum: ["stripe", "razorpay"],
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Payment", paymentSchema);
