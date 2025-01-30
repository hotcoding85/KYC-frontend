import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaUsers } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TotalCustomers = () => {
  const data = {
    labels: ["12 AM", "6 AM", "12 PM", "3 PM", "6 PM", "8 PM"],
    datasets: [
      {
        label: "Today",
        data: [10, 30, 20, 40, 60, 70],
        borderColor: "rgba(71, 120, 245, 1)",
        backgroundColor: "rgba(255, 255, 235, 0.1)",
        fill: false,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        pointBorderColor: "rgba(54, 162, 235, 1)",
      },
      {
        label: "Yesterday",
        data: [20, 40, 50, 30, 40, 50],
        borderColor: "rgba(230, 72, 61, 1)",
        backgroundColor: "rgba(255, 255, 132, 0.1)",
        fill: false,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          usePointStyle: true,
          boxWidth: 8,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: false,
        display: false,
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
    },
  };

  return (
    <div className="w-full h-full p-4 bg-white border shadow-sm rounded-2xl border-primary50">
      <div className="flex items-center mb-2">
        <h2 className="text-sm font-semibold text-textBlack">
          Total customers
        </h2>
      </div>
      <div className="mb-4 text-lg font-semibold">566</div>
      <div className="flex gap-1 mb-2">
        <div className="flex items-center px-2 py-1 bg-lightGrey rounded-[10px] text-xs">
          <span className="w-2.5 h-2.5 bg-blue-500 rounded-full inline-block mr-2"></span>
          <span>Today</span>
        </div>
        <div className="flex items-center px-2 py-1 bg-lightGrey rounded-[10px] text-xs">
          <span className="w-2.5 h-2.5 bg-red-500 rounded-full inline-block mr-2"></span>
          <span>Yesterday</span>
        </div>
      </div>
      <div className="h-64">
        <Line
          data={data}
          options={{
            ...options,
            plugins: { ...options.plugins, legend: { display: false } },
          }}
        />
      </div>
    </div>
  );
};

export default TotalCustomers;
