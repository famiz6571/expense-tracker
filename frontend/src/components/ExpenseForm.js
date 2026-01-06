import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ExpenseForm = ({ fetchExpenses, categories }) => {
  const { user } = useContext(AuthContext);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!amount || Number(amount) <= 0) {
      setError("Amount must be greater than 0");
      return;
    }
    if (!category) {
      setError("Please select a category");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:5000/api/expenses",
        { amount, type, category, description: desc },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setAmount("");
      setDesc("");
      setCategory("");
      fetchExpenses();
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

      {/* Amount */}
      <div className="flex flex-col">
        <label className="mb-1 text-gray-700">
          Amount <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Type */}
      <div className="flex flex-col">
        <label className="mb-1 text-gray-700">
          Type <span className="text-red-500">*</span>
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      {/* Category */}
      <div className="flex flex-col">
        <label className="mb-1 text-gray-700">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label className="mb-1 text-gray-700">Description</label>
        <input
          type="text"
          placeholder="Optional"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
};

export default ExpenseForm;
