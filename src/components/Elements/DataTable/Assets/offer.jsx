import React, { useState } from "react"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import useIsMobile from "@/hooks/useIsMobile"
import TableTopCard from "@/components/Elements/DataTable/topCard"
import {
  transactionTypeTemplate,
  TransactionActionTemplate,
  transactionsStatusTemplate,
} from "@/components/Elements/DataTable/templates"

const OffersTableComponent = ({
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
  isSortVisible = false,
  isAddBtnVisible = false,
  isFilterVisible = false,
  isSearchVisible = false,
  isStatementVisible = false,
  isFilterValueVisible = false,
}) => {
  const isMobile = useIsMobile()
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div>
      {title && (
        <h3 className="px-2 pb-2 text-[14px] font-semibold leading-[20px] tracking-[-0.005em] text-textBlack text-left">
          {title}
        </h3>
      )}
      <div className=" bg-gray-50 rounded-2xl border border-primary50 overflow-x-auto mt-0 ">
        <TableTopCard
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
              hidden={isWallet}
              sortable={!!isSortable}
              body={transactionTypeTemplate}
              className="text-xs font-medium text-textLight"
              header={
                <p className="text-xs font-medium text-textBlack">Date</p>
              }
            />
            <Column
              hidden={isMobile || isWallet}
              sortable={!!isSortable}
              body={(row) => row?.to_from}
              className="text-xs font-medium text-textLight"
              header={
                <p className="text-xs font-medium text-textBlack">To/From</p>
              }
            />
            <Column
              hidden={isMobile}
              sortable={!!isSortable}
              body={(row) => row?.currency}
              className="text-xs font-medium text-textLight"
              header={
                <p className="text-xs font-medium text-textBlack">
                  Value in USD
                </p>
              }
            />
            <Column
              hidden={isMobile}
              body={transactionsStatusTemplate}
              sortable={!!isSortable}
              className="text-xs font-medium text-textLight"
              header={
                <p className="text-xs font-medium text-textBlack">Status</p>
              }
            />
            <Column
              sortable={!!isSortable}
              body={TransactionActionTemplate}
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
    </div>
  )
}

export default OffersTableComponent
