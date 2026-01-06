import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ExpenseList = ({ expenses, fetchExpenses, categories }) => {
  const { user } = useContext(AuthContext);
  const [editingId, setEditingId] = useState(null);
  const [editAmount, setEditAmount] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editType, setEditType] = useState("expense");
  const [loading, setLoading] = useState(false);

  if (!user) return <p>Loading user data...</p>;

  const startEdit = (expense) => {
    setEditingId(expense._id);
    setEditAmount(expense.amount);
    setEditCategory(expense.category?._id || expense.category || "");
    setEditType(expense.type);
  };

  const saveEdit = async () => {
    if (!user?.token) return;
    if (!editAmount || Number(editAmount) <= 0) {
      alert("Amount must be greater than 0");
      return;
    }
    setLoading(true);
    try {
      await axios.put(
        `http://localhost:5000/api/expenses/${editingId}`,
        { amount: editAmount, category: editCategory, type: editType },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setEditingId(null);
      fetchExpenses();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update expense");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!user?.token) return;
    if (!window.confirm("Are you sure you want to delete this expense?"))
      return;
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchExpenses();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete expense");
    }
  };

  const getCategoryName = (id) => {
    const cat = categories.find((c) => c._id === id);
    return cat ? cat.name : "No Category";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-3 border-b">Type</th>
            <th className="py-2 px-3 border-b">Amount</th>
            <th className="py-2 px-3 border-b">Category</th>
            <th className="py-2 px-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr
              key={expense._id}
              className="hover:bg-gray-50 transition duration-150"
            >
              {editingId === expense._id ? (
                <>
                  <td className="py-2 px-3 border-b">
                    <select
                      value={editType}
                      onChange={(e) => setEditType(e.target.value)}
                      className="px-2 py-1 border rounded-md focus:ring-1 focus:ring-indigo-400"
                    >
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                    </select>
                  </td>
                  <td className="py-2 px-3 border-b">
                    <input
                      type="number"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                      className="w-full px-2 py-1 border rounded-md focus:ring-1 focus:ring-indigo-400"
                    />
                  </td>
                  <td className="py-2 px-3 border-b">
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="px-2 py-1 border rounded-md focus:ring-1 focus:ring-indigo-400"
                    >
                      <option value="">No Category</option>
                      {categories.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 px-3 border-b flex space-x-2">
                    <button
                      onClick={saveEdit}
                      disabled={loading}
                      className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="py-2 px-3 border-b capitalize">
                    {expense.type}
                  </td>
                  <td className="py-2 px-3 border-b">${expense.amount}</td>
                  <td className="py-2 px-3 border-b">
                    {getCategoryName(expense.category?._id || expense.category)}
                  </td>
                  <td className="py-2 px-3 border-b flex space-x-2">
                    <button
                      onClick={() => startEdit(expense)}
                      className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(expense._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
