import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ActiveUsers = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Active Users",
        data: [10, 20, 15, 30, 25, 35, 30],
        borderColor: "#3B82F6", // Blue color
        borderWidth: 2,
        tension: 0.3,
        fill: false,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        display: false, // Hide the x-axis labels
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
          callback: function (value) {
            return value + "k"; // Adding "k" after the number
          },
        },
        grid: {
          drawBorder: false,
          color: "rgba(229, 231, 235, 0.5)", // Light gray grid lines
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
  };

  return (
    <div className=" bg-white p-6 rounded-2xl w-full lg:w-4/12 ">
      <div className="flex flex-col mb-4">
        <h2 className="text-lg text-textBlack font-semibold">Active Users</h2>
        <span className="text-success text-sm">(+23) than last week</span>
      </div>
      <div className="flex items-start">
        <div className="w-full h-32">
          <Line data={data} options={options} />
        </div>
      </div>
      <div className="mt-4">
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Users</span>
            <span className="font-semibold text-lg">32,984</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "70%" }}></div>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Clicks</span>
            <span className="font-semibold text-lg">2,42m</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "85%" }}></div>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Sales</span>
            <span className="font-semibold text-lg">2,400$</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "60%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveUsers;
