import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import Loader from "./Loader";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await API.post("/api/auth/login", { email, password });

      const {
        token,
        name,
        email: userEmail,
        branch,
        currentSemester,
        goal
      } = response.data;

      const user = { name, email: userEmail, branch, currentSemester, goal };
      useAuthStore.getState().setUser(user, token);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  if (loading) return <Loader message="Logging you in..." />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
          Welcome Back
        </h2>
        {error && (
          <div className="text-red-600 text-sm mb-4 text-center">{error}</div>
        )}
        <form onSubmit={handleLogin} className="space-y-5">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full px-4 py-2 border rounded-lg" />
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-2 border rounded-lg" />
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition">
            Login
          </button>
        </form>
        <p className="text-sm text-gray-500 text-center mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-indigo-600 hover:underline font-medium">Sign up</a>
        </p>
      </div>
    </div>
  );
}
