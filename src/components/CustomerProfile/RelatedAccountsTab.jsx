import React, { useEffect, useRef, useState } from "react";
import { useTable } from "react-table";
import Search from "@/Icons/Search";
import Received from "@/Icons/Received";
import Sent from "@/Icons/Sent";
import VerticalThreeDots from "@/Icons/VerticalThreeDots";
import DropDown from "@/components/Elements/DropDown/DropDown";
import Statement from "@/Icons/Statement";
import CheckBox from "../Elements/Checkbox/CheckBox";
import ChevronRight from "@/Icons/ChevronRight";
import ChevronLeft from "@/Icons/ChevronLeft";
import Btc from "@/Icons/CrytpoAssets/Btc";
import Usdt from "@/Icons/CrytpoAssets/Usdt";
import Eth from "@/Icons/CrytpoAssets/Eth";
import Ltc from "@/Icons/CrytpoAssets/Ltc";
import Bnb from "@/Icons/CrytpoAssets/Bnb";
import Ada from "@/Icons/CrytpoAssets/Ada";
import Xrp from "@/Icons/CrytpoAssets/Xrp";
import RelatedAccountsTableComponent from "@/components/Elements/DataTable/customers-profile/relatedAccounts";
import Dollar from "@/Icons/imageicon/Dollar";
import useApi from "@/hooks/useApi"; // Import the modal component
import { useUser } from "@/app/context/UserContext";

const RelatedAccountsTab = ({customerDetails}) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const { fetchData } = useApi();
    const [company_id, setCompanyId] =  useState(null)
    const { user, fetchUser } = useUser();
    useEffect(() => {
      if (!user) return
  
      setCompanyId(user?.company.company_id)
    }, [user])
  
    const [companyCustomers, setCompanyCustomers] = useState([])
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
        console.log(customerDetails)
        const filtered = result.filter(cst => cst.user_id !== customerDetails?.user_id)
        setCompanyCustomers(result);
      }
    }
  
    useEffect(() => {
      company_id && fetchCompanyCustomers()
    }, [company_id])

    const data = React.useMemo(
        () => [
            {
                id: "302012",
                customerName: "Emily Zhang",
                emailAddress: "Emilyzhang@gmail.com",
                phoneNumber: "00971 3453 56743",
                country: "USA",
                date: "Sep 23 -2023",
                totalAssets: "100",
                type: "Individual",
                lastActivity: "Sep 23 -2023",
                status: "Active",
            },
            {
                id: "302013",
                customerName: "Emily Zhang",
                emailAddress: "Emilyzhang@gmail.com",
                phoneNumber: "00971 3453 56743",
                country: "USA",
                date: "Sep 23 -2023",
                totalAssets: "500",
                type: "Individual",
                lastActivity: "Sep 23 -2023",
                status: "Inactive",
            },
            // Add more data rows as needed
        ],
        []
    );

    const columns = React.useMemo(
      () => [
        {
          Header: "ID",
          accessor: "id",
          Cell: ({ value }) => (
            <a href="#" className="text-sm font-semibold text-primary">
              {value}
            </a>
          ),
        },
        {
          Header: "Customer Name",
          accessor: "customerName",
          Cell: ({ value }) => (
            <a href="#" className="text-sm text-blue-500">
              {value}
            </a>
          ),
        },
        {
          Header: "Email Address",
          accessor: "email",
          Cell: ({ value }) => (
            <a href="#" className="text-sm text-blue-500">
              {value}
            </a>
          ),
        },
        // {
        //   Header: "Phone Number",
        //   accessor: "phoneNumber",
        // },
        {
          Header: "Country",
          accessor: "country",
          Cell: ({ value }) => (
            <span className="flex items-center text-sm">
              {value === "BTC" ? (
                <span className="mr-2 size-8">
                    <Btc className="" />
                </span>
              ) : (
                <span className="mr-2 size-8">
                    <Dollar className="w-6 h-6" />
                </span>
              )}
              {value}
            </span>
          ),
        },
        {
          Header: "Date",
          accessor: "dateRegistered",
          Cell: ({ value }) => <p className="text-sm">{value}</p>,
        },
        // {
        //   Header: "Total Assets",
        //   accessor: "totalAssets",
        // },
        // {
        //   Header: "Type",
        //   accessor: "type",
        // },
        {
          Header: "Last Activity",
          accessor: "lastActivity",
        },

        {
          Header: "Status",
          accessor: "status",
          Cell: ({ value }) => (
            <div
              className={`px-2 py-1 rounded-full w-24 text-center text-xs ${
                value === "Active"
                  ? "bg-successLight text-success"
                  : "bg-alertLight text-red-600"
              }`}
            >
              {value}
            </div>
          ),
        },
        {
          Header: "Action",
          accessor: "action",

          Cell: () => (
            <div className="text-center">
              <button className="text-primary hover:text-gray-600">
                <VerticalThreeDots />
              </button>
            </div>
          ),
        },
      ],
      []
    );

    

    const sortBy = [
      { value: "1", label: "Desc" },
      { value: "2", label: "Asc" },
    ];
    const asset = [
      { value: "1", label: "Crypto" },
      { value: "2", label: "Fiat" },
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
    const amount = [
      { value: "1", label: "Under $ 10K" },
      { value: "2", label: "$ 10K - 50K" },
      { value: "3", label: "$ 50K - 100K" },
      { value: "4", label: "$ 100K - 500K" },
      { value: "5", label: "Over 500K" },
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

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };

    const [isDateModalOpen, setDateModalOpen] = useState(false);
    const openDateModal = () => setDateModalOpen(true);
    const closeDateModal = () => setDateModalOpen(false);
    const handleDateChange = (dates) => {
      const [start, end] = dates;
      setSelectedRange([start, end]);
    };

    return (
      <>
        <RelatedAccountsTableComponent
          data={companyCustomers}
          title='Related Accounts'
          isAddBtnVisible={false}
          isStatementVisible={false}
        />
      </>
    );
};

export default RelatedAccountsTab;
