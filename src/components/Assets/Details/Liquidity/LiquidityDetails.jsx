import { TextButton } from "@/components/Elements/Button/Button";
import React, { useRef, useState } from "react";
import TransactionsDetailsModal from "@/components/Transactions/TransactionsDetailsModal";
import S3Image from "@/components/Elements/S3Image/S3Image";
import useApi from "@/hooks/useApi";
import { Toast } from "primereact/toast";
import Image from "next/image";
import CheckBox from "@/components/Elements/Checkbox/CheckBox";
import Tag from "@/components/Elements/Tag/Tag";
import Action from "@/components/Elements/Action/Action";
import useIsMobile from "@/hooks/useIsMobile";
import TransactionHistoryTableComponent from "@/components/Elements/DataTable/Assets/transactionHistory";
import Loadingdark from "@/Icons/Loadingdark";

const accountDetails = [
  { label: "Account Type", value: "12" },
  { label: "Active Since", value: "12" },
  { label: "Transaction In", value: "xx xxx xxxx" },
  { label: "Transaction Out", value: "xx xxx xxxx" },
  { label: "Liquidity Limit", value: "12" },
  { label: "Current Balance", value: "12" },
  { label: "Minimum Allowed Order", value: "xx xxx xxxx" },
  { label: "Maximum Allowed Order", value: "xx xxx xxxx" },
];

export default function LiquidityDetails({
  selectedLiquidity,
  handleFetchAndGoToOverviewTab,
}) {
  const isMobile = useIsMobile();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const { fetchData, loading } = useApi();
  const toast = useRef(null);
  const data = [
    {
      id: "302012",
      date: "Sep 23 -2023",
      reference: "#1212",
      amount: "10",
      value: "100",
      status: "Pending",
    },
    {
      id: "302012",
      date: "Sep 23 -2023",
      reference: "#1212",
      amount: "10",
      value: "100",
      status: "Rejected",
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

  const handleLiquidityDeactivate = async () => {
    if (!selectedLiquidity) {
      return;
    }

    const vendorId = selectedLiquidity.vendor_id;
    const { error } = await fetchData(`/vendor/${vendorId}`, {
      method: "PATCH",
      body: {
        status: !selectedLiquidity.status,
      },
    });
    if (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Something went wrong",
        life: 3000,
      });
    } else {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Suspended successfully",
        life: 3000,
      });
      handleFetchAndGoToOverviewTab();
    }
  };

  const assetIdTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-1 sm:pl-5">
        <CheckBox></CheckBox>
        <p className="line-clamp-1">#{rowData?.id}</p>
      </div>
    );
  };

  const assetDateTemplate = (rowData) => {
    return <p className="cursor-pointer line-clamp-1">{rowData?.date}</p>;
  };

  const assetReferenceTemplate = (rowData) => {
    return <p>{rowData?.reference}</p>;
  };

  const assetAmountTemplate = (rowData) => {
    return <p>{rowData?.amount}</p>;
  };

  const assetValueTemplate = (rowData) => {
    return <p>{rowData?.value}</p>;
  };

  const assetStatusTemplate = (rowData) => {
    // const status = rowData.status
    //   ? rowData.active
    //     ? "success"
    //     : "danger"
    //   : "warning";
    const status =
      rowData.status === "Approved"
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

  const handleFilterChange = (filter) => {
    //Filter Logic
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="grid grid-cols-8 gap-4 xl:gap-2 w-full justify-between">
        {/* Left Section */}

        <div className="col-span-8 xl:col-span-3 w-full p-4 bg-white rounded-2xl shadow-sm flex flex-col h-full gap-3">
          <>
            {selectedLiquidity &&
            selectedLiquidity.logo &&
            selectedLiquidity.logo.includes(
              "watpay.s3.eu-north-1.amazonaws.com"
            ) ? (
              <S3Image
                className="w-20 h-10 object-cover"
                s3Url={selectedLiquidity.logo}
              />
            ) : (
              <img
                src={selectedLiquidity?.logo || ""}
                alt="Logo"
                className="w-20 h-10 object-cover"
              />
            )}
          </>
          <div className="flex flex-col gap-3">
            {accountDetails.map((item, index) => (
              <div
                key={index}
                className="flex flex-wrap items-center justify-between gap-1"
              >
                <p className="text-[12px] font-medium leading-[16px] text-textSecondary font-inter text-left mb-2">
                  {item.label}
                </p>
                <p className="w-full sm:w-auto text-[12px] font-semibold leading-[16px] text-textBlack font-inter text-right mb-2">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end">
            <TextButton
              type="primary"
              textColor={
                selectedLiquidity.status ? "text-alert" : "text-white"
              }
              onClick={handleLiquidityDeactivate}
              isLoading={!selectedLiquidity || loading}
              title={!selectedLiquidity?.status ? "Activate" : "Deactivate"}
              backgroundColor={
                selectedLiquidity?.status ? "bg-white" : "bg-successLight"
              }
              borderColor={`${
                selectedLiquidity.status ? "border-alert" : "border-success"
              }`}
              className={`border`}
              icon={
                !selectedLiquidity || loading ? (
                  <Loadingdark className="w-5 h-5" />
                ) : undefined
              }
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-8 xl:col-span-5 w-full">
          <TransactionHistoryTableComponent
            data={data}
            isAddBtnVisible={false}
            isStatementVisible={false}
            title="Transaction History"
          />
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
