// Import necessary modules
"use client";
import React, { useEffect, useRef, useState } from "react";
import NavBar from "@/components/NavBar/NavBar";
import StatusBar from "@/components/Analytics/StatusBar/StatusBar";
import TotalCustomers from "@/components/Analytics/TotalCustomers/TotalCustomers";
import TotalAssets from "@/components/Analytics/TotalAssets/TotalAssets";
import CustomerArrival from "@/components/Analytics/CustomerArrival/CustomerArrival";
import Countries from "@/components/Analytics/Countries/Countries";
import ReportsTable from "@/components/Analytics/Reports/ReportsTable/Reports";
import AddReportComponent from "@/components/Analytics/Reports/AddReport/AddReport";
import {
  useReport,
  ReportProvider,
} from "@/components/Analytics/Reports/ReportContext/ReportContext"; // Import useReport and ReportProvider
import AnalyticsCards from "@/components/Analytics/AnalyticsCards/AnalyticsCards";
import DashboardCards from "@/components/Transactions/DashboardCards";

// This is the core AnalyticsPage component
function AnalyticsPage() {
  const { activeTab, setActiveTab } = useReport();
  const analyticsRef = useRef(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [reportsName, setReportsName] = useState("");

  // Toggle the active tab
  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  // Open the modal (for reports)
  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    // const handleClickOutside = (event) => {
    //   if (analyticsRef.current && !analyticsRef.current.contains(event.target)) {
    //     setIsDatePickerOpen(false);
    //   }
    // };
    // document.addEventListener("mousedown", handleClickOutside);
    // return () => {
    //   document.removeEventListener("mousedown", handleClickOutside);
    // };
  }, []);

  return (
    <NavBar pageName={"Analytics"}>
      <div className="flex flex-col px-[5px] space-y-2">
        {activeTab !== "AddReport" && (
          <StatusBar
            activeTab={activeTab}
            toggleTab={toggleTab}
            openModal={() => openModal}
            isDatePickerOpen={isDatePickerOpen}
            setIsDatePickerOpen={setIsDatePickerOpen}
          />
        )}

        {activeTab === "Analytics" ? (
          <div ref={analyticsRef}>
            {/* <AnalyticsCards /> */}
            <DashboardCards
              titles={["Online Visitors", "Inflow", "Outflow", "Transactions"]}
              className="grid gap-2 grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
            />

            <div className="grid grid-cols-1 gap-2 mt-2 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-12">
              <div className="col-span-1 xl:col-span-9">
                <div className="grid grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-4">
                  <div className="flex flex-col col-span-1 gap-2 xl:col-span-4 xl:flex-row">
                    <div className="w-full xl:w-[43.3%] h-full">
                      <TotalCustomers />
                    </div>
                    <div className="w-full xl:w-[56.6%] h-full">
                      <TotalAssets />
                    </div>
                  </div>
                  <div className="col-span-1 xl:col-span-4">
                    <CustomerArrival />
                  </div>
                </div>
              </div>
              <div className="col-span-1 xl:col-span-3">
                <Countries />
              </div>
            </div>
          </div>
        ) : activeTab === "AddReport" ? (
          <div className="min-h-screen bg-lightGrey" ref={analyticsRef}>
            <AddReportComponent
              reportsName={reportsName}
              setReportsName={setReportsName}
            />
          </div>
        ) : (
          <ReportsTable
            isAnalytics={true}
            reportsName={reportsName}
            setReportsName={setReportsName}
            setActiveTab={setActiveTab}
          />
        )}
      </div>
    </NavBar>
  );
}

// Higher-level component wrapping AnalyticsPage with ReportProvider
export default function AnalyticsPageWithProvider() {
  return (
    <ReportProvider>
      <AnalyticsPage />
    </ReportProvider>
  );
}
