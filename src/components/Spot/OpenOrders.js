import React, { useState } from "react";
import TabNavigationBar from "../Elements/TabNavigationBar/TabNavigationBar";

const OpenOrders = () => {
  const [activeTab, setActiveTab] = useState("Open orders");
  const [activeOrderType, setActiveOrderType] = useState(0);

  const tabs = [
    { name: "Open orders", count: 0 },
    { name: "Order history", count: null },
    { name: "Order details", count: null },
    { name: "Bots", count: 0 },
  ];

  const orderTabs = [
    { name: "Limit | Market (0)", count: 0 },
    { name: "Trigger (0)", count: 0 },
    { name: "Trailing stop (0)", count: 0 },
  ];

  return (
    <div className="p-4 bg-white rounded-2xl">
      {/* Main Tabs */}
      <div className="pt-[10px] border-b mb-3">
        <div className="flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`relative pb-3 px-1 ${
                activeTab === tab.name ? "text-textBlack font-semibold" : "text-gray-500"
              } text-sm whitespace-nowrap`}
            >
              {tab.name}
              {activeTab === tab.name && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black" />}
            </button>
          ))}
        </div>
      </div>

      {/* Order Type Filters */}
      <div className="flex items-center mb-8 space-x-8">
        <div className="w-full">
        <TabNavigationBar tabs={orderTabs} activeTab={activeOrderType} setActiveTab={setActiveOrderType} />
        </div>
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4.29688 1H6.64062C6.77604 1 6.89323 1.04948 6.99219 1.14844C7.09115 1.2474 7.14062 1.36458 7.14062 1.5V2.29688H3.79688V1.5C3.79688 1.36458 3.84635 1.2474 3.94531 1.14844C4.04427 1.04948 4.16146 1 4.29688 1ZM7.90625 2.29688V1.5C7.90625 1.15625 7.78385 0.859375 7.53906 0.609375C7.29427 0.359375 6.99479 0.234375 6.64062 0.234375H4.29688C3.95312 0.234375 3.65625 0.359375 3.40625 0.609375C3.15625 0.859375 3.03125 1.15625 3.03125 1.5V2.29688H0.5V3.04688H1.01562L1.42188 10.3438C1.43229 10.5208 1.5026 10.6693 1.63281 10.7891C1.76302 10.9089 1.91667 10.9688 2.09375 10.9688H8.8125C8.98958 10.9688 9.14323 10.9089 9.27344 10.7891C9.40365 10.6693 9.47396 10.5208 9.48438 10.3438L9.95312 3.04688H10.4688V2.29688H7.90625ZM9.1875 3.04688L8.71875 10.2031H2.1875L1.78125 3.04688H9.1875ZM3.92188 8.54688L3.78125 4.73438L4.54688 4.71875L4.67188 8.53125L3.92188 8.54688ZM6.28125 8.53125L7.04688 8.54688L7.17188 4.73438L6.40625 4.71875L6.28125 8.53125Z"
            fill="#14151A"
          />
        </svg>
      </div>

      {/* Login/Signup Prompt */}
      <div className="py-8 text-xs text-center text-gray-500">
        <span className="font-medium cursor-pointer hover:underline">Log In</span>
        <span className="mx-1">or</span>
        <span className="font-medium cursor-pointer hover:underline">Sign Up</span>
        <span className="ml-1">Start Trading</span>
      </div>
    </div>
  );
};

export default OpenOrders;
