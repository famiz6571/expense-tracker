import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import FormInput from "./FormInput";
import CustomDropdown from "./CustomDropdown";
import FormButton from "./FormButton";

const ExpenseForm = ({ fetchExpenses, categories }) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    amount: "",
    type: "expense",
    category: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error on change
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.amount || Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/expenses", formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      // Reset form
      setFormData({
        amount: "",
        type: "expense",
        category: "",
        description: "",
      });
      setErrors({});
      fetchExpenses();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Amount */}
      <FormInput
        required
        label="Amount"
        type="number"
        placeholder="Enter amount"
        value={formData.amount}
        onChange={(e) => handleChange("amount", e.target.value)}
        error={errors.amount}
        name={"amount"}
      />

      {/* Category */}
      <CustomDropdown
        label="Category"
        required
        value={formData.category}
        onChange={(e) => handleChange("category", e.target.value)}
        options={categories.map((c) => ({ value: c._id, label: c.name }))}
        placeholder="Select category"
        error={errors.category}
      />

      {/* Type */}
      <CustomDropdown
        label="Type"
        value={formData.type}
        onChange={(e) => handleChange("type", e.target.value)}
        options={[
          { value: "expense", label: "Expense" },
          { value: "income", label: "Income" },
        ]}
      />

      {/* Description */}
      <FormInput
        label="Description"
        type="text"
        placeholder="Optional"
        value={formData.description}
        onChange={(e) => handleChange("description", e.target.value)}
        name={"description"}
      />

      {/* Submit Button */}
      <FormButton loading={loading}>Add Expense</FormButton>
    </form>
  );
};

export default ExpenseForm;
