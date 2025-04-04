import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Container, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", // Default role is 'user'
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  
  const API_URL = import.meta.env.VITE_API_URL; // ✅ Use environment variable

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Handle signup submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, formData);
  
      console.log("Response:", response.data);
  
      if (response.status === 201) { // Use HTTP status check
        setSuccess("🎉 Account created successfully! Redirecting to login...");
        setError("");
  
        setTimeout(() => {
          navigate("/login");
        }, 3000); // Increased delay
      }
    } catch (error) {
      console.error("❌ Error:", error.response?.data || error);
      setError(error.response?.data?.message || "❌ Failed to sign up.");
    }
  };
  
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="shadow-lg p-4 rounded-lg" style={{ width: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4 fw-bold">📝 Sign Up</h2>

          {/* Success & Error Alerts */}
          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          {/* Signup Form */}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="rounded-pill"
                required
              />
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="rounded-pill"
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="rounded-pill"
                required
              />
            </Form.Group>

            {/* Select Role */}
            <Form.Group controlId="role" className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="rounded-pill"
                required
              >
                <option value="customer">customer</option>
                <option value="admin">Admin</option>
                <option value="seller">Seller</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 rounded-pill mb-3">
              Sign Up
            </Button>
          </Form>

          {/* Login Link */}
          <div className="text-center mt-2">
            <span>Already have an account? </span>
            <Link to="/login" className="text-primary fw-bold text-decoration-none">
              Login
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Signup;
