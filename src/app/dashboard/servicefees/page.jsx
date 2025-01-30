// Import necessary modules
"use client";
import {React , useEffect, useState, useCallback} from "react";
import NavBar from "@/components/NavBar/NavBar";
import DashboardCards from "@/components/Transactions/DashboardCards";
import TopBar from "@/components/Team/TopBar/TopBar";
import AddSchemaModal from "@/components/ServiceFee/AddSchemaModal/AddSchemaModal";
import ServiceFeeTable from "@/components/Companies/ServiceFeeTab/ServiceFeeTable";
import { useUser} from "@/app/context/UserContext";
import useApi from "@/hooks/useApi";
// This is the core AnalyticsPage component
function ServiceFeePage() {
    const [company_id, setCompanyId] =  useState(null)
    const { user, fetchUser } = useUser();
    const { fetchData, loading, error } = useApi();
    const [companyScheme, setCompanyScheme] = useState(null);
    const [userData, setUserData] = useState(null)
    const handleFetchAllScheme = useCallback(async () => {
        const { result, error } = await fetchData(
          `/company-fee-scheme/company/${company_id}`,
          {
            method: "GET"
          }
        );
        if (error) {
          setCompanyScheme([]);
        } else {
          setCompanyScheme(result);
        }
    }, [company_id])

    useEffect(() => {
        if (!user) return
        setUserData(user)
        setCompanyId(user?.company.company_id)
    }, [user])

    useEffect(() => {
        if (company_id) {
            handleFetchAllScheme()
        }
    }, [company_id])
    
    const [isModalOpen , setModalOpen]  = useState(false);
    const handleAddSchema =()=>{
        setModalOpen(true);
    }
    return (
        <NavBar pageName={"Service Fee"}>
            <div className="flex flex-col">
                <TopBar userData={userData} />
                <DashboardCards />
                <ServiceFeeTable
                    companyScheme={companyScheme}
                    addFeeScheme={handleAddSchema}
                    handleFetchAllScheme={handleFetchAllScheme}
                />
                <AddSchemaModal 
                    closeModal={() => {setModalOpen(false)}}
                    company_id={company_id}
                    isModalOpen={isModalOpen}
                    handleFetchAllScheme={handleFetchAllScheme}
                />
            </div>
        </NavBar>
    );
}

export default ServiceFeePage
