import React, { useContext } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { AuthContext } from "../context/AuthContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const Charts = ({ expenses, categories }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <p>Loading chart...</p>;
  if (!categories) return <p>Loading categories...</p>;

  const categoryTotals = {};

  (expenses || []).forEach((expense) => {
    const categoryId =
      expense.category?._id || expense.category || "no_category";
    const categoryName =
      (categories || []).find((c) => c._id === categoryId)?.name ||
      "No Category";

    if (!categoryTotals[categoryName]) categoryTotals[categoryName] = 0;
    categoryTotals[categoryName] += Number(expense.amount);
  });

  const data = {
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
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: window.innerWidth < 768 ? "bottom" : "right",
        labels: { boxWidth: 20, padding: 15 },
      },
      tooltip: { enabled: true },
    },
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h3 style={{ textAlign: "center" }}>Expenses by Category</h3>
      <Pie data={data} options={options} />
    </div>
  );
};

export default Charts;
