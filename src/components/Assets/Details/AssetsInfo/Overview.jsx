import React, { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import useIsMobile from "@/hooks/useIsMobile";
import { FaChevronDown } from "react-icons/fa";

ChartJS.register(
  LineElement,
  CategoryScale,
  BarElement,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
  Legend
);

const data = [
  { date: "Oct '22", low: 87.35, medium: 12.06, high: 0.59 },
  { date: "Dec '22", low: 87.4, medium: 12.0, high: 0.6 },
  { date: "Feb '23", low: 87.45, medium: 12.03, high: 0.52 },
  { date: "Apr '23", low: 87.4, medium: 12.05, high: 0.55 },
  { date: "Jun '23", low: 87.3, medium: 12.1, high: 0.6 },
  { date: "Aug '23", low: 87.35, medium: 12.06, high: 0.59 },
];

const assetDetails = [
  { label: "Market Cap", value: "1,200,000 BTC" },
  { label: "Market Cap", value: "12" },
  { label: "Rank", value: "12" },
  { label: "Volume (24)", value: "xx xxx xxxx" },
  { label: "Volume/Market Cap (24h)", value: "xx xxx xxxx" },
  { label: "Circulating Supply", value: "12" },
  { label: "Total Supply", value: "12" },
  { label: "Max Supply", value: "xx xxx xxxx" },
  { label: "Fully diluted market cap", value: "xx xxx xxxx" },
];

const balanceData = [
  { label: "Total Balance", value: "1,200,000 BTC", isTotal: true },
  { label: "Customer Held", value: "12" },
  { label: "Incoming", value: "12" },
  { label: "Outcoming", value: "xx xxx" },
  { label: "Pending", value: "xx xxx" },
];

const walletData = [
  { label: "Node Wallet", value: "12" },
  { label: "Auxiliary Wallet", value: "12" },
  { label: "Liquidity Provider", value: "12" },
  { label: "Volume (24h)", value: "xxx" },
];

export default function AssetsInfoOverview() {
  const isMobile = useIsMobile();
  const [selectedRange, setSelectedRange] = useState("Max");
  const [currency, setCurrency] = useState("USD");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: "Low",
        data: data.map((d) => d.low),
        fill: true,
        backgroundColor: "rgba(0, 143, 251, 0.2)",
        borderColor: "#008FFB",
      },
      {
        label: "Medium",
        data: data.map((d) => d.medium),
        fill: true,
        backgroundColor: "rgba(0, 227, 150, 0.2)",
        borderColor: "#00E396",
      },
      {
        label: "High",
        data: data.map((d) => d.high),
        fill: true,
        backgroundColor: "rgba(254, 176, 25, 0.2)",
        borderColor: "#FEB019",
      },
    ],
  };

  // Second Bar Chart Data
  const barChartData = {
    labels: ["USD", "EUR", "GBP", "JPY"],
    datasets: [
      {
        label: "Asset Holdings",
        data: [12, 19, 7, 15], // Example Data for different currencies
        backgroundColor: [
          "rgba(0, 143, 251, 0.6)",
          "rgba(254, 176, 25, 0.6)",
          "rgba(0, 227, 150, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: ["#008FFB", "#FEB019", "#00E396", "#FF6384"],
        borderWidth: 1,
      },
    ],
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    setIsDropdownOpen(false);
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleRangeChange = (range) => {
    setSelectedRange(range);
  };

  return (
    <>
      <div className="flex flex-col justify-between flex-grow gap-2 lg:flex-row lg:space-x-2 lg:gap-0">
        {/* Left Section */}
        <div className="flex flex-col w-full gap-2 lg:w-1/3">
          {/* Status Card */}
          <div className="flex flex-col w-full h-full gap-2 p-4 bg-white shadow-sm rounded-2xl">
            <p className="text-[14px] font-semibold leading-[20px] tracking-[-0.005em] text-textBlack mb-2 ">
              Asset Details
            </p>
            {assetDetails.map((detail, index) => (
              <div
                key={index}
                className="flex gap-1 items-center justify-between mb-2 "
              >
                <p
                  className={`whitespace-nowrap ${
                    index === 0
                      ? "text-[12px] font-medium leading-[16px] text-textSecondary"
                      : "text-[12px] font-medium leading-[16px] text-textSecondary"
                  }`}
                >
                  {detail.label}
                </p>
                <p
                  className={`w-full sm:w-auto text-[12px] font-semibold leading-[16px] text-textBlack text-right`}
                >
                  {detail.value}
                </p>
              </div>
            ))}
            <div className="flex flex-wrap items-center justify-between gap-2 w-full h-full">
              <button
                onClick={toggleDropdown}
                className="flex items-center justify-between px-2 py-2 text-xs text-gray-700 bg-white border border-gray-300 rounded-[10px]"
              >
                <span className="text-xs font-normal leading-4 text-center">
                  {currency}
                </span>
                <FaChevronDown className="ml-2 text-gray-500" />
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 w-24 py-2 mb-8 bg-white border rounded shadow-lg">
                  {["USD", "EUR", "GBP", "JPY"].map((currency) => (
                    <button
                      key={currency}
                      onClick={() => handleCurrencyChange(currency)}
                      className="block w-full px-4 py-2 text-left text-xs text-gray-700 hover:bg-gray-100"
                    >
                      {currency}
                    </button>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap p-0.5 border text-xs rounded-lg mt-2 lg:mt-0 ">
                {["Max", "1D", "7D", "15D", "30D"].map((range) => (
                  <button
                    key={range}
                    onClick={() => handleRangeChange(range)}
                    className={`lg:px-3 px-2 py-2 lg:text-xs text-[10px]  ${
                      selectedRange === range
                        ? "bg-black text-white lg:rounded-lg rounded-[8px] "
                        : " text-textBlack"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-3">
              <Bar data={barChartData} options={barOptions} />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col w-full gap-2 lg:w-2/3">
          <div className="flex flex-col h-full gap-3 p-4 bg-white shadow-sm rounded-2xl">
            <p className="text-[14px] font-semibold leading-[20px] tracking-[-0.005em] text-textBlack mb-2">
              Asset Balance
            </p>
            <div className="flex flex-col items-end justify-between space-x-0 bg-white rounded-2xl lg:flex-row gap-3 lg:gap-16">
              <div className="flex flex-col w-full gap-3 text-xs lg:w-1/2">
                {balanceData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-1 w-full text-textBlack"
                  >
                    <p
                      className={`text-sm whitespace-nowrap ${
                        item.isTotal
                          ? "font-semibold text-xs leading-[16px] text-left mb-2"
                          : "text-textSecondary text-xs font-medium leading-[16px] text-left mb-2"
                      }`}
                    >
                      {item.label}
                    </p>
                    <p
                      className={`w-full sm:w-auto ${
                        item.isTotal ? " text-xs" : "text-xs"
                      } text-textBlack text-xs font-semibold leading-[16px] text-right`}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col w-full gap-3 text-xs lg:w-1/2">
                {walletData.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-wrap items-center justify-between gap-1"
                  >
                    <p className="text-textSecondary text-xs font-medium leading-[16px] text-left mb-2">
                      {item.label}
                    </p>
                    <p
                      className={`text-textBlack text-xs font-semibold leading-[16px] text-right`}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl">
            <div className="lex flex-col h-full gap-3 p-4 bg-white shadow-sm rounded-2xl">
              <p className="text-[14px] font-semibold leading-[20px] tracking-[-0.005em] text-textBlack mb-2">
                Asset Balance
              </p>
              <div className="flex flex-col items-center justify-between mt-3 space-y-4 lg:space-y-0 lg:space-x-4 lg:flex-row">
                <div className="flex flex-col justify-between w-full h-full space-y-2 lg:flex-row lg:space-y-0">
                  <button className="flex items-center justify-between px-2 py-2 text-xs text-gray-700 bg-white border border-gray-300 rounded-[10px]">
                    Holdings by Wallet{" "}
                    <FaChevronDown className="ml-2 text-gray-500" />
                  </button>
                  <div className="flex flex-wrap p-0.5 border text-xs rounded-lg mt-2 lg:mt-0">
                    {["Max", "1D", "7D", "15D", "30D"].map((range) => (
                      <button
                        key={range}
                        onClick={() => handleRangeChange(range)}
                        className={`lg:px-3 px-2 py-2 lg:text-xs text-[10px] ${
                          selectedRange === range
                            ? "bg-black text-white lg:rounded-lg rounded-xl"
                            : "bg-white text-textBlack"
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <div className="flex flex-wrap mb-3 space-x-4 lg:ml-8 lg:space-x-8 lg:flex-nowrap">
                  <div className="flex flex-col items-center justify-between  gap-2 lg:items-start h-[60px]">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <div className="flex items-center space-x-1">
                      <p className="text-xs text-gray-500 lg:text-sm">
                        $0 - $1k
                      </p>
                    </div>
                    <p className="text-xs font-semibold">87.35%</p>
                  </div>
                  <div className="flex flex-col items-center justify-between gap-2 lg:items-start h-[60px]">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    <div className="flex items-center space-x-1">
                      <p className="text-xs text-gray-500 lg:text-xs">
                        $1k - $100k
                      </p>
                    </div>
                    <p className="text-xs font-semibold">12.06%</p>
                  </div>
                  <div className="flex flex-col items-center justify-between gap-2 lg:items-start h-[60px]">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    <div className="flex items-center space-x-1">
                      <p className="text-xs text-gray-500 lg:text-xs">$100k+</p>
                    </div>
                    <p className="text-xs font-semibold">0.59%</p>
                  </div>
                </div>
                <div className="pt-2">
                  <Line data={chartData} options={lineOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
