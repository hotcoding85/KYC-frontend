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

// const DashboardChart = ({ data, color }) => {
//   const chartData = {
//     labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//     datasets: [
//       {
//         label: data.label,
//         data: data.values,
//         fill: true,
//         borderColor: color,
//         backgroundColor: (context) => {
//           const chart = context.chart;
//           const { ctx, chartArea } = chart;
//           if (!chartArea) {
//             return color === "#16a34a"
//               ? "rgba(34, 197, 94, 0.1)"
//               : "rgba(220, 38, 38, 0.1)";
//           }
//           const gradient = ctx.createLinearGradient(
//             0,
//             chartArea.top,
//             0,
//             chartArea.bottom
//           );
//           gradient.addColorStop(
//             0,
//             color === "#16a34a"
//               ? "rgba(34, 197, 94, 0.1)"
//               : "rgba(220, 38, 38, 0.1)"
//           );
//           gradient.addColorStop(
//             1,
//             color === "#16a34a"
//               ? "rgba(34, 197, 94, 0)"
//               : "rgba(220, 38, 38, 0)"
//           );

//           return gradient;
//         },
//         tension: 0.4,
//         borderWidth: 2,
//         pointRadius: 0,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         mode: "index",
//         intersect: false,
//       },
//     },
//     scales: {
//       x: {
//         display: false,
//       },
//       y: {
//         display: false,
//       },
//     },
//     elements: {
//       line: {
//         tension: 0.4,
//       },
//     },
//   };

//   return (
//     <div className="w-[75px] h-[53px] md:w-[100px] md:h-[68.39px]">
//       <Line data={chartData} options={options} />
//     </div>
//   );
// };

// const MetricCard = ({ title, value, change, isPositive, data, color }) => {
//   return (
//     <div className="p-4 h-[7.7rem] bg-white shadow-sm rounded-2xl overflow-hidden">
//       <h3 className="text-sm font-medium text-gray-700">{title}</h3>
//       <div className="flex flex-row items-center justify-between space-x-4">
//         <div>
//           <div className="flex items-start justify-between">
//             <div>
//               <p className="text-[11px] text-gray-500">Last 7 days</p>
//             </div>
//           </div>
//           <div className="mt-3 flex flex-col">
//             <p className="text-base font-bold text-textBlack">{value}</p>
//             <div className="flex flex-row items-center gap-1 flex-nowrap">
//               <p
//                 className={`mt-1 text-[11px] text-nowrap ${
//                   isPositive ? "text-success" : "text-red-600"
//                 }`}
//               >
//                 {isPositive ? "↑" : "↓"} {Math.abs(change)}%
//                 <span className="pl-1 text-textLight text-nowrap">
//                   vs 7 days
//                 </span>
//               </p>
//             </div>
//           </div>
//         </div>
//         <DashboardChart data={data} color={color} />
//       </div>
//     </div>
//   );
// };

const FinancialDashboardCards = () => {
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
      title: "Total Profit",
      value: formatValue(1234),
      change: calculatePercentageChange([
        800, 900, 700, 1100, 1000, 1200, 1234,
      ]),
      isPositive:
        calculatePercentageChange([800, 900, 700, 1100, 1000, 1200, 1234]) > 0,
      chartLabel: "Total Profit",
      chartValues: [800, 900, 700, 1100, 1000, 1200, 1234],
      color: "#16a34a",
    },
    {
      title: "Total Income",
      value: formatValue(100),
      change: calculatePercentageChange([120, 115, 110, 100, 105, 98, 100]),
      isPositive:
        calculatePercentageChange([120, 115, 110, 100, 105, 98, 100]) > 0,
      chartLabel: "Total Income",
      chartValues: [120, 115, 110, 100, 105, 98, 100],
      color: "#dc2626",
    },
    {
      title: "Total Outcome",
      value: formatValue(8),
      change: calculatePercentageChange([6, 7, 8, 5, 7, 6, 8]),
      isPositive: calculatePercentageChange([6, 7, 8, 5, 7, 6, 8]) > 0,
      chartLabel: "Total Outcome",
      chartValues: [6, 7, 8, 5, 7, 6, 8],
      color: "#16a34a",
    },
    {
      title: "Total Expenses",
      value: formatValue(5),
      change: calculatePercentageChange([3, 4, 2, 5, 4, 6, 5]),
      isPositive: calculatePercentageChange([3, 4, 2, 5, 4, 6, 5]) > 0,
      chartLabel: "Total Expenses",
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

export default FinancialDashboardCards;
