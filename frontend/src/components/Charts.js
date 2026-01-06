import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const Charts = ({ expenses }) => {
  const expenseData = expenses.filter((e) => e.type === "expense");
  const categories = [
    ...new Set(expenseData.map((e) => e.category?.name || "Uncategorized")),
  ];
  const amounts = categories.map((c) =>
    expenseData
      .filter((e) => e.category?.name === c)
      .reduce((a, b) => a + b.amount, 0)
  );

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Expenses by Category",
        data: amounts,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  return (
    <div>
      <h3>Expenses Chart</h3>
      <Pie
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: { position: window.innerWidth < 768 ? "bottom" : "right" },
          },
        }}
      />
    </div>
  );
};

export default Charts;
