import axios from "axios";

const API_URL = "http://localhost:7000/api/domestic";

export const createDomesticShifting = async (data) =>
  await axios.post(API_URL, data);

export const getDomesticShiftings = async () => await axios.get(API_URL);

export const getDomesticShiftingById = async (id) =>
  await axios.get(`${API_URL}/${id}`);

export const updateDomesticShifting = async (id, data) =>
  await axios.put(`${API_URL}/${id}`, data);

export const deleteDomesticShifting = async (id) =>
  await axios.delete(`${API_URL}/${id}`);
