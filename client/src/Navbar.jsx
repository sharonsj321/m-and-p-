import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { NavDropdown, Button } from "react-bootstrap";

function CustomNavbar({ user, onLogout }) {
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    onLogout(); // Clear user state in parent
    navigate("/login");
  };

  return (
    <>
      {/* Navbar for Admin */}
      {user?.role === "admin" && (
  <Navbar bg="dark" variant="dark" expand="lg" className="mb-3 shadow-sm">
    <Container>
      {/* Navbar Brand */}
      <Navbar.Brand as={Link} to="/admin/dashboard" className="fw-bold text-white">
        🛡️ M&P Admin
      </Navbar.Brand>
      
      {/* Navbar Toggle for Small Screens */}
      <Navbar.Toggle aria-controls="admin-navbar" />
      
      <Navbar.Collapse id="admin-navbar">
        <Nav className="me-auto">
          {/* Admin Dashboard Link */}
          <Nav.Link as={Link} to="/admin/dashboard" className="text-light">
            Home
          </Nav.Link>

          {/* Users Management Link */}
          <Nav.Link as={Link} to="/admin/users" className="text-light">
            Users
          </Nav.Link>

          {/* Services Management Link */}
          <Nav.Link as={Link} to="/admin/manage-services" className="text-light">
            Services
          </Nav.Link>

          {/* Booking Details Link */}
          <Nav.Link as={Link} to="/admin/bookings" className="text-light">
            Booking Details
          </Nav.Link>
        </Nav>

        {/* Logout Button */}
        <Button onClick={handleLogout} variant="outline-light" className="ms-3">
          Logout
        </Button>
      </Navbar.Collapse>
    </Container>
  </Navbar>
)}


      {/* Navbar for Customers */}
      {user?.role?.toLowerCase() === "customer" && (
        <Navbar
          bg="primary"
          variant="dark"
          expand="lg"
          className="mb-3 shadow-lg"
        >
          <Container>
            <Navbar.Brand as={Link} to="/" className="fw-bold text-white">
              🚚 Movers and Packers
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="customer-navbar" />
            <Navbar.Collapse id="customer-navbar">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/customer/dashboard" className="text-white">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/about" className="text-white">
                  About Us
                </Nav.Link>

                {/* Services Dropdown */}
                <NavDropdown title={<span className="text-white">🛠️ Services</span>} id="services-dropdown">
                <NavDropdown.Item as={Link} to="/services/domestic-shift">
                    🏡 Domestic Shifting
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/services/car-shift">
                    🚗 Car Shifting
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/services/house-shift">
                    🏠 House Shifting
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/services/office-shift">
                    🏢 Office Shifting
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link as={Link} to="/my-bookings" className="text-white">
                  📅 My Bookings
                </Nav.Link>
                <Nav.Link as={Link} to="/my-profile" className="text-white">
                  👤 My Profile
                </Nav.Link>
              </Nav>

              {/* User Profile Dropdown or Login Button */}
              {user ? (
                <Nav>
                <NavDropdown
  title={<span className="text-white">👋 {user.name}</span>}
  id="user-dropdown"
  align="end"
>

                    <NavDropdown.Item onClick={handleLogout}>
                      🚪 Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              ) : (
                <Nav>
                  <Nav.Link as={Link} to="/login" className="text-white">
                    🔐 Login
                  </Nav.Link>
                </Nav>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
}

export default CustomNavbar;
