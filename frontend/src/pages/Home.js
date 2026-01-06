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
  }, []);

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="forms">
        <ExpenseForm fetchExpenses={fetchExpenses} categories={categories} />
        <CategoryForm fetchCategories={fetchCategories} />
      </div>
      <div className="lists">
        <ExpenseList
          expenses={expenses}
          fetchExpenses={fetchExpenses}
          categories={categories}
        />
        <CategoryList
          categories={categories}
          fetchCategories={fetchCategories}
        />
      </div>
      <MultiCharts expenses={expenses} categories={categories} />
    </div>
  );
};

export default Home;
