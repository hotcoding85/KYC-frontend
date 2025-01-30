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
import MetricCard from "@/components/Elements/MetricsCard/MetricsCard";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const LogCards = ({
  titles = [
    "Total Requests",
    "Total Webhook",
    "Failed Requests",
    "Failed Webhook",
  ],
}) => {
  const metrics = [
    {
      title: titles[0],
      value: "1,234",
      change: 3,
      isPositive: true,
      chartLabel: "Total Requests",
      chartValues: [1000, 1050, 1100, 1200, 1250, 1230, 1234],
      color: "#16a34a",
    },
    {
      title: titles[1],
      value: "100K",
      change: -2,
      isPositive: false,
      chartLabel: "Total Webhook",
      chartValues: [102000, 101500, 101000, 100500, 100000, 99500, 100000],
      color: "#dc2626",
    },
    {
      title: titles[2],
      value: "8",
      change: -2,
      isPositive: false,
      chartLabel: "Failed Requests",
      chartValues: [5, 6, 7, 9, 8, 10, 8],
      color: "#16a34a",
      extraInfo: "Review all",
    },
    {
      title: titles[3],
      value: "5",
      change: -2,
      isPositive: false,
      chartLabel: "Failed Webhook",
      chartValues: [4, 5, 3, 6, 5, 7, 5],
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
          extraInfo={metric.extraInfo || ""}
        />
      ))}
    </div>
  );
};

export default LogCards;
