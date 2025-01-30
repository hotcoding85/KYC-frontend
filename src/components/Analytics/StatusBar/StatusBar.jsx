"use client";
import TabNavigationBarMobile from "@/components/Elements/TabNavigationBar/TabNavigationBarMobile";
import React, { useState } from "react";
import Calendar from "../Calendar/Calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextButton } from "@/components/Elements/Button/Button";
import { faDownload, faFileExport } from "@fortawesome/free-solid-svg-icons";
import { useReport } from "@/components/Analytics/Reports/ReportContext/ReportContext";
import ImportIcon from "@/Icons/Import";
import ExportIcon from "@/Icons/export";

const StatusBar = ({
  activeTab,
  toggleTab,
  isDatePickerOpen,
  setIsDatePickerOpen,
}) => {
  const [compareDate, setCompareDate] = useState("Yesterday")
  const { openModal } = useReport();

  const tabs = ["Analytics", "Reports"];
  return (
    <div className="relative flex flex-wrap items-center justify-between w-full bg-transparent rounded-[10px]">
      <div
        className={`flex items-center overflow-auto bg-lightGrey border-b-[1px] border-b-primary50 w-full md:hidden`}
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`block w-full font-normal text-center text-xs focus:outline-none whitespace-nowrap h-8 text-textBlack ${
              activeTab === tab && "border-b-2 border-b-primary"
            }`}
            onClick={() => toggleTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="hidden md:flex mb-2 bg-white rounded-[10px] h-8 md:mb-0 p-0.5 border border-primary50">
        <button
          className={`text-center content-center rounded-[10px] text-xs w-[138px] h-full ${
            activeTab === "Analytics"
              ? "bg-lightGrey text-textBlack border border-primary50"
              : "bg-white text-textSecondary"
          }`}
          onClick={() => toggleTab("Analytics")}
        >
          Analytics
        </button>
        <button
          className={`text-center content-center rounded-[10px] text-xs w-[138px] h-full ${
            activeTab === "Reports"
              ? "bg-lightGrey text-textBlack border border-primary50"
              : "bg-white text-textSecondary"
          }`}
          onClick={() => toggleTab("Reports")}
        >
          Reports
        </button>
      </div>

      <div>
        {activeTab === "Analytics" ? (
          <div className="flex flex-row items-center gap-2">
            <Calendar
              isVisibleOnAll
              className="h-8"
              isDatePickerOpen={isDatePickerOpen}
              setIsDatePickerOpen={setIsDatePickerOpen}
            />
            <button className="flex items-center h-8 px-4 py-2 text-xs bg-white border rounded-[10px] border-primary-50">
              Compare: {compareDate}
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 md:gap-3 mt-2">
            <button className="px-6 py-2 h-8 text-xs text-gray-600 bg-white border border-primary50 rounded-[10px] whitespace-nowrap w-auto flex items-center">
              <ExportIcon />
              <span className="my-auto ml-1">Export</span>
            </button>

            <button className="px-6 py-2 h-8 text-xs text-gray-600 bg-white border border-primary50 rounded-[10px] whitespace-nowrap w-auto flex items-center">
              <ImportIcon />
              <span className="my-auto ml-1"> Import</span>
            </button>

            <button
              className="h-8 bg-black text-xs text-white px-4 py-2 rounded-[10px] w-auto max-w-[180px] flex items-center justify-center"
              onClick={openModal}
            >
              Add new report
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusBar;
