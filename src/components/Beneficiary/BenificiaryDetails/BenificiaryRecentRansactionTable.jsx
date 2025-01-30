/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import CheckBox from "@/components/Elements/Checkbox/CheckBox";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import DateTime from "@/components/Elements/DateTime/DateTime";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "./list.css";
import Tag from "@/components/Elements/Tag/Tag";
import Action from "@/components/Elements/Action/Action";
import { Checkbox } from "primereact/checkbox";
import TableTopCard from "@/components/Elements/DataTable/topCard";
import useIsMobile from "@/hooks/useIsMobile";
import TransactionDetailsModal from "@/components/Elements/TransactionDetailsModal";
import VerticalThreeDots from "@/Icons/VerticalThreeDots";

import Image from "next/image";
import ArrowDown from "@/Icons/ArrowDown";
import ArrowUp from "@/Icons/ArrowUp";
import Dollar from "@/Icons/imageicon/Dollar";
import Btc from "@/Icons/imageicon/Btc";

export default function BenificiaryRecentRansactionTable({
  isFromFinancialsTable = true,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([
    {
      id: "302012",
      name: "Received",
      amount: 100,
      date: "01/08/24",
      currency: "BTC",
      action: "send",
      currencyImg: <Btc className="h-8 w-8 rounded-full" />,
      toFrom: "basel.watwallet",
    },
    {
      id: "302013",
      name: "Sent",
      amount: 200,
      date: "02/08/24",
      currency: "USD",
      action: "receive",
      currencyImg: <Dollar className="h-8 w-8 rounded-full" />,
      toFrom: "AUFGR345..785kkh",
    },
  ]);
  const isMobile = useIsMobile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleOption = (action, transaction) => {
    if (action === "View Details") {
      setSelectedTransaction(transaction);
      setIsModalOpen(true);
    }
  };

  const companyIdTemplate = (rowData) => {
    return (
      <div className="flex items-start gap-1">
        <Checkbox className="custom-checkbox" checked={false} />
        <p className="text-xs font-medium text-textBlack">#{rowData?.id}</p>
      </div>
    );
  };

  const TransactionTypeTemplate = (rowData) => {
    return (
      <div className="flex gap-2 align-items-center">
        <div className="flex flex-row items-center gap-2">
          {rowData.action === "send" ? (
            <ArrowUp className={"w-6 h-6"} />
          ) : (
            <ArrowDown className={"w-6 h-6"} />
          )}
          <p className=" cursor-pointer">{rowData?.action}</p>
        </div>
      </div>
    );
  };
  const CurrencyTemplate = (rowData) => {
    return (
      <div className="flex gap-2 align-items-center">
        <div className="flex flex-row items-center gap-2">
          {rowData.currencyImg}
          <p className=" cursor-pointer">{rowData?.currency}</p>
        </div>
      </div>
    );
  };

  const companyToFromTemplate = (rowData) => {
    return (
      <div className="flex gap-2 align-items-center">
        <div className="flex flex-row">
          <p className="text-xs">{rowData?.toFrom}</p>
        </div>
      </div>
    );
  };

  const companyLastActivityTemplate = (rowData) => {
    return (
      <div className="flex gap-2 align-items-center">
        <div className="flex flex-row">
          <DateTime date={rowData?.updated_at}></DateTime>
        </div>
      </div>
    );
  };

  const companyStatusTemplate = (rowData) => {
    const status = rowData.status
      ? rowData.active
        ? "success"
        : "danger"
      : "warning";
    return (
      <Tag
        status={status}
        text={
          status == "success"
            ? "Active"
            : status == "danger"
            ? "Suspended"
            : "Pending"
        }
      ></Tag>
    );
  };

  const companyActionTemplate = (rowData) => {
    const status = rowData.status
      ? rowData.active
        ? "success"
        : "danger"
      : "warning";
    return !isModalOpen ? (
      <Action>
        {status == "warning" && (
          <li
            onClick={() => handleOption("Approve")}
            className="px-4 py-2 text-success cursor-pointer hover:bg-gray-50"
          >
            Approve
          </li>
        )}
        <li
          onClick={() => handleOption("View Details", rowData)}
          className="px-4 py-2 cursor-pointer text-textBlack hover:bg-gray-50"
        >
          View Details
        </li>
        <li
          onClick={() => handleOption("Request More Info")}
          className="px-4 py-2 cursor-pointer text-textBlack hover:bg-gray-50"
        >
          Request More Info
        </li>
        {status == "warning" && (
          <li
            onClick={() => handleOption("Reject")}
            className="px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-50"
          >
            Reject
          </li>
        )}
        {status == "success" && (
          <li
            onClick={() => handleOption("Suspend")}
            className="px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-50"
          >
            Suspend
          </li>
        )}
        {status == "danger" && (
          <li
            onClick={() => handleOption("Activate")}
            className="px-4 py-2 text-success cursor-pointer hover:bg-gray-50"
          >
            Activate
          </li>
        )}
      </Action>
    ) : (
      <VerticalThreeDots />
    );
  };

  const handleSortChange = (sort) => {
    //SORT Logic
  };

  const handleFilterChange = (filter) => {
    //Filter Logic
  };

  return (
    <>
      <div className="pt-4 overflow-x-auto bg-white border rounded-2xl border-primary50">
        <TableTopCard
          title={"Transactions"}
          isStatementVisible={true}
          searchTerm={searchTerm}
          isAddBtnVisible={false}
          isSearchVisible={true}
          setSearchTerm={setSearchTerm}
          handleSortChange={handleSortChange}
          handleFilterChange={handleFilterChange}
          isFromFinancialsTable={isFromFinancialsTable}
        />
        {data ? (
          <>
            <DataTable
              value={data}
              paginator
              paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} companies"
              rows={20}
              // selection={selectedCustomer}
              // onSelectionChange={(e) => setSelectedCustomer(e.value)}
              selectionMode="single"
              // onClick={handleClick}
              dataKey="id"
              stateStorage="session"
              stateKey="dt-state-demo-local"
            >
              <Column
                header={
                  <div className="flex gap-1">
                    <Checkbox className="custom-checkbox" checked={false} />
                    <p className="text-xs font-medium text-textBlack">ID</p>
                  </div>
                }
                body={companyIdTemplate}
                sortable
                sortField="representative.name"
              ></Column>
              <Column
                body={TransactionTypeTemplate}
                header={
                  <p className="text-xs font-medium text-textBlack">
                    Transaction Type
                  </p>
                }
                sortable
                className="text-xs font-medium text-textLight"
              ></Column>
              {!isMobile && (
                <Column
                  body={CurrencyTemplate}
                  header={
                    <p className="text-xs font-medium text-textBlack">
                      Currency
                    </p>
                  }
                  sortable
                  className="text-xs font-medium text-textLight"
                ></Column>
              )}
              {!isMobile && (
                <Column
                  body={companyToFromTemplate}
                  header={
                    <p className="text-xs font-medium text-textBlack">
                      To/From
                    </p>
                  }
                  sortable
                  className="text-xs font-medium text-textLight"
                ></Column>
              )}
              {!isMobile && (
                <Column
                  header={
                    <p className="text-xs font-medium text-textBlack">Status</p>
                  }
                  body={companyStatusTemplate}
                  sortable
                  className="text-xs font-medium text-textBlack"
                ></Column>
              )}
              {!isMobile && (
                <Column
                  header={
                    <p className="text-xs font-medium text-textBlack">Action</p>
                  }
                  body={companyActionTemplate}
                  sortable
                  className="text-xs font-medium text-textLight"
                ></Column>
              )}
            </DataTable>
          </>
        ) : (
          <p className="flex items-center w-full p-4">
            No teams available to show
          </p>
        )}
      </div>

      {selectedTransaction && (
        <TransactionDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          transaction={selectedTransaction}
        />
      )}
    </>
  );
}
