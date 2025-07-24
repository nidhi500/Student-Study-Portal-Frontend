import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/authStore"; // assuming you use Zustand

const ProtectedRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user); // check Zustand store
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHydrated(true), 50); // give Zustand time to load
    return () => clearTimeout(timer);
  }, []);

  if (!hydrated) return null; // or show loading spinner

  if (!user) {
    console.log("🚫 Not logged in, redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
