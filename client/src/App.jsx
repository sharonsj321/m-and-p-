import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/login";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import CustomNavbar from "./Navbar"; // ✅ Correct path
import CustomerDashboard from "./components/Customerdashboard";
import Services from "./components/Services";
import AboutUs from "./components/AboutUs";
import DomesticShift from "./components/DomesticShift";
import CarShift from "./components/CarShift";
import HouseShift from "./components/HouseShift";
import OfficeShift from "./components/OfficeShift";
import MyBookings from "./components/MyBookings";
import MyProfile from "./components/MyProfile";
import AdminDashboard from "./components/AdminDashboard"; 
import ManageServices from "./components/ManageServices";
import ManageUsers from "./components/ManageUsers";
import AdminBookings from "./components/AdminBookings";
import AdminUsers from "./components/AdminUsers";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./components/Signup";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData, token) => {
    console.log("Login successful. Token:", token); // ✅ Debugging token

    localStorage.setItem("token", token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...userData,
        role: userData.role.toLowerCase(),
      })
    );
    setUser({
      ...userData,
      role: userData.role.toLowerCase(),
    });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  // ✅ Redirect to Appropriate Dashboard After Login
  const getDashboardRedirect = () => {
    if (user?.role === "admin") return "/admin/dashboard";
    if (user?.role === "customer") return "/customer/dashboard";
    return "/login";
  };

  return (
    <>
      <BrowserRouter>
        {/* ✅ Show Navbar when authenticated */}
        {isAuthenticated && <CustomNavbar user={user} onLogout={handleLogout} />}

        <Routes>
        <Route path="/register" element={<Signup />} /> {/* Ensure this route exists */}

          {/* 🔐 Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              isAuthenticated && user?.role === "admin" ? (
                <AdminDashboard user={user} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/manage-users"
            element={
              isAuthenticated && user?.role === "admin" ? (
                <ManageUsers />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/manage-services"
            element={
              isAuthenticated && user?.role === "admin" ? (
                <ManageServices />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/users"
            element={
              isAuthenticated && user?.role === "admin" ? (
                <AdminUsers />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/bookings"
            element={
              isAuthenticated && user?.role === "admin" ? (
                <AdminBookings />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* 👥 Customer Routes */}
          <Route
            path="/customer/dashboard"
            element={
              isAuthenticated && user?.role === "customer" ? (
                <CustomerDashboard user={user} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/my-bookings"
            element={
              isAuthenticated && user?.role === "customer" ? (
                <MyBookings />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/my-profile"
            element={
              isAuthenticated && user?.role === "customer" ? (
                <MyProfile />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/services" element={<Services />} />
          <Route path="/services/domestic-shift" element={<DomesticShift />} />
          <Route path="/services/car-shift" element={<CarShift />} />
          <Route path="/services/house-shift" element={<HouseShift />} />
          <Route path="/services/office-shift" element={<OfficeShift />} />

          {/* 🌐 General Routes */}
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Login onLogin={handleLogin} />
              ) : (
                <Navigate to={getDashboardRedirect()} />
              )
            }
          />
          <Route path="/about" element={<AboutUs />} />

          {/* 🏠 Default Route - Redirect to Dashboard Based on Role */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to={getDashboardRedirect()} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* ❌ Fallback Route for 404 */}
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
