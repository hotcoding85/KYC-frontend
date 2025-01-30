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

const UserDashboardCards = ({usersData}) => {
  // Helper function to format values
  const formatValue = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  // Helper function to calculate percentage change
  const calculatePercentageChange = (values) => {
    if (!values || values.length < 2) return 0;
    const lastValue = values[values.length - 1];
    const previousValue = values[values.length - 2];

    if (previousValue === 0) return 0;

    const percentageChange =
      ((lastValue - previousValue) / previousValue) * 100;
    return Number(percentageChange.toFixed(1));
  };

  const metrics = [
    {
      title: "Total Users",
      value: formatValue(1234),
      change: calculatePercentageChange([
        800, 900, 700, 1100, 1000, 1200, 1234,
      ]),
      isPositive:
        calculatePercentageChange([800, 900, 700, 1100, 1000, 1200, 1234]) > 0,
      chartLabel: "Total Users",
      chartValues: [800, 900, 700, 1100, 1000, 1200, 1234],
      color: "#16a34a",
    },
    {
      title: "Active Users",
      value: formatValue(100),
      change: calculatePercentageChange([120, 115, 110, 100, 105, 98, 100]),
      isPositive:
        calculatePercentageChange([120, 115, 110, 100, 105, 98, 100]) > 0,
      chartLabel: "Active Users",
      chartValues: [120, 115, 110, 100, 105, 98, 100],
      color: "#dc2626",
    },
    {
      title: "Inactive Users",
      value: formatValue(8),
      change: calculatePercentageChange([6, 7, 8, 5, 7, 6, 8]),
      isPositive: calculatePercentageChange([6, 7, 8, 5, 7, 6, 8]) > 0,
      chartLabel: "Inactive Users",
      chartValues: [6, 7, 8, 5, 7, 6, 8],
      color: "#16a34a",
    },
    {
      title: "New Users",
      value: formatValue(5),
      change: calculatePercentageChange([3, 4, 2, 5, 4, 6, 5]),
      isPositive: calculatePercentageChange([3, 4, 2, 5, 4, 6, 5]) > 0,
      chartLabel: "New Users",
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
        />
      ))}
    </div>
  );
};

export default UserDashboardCards;
