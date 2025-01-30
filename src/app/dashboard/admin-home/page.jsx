"use client"
import React from "react";
import NavBar from "@/components/NavBar/NavBar";
import DashboardCards from "@/components/Transactions/DashboardCards";
import CompaniesTable from "@/components/Admin-Home/CompaniesTable";
export default function HomePage() {
    return (

        <NavBar pageName={"Company Management"}>
            <div className="flex flex-col gap-y-5">
        
                <DashboardCards />
               <CompaniesTable/>
            
            </div>
        </NavBar>

    )
}