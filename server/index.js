require("dotenv").config();
const express = require("express");
const cors = require('cors');

const connectDb = require("./src/config/Db");

const app = express();
connectDb();

// ✅ Custom CORS Middleware - this WORKS on Vercel
app.use(cors({
  origin: 'https://m-and-p-frontend.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
// Parse JSON
app.use(express.json());

// ✅ Sample Route
app.get("/", (req, res) => {
  res.send("Hello World - Backend is Working!");
});

// ✅ Routes
const authRoutes = require("./src/routes/authroutes");
const adminRoutes = require("./src/routes/adminroutes");
const serviceRoutes = require("./src/routes/serviceRoutes");
const userRoutes = require("./src/routes/userRoutes");
const bookingRoutes = require("./src/routes/bookingroutes");
const carShiftingRoutes = require("./src/routes/carShiftingRoutes");
const houseShiftingRoutes = require("./src/routes/houseShiftingRoutes");
const officeShiftingRoutes = require("./src/routes/officeShiftingRoutes");
const domesticShiftRoutes = require("./src/routes/domesticShiftRoutes");
const paymentRoutes = require("./src/routes/paymentroutes");

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/car-shifting", carShiftingRoutes);
app.use("/api/house-shifting", houseShiftingRoutes);
app.use("/api/office-shifting", officeShiftingRoutes);
app.use("/api/domestic-shift", domesticShiftRoutes);
app.use("/api/payments", paymentRoutes);

// ✅ Start server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
module.exports = app;
