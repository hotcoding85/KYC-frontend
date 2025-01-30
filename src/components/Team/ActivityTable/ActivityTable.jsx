"use client";
import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Tag from "@/components/Elements/Tag/Tag";
import SortModal from "@/components/Elements/SortModal/SortModal";
import FilterModal from "@/components/Elements/FilterModal/FilterModal";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Search from "@/Icons/Search";

const ActivityTable = ({ userData }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filterSample = [
    {
      label: "Activity Type",
      icon: "Icon",
      value: "activityType",
      type: "category",
      options: [
        { label: "Login", value: "Login" },
        // Add more activity types as needed
      ],
    },
    {
      label: "Status",
      icon: "Icon",
      value: "status",
      type: "category",
      options: [
        { label: "Pending", value: "Pending" },
        { label: "Success", value: "Success" },
        { label: "Failed", value: "Failed" },
      ],
    },
    {
      label: "Date",
      icon: "Icon",
      value: "dateTime",
      type: "date",
    },
  ];

  const handleFilterChange = (filter) => {
    // Filter Logic (to be implemented)
  };

  const sortBy = [
    { label: "Date & Time", value: "dateTime", type: "date" },
    { label: "Activity Type", value: "activityType", type: "text" },
    { label: "Status", value: "status", type: "text" },
  ];

  const handleSortChange = (sort) => {
    // Sort Logic (to be implemented)
  };

  const dateTimeTemplate = (rowData) => {
    const date = new Date(rowData.dateTime);
    return (
      <p className="cursor-pointer text-sm text-textLight">
        {date.toLocaleString()}
      </p>
    );
  };

  const activityTypeTemplate = (rowData) => {
    return (
      <p className="cursor-pointer text-sm text-textLight">
        {rowData.activityType}
      </p>
    );
  };

  const statusTemplate = (rowData) => {
    const status = rowData.status.toLowerCase();
    return (
      <Tag
        status={
          status === "success"
            ? "success"
            : status === "failed"
            ? "danger"
            : "warning"
        }
        text={rowData.status}
      />
    );
  };

  const detailsTemplate = (rowData) => {
    return (
      <p className="cursor-pointer text-sm text-textLight">{rowData.details}</p>
    );
  };

  const ipAddressTemplate = (rowData) => {
    return (
      <p className="cursor-pointer text-sm text-textLight">
        {rowData.ipAddress}
      </p>
    );
  };

  const deviceBrowserTemplate = (rowData) => {
    return (
      <p className="cursor-pointer text-sm text-textLight">
        {rowData.deviceBrowser}
      </p>
    );
  };

  return (
    <div className="bg-white rounded-2xl">
      <h2 className="text-[14px] font-semibold text-textBlack px-3 py-4 leading-[20px] tracking-[-0.005em] text-left ">
        Activity Log
      </h2>
      <div>
        {userData.activityLogs ? (
          <>
            <div className="flex flex-row items-center ml-2">
              <div className=" relative flex w-full h-8 mb-4  ">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search />
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-8 pr-4 py-2 h-8 border border-gray-300 w-4/12 rounded-[10px] text-[12px] font-normal leading-[16px] text-textSecondary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex space-x-4 items-center pr-6">
                <FilterModal
                  filters={filterSample}
                  onChange={handleFilterChange}
                />
                <SortModal
                  sortBy={sortBy}
                  onChange={handleSortChange}
                  className="text-nowrap"
                />
              </div>
            </div>

            <DataTable
              value={userData.activityLogs}
              paginator
              paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} activities"
              rows={20}
              selectionMode="single"
              dataKey="id"
              stateStorage="session"
              stateKey="dt-state-demo-local"
            >
              <Column
                header="Date & Time"
                body={dateTimeTemplate}
                sortable
                className="w-1/5 text-left text-textBlack text-[12px] font-medium leading-[16px]"
              />
              <Column
                header="Activity Type"
                body={activityTypeTemplate}
                sortable
                className="w-1/5 text-left text-textBlack text-[12px] font-medium leading-[16px]"
              />
              <Column
                header="Status"
                body={statusTemplate}
                sortable
                className="w-1/5 text-left text-textBlack text-[12px] font-medium leading-[16px]"
              />
              <Column
                header="Details"
                body={detailsTemplate}
                sortable
                style={{ width: "25%" }}
              />
              <Column
                header="IP Address"
                body={ipAddressTemplate}
                sortable
                className="w-1/5 text-left text-textBlack text-[12px] font-medium leading-[16px]"
              />
              <Column
                header="Device/Browser"
                body={deviceBrowserTemplate}
                sortable
                className="w-1/5 text-left text-textBlack text-[12px] font-medium leading-[16px]"
              />
            </DataTable>
          </>
        ) : (
          <p className="flex items-center w-full p-4">
            No activity logs available to show
          </p>
        )}
      </div>
    </div>
  );
};

export default ActivityTable;
