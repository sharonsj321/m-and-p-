// src/components/AdminBookings.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spinner, Alert } from "react-bootstrap";

const API_BASE_URL = import.meta.env.VITE_API_URL; // ✅ Import from VITE env

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]); // ✅ Initialize as an empty array
  const [loading, setLoading] = useState(true); // ✅ Initial loading state
  const [error, setError] = useState(""); // ✅ Initial error state

  // ✅ Fetch all bookings on component load
  useEffect(() => {
    fetchBookings();
  }, []);

  // ✅ Fetch All Bookings for Admin
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await axios.get(`${API_BASE_URL}/admin/bookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data); // ✅ Debugging output

      if (response.data.success && Array.isArray(response.data.data)) {
        setBookings(response.data.data); // ✅ Set bookings correctly
      } else {
        setBookings([]); // ✅ Fallback to empty array
        setError("No booking data found.");
      }
    } catch (err) {
      console.error("Error fetching bookings:", err.response?.data || err.message);
      setError("Failed to load booking data."); // ✅ Show error if API fails
    } finally {
      setLoading(false); // ✅ Stop loading after fetching
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📦 Admin Booking Details</h2>

      {/* Show Error if any */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Show Loading Spinner */}
      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" role="status" />
          <p>Loading booking data...</p>
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="bg-primary text-white">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Service</th>
              <th>Date</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking.user?.name || "N/A"}</td>
                  <td>{booking.service?.title || "N/A"}</td>
                  <td>{new Date(booking.date).toLocaleDateString()}</td>
                  <td>{booking.address || "N/A"}</td>
                  <td>{booking.contactNumber || "N/A"}</td>
                  <td>
                    <span
                      className={`badge ${
                        booking.status === "Completed"
                          ? "bg-success"
                          : booking.status === "Pending"
                          ? "bg-warning"
                          : "bg-danger"
                      }`}
                    >
                      {booking.status || "Pending"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        booking.paymentStatus === "Paid"
                          ? "bg-success"
                          : "bg-warning"
                      }`}
                    >
                      {booking.paymentStatus || "Unpaid"}
                    </span>
                  </td>
                  <td>{new Date(booking.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  No bookings available.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default AdminBookings;
