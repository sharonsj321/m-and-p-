import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Sidebar = ({ setActiveTab }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <h2>Customer Dashboard</h2>
      <button onClick={() => setActiveTab("bookings")}>My Bookings</button>
      <button onClick={() => setActiveTab("payments")}>Payment History</button>
      <button onClick={() => setActiveTab("profile")}>My Profile</button>
      <button onClick={() => setActiveTab("tracking")}>Service Tracking</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Sidebar;
