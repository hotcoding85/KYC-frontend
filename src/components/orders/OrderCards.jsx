"use client";
import React from "react";
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
import MetricCard from "../Elements/MetricsCard/MetricsCard";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const OrderCards = ({
  titles = [
    "Total Orders",
    "Total Volume",
    "Pending Orders",
    "Failed Orders",
  ],
}) => {
  const metrics = [
    {
      title: titles[0],
      value: "1,234",
      change: 3,
      isPositive: true,
      chartLabel: "Total Orders",
      chartValues: [800, 900, 700, 1100, 1000, 1200, 1234],
      color: "#16a34a",
    },
    {
      title: titles[1],
      value: "100",
      change: -3,
      isPositive: false,
      chartLabel: "Total Volume",
      chartValues: [120, 115, 110, 100, 105, 98, 100],
      color: "#dc2626",
    },
    {
      title: titles[2],
      value: "8",
      change: 3,
      isPositive: true,
      chartLabel: "Pending Orders",
      chartValues: [6, 7, 8, 5, 7, 6, 8],
      color: "#16a34a",
    },
    {
      title: titles[3],
      value: "5",
      change: -3,
      isPositive: false,
      chartLabel: "Failed Orders",
      chartValues: [3, 4, 2, 5, 4, 6, 5],
      color: "#dc2626",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          isPositive={metric.isPositive}
          chartLabel={metric.chartLabel}
          chartValues={metric.chartValues}
          color={metric.color}
          isAnalytics={true}
        />
      ))}
    </div>
  );
};

export default OrderCards;
