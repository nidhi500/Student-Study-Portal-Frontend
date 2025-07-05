import React, { useState, useEffect } from "react";
import api from "../utils/axiosConfig";
import CommentSection from "../components/CommentSection";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function extractFileId(url) {
  const match = url.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{10,})/);
  return match ? match[1] : null;
}

const ContributePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    subject: "",
    visibility: "",
    url: "",
  });

  const [contributions, setContributions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/api/contributions/my")
      .then((res) => setContributions(res.data))
      .catch((err) => {
        console.error("GET contributions error:", err);
        alert("❌ Failed to fetch contributions");
      });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidDrive = /^https:\/\/drive\.google\.com\/(?:file\/d\/|open\?id=)/.test(formData.url);
    if (!isValidDrive) {
      alert("❌ Invalid Google Drive link");
      return;
    }

    try {
      await api.post("/api/contributions/add", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("✅ Contribution submitted");
      setFormData({
        title: "",
        description: "",
        type: "",
        subject: "",
        visibility: "",
        url: "",
      });

      const res = await api.get("/api/contributions/my");
      setContributions(res.data);
    } catch (err) {
      console.error("POST contribution error:", err);
      alert("❌ Submission failed");
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto min-h-screen bg-gray-50">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/profile")}
        className="mb-6 inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium"
      >
        <ArrowLeft size={18} />
        Back to Profile
      </button>

      {/* 📤 Contribution Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 sm:p-6 rounded-xl shadow-md space-y-4 border"
      >
        <h2 className="text-2xl font-semibold text-indigo-700 mb-2">📤 Contribute Resource</h2>

        <input
          className="w-full p-3 border rounded-md"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          className="w-full p-3 border rounded-md"
          name="description"
          placeholder="Description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="p-3 border rounded-md w-full"
          >
            <option value="">Select Type</option>
            <option value="NOTES">Notes</option>
            <option value="VIDEO">Video</option>
            <option value="LINK">Link</option>
          </select>

          <input
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="p-3 border rounded-md w-full"
          />

          <select
            name="visibility"
            value={formData.visibility}
            onChange={handleChange}
            required
            className="p-3 border rounded-md w-full"
          >
            <option value="">Select Visibility</option>
            <option value="PUBLIC">Public</option>
            <option value="PRIVATE">Private</option>
          </select>
        </div>

        <input
          type="url"
          name="url"
          placeholder="Google Drive Link"
          value={formData.url}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md"
        />

        <button
          type="submit"
          className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Submit
        </button>
      </form>

      {/* 🧾 Contributions List */}
      <div className="mt-10 space-y-6">
        <h3 className="text-xl font-semibold text-indigo-700">🧾 Your Contributions</h3>

        {contributions.length === 0 ? (
          <p className="text-gray-500">No contributions yet.</p>
        ) : (
          contributions.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md p-5 border space-y-2"
            >
              <h4 className="text-lg font-bold text-indigo-800">{item.title}</h4>
              <p className="text-sm text-gray-700">{item.description}</p>
              <iframe
                className="w-full h-64 rounded border"
                src={`https://drive.google.com/file/d/${extractFileId(item.url)}/preview`}
                allow="autoplay"
                title={item.title}
              />
              <CommentSection contextType="CONTRIBUTION" contextId={item.id} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContributePage;
