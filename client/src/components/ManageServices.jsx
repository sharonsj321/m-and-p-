import React, { useState, useEffect } from "react";
import { Container, Table, Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL; // ✅ Import API URL from .env

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [show, setShow] = useState(false);
  const [serviceData, setServiceData] = useState({
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    fetchServices();
  }, []);

  // ✅ Fetch all services
  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/services`);
      console.log("API Response:", response.data); // ✅ Debug to verify response structure

      // Check if response.data contains services array
      if (response.data && Array.isArray(response.data.services)) {
        setServices(response.data.services);
      } else {
        console.error("Unexpected API response:", response.data);
        setServices([]); // Fallback to empty array if data is invalid
      }
    } catch (error) {
      console.error("Error fetching services:", error.message);
    }
  };

  // ✅ Handle form input change
  const handleChange = (e) => {
    setServiceData({ ...serviceData, [e.target.name]: e.target.value });
  };

  // ✅ Add or Update Service
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (serviceData._id) {
        // ✅ Update existing service
        await axios.put
          (`${API_BASE_URL}/admin/services/${serviceData._id}`,
          serviceData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // ✅ Create new service
        await axios.post(`${API_BASE_URL}/admin/services`, serviceData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      // ✅ Close modal after submission
      handleClose();
      fetchServices(); // Refresh service list after adding/updating
    } catch (error) {
      console.error("Error saving service:", error.message);
    }
  };

  // ✅ Delete Service
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${API_BASE_URL}/admin/services/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchServices();
      } catch (error) {
        console.error("Error deleting service:", error.message);
      }
    }
  };

  // ✅ Reset form and close modal
  const handleClose = () => {
    setShow(false);
    setServiceData({ name: "", description: "", price: "" });
  };

  // ✅ Open modal and optionally set service for editing
  const handleShow = (service = null) => {
    if (service) {
      setServiceData(service);
    } else {
      setServiceData({ name: "", description: "", price: "" });
    }
    setShow(true);
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Manage Services</h2>

      <Button variant="primary" onClick={() => handleShow()}>
        ➕ Add Service
      </Button>

      {/* ✅ Services Table */}
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Service Name</th>
            <th>Description</th>
            <th>Price (INR)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {services.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No services found.
              </td>
            </tr>
          ) : (
            services.map((service) => (
              <tr key={service._id}>
                <td>{service._id}</td>
                <td>{service.name}</td>
                <td>{service.description}</td>
                <td>₹ {service.price}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleShow(service)}
                  >
                    ✏️ Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(service._id)}
                  >
                    ❌ Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* ✅ Add/Edit Service Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{serviceData._id ? "Edit" : "Add"} Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Service Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={serviceData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={serviceData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price (INR)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={serviceData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {serviceData._id ? "Update" : "Add"} Service
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ManageServices;
