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

const DashboardCards = ({metrics}) => {
  
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
          dates={metric.dates}
        />
      ))}
    </div>
  );
};

export default DashboardCards;
