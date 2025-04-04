import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";

const OfficeShift = () => {
  const [formData, setFormData] = useState({
    address: "",
    contactNumber: "",
    date: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL; // ✅ Use environment variable

  // ✅ Correct Service ID for Office Shifting (Replace with actual ID from DB)
  const OFFICE_SHIFT_SERVICE_ID = "67e60f28645e5aaff3a7e64b"; // ⚠️ Replace with real ID

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate Contact Number
  const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  // Validate Date - Prevent past dates
  const isValidDate = (selectedDate) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const selected = new Date(selectedDate).setHours(0, 0, 0, 0);
    return selected >= today;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate Contact Number
    if (!isValidPhoneNumber(formData.contactNumber)) {
      setError("❌ Please enter a valid 10-digit phone number.");
      setMessage("");
      return;
    }

    // ✅ Validate Date
    if (!isValidDate(formData.date)) {
      setError("❌ Please select a valid future date.");
      setMessage("");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // ✅ Get token from localStorage
      console.log("✅ Token being sent:", token);

      if (!token) {
        setError("❌ No token found. Please log in.");
        setMessage("");
        return;
      }

      // ✅ Send POST request to create booking
      const response = await axios.post(
        `${API_URL}/api/bookings`,
        {
          serviceId: OFFICE_SHIFT_SERVICE_ID, // ✅ Use correct service ID
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Booking response:", response.data);
      setMessage("🏢 Office shifting booked successfully!");
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
      <h2 className="text-center mb-4">🏢 Book Office Shifting</h2>

      {/* Success or Error Messages */}
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Booking Form */}
      <Form onSubmit={handleSubmit} className="shadow-lg p-4 rounded bg-light">
        <Form.Group controlId="address" className="mb-3">
          <Form.Label>🏡 Address</Form.Label>
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
          🚚 Book Office Shift
        </Button>
      </Form>
    </Container>
  );
};

export default OfficeShift;
