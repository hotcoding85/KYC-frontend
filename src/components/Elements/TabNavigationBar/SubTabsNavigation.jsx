import React from "react";
import Button from "../Button/Button";

const SubTabNavigation = ({
  tabs,
  activeTab,
  setActiveTab,
  selectIndex = false,
  width,
}) => {
  return (
    <div className="flex flex-wrap w-full gap-2 mb-2 rounded-lg md:flex-nowrap">
      {tabs.map((tab, index) => (
        <Button
          key={tab}
          onClick={() => setActiveTab(selectIndex ? index : tab)}
          title={selectIndex ? tab.name : tab}
          className={`w-auto ${
            width || "w-auto"
          } rounded-[10px] text-sm focus:outline-none h-8 border-[1px] ${
            activeTab === index || activeTab === tab
              ? "border-primary"
              : "border-primary50"
          } text-textBlack bg-white py-1 px-4 text-xs font-normal`}
        />
      ))}
    </div>
  );
};

export default SubTabNavigation;
