"use client";
import React, { useEffect, useState } from "react";
import Search from "@/Icons/Search";
import DropDown from "@/components/Elements/DropDown/DropDown";
import CustomerTable from "@/components/Customers/CustomerTable/CustomerTable";
import RequestMoreInfoModal from "@/components/Customers/RequestMoreInfoModal/RequestMoreInfoMoel";
import Btc from "@/Icons/CrytpoAssets/Btc";
import Usdt from "@/Icons/CrytpoAssets/Usdt";
import Eth from "@/Icons/CrytpoAssets/Eth";
import Ltc from "@/Icons/CrytpoAssets/Ltc";
import Bnb from "@/Icons/CrytpoAssets/Bnb";
import Ada from "@/Icons/CrytpoAssets/Ada";
import Xrp from "@/Icons/CrytpoAssets/Xrp";
import useApi from "@/hooks/useApi";
import {useRouter} from "next/navigation";
import { ROLE } from "@/shared/enums";
export default function CustomersTab({ company_id }) {
  // State to track which option was clicked
  const [requestedInformationDetail, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { fetchData, loading, error } = useApi();
  const [companyCustomers, setCompanyCustomers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // State to control modal visibility
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleOption = async (action, user_id, formData) => {
    let updateData = {};
    let endpoint = `/users/${user_id}`;

    switch (action) {
      case "Approve":
        updateData = { status: true };
        break;
      case "Suspend":
        updateData = { status: false };
        break;
      case "Request More Info":
        setModalOpen(true);
        break;
      case "View Details":
        router.push(`/dashboard/customers/${user_id}?companyId=${company_id}`);
        break;
      default:
        console.log("Unknown action:", action);
        return;
    }
    const { result, error } = await fetchData(endpoint, {
      method: "PUT",
      body: updateData,
    });

    if (result) {
      setCompanyCustomers((prevResult) => prevResult.map((obj) => (obj.id === result.id ? result : obj)));
      console.log("Update Details:", result);
    } else if (error) {
      console.error("Error updating company:", error);
    }
  };

  // Close modal handler
  const closeModal = () => {
    setModalOpen(false); // Close modal
  };

  const handleSearch = (searchTerm) => {
    const filtered = companyCustomers.filter((company) =>
      company?.first_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
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

  async function fetchCompanyCustomers() {
    const { result, error } = await fetchData(`/company-customers/company/${company_id}`, {
      method: "GET",
    });
    if (error) {
      setCompanyCustomers([]);
    } else {
      setCompanyCustomers(result);
    }
  }

  useEffect(() => {
    fetchCompanyCustomers();
  }, []);

  return (
    <>
      <CustomerTable
        companyCustomers={searchTerm.length ? filteredData : companyCustomers}
        handleOption={handleOption}
      />

      {isModalOpen && (
        <div className="h-3/12">
          <RequestMoreInfoModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
      )}
    </>
  );
}
