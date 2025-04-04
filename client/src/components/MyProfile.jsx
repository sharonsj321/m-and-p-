import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Alert, Card, Spinner } from "react-bootstrap";

const API_BASE_URL = import.meta.env.VITE_API_URL; // ✅ Import API URL from .env

const MyProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("❌ No token found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("✅ Profile Data:", response.data);

        if (response.data.success) {
          setFormData(response.data.user);
        } else {
          setError("❌ Failed to load profile.");
        }
      } catch (err) {
        console.error("❌ Error fetching profile:", err.response?.data || err);
        setError(err.response?.data?.message || "❌ Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Profile Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(""); // Reset success message before submitting
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("❌ No token found. Please log in.");
        return;
      }

      const response = await axios.put(
        `${API_BASE_URL}/users/profile`, // ✅ Fixed API URL
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Update Response:", response.data);

      if (response.data.success) {
        setSuccess("✅ Profile updated successfully.");
        setError("");
      } else {
        setError("❌ Failed to update profile.");
      }
    } catch (err) {
      console.error("❌ Error updating profile:", err.response?.data || err);
      setError(err.response?.data?.message || "❌ Failed to update profile.");
    }
  };

  // ✅ Loading state while fetching profile data
  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading profile...</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Card className="shadow-lg border-0">
        <Card.Body>
          <h2 className="text-center mb-4 text-primary">👤 My Profile</h2>

          {/* Success & Error Alerts */}
          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          {/* Profile Form */}
          <Form onSubmit={handleSubmit} className="mt-3">
            <Form.Group className="mb-3" controlId="name">
              <Form.Label className="fw-bold">Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="shadow-sm"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="fw-bold">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter your email"
                disabled // Email should not be editable
                className="shadow-sm bg-light"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="contactNumber">
              <Form.Label className="fw-bold">Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Enter your contact number"
                className="shadow-sm"
                required
              />
            </Form.Group>

            {/* Submit Button */}
            <Button variant="primary" type="submit" className="w-100 shadow-sm">
              Update Profile
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MyProfile;
