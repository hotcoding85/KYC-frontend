import React, { useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import useIsMobile from "@/hooks/useIsMobile";
import { Checkbox } from "primereact/checkbox";
import TableTopCard from "@/components/Elements/DataTable/topCard";
import DateTime from "@/components/Elements/DateTime/DateTime";
import CheckBox from "@/components/Elements/Checkbox/CheckBox";
import Tag from "@/components/Elements/Tag/Tag";
import Action from "@/components/Elements/Action/Action";

const TransactionsDataTableComponent = ({
  data,
  title,
  btnText,
  isSortable,
  handleClick,
  filteredData,
  handleSearch,
  handleSortChange,
  handleFilterChange,
  isFilterValueVisible = false,
}) => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");

  const companyIdTemplate = (rowData) => {
    return (
      <div className="flex gap-2 align-items-center">
        <div className="flex flex-row">
          <CheckBox/>
          <p>{rowData?.id}</p>
        </div>
      </div>
    );
  };

  const companyNameTemplate = (rowData) => {
    return (
      <div className="flex gap-2 align-items-center">
        <div className="flex flex-row">
          <p className="text-blue-600 cursor-pointer">{rowData?.name}</p>
        </div>
      </div>
    );
  };

  const companyDateJoinedTemplate = (rowData) => {
    return (
      <div className="flex gap-2 align-items-center">
        <div className="flex flex-row">
          <DateTime date={rowData?.created_at}></DateTime>
        </div>
      </div>
    );
  };

  const companyLastActivityTemplate = (rowData) => {
    return (
      <div className="flex gap-2 align-items-center">
        <DateTime date={rowData?.updated_at}></DateTime>
      </div>
    );
  };

  const companyStatusTemplate = (rowData) => {
    const status = rowData.status ? (rowData.active ? "success" : "danger") : "warning";
    return (
      <Tag status={status} text={status == "success" ? "Active" : status == "danger" ? "Suspended" : "Pending"}/>
    );
  };

  const companyActionTemplate = (rowData) => {
    const status = rowData.status ? (rowData.active ? "success" : "danger") : "warning";
    return (
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
          onClick={() => handleOption("View Details")}
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
          <li onClick={() => handleOption("Reject")} className="px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-50">
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
    );
  };

  return (
    <div className="pt-3 overflow-x-auto bg-white border rounded-2xl border-primary50">
      <TableTopCard
        title={title}
        btnText={btnText}
        searchTerm={searchTerm}
        handleClick={handleClick}
        handleSearch={handleSearch}
        setSearchTerm={setSearchTerm}
        handleSortChange={handleSortChange}
        handleFilterChange={handleFilterChange}
        isFilterValueVisible={isFilterValueVisible}
      />

      {data ? (
        <DataTable
          paginator
          rows={20}
          dataKey="id"
          value={searchTerm?.length ? filteredData : data}
          selectionMode="single"
          stateStorage="session"
          stateKey="dt-state-demo-local"
          paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink"
          currentPageReportTemplate={`Showing {first} to {last} of {totalRecords} ${title?.toLowerCase()}`}
          // selection={selectedCustomer}
          // onSelectionChange={(e) => setSelectedCustomer(e.value)}
          // onClick={handleClick}
        >
          <Column
            header={
              <div className="flex items-start gap-1">
                <Checkbox className="custom-checkbox" checked={false} />
                <p className="text-xs font-medium text-textBlack">ID</p>
              </div>
            }
            body={companyIdTemplate}
            sortable={!!isSortable}
            sortField="representative.name"
            className="text-xs font-medium text-textBlack"
          />
          <Column
            sortable={!!isSortable}
            className="text-xs font-medium text-textLight"
            header={<p className="text-xs font-medium text-textBlack">Company Name</p>}
            body={companyNameTemplate}
          />
          <Column
            header={<p className="text-xs font-medium text-textBlack">Date Joined</p>}
            body={companyDateJoinedTemplate}
            sortable={!!isSortable}
            className="text-xs font-medium text-textLight"
            hidden={isMobile}
          />
          <Column
            header={<p className="text-xs font-medium text-textBlack">Status</p>}
            body={companyStatusTemplate}
            sortable={!!isSortable}
            className="text-xs font-medium text-textLight"
            hidden={isMobile}
          />
          <Column
            header={<p className="content-start text-xs font-medium text-textBlack">Last Activity</p>}
            body={companyLastActivityTemplate}
            sortable={!!isSortable}
            className="text-xs font-medium text-textBlack"
            hidden={isMobile}
          />
          <Column
            header={<p className="text-xs font-medium text-textBlack">Action</p>}
            body={companyActionTemplate}
            sortable={!!isSortable}
            className="text-xs font-medium text-textBlack"
          />
        </DataTable>
      ) : (
        <p className="flex items-center w-full p-4">No {title?.toLowerCase()} available to show</p>
      )}
    </div>
  );
};

export default TransactionsDataTableComponent;
