import React, { useState } from "react";
import { useReport } from "@/components/Analytics/Reports/ReportContext/ReportContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ReportActionButtons from "../ReportActionButtons/ReportActionButtons";
import Calendar from "@/Icons/Calendar";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AddReportComponent = ({ reportsName, setReportsName }) => {
  const { setActiveTab } = useReport();
  const [compareDate, setCompareDate] = useState("Yesterday")
  const [isSuccess, setIsSuccess] = useState(false)

  const chartData = {
    labels: ["12 AM", "6 AM", "12 PM", "3 PM", "6 PM", "8 PM"],
    datasets: [
      {
        label: "",
        data: [10, 30, 20, 40, 60, 70],
        borderColor: "rgba(71, 120, 245, 1)",
        backgroundColor: "rgba(255, 255, 235, 0.1)",
        fill: false,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        pointBorderColor: "rgba(54, 162, 235, 1)"
      },
      {
        label: "",
        data: [20, 40, 50, 30, 40, 50],
        borderColor: "rgba(230, 72, 61, 1)",
        backgroundColor: "rgba(255, 255, 132, 0.1)",
        fill: false,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "rgba(255, 99, 132, 1)"
      }
    ]
  }

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top"
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: false,
        display: false, // Hide Y-axis labels
        grid: {
          color: "rgba(200, 200, 200, 0.2)"
        }
      }
    }
  }

  return (
    <div className="w-auto space-y-2 bg-transparent">
      <div className="flex flex-col items-start justify-between w-full">
        <div
          onClick={() => setActiveTab("Reports")}
          className="flex flex-wrap items-center justify-between w-full gap-2"
        >
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2 cursor-pointer" />
            <h2 className="text-sm font-semibold text-textBlack">
              {reportsName}
            </h2>
          </div>

        </div>

        <div className="flex flex-col items-center justify-between w-full md:flex-row lg:flex-row">

          <div className="flex items-center gap-2">
            <button className="flex items-center h-8 px-4 py-2 text-xs bg-white border rounded-[10px] border-primary-50">
              <Calendar />
              <span className="ml-1">Today</span>
            </button>
            <button className="flex items-center h-8 px-4 py-2 text-xs bg-white border rounded-[10px] border-primary-50">
              Compare: {compareDate}
            </button>
          </div>

          <div className="flex flex-row space-x-2">
            <ReportActionButtons
              width="w-auto"
              reportsName={reportsName}
              setReportsName={setReportsName}
            />
            {/* Edit and Delete buttons already handled in ReportModals */}
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white border-gray-200 rounded-lg h-96">
        <Line
          data={chartData}
          options={{
            ...chartOptions,
            plugins: { ...chartOptions.plugins, legend: { display: false } }
          }}
        />
      </div>

      {/* Success Toast */}
      {isSuccess && (
        <div className="fixed px-5 py-2 text-white bg-success rounded-md shadow-lg bottom-4 left-4">
          Report created <FontAwesomeIcon icon={faCheck} className="ml-2" />
        </div>
      )}
    </div>
  );
};

export default AddReportComponent;
