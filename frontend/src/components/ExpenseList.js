import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ExpenseList = ({ expenses, fetchExpenses, categories }) => {
  const { user } = useContext(AuthContext);
  const [editingId, setEditingId] = useState(null);
  const [editAmount, setEditAmount] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editType, setEditType] = useState("expense");

  if (!user) return <p>Loading user data...</p>; // safeguard

  const startEdit = (expense) => {
    setEditingId(expense._id);
    setEditAmount(expense.amount);
    setEditCategory(expense.category?._id || expense.category || "");
    setEditType(expense.type);
  };

  const saveEdit = async () => {
    if (!user?.token) return;
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
    <ul>
      {expenses.map((expense) => (
        <li key={expense._id} style={{ marginBottom: "10px" }}>
          {editingId === expense._id ? (
            <>
              <input
                type="number"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
                style={{ width: "80px", marginRight: "5px" }}
              />
              <select
                value={editType}
                onChange={(e) => setEditType(e.target.value)}
                style={{ marginRight: "5px" }}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                style={{ marginRight: "5px" }}
              >
                <option value="">No Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <button onClick={saveEdit} style={{ marginRight: "5px" }}>
                Save
              </button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              {expense.type}: ${expense.amount} |{" "}
              {getCategoryName(expense.category?._id || expense.category)}
              <button
                onClick={() => startEdit(expense)}
                style={{ marginLeft: "10px", marginRight: "5px" }}
              >
                Edit
              </button>
              <button onClick={() => handleDelete(expense._id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
