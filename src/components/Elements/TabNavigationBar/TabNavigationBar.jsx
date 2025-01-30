"use client";
import React from "react";

const TabNavigationBar = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-wrap justify-between bg-white border border-primary50 rounded-[10px] md:flex-nowrap p-0.5">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`p-0.5 text-xs focus:outline-none whitespace-nowrap w-full h-8 ${
            activeTab === index
              ? " w-[262.5px]  border border-primary50 rounded-[10px] bg-lightGrey text-textBlack"
              : " w-[262.5px]  text-textBlack hover:text-primary"
          }`}
          onClick={() => setActiveTab(index)}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default TabNavigationBar;
