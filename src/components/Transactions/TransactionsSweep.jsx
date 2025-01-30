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
import NftDetailsModal from "../Assets/Details/Extras/NftDetailsModal";
import Button, { TextButton } from "../Elements/Button/Button";
import TransactionsDetailsModal from "./TransactionsDetailsModal";
import Btc from "@/Icons/CrytpoAssets/Btc";
import Usdt from "@/Icons/CrytpoAssets/Usdt";
import Eth from "@/Icons/CrytpoAssets/Eth";
import Ltc from "@/Icons/CrytpoAssets/Ltc";
import Bnb from "@/Icons/CrytpoAssets/Bnb";
import Ada from "@/Icons/CrytpoAssets/Ada";
import Xrp from "@/Icons/CrytpoAssets/Xrp";
import DatePickerModal from "./DatePickerModal";
import Filters from "@/Icons/Filters";
import Sort from "@/Icons/Sort";
import FiltersModal from "./FiltersModal";
import CloseFilter from "@/Icons/CloseFilter";
import Image from "next/image";
import FilterModal from "@/components/Elements/FilterModal/FilterModal";
import SortModal from "@/components/Elements/SortModal/SortModal";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import useIsMobile from "@/hooks/useIsMobile";
import Tag from "@/components/Elements/Tag/Tag";
import Action from "@/components/Elements/Action/Action";
import TransactionTableComponent from "@/components/Elements/DataTable/Assets/transactions";
import FinancialsTable from "../Companies/FinancialsTab/FinancialsTable";
import ArrowUp from "@/Icons/ArrowUp";
import ArrowDown from "@/Icons/ArrowDown";
import Dollar from "@/Icons/imageicon/Dollar";

const transactionData = [
  {
    id: "302012",
    type: "Received",
    to_from: "basel.watwallet",
    currency: "BTC",
    status: "Completed",
  },
  {
    id: "302012",
    type: "Sent",
    to_from: "basel.watwallet",
    currency: "USD",
    status: "Failed",
  },
];
const TransactionsSweep = () => {
  const isMobile = useIsMobile();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const [isFiltersModalOpen, setFiltersModalOpen] = useState(false);
  const openFiltersModal = () => setFiltersModalOpen(true);
  const closeFiltersModal = () => setFiltersModalOpen(false);

  const sortBy = [
    {
      label: "Created Data",
      value: "created_at",
      type: "date",
    },
    {
      label: "Name",
      value: "name",
      type: "text",
    },
    {
      label: "Amount",
      value: "amount",
      type: "value",
    },
  ];

  const filterSample = [
    {
      label: "Amount",
      icon: "Icon",
      value: "amount",
      type: "string",
      options: [
        {
          label: "10 K",
          icon: "Icon",
          value: "10",
        },
      ],
    },
    {
      label: "Amount",
      icon: "Icon",
      value: "amountc",
      type: "string",
      options: [
        {
          label: "10 K",
          icon: "Icon",
          value: "10",
        },
      ],
    },
    {
      label: "Amount",
      icon: "Icon",
      value: "amountd",
      type: "date",
    },
    {
      label: "Amount",
      icon: "Icon",
      value: "amountr",
      type: "category",
      category: [
        {
          value: "Fiatd",
          label: "Fiat",
          options: [
            {
              label: "10 K",
              value: "10",
            },
          ],
        },
        {
          value: "Fiatre",
          label: "Fiat",
          icon: "Icon",
          options: [
            {
              label: "10 K",
              icon: "Icon",
              value: "10",
            },
          ],
        },
      ],
    },
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

  const handleSortChange = (sort) => {
    //SORT Logic
  };

  const handleFilterChange = (filter) => {
    //Filter Logic
  };

  const CryptoIcon = ({ name }) => {
    if (name === "Bitcoin (BTC)")
      return (
    <Btc className="w-5 h-5 " />
      );
    if (name === "US Dollar")
      return (
    <Dollar className="w-5 h-5" />
      );
    return <div className="w-5 h-5 bg-gray-300 rounded-full"></div>;
  };

  const StatusBadge = ({ status }) => {
    const colorClass =
      status === "Completed"
        ? "bg-successLight text-success"
        : status === "Failed"
        ? "bg-alertLight text-alert"
        : "bg-yellow-100 text-yellow-800";
    return (
      <span
        className={`px-4 py-1 inline-flex justify-center text-sm leading-5 rounded-full w-24 text-center ${colorClass}`}
      >
        {status}
      </span>
    );
  };

  const TransactionType = ({ value }) => {
    return (
      <>
        {value === "Received" ? (
          <span className="flex flex-row items-center pr-2 space-x-2 text-sm text-gray-500">
            <Received /> <p>Received</p>
          </span> // Down arrow
        ) : (
          <span className="flex flex-row items-center pr-2 space-x-2 text-sm text-gray-500">
            <Sent /> <p>Sent</p>
          </span> // Up arrow
        )}
      </>
    );
  };

  const ActionDropdown = ({ id }) => {
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (dropdownId) => {
      if (openDropdown === dropdownId) {
        setOpenDropdown(null); // Close dropdown if it's already open
      } else {
        setOpenDropdown(dropdownId); // Open only the clicked dropdown
      }
    };

    // Close dropdown if clicked outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (!event.target.closest(".dropdown")) {
          setOpenDropdown(null); // Close when clicking outside
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div className="relative inline-block text-left">
        <button
          onClick={() => toggleDropdown(id)}
          className="inline-flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-500"
        >
          {/* Icon for the action button */}
          <VerticalThreeDots className="w-5 h-5" />
        </button>

        {/* Dropdown menu */}
        {openDropdown === id && (
          <div className="absolute right-0 z-50 w-56 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Pause Buying
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Pause Sending
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Freeze
              </a>
            </div>
          </div>
        )}
      </div>
    );
  };

  const transactionIdTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-1 sm:pl-5">
        <CheckBox></CheckBox>
        <p>#{rowData?.id}</p>
      </div>
    );
  };

  const transactionTypeTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-1">
        {rowData?.type === "Sent" ? (
         
          <ArrowUp className={"w-6 h-6"} />
        ) : (
        
          <ArrowDown className={"w-6 h-6"} />
        )}
        <p>{rowData?.type}</p>
      </div>
    );
  };

  const transactionToFromTemplate = (rowData) => {
    return <p>{rowData?.to_from}</p>;
  };

  const transactionCurrencyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-1">
        <Btc className="object-cover rounded-full w-[24] h-[24]" />
        <p>{rowData?.currency}</p>
      </div>
    );
  };

  const transactionStatusTemplate = (rowData) => {
    const status = rowData.status === "Completed" ? "success" : "danger";

    return (
      <Tag
        status={status}
        text={
          status === "success"
            ? "Trading"
            : status === "danger"
            ? "Suspended"
            : "Inactive"
        }
      />
    );
  };

  const transactionActionTemplate = (rowData) => {
    const status = rowData.status
      ? rowData.active
        ? "success"
        : "danger"
      : "warning";
    return (
      <Action>
        {status === "warning" && (
          <li
            onClick={() => handleOption("Activate", rowData)}
            className="px-4 py-2 text-success cursor-pointer hover:bg-gray-50"
          >
            Activate
          </li>
        )}
        <li
          onClick={() => {
            push(`/dashboard/assets/detail/${rowData.asset_id}`);
            // handleOption("View Details")
          }}
          className="px-4 py-2 cursor-pointer text-textBlack hover:bg-gray-50"
        >
          View Details
        </li>
        <li
          onClick={() => {
            handleOption("Edit Details", rowData);
          }}
          className="px-4 py-2 cursor-pointer text-textBlack hover:bg-gray-50"
        >
          Edit Details
        </li>
        {status === "warning" && (
          <li
            onClick={() => handleOption("Reject", rowData)}
            className="px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-50"
          >
            Deactivate
          </li>
        )}
        {status === "success" && (
          <li
            onClick={() => handleOption("Suspend", rowData)}
            className="px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-50"
          >
            Stop Trading
          </li>
        )}
        {status === "danger" && (
          <li
            onClick={() => handleOption("Activate", rowData)}
            className="px-4 py-2 text-success cursor-pointer hover:bg-gray-50"
          >
            Activate
          </li>
        )}
      </Action>
    );
  };

  const [dummyData, setDummyData] = useState([
    {
      id: "302012",
      name: "Received",
      amount: 100,
      date: "01/08/24",
      currency: "Credit",
    },
    {
      id: "302013",
      name: "Sent",
      amount: 200,
      date: "02/08/24",
      currency: "Debit",
    },
  ]);

  return (
    <>
      <div className="bg-white rounded-2xl border border-primary50 p-4 mb-2">
        <h3 className="font-semibold text-sm text-textBlack font-inter pb-3 ">
          Summary
        </h3>
        <div className="flex flex-wrap items-center justify-start">
          <div className="flex items-center justify-between w-full sm:w-1/3 sm:block">
            <p className="pb-2 text-xs font-medium text-textSecondary leading-4 text-left">
              EOAs Swept
            </p>
            <p className="text-xs font-semibold text-textBlack leading-4 text-left">
              12 BTC
              <span className="ml-2 text-primary100  text-xs font-semibold leading-4">
                1,200 USD
              </span>
            </p>
          </div>
          <div className="flex items-center justify-between w-full sm:w-1/3 sm:block">
            <p className="pb-2 text-xs font-medium text-textSecondary leading-4 text-left">
              Gas Price Incurred
            </p>
            <p className="text-xs font-semibold text-textBlack leading-4 text-left">
              12 BTC
              <span className="ml-2 text-primary100 text-xs font-semibold leading-4">
                1,200 USD
              </span>
            </p>
          </div>
          <div className="flex items-center justify-between w-full sm:w-1/3 sm:block">
            <p className="pb-2 text-xs font-medium text-textSecondary leading-4 text-left">
              Total Swept
            </p>
            <p className="text-xs font-semibold text-textBlack leading-4 text-left">
              12 BTC
              <span className="ml-2 text-primary100 text-xs font-semibold leading-4">
                1,200 USD
              </span>
            </p>
          </div>
        </div>
      </div>

      <FinancialsTable companies={dummyData} isFromFinancialsTable={true} />

      <TransactionsDetailsModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
      <DatePickerModal
        isModalOpen={isDateModalOpen}
        closeModal={closeDateModal}
        onDateChange={handleDateChange}
      />
      <FiltersModal
        closeModal={closeFiltersModal}
        isModalOpen={isFiltersModalOpen}
      />
    </>
  );
};

export default TransactionsSweep;
