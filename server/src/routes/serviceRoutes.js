const express = require("express");
const router = express.Router();
const { verifyToken, adminOnly } = require("../middlewares/authMiddleware");
const { createService,getServices } = require("../controllers/adminController");

// Use the correct model import
const Service = require("../models/service.model");

router.post("/", verifyToken, adminOnly, createService);
router.get("/", getServices);


module.exports = router;
