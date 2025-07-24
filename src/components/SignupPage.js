import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { useAuthStore } from "../stores/authStore";


const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    branch: "ECE",
    currentSemester: "",
    goal: "",
    otherGoal: "",
    leetcodeUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.password &&
      formData.dob &&
      formData.gender &&
      formData.branch &&
      formData.currentSemester &&
      formData.goal
    );
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
      goal: formData.goal.toUpperCase(), // 👈 Fix: Ensure goal is uppercase
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-purple-200">
      
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create your account</h2>

      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="input input-bordered w-full"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="input input-bordered w-full"
          autoComplete="email" // 👈 Enable past email suggestion
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="input input-bordered w-full"
        />

        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="">Select Gender</option>
          <option value="FEMALE">Female</option>
          <option value="MALE">Male</option>
          <option value="OTHER">Other</option>
        </select>

        <select
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="ECE">ECE</option>
        </select>

        <input
          type="number"
          name="currentSemester"
          value={formData.currentSemester}
          onChange={handleChange}
          placeholder="Current Semester"
          className="input input-bordered w-full"
        />

        <select
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="">Select Career Goal</option>
          <option value="placement">Placement</option>
          <option value="gate">GATE</option>
          <option value="cat">CAT</option>
          <option value="upsc">UPSC</option>
          <option value="others">Others</option>
        </select>

        {formData.goal === "others" && (
          <input
            type="text"
            name="otherGoal"
            value={formData.otherGoal}
            onChange={handleChange}
            placeholder="Specify your goal"
            className="input input-bordered w-full"
          />
        )}

        {(formData.goal === "placement" || formData.goal === "others") && (
          <input
            type="url"
            name="leetcodeUrl"
            value={formData.leetcodeUrl}
            onChange={handleChange}
            placeholder="LeetCode Profile URL (optional)"
            className="input input-bordered w-full"
          />
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-2">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 underline cursor-pointer"
          >
            Log in
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
