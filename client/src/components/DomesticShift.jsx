import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL; // ✅ Import API URL from .env


const DomesticShiftBooking = () => {
  const [formData, setFormData] = useState({
    serviceId: "67e60f28645e5aaff3a7e64b", // ✅ Correct service ID
    date: "",
    address: "",
    contactNumber: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📞 ✅ Validate 10-digit Phone Number
  const isValidPhoneNumber = (phone) => {
    return /^[0-9]{10}$/.test(phone); // Check for exactly 10 digits
  };

  // 📅 ✅ Validate Date - Prevent selecting past dates
  const isValidDate = (selectedDate) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const selected = new Date(selectedDate).setHours(0, 0, 0, 0);
    return selected >= today;
  };

  // ✅ Create Booking API Call
  const createDomesticShiftBooking = async (formData, token) => {
    const response = await axios.post(
      `${API_BASE_URL}/bookings`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // ✅ Return response data
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 📞 Validate Contact Number before submission
    if (!isValidPhoneNumber(formData.contactNumber)) {
      setError("❌ Please enter a valid 10-digit phone number.");
      setMessage("");
      return;
    }

    // 📅 Validate Date before submission
    if (!isValidDate(formData.date)) {
      setError("❌ Please select a valid future date.");
      setMessage("");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("❌ No token found. Please log in.");
        setMessage("");
        return;
      }

      // ✅ Create Booking API Call
      const response = await createDomesticShiftBooking(formData, token);

      if (response.success) {
        setMessage("✅ Domestic shifting booked successfully!");
        setError("");
        setFormData({
          serviceId: "67e645986a4a5af74b2c040a", // Reset after successful booking
          date: "",
          address: "",
          contactNumber: "",
        });
      } else {
        setError(response.message || "❌ Failed to create booking.");
        setMessage("");
      }
    } catch (error) {
      console.error("❌ Error creating booking:", error.response?.data || error.message);
      setError(
        error.response?.data?.message || "❌ Failed to create booking. Please try again."
      );
      setMessage("");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🏡 Book Domestic Shifting</h2>

      {/* ✅ Show Success or Error Message */}
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* ✅ Booking Form */}
      <Form onSubmit={handleSubmit} className="shadow-lg p-4 bg-white rounded">
        <Form.Group className="mb-3">
          <Form.Label>📅 Select Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
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

        <Form.Group className="mb-3">
          <Form.Label>📞 Contact Number</Form.Label>
          <Form.Control
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Enter 10-digit phone number"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          📦 Book Now
        </Button>
      </Form>
    </div>
  );
};

export default DomesticShiftBooking;
