import Tick from "@/Icons/Tick";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Checkbox } from "primereact/checkbox";
import Tag from "@/components/Elements/Tag/Tag";
import Action from "@/components/Elements/Action/Action";
import S3Image from "@/components/Elements/S3Image/S3Image";
import Currency from "../Currency/Currency";
import "../Checkbox/CheckBox.css";
import ArrowDown from "@/Icons/ArrowDown";
import ArrowUp from "@/Icons/ArrowUp";

export const cryptoCheckboxTemplate = (rowData) => (
  <div className="flex items-start">
    <Checkbox className="custom-checkbox" checked={false} value={rowData.id} />
  </div>
);

export const AssetIdTemplate = (rowData) => {
  const [checked, setChecked] = useState(false);
  return (
    <div
      className="flex items-start cursor-pointer"
      onClick={() => setChecked((prev) => !prev)}
    >
      <Checkbox checked={checked} className="custom-checkbox" />
      <p className="font-medium text-xs text-textBlack">#{rowData?.id}</p>
    </div>
  );
};

export const AssetNameTemplate = (rowData, link) => {
  const { push } = useRouter();
  return (
    <div className="flex align-items-center gap-1" onClick={() => push(link)}>
      <div className="flex flex-row gap-1 items-center">
        <S3Image
          className="w-5 h-5 sm:w-8 sm:h-8 rounded-full"
          s3Url={rowData?.icon}
        />
        <p className="cursor-pointer line-clamp-1">{rowData?.name}</p>
      </div>
    </div>
  );
};

export const NetworkNameTemplate = (rowData, openDetailsModal) => {
  return (
    <div className="flex align-items-center gap-1" onClick={openDetailsModal}>
      <div className="flex flex-row gap-1 items-center">
        <Tick className="w-5 h-5" />
        <p className="cursor-pointer line-clamp-1 font-normal">
          {rowData?.name}
        </p>
      </div>
    </div>
  );
};

export const assetUsdValueTemplate = (rowData, link) => {
  return (
    <Link href={link ?? "/dashboard/assets"} className="decoration-0">
      <span>{rowData?.usd_value}$</span>{" "}
      <span className="text-success">↑ 3%</span>
    </Link>
  );
};

export const assetTypeTemplate = (rowData, link) => {
  return <Link href={link ?? "/dashboard/assets"}>{rowData?.type}</Link>;
};

export const assetStatusTemplate = (rowData) => {
  const status = rowData.status
    ? rowData.active
      ? "success"
      : "danger"
    : "warning";

  // Set background colors based on status
  const backgroundColor =
    status === "success"
      ? "bg-success"
      : status === "danger"
      ? "bg-red-500"
      : "bg-gray-500";

  return (
    <Tag
      status={status}
      text={
        status === "success"
          ? "Active"
          : status === "danger"
          ? "Inactive"
          : "Inactive"
      }
      className={`text-white ${backgroundColor}`}
    />
  );
};

export const AssetActionTemplate = (rowData, handleOption) => {
  const { push } = useRouter();
  const status = rowData.status
    ? rowData.active
      ? "success"
      : "danger"
    : "warning";
  return (
    <Action>
      {status === "warning" && (
        <li
          onClick={() => handleOption && handleOption("Activate", rowData)}
          className="px-4 py-2 text-success cursor-pointer hover:bg-gray-50"
        >
          Activate
        </li>
      )}
      <li
        onClick={() => {
          rowData?.asset_id &&
            push(`/dashboard/assets/detail/${rowData.asset_id}`);
          // handleOption("View Details")
        }}
        className="px-4 text-textBlack py-2 cursor-pointer hover:bg-gray-50"
      >
        View Details
      </li>
      <li
        onClick={() => {
          handleOption && handleOption("Edit Details", rowData);
        }}
        className="px-4  text-textBlack py-2 cursor-pointer hover:bg-gray-50"
      >
        Edit Details
      </li>
      {status === "warning" && (
        <li
          onClick={() => handleOption && handleOption("Reject", rowData)}
          className="px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-50"
        >
          Deactivate
        </li>
      )}
      {status === "success" && (
        <li
          onClick={() => handleOption && handleOption("Suspend", rowData)}
          className="px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-50"
        >
          Stop Trading
        </li>
      )}
      {status === "danger" && (
        <li
          onClick={() => handleOption && handleOption("Activate", rowData)}
          className="px-4 py-2 text-success cursor-pointer hover:bg-gray-50"
        >
          Activate
        </li>
      )}
    </Action>
  );
};

export const NetworkActionTemplate = (
  rowData,
  setSelectedNetwork,
  openEditModal,
  openDeleteModal
) => {
  return (
    <Action>
      <div className="z-50">
        <li
          onClick={() => {
            setSelectedNetwork(rowData);
            openEditModal();
          }}
          className="px-4 py-2 cursor-pointer text-textBlack hover:bg-gray-50 hover:rounded-xl"
        >
          Edit
        </li>
        <li
          onClick={() => {
            setSelectedNetwork(rowData);
            openDeleteModal();
          }}
          className="px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-50"
        >
          Delete
        </li>
      </div>
    </Action>
  );
};

export const NetworkWalletTemplate = (rowData) => {
  const walletData = rowData?.wallet || "10 BTC";
  return <p>{walletData}</p>;
};

export const NetworkIPTemplate = (rowData) => {
  const IPAddresstData = rowData?.ipAddress || "127.0.0.1";
  return <p>{IPAddresstData}</p>;
};

export const NetworkUpTimeTemplate = (rowData) => {
  const UptimeData = rowData?.uptime || "Sep 23-2023 02:02:30";
  return <p>{UptimeData}</p>;
};

export const ActivityNameTemplate = (rowData) => {
  return (
    <p className="flex items-center">
      <span className="w-3 h-3 mr-2 bg-success rounded-full"></span>
      {rowData.activity}
    </p>
  );
};

export const RulesTemplate = (rowData) => {
  return <p>{rowData.rules}</p>;
};

export const FeeTemplate = (rowData) => {
  return <p>{parseInt(rowData.fee).toFixed(2)}</p>;
};

export const assetReferenceTemplate = (rowData) => {
  return <p>{rowData?.reference}</p>;
};

export const assetAmountTemplate = (rowData) => {
  return <p>{rowData?.amount}</p>;
};

export const assetValueTemplate = (rowData) => {
  return <p>{rowData?.value}</p>;
};

export const transactionStatusTemplate = (rowData) => {
  // const status = rowData.status
  //   ? rowData.active
  //     ? "success"
  //     : "danger"
  //   : "warning"
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

export const assetWalletStatusTemplate = (rowData) => {
  // const status = rowData.status
  //   ? rowData.active
  //     ? "success"
  //     : "danger"
  //   : "warning"
  const status =
    rowData.status === "Active"
      ? "success"
      : rowData.status === "Pending"
      ? "warning"
      : "danger";
  return (
    <Tag
      status={status}
      // text={rowData.status}
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

export const transactionTypeTemplate = (rowData) => {
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

export const transactionsStatusTemplate = (rowData) => {
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

export const TransactionActionTemplate = (rowData) => {
  const { push } = useRouter();
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

export const CountryNameTemplate = (rowData) => {
  return (
    <div className="flex gap-2.5 items-center">
      <Image
        src={"/assets/icons/flag.svg"}
        alt="tick"
        className="rounded-full"
        width={24}
        height={24}
      />

      {/* <Flag className="w-6 h-6 rounded-full" /> */}
      <p className="cursor-pointer line-clamp-1">{rowData["Country"]}</p>
    </div>
  );
};

export const CryptoAssetTemplate = (rowData) => {
  return (
    <div className="flex flex-row items-center gap-2 ">
      <div className="flex relative">
        <S3Image
          className="w-[24px] h-[24px] rounded-full"
          s3Url={rowData?.icon}
        />
        {rowData?.network && (
          <S3Image
            className="w-[12px] h-[12px] rounded-full bottom-0 right-0 absolute"
            s3Url={rowData?.network_icon}
          />
        )}
      </div>

      <p className="flex flex-col gap-1">
        <span className="text-xs text-[#272727] font-semibold">
          {rowData?.asset} {rowData.network && ` (${rowData?.network?.name})`}
        </span>
        <span className="text-xs font-normal text-[#808092]">
          {rowData?.marketCap || rowData?.subAsset}
        </span>
      </p>
    </div>
  );
};

export const CryptoPriceTemplate = (rowData) => {
  return (
    <p className="flex flex-col items-center justify-between gap-1">
      <span className="text-sm text-[#272727] font-normal">
        <Currency>{rowData?.price}</Currency>
      </span>
      {rowData?.priceChange > 0 ? (
        <span className="text-xs font-normal text-success">
          {rowData?.priceChange}%
        </span>
      ) : (
        <span className="text-xs font-normal text-red-600">
          {rowData?.priceChange}%
        </span>
      )}
    </p>
  );
};

export const CryptoBalanceTemplate = (rowData) => {
  return (
    <p className="flex flex-col items-center justify-between gap-1">
      <span className="text-sm text-[#272727] font-normal">
        {rowData?.balance}
      </span>
      <span className="text-xs font-normal text-[#5F5F6F]">
        <Currency>{rowData?.balanceUSD}</Currency>
      </span>
    </p>
  );
};

export const CryptoPortfolioTemplate = (rowData) => {
  return (
    <p className="flex flex-col items-end justify-between gap-1">
      <span className="text-sm text-[#272727] font-normal">
        {rowData?.portfolioPercent}
      </span>
      <span className="text-xs font-normal text-[#5F5F6F]">
        <Currency>{rowData?.valueUSD}</Currency>
      </span>
    </p>
  );
};


export const CompanyIdTemplate = (rowData) => {
  const [checked, setChecked] = useState(false);
  return (
    <div
      className="flex gap-x-1 cursor-pointer"
      onClick={() => setChecked((prev) => !prev)}
    >
      <Checkbox className="custom-checkbox " checked={checked} />
      <p className="text-xs font-medium text-textBlack">#{rowData?.id}</p>
    </div>
  );
};
