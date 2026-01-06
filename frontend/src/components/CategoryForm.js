import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import FormInput from "./FormInput";
import FormButton from "./FormButton";

const CategoryForm = ({ fetchCategories }) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: "" });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // clear error on change
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Category name cannot be empty";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/categories",
        { name: formData.name.trim() },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setFormData({ name: "" });
      fetchCategories();
    } catch (err) {
      setFormErrors({
        api: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* API or general error */}
      {formErrors.api && (
        <div className="bg-red-100 text-red-700 px-3 py-2 rounded-md text-sm">
          {formErrors.api}
        </div>
      )}

      <FormInput
        label="Category Name"
        name="name"
        placeholder="Enter category"
        value={formData.name}
        onChange={handleChange}
        required
        error={formErrors.name}
      />
      <FormButton loading={loading}>Add Category</FormButton>
    </form>
  );
};

export default CategoryForm;
