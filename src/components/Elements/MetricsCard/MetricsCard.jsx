import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const MetricCard = ({
  title,
  value,
  change,
  isPositive,
  chartLabel,
  chartValues,
  color,
  periodLabel = "Last 7 days",
  comparisonLabel = "vs 7 days",
  isAnalytics,
  isGraphHidden,
  dates,
  isFixedHeight = false
}) => {
  const chartData = {
    labels: dates,
    datasets: [
      {
        label: chartLabel,
        data: chartValues,
        fill: true,
        borderColor: color,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return color === "#16a34a"
              ? "rgba(34, 197, 94, 0.1)"
              : "rgba(220, 38, 38, 0.1)";
          }
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(
            0,
            color === "#16a34a"
              ? "rgba(34, 197, 94, 0.1)"
              : "rgba(220, 38, 38, 0.1)"
          );
          gradient.addColorStop(
            1,
            color === "#16a34a"
              ? "rgba(34, 197, 94, 0)"
              : "rgba(220, 38, 38, 0)"
          );
          return gradient;
        },
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0
      }
    ]
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: "index",
        intersect: false
      }
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false
        }
      },
      y: {
        display: false,
        grid: {
          display: false
        }
      }
    },
    elements: {
      line: {
        tension: 0.4
      }
    }
  };

  return (
    <div className={`p-4 ${!isFixedHeight ? 'h-[7.7rem]' : 'h-auto'} bg-white shadow-sm rounded-2xl overflow-hidden`}>
      <h3 className="text-sm font-semibold leading-5 text-textBlack text-left">
        {title}
      </h3>
      <div className="flex flex-row items-center justify-between space-x-4">
        <div>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] leading-[14px] text-gray-500 text-left">
                {periodLabel}
              </p>
            </div>
          </div>
          <div className="flex flex-col mt-3">
            <p className="text-[16px] font-bold leading-6 tracking-[-0.01em] text-textBlack">
              {value !== 0 ? value : 'No result'}
              {!isAnalytics && (
                <span className="text-[16px] font-bold leading-[24px] tracking-[-0.01em] text-left text-primary100">
                  {" "}
                  {
                    value === 0 ? '' : value === 1 ? ' Company' : ' Companies'
                  }
                </span>
              )}
            </p>
            <div className="flex flex-row items-center gap-1 flex-nowrap">
              <p
                className={`mt-1 text-[11px] text-nowrap ${
                  isPositive ? "text-success" : "text-red-600"
                }`}
              >
                {isPositive ? "↑" : "↓"} {Math.abs(change)}%
                <span className="pl-1 text-textLight text-nowrap">
                  {comparisonLabel}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className={`relative w-[75px] h-[53px] md:w-[100px] md:h-[68.39px] ${isGraphHidden && 'hidden'}`}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;