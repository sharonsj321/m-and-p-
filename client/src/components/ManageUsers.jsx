import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL; // ✅ Import API URL from .env

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  // Fetch all users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token being sent:", token); // ✅ Debugging

      const response = await axios.get(`${API_BASE_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API Response:", response.data); // ✅ Debugging

      if (response.data && Array.isArray(response.data.users)) {
        setUsers(response.data.users);
      } else {
        console.error("Unexpected API response:", response.data);
        setUsers([]); // Ensure it's always an array
      }
    } catch (error) {
      console.error("Error fetching users:", error.message);
      setError("Failed to fetch users.");
    }
  };

  // Delete a user
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${API_BASE_URL}/admin/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchUsers(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting user:", error.message);
      }
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Manage Users</h2>

      {error && <p className="text-danger">{error}</p>}

      {users.length === 0 ? (
        <p className="text-center">No users found.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ManageUsers;
