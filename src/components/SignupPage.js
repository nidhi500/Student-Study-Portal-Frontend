import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    enrollmentNumber: "",
    branch: "",
    currentSemester: "",
    gender: "",
    goal: "",
    otherGoal: "",
    leetcodeUrl: "",
    githubUrl: "",
    skills: "",
    dateOfBirth: "", // Format: yyyy-MM-dd
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("https://student-study-portal-backend.onrender.com/api/auth/register", {
        ...formData,
        currentSemester: parseInt(formData.currentSemester), // convert string to int
        goal: formData.goal || "SOFTWARE_ENGINEER", // fallback if empty
      });

      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
          Create Account
        </h2>
        {error && <div className="text-red-600 text-sm mb-4 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required className="w-full px-4 py-2 border rounded-lg" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full px-4 py-2 border rounded-lg" />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="w-full px-4 py-2 border rounded-lg" />
          <input type="text" name="enrollmentNumber" value={formData.enrollmentNumber} onChange={handleChange} placeholder="Enrollment Number" required className="w-full px-4 py-2 border rounded-lg" />
          <input type="text" name="branch" value={formData.branch} onChange={handleChange} placeholder="Branch" required className="w-full px-4 py-2 border rounded-lg" />
          <input type="number" name="currentSemester" value={formData.currentSemester} onChange={handleChange} placeholder="Current Semester" required className="w-full px-4 py-2 border rounded-lg" />
          <input type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" required className="w-full px-4 py-2 border rounded-lg" />
          <input type="text" name="goal" value={formData.goal} onChange={handleChange} placeholder="Career Goal (e.g. SOFTWARE_ENGINEER)" required className="w-full px-4 py-2 border rounded-lg" />
          <input type="text" name="otherGoal" value={formData.otherGoal} onChange={handleChange} placeholder="Other Goal (Optional)" className="w-full px-4 py-2 border rounded-lg" />
          <input type="url" name="leetcodeUrl" value={formData.leetcodeUrl} onChange={handleChange} placeholder="Leetcode URL" className="w-full px-4 py-2 border rounded-lg" />
          <input type="url" name="githubUrl" value={formData.githubUrl} onChange={handleChange} placeholder="GitHub URL" className="w-full px-4 py-2 border rounded-lg" />
          <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills (e.g. Java, React)" className="w-full px-4 py-2 border rounded-lg" />
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />

          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition">
            Sign Up
          </button>
        </form>
        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline font-medium">Login</a>
        </p>
      </div>
    </div>
  );
}
