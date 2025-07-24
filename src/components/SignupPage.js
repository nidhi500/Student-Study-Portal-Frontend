import React, { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loader from "./Loader";

function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    enrollmentNumber: "", // changed from "enrollment"
    branch: "",
    currentSemester: "", // changed from "semester"
    dateOfBirth: "", // changed from "dob"
    gender: "",
    goal: "",
    otherGoal: "",
    leetcodeUrl: "", // changed from "leetcode"
    githubUrl: "", // changed from "github"
    skills: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    const {
      name, email, password, enrollmentNumber, branch,
      currentSemester, dateOfBirth, gender, goal, otherGoal, leetcodeUrl, githubUrl, skills,
    } = formData;

    if (!name || !email || !password || !enrollmentNumber || !branch || !currentSemester || !dateOfBirth || !gender || !goal)
      return false;

    if (goal === "OTHERS" && !otherGoal) return false;
    if (goal === "PLACEMENT" && (!leetcodeUrl || !githubUrl || !skills)) return false;

    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!isFormValid()) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);

    const requestBody = {
      ...formData,
      currentSemester: parseInt(formData.currentSemester),
    };

    try {
      const res = await API.post("/api/auth/register", requestBody);

      const { token, name, email: userEmail, branch, currentSemester } = res.data;
      const user = { name, email: userEmail, branch, currentSemester };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      useAuthStore.getState().setUser(user, token);

      navigate("/dashboard");
    } catch (err) {
      const message =
        err.response?.data?.message || err.response?.data?.error || "Signup failed";

      if (message.toLowerCase().includes("email already exists")) {
        setError("Email already exists. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2500);
      } else {
        setError("Signup failed: " + message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader message="Creating your account..." />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />

          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg pr-10"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <input type="text" name="enrollmentNumber" placeholder="Enrollment Number" required value={formData.enrollmentNumber} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />

          <div className="flex gap-4">
            <select name="branch" value={formData.branch} onChange={handleChange} className="w-1/2 px-4 py-2 border rounded-lg" required>
              <option value="">Select Branch</option>
              <option value="ECE">ECE</option>
              <option value="IT">IT</option>
            </select>
            <select name="currentSemester" value={formData.currentSemester} onChange={handleChange} className="w-1/2 px-4 py-2 border rounded-lg" required>
              <option value="">Select Semester</option>
              {[3, 4, 5, 6].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />

          <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg">
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <select name="goal" value={formData.goal} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg">
            <option value="">Select Goal</option>
            <option value="PLACEMENT">Placement</option>
            <option value="UPSC">UPSC</option>
            <option value="GATE">GATE</option>
            <option value="CAT">CAT</option>
            <option value="OTHERS">Others</option>
          </select>

          {formData.goal === "OTHERS" && (
            <input type="text" name="otherGoal" placeholder="Please specify" value={formData.otherGoal} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
          )}

          {formData.goal === "PLACEMENT" && (
            <>
              <input type="url" name="leetcodeUrl" placeholder="LeetCode URL" value={formData.leetcodeUrl} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
              <input type="url" name="githubUrl" placeholder="GitHub URL" value={formData.githubUrl} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
              <input type="text" name="skills" placeholder="Skills (comma separated)" value={formData.skills} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
            </>
          )}

          <button type="submit" disabled={loading} className={`w-full ${loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"} text-white py-2 rounded-lg transition`}>
            {loading ? "Registering..." : "Sign Up"}
          </button>

          {error && <p className="text-red-600 text-sm text-center mt-2">{error}</p>}
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
