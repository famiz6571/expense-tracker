// CategoryForm.js
import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const CategoryForm = ({ fetchCategories }) => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:5000/api/categories",
      { name },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    setName("");
    fetchCategories();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Category</h3>
      <input
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default CategoryForm;
