import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Create Domestic Shift
export const createShift = async (data, token) => {
  const response = await axios.post(`${API_URL}/domestic-shifts`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Get All Shifts
export const getAllShifts = async (token) => {
  const response = await axios.get(`${API_URL}/domestic-shifts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Get Shift by ID
export const getShiftById = async (id, token) => {
  const response = await axios.get(`${API_URL}/domestic-shifts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update Shift
export const updateShift = async (id, data, token) => {
  const response = await axios.put(`${API_URL}/domestic-shifts/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Delete Shift
export const deleteShift = async (id, token) => {
  const response = await axios.delete(`${API_URL}/domestic-shifts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
