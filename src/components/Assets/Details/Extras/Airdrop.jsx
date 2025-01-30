import React, { useState } from "react";
import Button, { ButtonsText, TextButton } from "@/components/Elements/Button/Button";
import VerticalThreeDots from "@/Icons/VerticalThreeDots";
import Search from "@/Icons/Search";
import DropDown from "@/components/Elements/DropDown/DropDown";
import TransactionsDetailsModal from "@/components/Transactions/TransactionsDetailsModal";
import Decrease from "@/Icons/Decrease";
import Increase from "@/Icons/Increase";
import FilterModal from "@/components/Elements/FilterModal/FilterModal";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import CheckBox from "@/components/Elements/Checkbox/CheckBox";
import Tag from "@/components/Elements/Tag/Tag";
import Action from "@/components/Elements/Action/Action";
import useIsMobile from "@/hooks/useIsMobile";
import NFTTableComponent from "@/components/Elements/DataTable/Assets/nft";
import OffersTableComponent from "@/components/Elements/DataTable/Assets/offer";

const tokenDetails = [
  { label: "Token Name", value: "12" },
  { label: "Faucet Address", value: "12" },
  { label: "Token Ticker", value: "12" },
  { label: "Daily Limit", value: "xx xxx xxxx" },
  { label: "Chain", value: "xx xxx xxxx" },
  { label: "Status", value: "xx xxx xxxx" },
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
export default function AirdropTab() {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const data = [
    {
      id: "#302012",
      date: "Sep 23 2023",
      name: "#1212",
      currency: "100",
      status: "Pending",
    },
    {
      id: "#302012",
      date: "Sep 23 2023",
      name: "#1212",
      currency: "100",
      status: "Rejected",
    },
  ];
  const data1 = [
    {
      id: "302012",
      currency: "NFT1",
      amount: "100",
      date: "Sep 23 -2023",
    },
    {
      id: "302012",
      currency: "NFT2",
      amount: "100",
      date: "Sep 23 -2023",
    },
  ];

  const gender = [
    { value: "1", label: "Male" },
    { value: "2", label: "Female" },
  ];

  const assetIdTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-1 sm:pl-5">
        <CheckBox></CheckBox>
        <p className="line-clamp-1">#{rowData?.id}</p>
      </div>
    );
  };

  const referenceTemplate = (rowData) => {
    return <p>{rowData?.name}</p>;
  };

  const assetValueTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2">
        <p className="w-4 h-4 rounded-full bg-primary50"></p>
        <p>{rowData?.currency}</p>
      </div>
    );
  };

  const assetAmountTemplate = (rowData) => {
    return <p>{rowData?.amount}</p>;
  };

  const assetDateTemplate = (rowData) => {
    return <p className="cursor-pointer line-clamp-1">{rowData?.date}</p>;
  };

  const assetStatusTemplate = (rowData) => {
    // const status = rowData.status
    //   ? rowData.active
    //     ? "success"
    //     : "danger"
    //   : "warning";
    const status =
      rowData.status === "Active"
        ? "success"
        : rowData.status === "Pending"
        ? "warning"
        : "danger";
    return (
      <Tag
        status={status}
        text={rowData.status}
        // text={
        //   status === "success"
        //     ? "Trading"
        //     : status === "danger"
        //       ? "Suspended"
        //       : "Inactive"
        // }
      />
    );
  };

  const assetActionTemplate = (rowData) => {
    const status =
      rowData?.status === "Approved"
        ? "success"
        : rowData?.status === "Pending"
        ? "warning"
        : "danger";

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

  const handleFilterChange = (filter) => {
    //Filter Logic
  };

  return (
    <>
      <div className="grid grid-cols-2 justify-between gap-2 md:gap-3 flex-grow">
        {/* Left Section */}
        <div className="col-span-2 xl:col-span-1 w-full">
          {/* Status Card */}
          <NFTTableComponent
            data={data1}
            title="Airdrop List"
            isAddBtnVisible={false}
            isStatementVisible={false}
          />
        </div>

        {/* Right Section */}
        <div className="col-span-2 xl:col-span-1 w-full">
          <div className="bg-white rounded-2xl shadow-sm flex flex-col h-full p-2 xl:p-4">
            <div className="pb-3">
              <div className="flex items-center justify-between pb-4">
                <p className="text-[14px] font-semibold leading-[20px] tracking-[-0.005em] text-textBlack text-left">
                  Airdrop Details
                </p>
                <ButtonsText
                  title="Start"
                  width="w-auto"
                  onClick={openModal}
                  textColor="text-textBlack"
                  backgroundColor="bg-white"
                  borderColor="border border-primary50"
                />
              </div>
              <div className="flex flex-col items-start justify-center w-full gap-3">
                {tokenDetails.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between w-full gap-1"
                  >
                    <p className="text-xs font-medium text-textSecondary leading-[16px] text-left mb-2">
                      {item.label}
                    </p>
                    <p className="text-xs font-semibold text-textBlack leading-[16px] text-right mb-2">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex flex-row w-full items-end gap-4 mt-3">
                <div className="w-full">
                  <p className="text-sm font-semibold mb-3 leading-[20px] tracking-[-0.005em] text-left">
                    Airdrop Rules
                  </p>
                  <div className="flex flex-wrap sm:flex-nowrap flex-row items-center gap-1">
                    <p className="text-xs">A1</p>
                    <input
                      type="text"
                      placeholder="Criteria"
                      className="border border-gray-300 p-3 rounded-[10px] text-xs custom-placeholder w-full h-[32px]"
                    />
                    <input
                      type="text"
                      placeholder="Equals"
                      className="border border-gray-300 p-3 rounded-[10px] text-xs custom-placeholder w-full h-[32px]"
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      className="border border-gray-300 p-3 rounded-[10px] text-xs custom-placeholder w-full h-[32px]"
                    />
                    <button>
                      <Decrease />
                    </button>
                    <button>
                      <Increase />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap sm:flex-nowrap w-full items-center gap-3 mt-3">
                <div className="felx flex-col w-full  gap-2">
                  <p className="text-sm font-semibold mb-2 leading-[20px] tracking-[-0.005em] text-left">
                    Airdrop Criteria
                  </p>
                  <p className="text-xs text-nowrap">Rule #1</p>
                  {/*<div className="flex flex-wrap items-center gap-3">*/}
                  <div className="flex flex-row flex-wrap sm:flex-nowrap items-center gap-1">
                    <DropDown
                      items={gender}
                      className="w-full"
                      title="(A1 and A2) or A3"
                    />
                    <button>
                      <Decrease />
                    </button>
                    <button>
                      <Increase />
                    </button>
                  </div>
                  {/*</div>*/}
                </div>
              </div>
            </div>

            <OffersTableComponent
              data={data}
              title="Distributions"
              isAddBtnVisible={false}
              isStatementVisible={false}


            />

            <div className="flex items-center justify-end mt-2">
              <TextButton
                title="Decline"
                onClick={openModal}
                textColor="text-alert"
                backgroundColor="bg-white"
                borderColor="border-alert"
                className="border"
              />
            </div>
          </div>
        </div>
      </div>
      <TransactionsDetailsModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      >
        {" "}
      </TransactionsDetailsModal>
    </>
  );
}
