import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const data = {
    labels: ["24 Oct", "", "", "Today"],
    datasets: [
      {
        label: "Successful",
        data: [0, 0, 0, 0],
        borderColor: "#5D5FEF",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: true,
          color: "#E5E7EB",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: "#E5E7EB",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="h-[150px] w-full">
      {" "}
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
