// const Razorpay = require("razorpay");
const Booking = require("../models/bookingModel");

// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// ✅ Create Order
exports.createOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;

    // Check if booking exists
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Create Razorpay order
    // const options = {
    //   amount: booking.amount * 100, // amount in paise
    //   currency: "INR",
    //   receipt: `receipt_${bookingId}`,
    // };

    const order = await razorpayInstance.orders.create(options);

    if (!order) {
      return res.status(500).json({ success: false, message: "Failed to create Razorpay order" });
    }

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: booking.amount,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};
