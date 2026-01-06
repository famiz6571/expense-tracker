import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import CategoryForm from "../components/CategoryForm";
import CategoryList from "../components/CategoryList";
import MultiCharts from "../components/MultiCharts";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchExpenses = async () => {
    const res = await axios.get("http://localhost:5000/api/expenses", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setExpenses(res.data);
  };

  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:5000/api/categories", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setCategories(res.data);
  };

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []); // Added empty dependency array to avoid continuous fetching

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center md:text-left">
        Dashboard
      </h1>

      {/* Forms Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Add Expense
          </h2>
          <ExpenseForm fetchExpenses={fetchExpenses} categories={categories} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Add Category
          </h2>
          <CategoryForm fetchCategories={fetchCategories} />
        </div>
      </div>

      {/* Lists Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Expenses</h2>
          <ExpenseList
            expenses={expenses}
            fetchExpenses={fetchExpenses}
            categories={categories}
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Categories
          </h2>
          <CategoryList
            categories={categories}
            fetchCategories={fetchCategories}
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Statistics</h2>
        <MultiCharts expenses={expenses} categories={categories} />
      </div>
    </div>
  );
};

export default Home;
