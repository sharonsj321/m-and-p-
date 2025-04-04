// src/services/userService.js
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/admin/users`; // ✅ Use environment variable

// ✅ Fetch All Users
export const getAllUsers = async (token) => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
};
