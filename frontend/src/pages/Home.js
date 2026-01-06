import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import CategoryForm from "../components/CategoryForm";
import CategoryList from "../components/CategoryList";
import MultiCharts from "../components/MultiCharts";
import GlassCard from "../components/GlassCard";

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
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center md:text-left">
        Dashboard
      </h1>

      {/* Forms Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <GlassCard title="Add Expense">
          <ExpenseForm fetchExpenses={fetchExpenses} categories={categories} />
        </GlassCard>

        <GlassCard title="Add Category">
          <CategoryForm fetchCategories={fetchCategories} />
        </GlassCard>
      </div>

      {/* Lists Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <GlassCard title="Expenses" className="overflow-x-auto">
          <ExpenseList
            expenses={expenses}
            fetchExpenses={fetchExpenses}
            categories={categories}
          />
        </GlassCard>

        <GlassCard title="Categories" className="overflow-x-auto">
          <CategoryList
            categories={categories}
            fetchCategories={fetchCategories}
          />
        </GlassCard>
      </div>

      {/* Charts Section */}
      <GlassCard title="Statistics">
        <MultiCharts expenses={expenses} categories={categories} />
      </GlassCard>
    </div>
  );
};

export default Home;
