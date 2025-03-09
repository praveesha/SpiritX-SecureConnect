import axios from "axios";

const API_URL = "http://localhost:5001/api/auth"; // Backend URL

export const signUp = async (data: { username: string; password: string; confirmPassword: string }) => {
  return await axios.post(`${API_URL}/signup`, data);
};

export const signIn = async (data: { username: string; password: string }) => {
  return await axios.post(`${API_URL}/login`, data);
};

export const fetchUserProfile = async (token: string) => {
  return await axios.get(`${API_URL}/user/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
