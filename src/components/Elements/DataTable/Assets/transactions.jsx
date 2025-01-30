import React, { useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import {
  AssetIdTemplate,
  transactionTypeTemplate,
  TransactionActionTemplate,
  transactionsStatusTemplate,
} from "@/components/Elements/DataTable/templates";
import useIsMobile from "@/hooks/useIsMobile";
import { Checkbox } from "primereact/checkbox";
import TableTopCard from "@/components/Elements/DataTable/topCard";
import { paginatorTemplate } from "../../PaginationTemplate/PaginationTemplate";

const TransactionTableComponent = ({
  data,
  title,
  btnText,
  isWallet,
  isSortable,
  handleClick,
  filteredData,
  handleSearch,
  handleRowClick,
  handleSortChange,
  handleFilterChange,
  isSortVisible = true,
  isAddBtnVisible = true,
  isFilterVisible = true,
  isSearchVisible = true,
  isStatementVisible = true,
  isFilterValueVisible = false,
}) => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-white rounded-2xl border border-primary50 overflow-x-auto pt-3">
      <TableTopCard
        title={title}
        btnText={btnText}
        searchTerm={searchTerm}
        handleClick={handleClick}
        handleSearch={handleSearch}
        isSortVisible={isSortVisible}
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
          rows={20}
          dataKey="id"
          value={searchTerm?.length ? filteredData : data}
          selectionMode="single"
          stateStorage="session"
          stateKey="dt-state-demo-local"
          paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink"
          currentPageReportTemplate={`Showing {first} to {last} of {totalRecords} ${title?.toLowerCase()}`}
          onClick={handleRowClick}
          // selection={selectedCustomer}
          // onSelectionChange={(e) => setSelectedCustomer(e.value)}
        >
          <Column
            header={
              <div className="flex items-start gap-1">
                <Checkbox className="custom-checkbox" checked={false} />
                <p className="text-[12px] font-medium text-textBlack leading-4 text-left">
                  ID
                </p>
              </div>
            }
            body={AssetIdTemplate}
            sortable={!!isSortable}
            sortField="representative.name"
            className="text-[12px] font-medium text-textBlack leading-4 text-left"
          />
          <Column
            hidden={isWallet}
            sortable={!!isSortable}
            body={transactionTypeTemplate}
            className="text-xs font-medium text-textLight leading-4 text-left  "
            header={
              <p className="text-[12px] font-medium text-textBlack leading-4 text-left">
                Name
              </p>
            }
          />
          <Column
            hidden={isMobile || isWallet}
            sortable={!!isSortable}
            body={(row) => row?.to_from}
            className="text-xs font-medium text-textLight leading-4 text-left"
            header={
              <p className="text-[12px] font-medium text-textBlack leading-4 text-left">
                To/From
              </p>
            }
          />
          <Column
            hidden={isMobile}
            sortable={!!isSortable}
            body={(row) => row?.currency}
            className="text-xs font-medium text-textLight leading-4 text-left"
            header={
              <p className="text-[12px] font-medium text-textBlack leading-4 text-left">
                Currency
              </p>
            }
          />
          <Column
            hidden={isMobile}
            body={transactionsStatusTemplate}
            sortable={!!isSortable}
            className="text-xs font-medium text-textLight leading-4 text-left"
            header={
              <p className="text-[12px] font-medium text-textBlack leading-4 text-left">
                Status
              </p>
            }
          />
          <Column
            sortable={!!isSortable}
            body={TransactionActionTemplate}
            className="text-[12px] font-medium text-textBlack leading-4 text-left"
            header={
              <p className="text-[12px] font-medium text-textBlack leading-4 text-left">
                Action
              </p>
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

export default TransactionTableComponent;
