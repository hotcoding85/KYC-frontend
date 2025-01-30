// Import necessary modules
"use client";
import React from "react";
import NavBar from "@/components/NavBar/NavBar";

import DashboardCards from "@/components/Transactions/DashboardCards";

import TotalAssets from "@/components/Analytics/TotalAssets/TotalAssets";

import Statistics from "@/components/Home/Statistics/Statistics";
import TransactionsTable from "@/components/Transactions/TransactionsTable";
import TopBar from "@/components/Team/TopBar/TopBar";

// This is the core AnalyticsPage component
function FinaicialPage() {


  return (
    <NavBar pageName={"Finaicial"}>
      <div className="flex flex-col space-y-4">
    

    
          <>
          <TopBar/>
            <DashboardCards />
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-12 gap-3">
  
                  <div className="col-span-1 xl:col-span-8">
                    <Statistics />
                  </div>
                  <div className="col-span-1 xl:col-span-4">
                    <TotalAssets />
                  </div>
                
    
                  <div className="col-span-1 xl:col-span-12">
                    <TransactionsTable />
                  </div>
            </div>
          </>
        
      </div>
    </NavBar>
  );
}

export default FinaicialPage
