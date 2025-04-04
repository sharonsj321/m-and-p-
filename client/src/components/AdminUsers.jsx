// src/components/AdminUsers.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spinner, Alert, Button, Modal, Form } from "react-bootstrap";

const API_BASE_URL = import.meta.env.VITE_API_URL; // ✅ Import from VITE env


// ✅ Correctly initialize users as an empty array
const AdminUsers = () => {
  const [users, setUsers] = useState([]); // ✅ Array for users
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const [error, setError] = useState(""); // ✅ Error state
  const [showModal, setShowModal] = useState(false); // ✅ Modal for editing
  const [currentUser, setCurrentUser] = useState(null); // ✅ Store selected user for edit
  const [updatedData, setUpdatedData] = useState({
    name: "",
    role: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Fetch All Users
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // Get admin token
      const response = await axios.get(`${API_BASE_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API Response:", response.data); // ✅ Debugging

      if (response.data.success && Array.isArray(response.data.data)) {
        setUsers(response.data.data || []); // ✅ Set users
      } else {
        setUsers([]); // Fallback to empty array
        setError("No users found.");
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err.response?.data || err.message);
      setUsers([]);
      setError("Failed to load users.");
      setLoading(false);
    }
  };

  // ✅ Open Edit Modal
  const handleEdit = (user) => {
    setCurrentUser(user);
    setUpdatedData({
      name: user.name,
      role: user.role,
    });
    setShowModal(true);
  };

  // ✅ Handle Save Changes for Edit
  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:7000/api/admin/users/${currentUser._id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setShowModal(false);
        fetchUsers(); // ✅ Refresh user list after update
      }
    } catch (err) {
      console.error("Error updating user:", err.response?.data || err.message);
      setError("Failed to update user.");
    }
  };

  // ✅ Delete User
  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(
          `http://localhost:7000/api/admin/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          fetchUsers(); // ✅ Refresh after delete
        }
      } catch (err) {
        console.error("Error deleting user:", err.response?.data || err.message);
        setError("Failed to delete user.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">👥 Admin - User List</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <p>Loading...</p>
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="bg-primary text-white">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(user)}
                    >
                      ✏️ Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(user._id)}
                    >
                      ❌ Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      {/* ✅ Edit User Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* ✅ Name Field */}
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={updatedData.name}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, name: e.target.value })
                }
              />
            </Form.Group>

            {/* ✅ Role Field */}
            <Form.Group className="mb-3" controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={updatedData.role}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, role: e.target.value })
                }
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="seller">Seller</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminUsers;
