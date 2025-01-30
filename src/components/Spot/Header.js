import React from "react";
import Card from "../Elements/Card/Card";
import Button from "../Elements/Button/Button";
import { FaArrowLeft, FaChevronDown } from "react-icons/fa";
import Btc from "@/Icons/imageicon/Btc";

const SpotHeader = () => {
  // Stats data that would normally come from props or API
  const stats = {
    symbol: "BTC/USDT",
    name: "Bitcoin",
    currentPrice: "67,003.52",
    priceUSD: "67,003.52",
    stats: [
      {
        label: "24h high",
        value: "67,734.20",
      },
      {
        label: "24h low",
        value: "64,633.37",
      },
      {
        label: "24h quantity (BTC)",
        value: "10.64K",
      },
      {
        label: "24h total (USDT)",
        value: "704.83M",
      },
      {
        label: "24h change%",
        value: "+2.96%",
        isPositive: true,
      },
    ],
  };

  return (
    <div className="w-full p-4 h-auto mg:h-[12.5rem] bg-white border rounded-2xl border-primary50">
      <div className="flex flex-wrap items-center gap-x-[30px]">
        {/* Back Button */}
        <span>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.6673 6L1.33398 6M1.33398 6L6.33398 11M1.33398 6L6.33398 1"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>

        {/* Trading Pair Info */}
        <div className="flex flex-wrap items-center gap-3 pr-[30px] md:border-r">
          <div className="flex items-center justify-center w-8 h-8 rounded-full">
            <Btc className="w-8 h-8" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-x-2">
              <span className="text-sm font-semibold mb-[2px]">{stats.symbol}</span>
              <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="0.25" width="16" height="16" rx="8" fill="#F4F5F7" />
                <path
                  d="M11.0561 6.91699C11.6494 6.91699 11.9474 7.63499 11.5274 8.05499L7.99874 11.5837L4.47008 8.05499C4.05008 7.63499 4.34741 6.91699 4.94141 6.91699H11.0561Z"
                  fill="#14151A"
                />
              </svg>
            </div>
            <span className="text-xs text-gray-500">{stats.name}</span>
          </div>
        </div>

        {/* 24h Stats */}
        <div className="grid grid-cols-2 gap-4 mt-2 md:mt-0 md:flex-1 md:grid-cols-3 lg:grid-cols-6">
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{stats.currentPrice}</span>
          <span className="text-xs text-gray-500 mt-[1px]">≈${stats.priceUSD}</span>
        </div>
          {stats.stats.map((stat, index) => (
            <div key={index} className="flex flex-col gap-y-[6px]">
              <span className="text-xs text-gray-500">{stat.label}</span>
              <span className={`${stat.isPositive ? "text-success" : ""} text-xs`}>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpotHeader;
