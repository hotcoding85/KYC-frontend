import TabNavigationBarMobile from "@/components/Elements/TabNavigationBar/TabNavigationBarMobile";
import Back from "@/Icons/Back";
import React, { useState, useEffect } from "react";
import WhiteCheck from "@/Icons/WhiteCheck";
import StatementTab from "./StatementTab";
import { useRouter } from "next/navigation";

export default function StatementExportBody() {
  const { back } = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const triggerToast = () => {
    console.log("triggerToast called"); // Debugging log
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const tabs = [
    { name: "PDF", content: <StatementTab triggerToast={triggerToast} /> },
    { name: "Excel", content: <StatementTab triggerToast={triggerToast} /> }
  ];

  return (
    <>
      <div className="flex flex-col justify-between items-center h-screen">
        <div className="bg-white rounded-2xl border w-full sm:w-[500px] justify-center items-center">
          <div className=" flex-col p-4">
            <div className="flex items-center mb-4 space-x-4 w-full h-[20px]">
              <span
                onClick={back}
                className="text-gray-600 hover:text-gray-800"
              >
                <Back />
              </span>

              <p className="font-inter font-semibold text-[14px] leading-[20px] tracking-[-0.005em] text-left">
                Statement BTC Savings
              </p>
            </div>

            <div className="sm:hidden">
              <TabNavigationBarMobile
                tabs={tabs}
                width="w-full"
                className="bg-white"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>

            <div className="hidden sm:flex flex-wrap justify-between bg-white border h-[32px] w-[468px] border-primary50 rounded-[10px] md:flex-nowrap p-0.5 items-center">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={` p-0.5 w-[231px] h-[28px] text-xs  ${
                    activeTab === index
                      ? "bg-lightGrey shadow-sm border-t border border-gray-200 rounded-[10px]"
                      : "text-gray-600 hover:bg-gray-100 rounded-[10px] "
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="mt-4 rounded-lg">
              <div>{tabs[activeTab].content}</div>
            </div>
          </div>
        </div>

        {showToast && (
          <div className="fixed bottom-[calc(100vh-721px)] left-[750px] flex items-center bg-success text-white rounded-2xl w-[279px] h-[40px] px-6 py-3 opacity-100">
            <span className="mr-2 font-inter text-[14px] font-normal leading-[20px] tracking-[-0.005em] text-center">
              Statement is ready
            </span>
            <div className=" rounded-full p-1 w-6 h-6  flex items-center justify-center">
              <WhiteCheck />
            </div>
            <a
              href="#"
              className="underline font-inter text-[14px] font-medium leading-[20px] tracking-[-0.005em] text-center text-white"
            >
              Download
            </a>
          </div>
        )}
      </div>
    </>
  );
}
