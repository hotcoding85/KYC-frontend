import React, { useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import useIsMobile from "@/hooks/useIsMobile";
import { Checkbox } from "primereact/checkbox";
import {
  transactionStatusTemplate,
  AssetActionTemplate,
  AssetIdTemplate
} from "@/components/Elements/DataTable/templates";
import TableTopCard from "@/components/Elements/DataTable/topCard";

const TransactionHistoryTableComponent = ({
  data,
  title,
  btnText,
  isWallet,
  isSortable,
  handleClick,
  filteredData,
  handleSearch,
  handleSortChange,
  handleFilterChange,
  isSortVisible = false,
  isAddBtnVisible = true,
  isFilterVisible = true,
  isSearchVisible = true,
  isStatementVisible = true,
  isFilterValueVisible = false

}) => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCheckedAll, setCheckedAll] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-primary50 overflow-x-auto pt-3">
      <TableTopCard
        title={title}
        btnText={btnText}
        searchTerm={searchTerm}
        handleClick={handleClick}
        handleSearch={handleSearch}
        isSortVisible={false}
        setSearchTerm={setSearchTerm}
        isAddBtnVisible={isAddBtnVisible}
        isFilterVisible={isFilterVisible}
        isSearchVisible={isSearchVisible}
        handleSortChange={handleSortChange}
        isStatementVisible={isStatementVisible}
        handleFilterChange={handleFilterChange}
        isFilterValueVisible={isFilterValueVisible}
      />

      {data ? (
        <DataTable
          paginator
          rows={40}
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
              <div
                className="flex items-start gap-1 cursor-pointer"
                onClick={() => setCheckedAll(prev => !prev)}
              >
                <Checkbox className="custom-checkbox" checked={isCheckedAll} />
                <p className="text-xs font-medium text-textBlack">ID</p>
              </div>
            }
            body={AssetIdTemplate}
            sortable={!!isSortable}
            sortField="representative.name"
            className="text-xs font-medium text-textBlack"
          />
          <Column
            hidden={isWallet}
            sortable={!!isSortable}
            body={(rowData) => rowData?.date}
            className="text-xs font-medium text-textLight"
            header={<p className="text-xs font-medium text-textBlack">Date</p>}
          />
          <Column
            hidden={isMobile || isWallet}
            sortable={!!isSortable}
            body={(row) => row?.reference}
            className="text-xs font-medium text-textLight"
            header={
              <p className="text-xs font-medium text-textBlack">Reference #</p>
            }
          />
          <Column
            hidden={isMobile}
            sortable={!!isSortable}
            body={(row) => row?.amount}
            className="text-xs font-medium text-textLight"
            header={
              <p className="text-xs font-medium text-textBlack">Amount</p>
            }
          />
          <Column
            hidden={isMobile}
            body={(row) => row?.value}
            sortable={!!isSortable}
            className="text-xs font-medium text-textLight"
            header={
              <p className="text-xs font-medium text-textBlack">Value in USD</p>
            }
          />
          <Column
            hidden={isMobile}
            body={transactionStatusTemplate}
            sortable={!!isSortable}
            className="text-xs font-medium text-textLight"
            header={
              <p className="text-xs font-medium text-textBlack">Status</p>
            }
          />
          <Column
            sortable={!!isSortable}
            body={AssetActionTemplate}
            className="text-xs font-medium text-textBlack"
            header={
              <p className="text-xs font-medium text-textBlack">Action</p>
            }
          />
        </DataTable>
      ) : (
        <p className="flex items-center w-full p-4">
          No {title?.toLowerCase()} available to show
        </p>
      )}
    </div>
  );
};

export default TransactionHistoryTableComponent;
