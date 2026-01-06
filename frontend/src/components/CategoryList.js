import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const CategoryList = ({ categories, fetchCategories }) => {
  const { user } = useContext(AuthContext);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  if (!user) return <p>Loading user data...</p>;

  const startEdit = (c) => {
    setEditingId(c._id);
    setEditName(c.name);
  };

  const saveEdit = async () => {
    if (!user?.token) return;
    try {
      await axios.put(
        `http://localhost:5000/api/categories/${editingId}`,
        { name: editName },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update category");
    }
  };

  const handleDelete = async (id) => {
    if (!user?.token) return;
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete category");
    }
  };

  return (
    <ul>
      {categories.map((c) => (
        <li key={c._id} style={{ marginBottom: "8px" }}>
          {editingId === c._id ? (
            <>
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                style={{ marginRight: "5px" }}
              />
              <button onClick={saveEdit} style={{ marginRight: "5px" }}>
                Save
              </button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              {c.name}
              <button
                onClick={() => startEdit(c)}
                style={{ marginLeft: "10px", marginRight: "5px" }}
              >
                Edit
              </button>
              <button onClick={() => handleDelete(c._id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
