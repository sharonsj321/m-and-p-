import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
    //   const response = await axios.post(`${API_BASE_URL}/auth/login`, formData,

    //   // {
    //   //   withCredentials: true, // ✅ Required for cookies/auth headers
    //   // }
    //   {
    //     headers: {   'Content-Type': 'application/json',
    //     }
    //   }
    // );
    
    const data=await fetch('https://m-and-p-backend.vercel.app/api/auth/login', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        // Add any authentication headers if needed
        // 'Authorization': 'Bearer your-token'
      },
      body: JSON.stringify(
      formData
      )
    })
    const response=await data.json()
      const { token, user } = response.data;

      if (token && user) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        onLogin(user, token);
      } else {
        setError(response?.data?.message || "Failed to login.");
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "An unexpected error occurred.";
      setError(message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage: "url('http://allindiamoversandpackers.in/wp-content/uploads/2020/01/service-06.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)", // ✅ Light overlay for readability
          padding: "2rem",
          borderRadius: "20px",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Card className="border-0" style={{ width: "400px", background: "transparent" }}>
          <Card.Body>
            <h2 className="text-center mb-4 fw-bold">🔐 Login</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
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

              <Button
                variant="primary"
                type="submit"
                className="w-100 rounded-pill mb-3"
              >
                Login
              </Button>
            </Form>

            <div className="text-center mt-3">
              <Link to="/forgot-password" className="text-decoration-none">
                Forgot Password?
              </Link>
            </div>
            <div className="text-center mt-2">
              <span>Don't have an account? </span>
              <Link to="/register" className="text-primary fw-bold text-decoration-none">
                Sign Up
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default Login;
