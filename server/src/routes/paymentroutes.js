// const express = require("express");
// const router = express.Router();
// const Stripe = require("stripe");
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// router.post("/create-payment-intent", async (req, res) => {
//   try {
//     const { amount, currency = "inr" } = req.body;

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount * 100, // ₹1000 becomes 100000 paise
//       currency,
//       payment_method_types: ["card"],
//     });

//     res.status(200).json({
//       success: true,
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// module.exports = router;
