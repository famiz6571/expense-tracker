import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const CategoryForm = ({ fetchCategories }) => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Category name cannot be empty");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:5000/api/categories",
        { name: name.trim() },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setName("");
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 text-red-700 px-3 py-2 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* Category Name */}
      <div className="flex flex-col">
        <label className="mb-1 text-gray-700">
          Category Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter category"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Category"}
      </button>
    </form>
  );
};

export default CategoryForm;
