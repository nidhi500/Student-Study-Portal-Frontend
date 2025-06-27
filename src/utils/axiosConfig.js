// src/utils/axiosConfig.js
import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const apiClient = axios.create({
  baseURL: "https://student-study-portal-backend.onrender.com",
  withCredentials: false, // Keep as false unless you use cookies
});

// ✅ Automatically attach token from Zustand
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
