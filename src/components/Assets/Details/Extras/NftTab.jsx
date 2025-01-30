import React, { useState } from "react";
import { ButtonsText } from "@/components/Elements/Button/Button";
import NftDetailsModal from "./NftDetailsModal";
import CheckBox from "@/components/Elements/Checkbox/CheckBox";
import Tag from "@/components/Elements/Tag/Tag";
import Action from "@/components/Elements/Action/Action";
import useIsMobile from "@/hooks/useIsMobile";
import NFTTableComponent from "@/components/Elements/DataTable/Assets/nft";
import OffersTableComponent from "@/components/Elements/DataTable/Assets/offer";

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
const data = [
  {
    id: "#302012",
    uptime: "Sep 23 2023 02:02:30",
    name: "#1212",
    wallet: "100",
    status: "Pending",
  },
  {
    id: "#302012",
    uptime: "Sep 23 2023 02:02:30",
    name: "#1212",
    wallet: "100",
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
const transactionData = [
  {
    date: "Sep 23 -2023",
    to_from: "To/from",
    value: "100",
    status: "Pending",
  },
  {
    date: "Sep 23 -2023",
    to_from: "10",
    value: "100",
    status: "Rejected",
  },
];

const transactionDetails = [
  { label: "Sent On", value: "12" },
  { label: "Sent From", value: "12" },
  { label: "Sent Location", value: "xx xxx xxxx" },
  { label: "Sent IP Address", value: "xx xxx xxxx" },
  { label: "Service Charge", value: "xx xxx xxxx" },
  { label: "Status", value: "xx xxx xxxx" },
  { label: "Source of Transfer", value: "xx xxx xxxx" },
];

export default function NftTab() {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const assetIdTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-1 sm:pl-5">
        <CheckBox></CheckBox>
        <p className="line-clamp-1">#{rowData?.id}</p>
      </div>
    );
  };

  const to_fromTemplate = (rowData) => {
    return <p>{rowData?.to_from}</p>;
  };

  const assetValueTemplate = (rowData) => {
    return <p>{rowData?.value}</p>;
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
      <div className="grid grid-cols-2 gap-2">
        {/* Left Section */}
        <div className="col-span-2 xl:col-span-1 w-full">
          {/* Status Card */}
          <NFTTableComponent
            data={data1}
            title="NFTs List"
            isAddBtnVisible={false}
            isStatementVisible={false}
          />
        </div>

        {/* Right Section */}
        <div className="col-span-2 xl:col-span-1 w-full">
          <div className="bg-white rounded-2xl shadow-sm flex flex-col h-full p-4">
            <div className="pb-3">
              <div className="flex flex-wrap items-center justify-between pb-4">
                <p className="text-[14px] font-semibold leading-[20px] tracking-[-0.005em] text-textBlack">
                  NFT Details
                </p>
                <ButtonsText
                  width="w-auto"
                  className="border"
                  onClick={openModal}
                  title="View Artwork"
                  textColor="text-textBlack"
                  backgroundColor="bg-white"
                  borderColor="border-light"
                />
              </div>
              <div className="flex flex-col items-start justify-center w-full gap-3">
                {transactionDetails.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-1 items-center justify-between w-full "
                  >
                    <p className="text-[12px] font-medium leading-[16px] text-textSecondary mb-2 whitespace-nowrap">
                      {item.label}
                    </p>
                    <p className="w-full sm:w-auto text-[12px] font-semibold leading-[16px] text-textBlack text-right mb-2">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <OffersTableComponent
              title="Offers"
              isAddBtnVisible={false}
              isStatementVisible={false}
              data={transactionData}
            />
            <div className="flex justify-end space-x-2 mt-2">
              <ButtonsText
                title="Decline"
                textColor="text-alert"
                backgroundColor="bg-white"
                borderColor="border-alert"
                className="border w-[109px] h-8 rounded-lg"
              />
              <ButtonsText
                title="Approve"
                textColor="text-white"
                backgroundColor="bg-black"
                className="border w-[109px] h-8 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
      <NftDetailsModal isModalOpen={isModalOpen} closeModal={closeModal}>
        {" "}
      </NftDetailsModal>
    </>
  );
}
