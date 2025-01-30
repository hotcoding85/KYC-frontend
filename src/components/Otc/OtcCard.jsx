import React, { useState, useMemo } from "react";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Search from "@/Icons/Search";

import Star from "@/Icons/Star";
import ArrowDown from "@/Icons/ArrowDown";
import Chart from "@/Icons/Chart";
import ArrowUp from "@/Icons/ArrowUp";
import Button from "../Elements/Button/Button";

export default function OtcCard({ title, onClickBooking }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      <div className={`w-full border rounded-2xl ${isExpanded ? 'h-auto' : 'h-fit'}`}>
        <div className="flex items-center justify-between p-4">
          <div>
            <h2 className="text-sm font-semibold">{title}</h2>
          </div>
          <div className="flex space-x-2">
            <button className="relative flex items-center justify-center w-6 h-6 bg-white border border-gray-200 rounded-full hover:bg-gray-200">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.93032 2.116C4.48463 1.122 4.76157 0.625 5.17588 0.625C5.5902 0.625 5.86713 1.122 6.42145 2.116L6.56495 2.37325C6.72245 2.65588 6.8012 2.79719 6.9237 2.89038C7.0462 2.98356 7.19932 3.01813 7.50557 3.08725L7.78382 3.15025C8.86007 3.39394 9.39776 3.51556 9.52595 3.92725C9.6537 4.3385 9.28707 4.76769 8.55338 5.62563L8.36351 5.84744C8.15526 6.09113 8.0507 6.21319 8.00388 6.36369C7.95707 6.51463 7.97282 6.67738 8.00432 7.00244L8.0332 7.29863C8.14388 8.44356 8.19945 9.01581 7.86432 9.27C7.5292 9.52419 7.0252 9.29231 6.01807 8.82856L5.75688 8.70869C5.47076 8.57656 5.3277 8.51094 5.17588 8.51094C5.02407 8.51094 4.88101 8.57656 4.59488 8.70869L4.33413 8.82856C3.32657 9.29231 2.82257 9.52419 2.48788 9.27044C2.15232 9.01581 2.20788 8.44356 2.31857 7.29863L2.34745 7.00288C2.37895 6.67738 2.3947 6.51463 2.34745 6.36413C2.30107 6.21319 2.19651 6.09113 1.98826 5.84788L1.79838 5.62563C1.0647 4.76813 0.698072 4.33894 0.825822 3.92725C0.953572 3.51556 1.49213 3.3935 2.56838 3.15025L2.84663 3.08725C3.15245 3.01813 3.30513 2.98356 3.42807 2.89038C3.55101 2.79719 3.62932 2.65588 3.78682 2.37325L3.93032 2.116Z"
                  stroke="#14151A"
                  stroke-width="0.7875"
                />
              </svg>
            </button>
            <button className="relative flex items-center justify-center w-6 h-6 bg-white border border-gray-200 rounded-full hover:bg-gray-200">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.0625 1.0625V8.0625C1.0625 8.29456 1.15469 8.51712 1.31878 8.68122C1.48288 8.84531 1.70544 8.9375 1.9375 8.9375H8.9375" stroke="#14151A" stroke-width="1.05" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.0625 3.6875L5.875 5.875L4.125 4.125L2.8125 5.4375" stroke="#14151A" stroke-width="1.05" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            </button>
          </div>
        </div>
        <div className="flex items-center justify-between px-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-textSecondary">You buy BTC</p>
            <p className="text-xs font-medium text-alert">
              58,289.32 <span>↓</span>
            </p>
            <p className="text-xs text-textLight">Min: 10 USD</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-textSecondary">You sell BTC</p>
            <p className="text-xs font-medium text-success">
              58,199.08 <span>↑</span>
            </p>
            <p className="text-xs text-textLight">Max: 5,000,000 USD</p>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4">
            <div className="flex flex-col px-4 space-y-4">
              <Button title="Buy" className={"h-8 text-xs rounded-[10px] w-full"} />
              <div className="relative">
                <input type="text" className="w-full p-2 pr-16 border rounded-[10px] h-8" />
                <span className="absolute inset-y-0 flex items-center text-xs text-gray-500 right-4">BTC</span>
              </div>
              <Button
                title="Start contract booking"
                className={"h-8 text-xs rounded-[10px] w-full bg-primary text-white"}
                onClick={onClickBooking}
              />
            </div>
            <div className="flex justify-center py-4 mt-4 border-t">
              <button onClick={toggleExpand} className="text-2xl">
                <ArrowUp />
              </button>
            </div>
          </div>
        )}

        {!isExpanded && (
          <div className="flex justify-center py-4 mt-4 border-t">
            <button onClick={toggleExpand} className="text-2xl">
              <ArrowDown />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
