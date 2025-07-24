import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    branch: "",
    currentSemester: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { name, email, password, branch, currentSemester } = formData;
    const requestBody = {
      name,
      email,
      password,
      branch,
      currentSemester,
    };

    console.log("📦 Signup Payload:", requestBody);

    try {
      const res = await axios.post(
        "https://student-study-portal-backend.onrender.com/api/auth/register",
        requestBody
      );
      console.log("✅ Signup Success:", res.data);
      setLoading(false);
      navigate("/login");
    } catch (err) {
      console.error("❌ Signup Error:", err.response?.data || err.message);
      setErrorMsg(err.response?.data?.message || "Signup failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Create Account</h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Full Name"
          className="w-full px-4 py-2 border rounded-md"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Email Address"
          className="w-full px-4 py-2 border rounded-md"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-md"
        />

        <input
          type="text"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          required
          placeholder="Branch (e.g., ECE)"
          className="w-full px-4 py-2 border rounded-md"
        />

        <input
          type="text"
          name="currentSemester"
          value={formData.currentSemester}
          onChange={handleChange}
          required
          placeholder="Current Semester (e.g., 3)"
          className="w-full px-4 py-2 border rounded-md"
        />

        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
