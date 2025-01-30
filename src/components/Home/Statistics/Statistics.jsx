import React, { useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const Statistics = () => {
  const chartRef = useRef(null);

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Revenue",
        data: [900, 1000, 1050, 800, 1100, 900, 700, 1150, 950, 1000, 1100, 1200, 1300],
        borderColor: "rgba(0, 123, 255, 1)", // Blue line color
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return "rgba(0, 123, 255, 0.2)"; // Blue fallback
          }
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);



          gradient.addColorStop(0, " rgba(125, 122, 237, 0.5)"); // Start with blue at 40%
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)"); // Transition to transparent
          return gradient;
        },
        fill: true,
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 0,
        pointBackgroundColor: "rgba(0, 123, 255, 1)", // Solid blue for points
        pointBorderColor: "rgba(71, 120, 245, 1)", // Solid blue border for points
      },
      {
        label: "Sales",
        data: [800, 900, 1200, 900, 850, 1000, 1200, 1100, 950, 1050, 1150, 950, 1000],
        borderColor: "rgba(255, 165, 0, 1)", // Orange line color
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return "rgba(255, 165, 0, 0.2)"; // Orange fallback
          }
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(255, 165, 0, 0.4)"); // Start with orange at 40%
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)"); // Transition to transparent
          return gradient;
        },
        fill: true,
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 0,
        pointBackgroundColor: "rgba(255, 165, 0, 1)", // Solid orange for points
        pointBorderColor: "rgba(255, 165, 0, 1)", // Solid orange border for points
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
        },
      },
      title: {
        display: false,
      },
    },
    scales: {

      x: {
        grid: {
          display: false, // Remove the vertical grid lines
        },
      },
      y: {
        grid: {
          display: false, // Remove the vertical grid lines
        },
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `$${value}k`;
          },
        },
      },
    },
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, []);

  return (
    <div className="w-full p-4 space-y-1 bg-white rounded-2xl xl:h-[30rem] ">
      <h2 className="text-[14px] font-semibold leading-[20px] tracking-[-0.005em] text-left text-textBlack">Statistics</h2>
      <p className="mb-4 text-[12px] font-normal leading-[16px] text-center text-gray-500">Revenue and Sales</p>
      <div className="w-full h-[90%] rounded-lg">
        <Line
          ref={chartRef}
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default Statistics;
