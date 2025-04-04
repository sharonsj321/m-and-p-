import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminBookings from "./AdminBookings";

const AdminDashboard = () => {
  return (
    <Container fluid className="mt-5">
      <h1 className="text-center mb-4">🏢 Admin Dashboard</h1>
      <Row className="justify-content-center">
        <Col md={4}>
          <Link to="/admin/users" style={{ textDecoration: "none" }}>
            <Card className="shadow-sm mb-3">
              <Card.Body>
                <Card.Title>Manage Users</Card.Title>
                <Card.Text>View and manage all registered users.</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/admin/manage-services" style={{ textDecoration: "none" }}>
            <Card className="shadow-sm mb-3">
              <Card.Body>
                <Card.Title>Manage Services</Card.Title>
                <Card.Text>Add, edit, or delete services offered.</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        
      </Row>
    </Container>
  );
};

export default AdminDashboard;
