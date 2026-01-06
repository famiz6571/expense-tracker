import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const CategoryList = ({ categories, fetchCategories }) => {
  const { user } = useContext(AuthContext);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) return <p className="text-gray-500">Loading user data...</p>;

  const startEdit = (category) => {
    setEditingId(category._id);
    setEditName(category.name);
  };

  const saveEdit = async () => {
    if (!editName.trim()) {
      alert("Category name cannot be empty");
      return;
    }

    setLoading(true);
    try {
      await axios.put(
        `http://localhost:5000/api/categories/${editingId}`,
        { name: editName.trim() },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
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
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left py-2 px-3 border-b">Category Name</th>
            <th className="text-left py-2 px-3 border-b">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((c) => (
            <tr
              key={c._id}
              className="hover:bg-gray-50 transition duration-150"
            >
              {editingId === c._id ? (
                <>
                  <td className="py-2 px-3 border-b">
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-3 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400"
                    />
                  </td>
                  <td className="py-2 px-3 border-b space-x-2">
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
                  <td className="py-2 px-3 border-b font-medium text-gray-700">
                    {c.name}
                  </td>
                  <td className="py-2 px-3 border-b space-x-2">
                    <button
                      onClick={() => startEdit(c)}
                      className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}

          {categories.length === 0 && (
            <tr>
              <td colSpan="2" className="text-center py-4 text-gray-500">
                No categories added yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
