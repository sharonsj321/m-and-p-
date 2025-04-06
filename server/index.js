require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./src/config/Db");

const app = express();

// ✅ Connect to MongoDB
connectDb();

// ✅ CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://m-and-p-frontend.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));

// ✅ Handle OPTIONS for all routes (needed for CORS preflight)
app.options("*", cors(corsOptions));

// ✅ Express Middleware
app.use(express.json());

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("Backend running ✅");
});

// ✅ Log request origin (optional for debugging)
app.use((req, res, next) => {
  console.log("🔍 Origin:", req.headers.origin);
  next();
});

// ✅ Load Routes
app.use("/api/auth", require("./src/routes/authroutes"));
app.use("/api/admin", require("./src/routes/adminroutes"));
app.use("/api/users", require("./src/routes/userRoutes"));
app.use("/api/services", require("./src/routes/serviceRoutes"));
app.use("/api/bookings", require("./src/routes/bookingroutes"));
app.use("/api/car-shifting", require("./src/routes/carShiftingRoutes"));
app.use("/api/house-shifting", require("./src/routes/houseShiftingRoutes"));
app.use("/api/office-shifting", require("./src/routes/officeShiftingRoutes"));
app.use("/api/domestic-shift", require("./src/routes/domesticShiftRoutes"));
app.use("/api/payments", require("./src/routes/paymentroutes"));

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ message: "Server Error: " + err.message });
});

// ✅ Only run the server if not on Vercel
const PORT = process.env.PORT || 7000;
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;
