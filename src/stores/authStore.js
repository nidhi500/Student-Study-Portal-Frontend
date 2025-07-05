// src/stores/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      setUser: (user, token) => set({ user, token }),

      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage", // Key in localStorage
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);
