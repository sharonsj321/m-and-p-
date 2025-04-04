const express = require("express");
const { createOrder } = require("../controllers/paymentcontroller");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create-order", verifyToken, createOrder);

module.exports = router;
