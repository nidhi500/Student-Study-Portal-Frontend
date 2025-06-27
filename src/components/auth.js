// src/services/auth.js
import API from "../api";
import { useAuthStore } from "../stores/authStore";

export const login = async (email, password) => {
  const response = await API.post("/api/auth/login", {
    email,
    password,
  });

  const user = response.data;
  useAuthStore.getState().setUser(user);
};

export const register = async (name, email, password) => {
  const response = await API.post("/api/auth/register", {
    name,
    email,
    password,
  });

  const user = response.data;
  useAuthStore.getState().setUser(user);
};
