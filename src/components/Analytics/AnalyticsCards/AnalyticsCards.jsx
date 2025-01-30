import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

const AnalyticsCards = () => {
  // Data for the line graphs
  const lineChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Online Visitors",
        data: [800, 900, 700, 1100, 1000, 1200, 1234], // Replace with your data
        fill: true,
        borderColor: "#16a34a",
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return "rgba(34, 197, 94, 0.1)";
          }
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(34, 197, 94, 0.1)");
          gradient.addColorStop(1, "rgba(34, 197, 94, 0)");

          return gradient;
        },
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
      },
      {
        label: "Inflow",
        data: [120, 115, 110, 100, 105, 98, 100], // Replace with your data
        borderColor: "#dc2626",
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return "rgba(220, 38, 38, 0.1)";
          }
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(220, 38, 38, 0.1)");
          gradient.addColorStop(1, "rgba(220, 38, 38, 0)");

          return gradient;
        },
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
      },
      {
        label: "Outflow",
        data: [6, 7, 8, 5, 7, 6, 8], // Replace with your data
        borderColor: "#16a34a",
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return "rgba(34, 197, 94, 0.1)";
          }
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(34, 197, 94, 0.1)");
          gradient.addColorStop(1, "rgba(34, 197, 94, 0)");

          return gradient;
        },
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
      },
      {
        label: "Transactions",
        data: [3, 4, 2, 5, 4, 6, 5], // Replace with your data
        borderColor: "#dc2626",
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return "rgba(220, 38, 38, 0.1)";
          }
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(220, 38, 38, 0.1)");
          gradient.addColorStop(1, "rgba(220, 38, 38, 0)");

          return gradient;
        },
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  // Configuration for the line graphs
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0.4, // Smoothness of the line
      },
    },
  };
  return (
    <>
      <div className="flex flex-wrap gap-2 whitespace-nowrap scrollbar-hide">
        {/* Total Transactions Card */}
        <div className="flex-1 py-4 pl-4 pr-2 h-[7.7rem] bg-white shadow-sm rounded-2xl">
          <h3 className="text-sm font-medium text-gray-700">Online Visitors</h3>
          <div className="flex flex-row items-center justify-between space-x-4">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-500">Last 7 days</p>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-base font-bold text-textBlack">1,234</p>
                <p className="mt-1 text-[11px] text-success">
                  ↑ 3% <span className="pl-1 text-textLight">vs 7 days</span>
                </p>
              </div>
            </div>
            <div className="max-w-40 max-h-28">
              <Line data={{ ...lineChartData, datasets: [lineChartData.datasets[0]] }} options={options} />
            </div>
          </div>
        </div>

        {/* Total Volume Card */}
        <div className="flex-1 py-4 pl-4 pr-2 h-[7.7rem] bg-white shadow-sm rounded-2xl">
          <h3 className="text-sm font-medium text-gray-700">Inflow</h3>
          <div className="flex flex-row items-center justify-between space-x-4">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-500">Last 7 days</p>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-base font-bold">100K</p>
                <p className="mt-1 text-red-600 text-[11px]">
                  ↓ 3% <span className="pl-1 text-textLight">vs 7 days</span>
                </p>
              </div>
            </div>
            <div className="max-w-40 max-h-28">
              <Line data={{ ...lineChartData, datasets: [lineChartData.datasets[1]] }} options={options} />
            </div>
          </div>
        </div>

        {/* Pending Transactions Card */}
        <div className="flex-1 py-4 pl-4 pr-2 h-[7.7rem] bg-white shadow-sm rounded-2xl">
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">Outflow</h3>
          </div>
          <div className="flex flex-row items-center justify-between space-x-4">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-500">Last 7 days</p>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-base font-bold">8</p>
                <p className="mt-1 text-success text-[11px]">
                  ↑ 3% <span className="pl-1 text-textLight">vs 7 days</span>
                </p>
              </div>
            </div>
            <div className="max-w-40 max-h-28">
              <Line data={{ ...lineChartData, datasets: [lineChartData.datasets[2]] }} options={options} />
            </div>
          </div>
        </div>

        {/* Failed Transactions Card */}
        <div className="flex-1 py-4 pl-4 pr-2 h-[7.7rem] bg-white shadow-sm rounded-2xl">
          <h3 className="text-sm font-medium text-gray-700">Transactions</h3>
          <div className="flex flex-row items-center justify-between space-x-4">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-500">Last 7 days</p>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-base font-bold">5</p>
                <p className="mt-1 text-red-600 text-[11px]">
                  ↓ 3% <span className="pl-1 text-textLight">vs 7 days</span>
                </p>
              </div>
            </div>
            <div className="max-w-40 max-h-28">
              <Line data={{ ...lineChartData, datasets: [lineChartData.datasets[3]] }} options={options} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalyticsCards;
