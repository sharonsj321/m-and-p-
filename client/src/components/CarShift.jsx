import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";

const API_BASE_URL = import.meta.env.VITE_API_URL; // ✅ Import from VITE env

const CarShift = () => {
  const [formData, setFormData] = useState({
    address: "",
    contactNumber: "",
    date: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ✅ Correct serviceId for Car Shifting (Replace with correct serviceId)
  const CAR_SHIFT_SERVICE_ID = "67e60f28645e5aaff3a7e64b"; // ⚠️ Use valid serviceId from database

  // ✅ Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📞 Validate Contact Number (10-digit validation)
  const isValidPhoneNumber = (phone) => {
    return /^[0-9]{10}$/.test(phone); // 10-digit phone number validation
  };

  // 📅 Validate Date - Prevent selecting past dates
  const isValidDate = (selectedDate) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const selected = new Date(selectedDate).setHours(0, 0, 0, 0);
    return selected >= today;
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 📞 Validate Contact Number
    if (!isValidPhoneNumber(formData.contactNumber)) {
      setError("❌ Please enter a valid 10-digit phone number.");
      return;
    }

    // 📅 Validate Date
    if (!isValidDate(formData.date)) {
      setError("❌ Please select a valid future date.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // ✅ Get token from localStorage
      console.log("✅ Token being sent:", token); // Debug token

      if (!token) {
        setError("❌ No token found. Please log in.");
        return;
      }

      // ✅ Send POST request to create booking
      const response = await axios.post(
        `${API_BASE_URL}/bookings`,
        {
          serviceId: CAR_SHIFT_SERVICE_ID, // ✅ Correct Car Shifting serviceId
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Send token properly
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Booking response:", response.data);
      setMessage("🚗 Car shifting booked successfully!");
      setError("");
    } catch (error) {
      console.error(
        "❌ Error creating booking:",
        error.response?.data || error.message
      );
      setError(
        error.response?.data?.message || "❌ Failed to create booking. Try again."
      );
      setMessage("");
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">🚗 Car Shifting Booking</h2>

      {/* ✅ Success or Error Messages */}
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* ✅ Booking Form */}
      <Form onSubmit={handleSubmit} className="shadow-lg p-4 rounded bg-light">
        <Form.Group controlId="address" className="mb-3">
          <Form.Label>🏠 Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            required
          />
        </Form.Group>

        <Form.Group controlId="contactNumber" className="mb-3">
          <Form.Label>📞 Contact Number</Form.Label>
          <Form.Control
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Enter your contact number"
            required
          />
        </Form.Group>

        <Form.Group controlId="date" className="mb-3">
          <Form.Label>📅 Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          🚚 Book Car Shift
        </Button>
      </Form>
    </Container>
  );
};

export default CarShift;
