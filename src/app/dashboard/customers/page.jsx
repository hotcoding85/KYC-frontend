"use client"

import React, {useEffect, useState} from "react";
import Btc from "@/Icons/CrytpoAssets/Btc";
import Usdt from "@/Icons/CrytpoAssets/Usdt";
import Eth from "@/Icons/CrytpoAssets/Eth";
import Ltc from "@/Icons/CrytpoAssets/Ltc";
import Bnb from "@/Icons/CrytpoAssets/Bnb";
import Ada from "@/Icons/CrytpoAssets/Ada";
import Xrp from "@/Icons/CrytpoAssets/Xrp";
import Layout from "@/components/NavBar/NavBar";
import ConfirmationModal from "@/components/Elements/ConfirmationModal";
import DashboardCards from "@/components/Transactions/DashboardCards";
import CustomerTable from "@/components/Customers/CustomerTable/CustomerTable";
import RequestMoreInfoModal from "@/components/Customers/RequestMoreInfoModal/RequestMoreInfoMoel";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useApi from "@/hooks/useApi"; // Import the modal component
import { useUser } from "@/app/context/UserContext";
const Page = () => {
    // State to track which option was clicked
    const [requestedInformationDetail, setSelectedOption] = useState(null);

    const { fetchData } = useApi();
    const [company_id, setCompanyId] =  useState(null)
    const { user, fetchUser } = useUser();
    const [modalContent, setModalContent] = useState({});

    useEffect(() => {
      if (!user) return

      setCompanyId(user?.company.company_id)
    }, [user])

    const [companyCustomers, setCompanyCustomers] = useState([])
    // State to control modal visibility
    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalCOpen, setModalCOpen] = useState(false);
    const router = useRouter();
    // Handle option selection
    const handleOption = (option, id) => {
        setSelectedOption(option); // Set the selected option
        if (option === "Request More Info") {
            setModalOpen(true); // Show modal when "Request More Info" is clicked
        }
        else if (option === 'View Details') {
          if (id) {
            const newPath = `/dashboard/customers/${id}`; 
            router.push(newPath);
          }
        }
        else if (option === 'Approve') {
          handleStatusChange({
            status: true,
            user_id: id
          })
        }
        else if(option === 'Suspend') {
          handleStatusChange({
            status: false,
            user_id: id
          })
        }
    };

    const handleStatusChange = (_data) => {
      if (!_data) return
      let content = {
        title: ` ${_data.status ? "Activate" : "Suspend"}`,
        description: `Are you sure you want to ${
          _data.status ? "Confirm activate" : "Confirm Suspension"
        } this user?`,
        confirmText: _data.status ? "Activate" : "Suspend",
        confirmColor: _data.status ? "bg-success" : "bg-error",
        onConfirm: () => handleUserStatus(_data),
      };
      setModalContent(content);
      setModalCOpen(true);
    }

    async function handleUserStatus(user) {
      const { result, error } = await fetchData(`/users/${user.user_id}`, {
        method: "PUT",
        body: {
          status: user.status,
        },
      });
      if (error) {
        setModalCOpen(false);
      } else {
        await fetchCompanyCustomers();
        setModalCOpen(false);
      }
    }

    async function fetchCompanyCustomers() {
      const { result, error } = await fetchData(
        `/company-customers/company/${company_id}`,
        {
          method: "GET",
        }
      );
      if (error) {
        setCompanyCustomers([]);
      } else {
        setCompanyCustomers(result);
      }
    }

    useEffect(() => {
      fetchCompanyCustomers()
    }, [company_id])

    // Close modal handler
    const closeModal = () => {
        setModalOpen(false); // Close modal
    };

    // Dropdown data
    const sortBy = [
        { value: "1", label: "Desc" },
        { value: "2", label: "Asc" },
    ];
    const asset = [
        { value: "1", label: "Crypto" },
        { value: "2", label: "Fiat" },
    ];
    const currency = [
        { value: "1", label: "BTC", img: <Btc /> },
        { value: "2", label: "USDT", img: <Usdt /> },
        { value: "3", label: "ETH", img: <Eth /> },
        { value: "4", label: "LTC", img: <Ltc /> },
        { value: "5", label: "BNB", img: <Bnb /> },
        { value: "6", label: "ADA", img: <Ada /> },
        { value: "7", label: "XRP", img: <Xrp /> },
    ];
    const transactions = [
        { value: "1", label: "Sent" },
        { value: "2", label: "Received" },
        { value: "3", label: "Swapped" },
    ];
    const date = [
        { value: "1", label: "Last week" },
        { value: "2", label: "Last Month" },
        { value: "3", label: "Last 3 Months" },
        { value: "4", label: "Last Year" },
        { value: "5", label: "Custom Date" },
    ];

    const metrics = [
        {
          title: 'Total Transactions',
          value: "1,234",
          change: 3,
          isPositive: true,
          chartLabel: "Total Transactions",
          chartValues: [800, 900, 700, 1100, 1000, 1200, 1234],
          color: "#16a34a",
        },
        {
          title: 'Total Volume',
          value: "100",
          change: -3,
          isPositive: false,
          chartLabel: "Total Volume",
          chartValues: [120, 115, 110, 100, 105, 98, 100],
          color: "#dc2626",
        },
        {
          title: 'Pending Transactions',
          value: "8",
          change: 3,
          isPositive: true,
          chartLabel: "Pending Transactions",
          chartValues: [6, 7, 8, 5, 7, 6, 8],
          color: "#16a34a",
        },
        {
          title: 'Failed Volume',
          value: "5",
          change: -3,
          isPositive: false,
          chartLabel: "Failed Transactions",
          chartValues: [3, 4, 2, 5, 4, 6, 5],
          color: "#dc2626",
        },
    ];

    return (
      <>
        <Layout pageName={"Customers"}>
          <DashboardCards stats={metrics} />
          {/*<div className="h-6"></div>*/}
          <div className="bg-white rounded-2xl mt-6">
            <div className="relative overflow-x-auto">
              {/* Customer table component */}
              <CustomerTable companyCustomers={companyCustomers} handleOption={handleOption} />
            </div>
          </div>

          {/* Request More Info Modal */}
          {isModalOpen && (
            <div className="h-3/12">
              <RequestMoreInfoModal isOpen={isModalOpen} onClose={closeModal} />
            </div>
          )}
          <ConfirmationModal
            isOpen={isModalCOpen}
            onClose={() => {setModalContent(false); setModalCOpen(false)}}
            title={modalContent.title}
            description={modalContent.description}
            confirmText={modalContent.confirmText}
            confirmColor={modalContent.confirmColor}
            onConfirm={modalContent.onConfirm}
            showForm={modalContent.showForm}
          />
        </Layout>
      </>
    );
};

export default Page;
