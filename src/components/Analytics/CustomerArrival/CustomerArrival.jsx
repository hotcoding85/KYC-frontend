import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CustomerArrival = () => {
  const data = {
    labels: Array.from({ length: 31 }, (_, i) => i + 1),
    datasets: [
      {
        label: "Customer Arrival",
        data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 600)),
        borderColor: "rgba(71, 120, 245, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        pointBorderColor: "rgba(54, 162, 235, 1)",
        pointBackgroundColor: "rgba(255, 255, 255, 1)",
        pointRadius: 4,
        pointHoverRadius: 5,
        borderWidth: 1, // Thinner line
        tension: 0.4,
        pointBorderWidth: 2, // Thickness of the border around points
        pointStyle: "circle", // Built-in star shape
      },
      {
        label: "Previous Month",
        data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 600)),
        pointStyle: "circle", // Built-in star shape
        borderColor: "rgba(145, 103, 199, 1)",

        backgroundColor: "rgba(153, 102, 255, 0.2)",
        pointBorderColor: "rgba(153, 102, 255, 1)",
        pointBackgroundColor: "rgba(255, 255, 255, 1)",
        pointRadius: 4,
        borderWidth: 1, // Thinner line
        pointHoverRadius: 5,
        tension: 0.4,
        pointBorderWidth: 2, // Thickness of the border around points
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
        ticks: {
          stepSize: 150,
        },
      },
    },
  };


  return (
    <div className="p-4 bg-white shadow-sm rounded-2xl">
      <h3 className="mb-4 text-sm font-semibold text-textBlack">Customer Arrival</h3>
      <div style={{ height: "300px" }}>
        <Line data={data} options={{ ...options, plugins: { ...options.plugins, legend: { display: false } } }} />
      </div>
    </div>
  );
};

export default CustomerArrival;
