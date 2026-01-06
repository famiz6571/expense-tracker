import React, { useContext } from "react";
import { Pie, Doughnut, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  TimeScale,
} from "chart.js";
import { AuthContext } from "../context/AuthContext";
import "chartjs-adapter-date-fns";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  TimeScale
);

const MultiCharts = ({ expenses, categories }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <p>Loading charts...</p>;
  if (!categories) return <p>Loading categories...</p>;

  // 1️⃣ Pie & Doughnut: Expenses by category
  const categoryTotals = {};
  let totalIncome = 0;
  let totalExpense = 0;

  (expenses || []).forEach((expense) => {
    const categoryId =
      expense.category?._id || expense.category || "no_category";
    const categoryName =
      (categories || []).find((c) => c._id === categoryId)?.name ||
      "No Category";

    if (!categoryTotals[categoryName]) categoryTotals[categoryName] = 0;
    categoryTotals[categoryName] += Number(expense.amount);

    if (expense.type === "income") totalIncome += Number(expense.amount);
    else totalExpense += Number(expense.amount);
  });

  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#8A2BE2",
          "#00CED1",
          "#FF7F50",
          "#3CB371",
          "#FFD700",
        ],
      },
    ],
  };

  // 2️⃣ Bar Chart: Expense vs Income per category
  const barLabels = Object.keys(categoryTotals);
  const barData = {
    labels: barLabels,
    datasets: [
      {
        label: "Income",
        data: barLabels.map((cat) =>
          (expenses || [])
            .filter(
              (e) =>
                e.type === "income" &&
                (e.category?._id || e.category) ===
                  categories.find((c) => c.name === cat)?._id
            )
            .reduce((sum, e) => sum + Number(e.amount), 0)
        ),
        backgroundColor: "#36A2EB",
      },
      {
        label: "Expense",
        data: barLabels.map((cat) =>
          (expenses || [])
            .filter(
              (e) =>
                e.type === "expense" &&
                (e.category?._id || e.category) ===
                  categories.find((c) => c.name === cat)?._id
            )
            .reduce((sum, e) => sum + Number(e.amount), 0)
        ),
        backgroundColor: "#FF6384",
      },
    ],
  };

  // 3️⃣ Line Chart: Expenses over time
  const sortedExpenses = [...(expenses || [])].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const lineData = {
    labels: sortedExpenses.map((e) => new Date(e.date).toLocaleDateString()),
    datasets: [
      {
        label: "Expense Amount",
        data: sortedExpenses.map((e) =>
          e.type === "expense" ? Number(e.amount) : 0
        ),
        fill: false,
        borderColor: "#FF6384",
        tension: 0.3,
      },
      {
        label: "Income Amount",
        data: sortedExpenses.map((e) =>
          e.type === "income" ? Number(e.amount) : 0
        ),
        fill: false,
        borderColor: "#36A2EB",
        tension: 0.3,
      },
    ],
  };

  // 4️⃣ Doughnut Chart: Expense vs Income ratio
  const doughnutData = {
    labels: ["Expenses", "Income"],
    datasets: [
      {
        data: [totalExpense, totalIncome],
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: "bottom" } },
  };

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}
    >
      <div>
        <h3 style={{ textAlign: "center" }}>Expenses by Category</h3>
        <Pie data={pieData} options={options} />
      </div>

      <div>
        <h3 style={{ textAlign: "center" }}>Expense vs Income per Category</h3>
        <Bar data={barData} options={options} />
      </div>

      <div>
        <h3 style={{ textAlign: "center" }}>Expenses & Income Over Time</h3>
        <Line data={lineData} options={options} />
      </div>

      <div>
        <h3 style={{ textAlign: "center" }}>Expense vs Income Ratio</h3>
        <Doughnut data={doughnutData} options={options} />
      </div>
    </div>
  );
};

export default MultiCharts;
