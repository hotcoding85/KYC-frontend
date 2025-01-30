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
const TransactionsServiceFee = () => {
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
          <Btc className="rounded-full object-cover w-[24px] h-[24px]" />
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
          className="px-4 text-textBlack py-2 cursor-pointer hover:bg-gray-50"
        >
          View Details
        </li>
        <li
          onClick={() => {
            handleOption("Edit Details", rowData);
          }}
          className="px-4  text-textBlack py-2 cursor-pointer hover:bg-gray-50"
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
          <div className="w-full sm:w-1/3 flex items-center justify-between sm:block pb-4">
            <p className="pb-2 text-xs font-medium text-textSecondary leading-4 text-left">
              Transaction Fees
            </p>
            <p className="text-xs font-semibold text-textBlack leading-4">
              12 BTC
              <span className="ml-2 text-primary100 text-xs font-semibold leading-4">
                1,200 USD
              </span>
            </p>
          </div>
          <div className="w-full sm:w-1/3 flex items-center justify-between sm:block pb-4">
            <p className="pb-2 text-xs font-medium text-textSecondary leading-4 text-left">
              Exchange Fees
            </p>
            <p className="text-xs font-semibold text-textBlack leading-4 text-left">
              12 BTC
              <span className="ml-2 text-primary100  text-xs font-semibold leading-4">
                1,200 USD
              </span>
            </p>
          </div>
          <div className="w-full sm:w-1/3 flex items-center justify-between sm:block pb-4">
            <p className="pb-2 text-xs font-medium text-textSecondary leading-4 text-left">
              Sell Fees
            </p>
            <p className="text-xs font-semibold text-textBlack leading-4 text-left">
              12 BTC
              <span className="ml-2 text-primary100  text-xs font-semibold leading-4">
                1,200 USD
              </span>
            </p>
          </div>
          <div className="w-full sm:w-1/3 flex items-center justify-between sm:block pb-4">
            <p className="pb-2 text-xs font-medium text-textSecondary leading-4 text-left">
              Transfer Fees
            </p>
            <p className="text-xs font-semibold text-textBlack leading-4 text-left">
              12 BTC
              <span className="ml-2 text-primary100  text-xs font-semibold leading-4">
                1,200 USD
              </span>
            </p>
          </div>
          <div className="w-full sm:w-1/3 flex items-center justify-between sm:block pb-4">
            <p className="pb-2 text-xs font-medium text-textSecondary leading-4 text-left">
              Buy Fees
            </p>
            <p className="text-xs font-semibold text-textBlack leading-4 text-left">
              12 BTC
              <span className="ml-2 text-primary100  text-xs font-semibold leading-4">
                1,200 USD
              </span>
            </p>
          </div>
          <div className="w-full sm:w-1/3 flex items-center justify-between sm:block pb-4">
            <p className="pb-2 text-xs font-medium text-textSecondary leading-4 text-left">
              Total Fees
            </p>
            <p className="text-xs font-semibold text-textBlack leading-4 text-left">
              12 BTC
              <span className="ml-2 text-primary100  text-xs font-semibold leading-4">
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

export default TransactionsServiceFee;
