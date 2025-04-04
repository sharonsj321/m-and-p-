const Service = require("../models/service.model");

exports.createService = async (req, res) => {
    try {
      // Your service logic here
      res.status(201).json({ success: true, message: "Service created successfully!" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  };
  exports.getServices = async (req, res) => {
    try {
      const services = await Service.find();
      res.status(200).json({
        success: true,
        services,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to get services.",
        error: error.message,
      });
    }
  };
  module.exports = { createService };
  