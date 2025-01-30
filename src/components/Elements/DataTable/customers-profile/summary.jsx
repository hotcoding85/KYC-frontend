import React, { useState } from 'react'
import { Column } from "primereact/column"
import useIsMobile from "@/hooks/useIsMobile"
import { DataTable } from "primereact/datatable"
import TableTopCard from "@/components/Elements/DataTable/topCard"

const FinancialSummaryTableComponent = ({
  data,
  title,
  btnText,
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
  assetActionTemplate 
}) => {
  const isMobile = useIsMobile()
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="pt-3 mb-10 overflow-x-auto bg-white border rounded-2xl border-primary50">
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
            header={<p className='font-medium text-[12px] leading-[16px] text-left text-textBlack'>Date</p>}
            body={row => row.date}
            sortable={!!isSortable}
            sortField="representative.name"
            className='font-medium text-[12px] leading-[16px] text-left text-textLight'
          />
          <Column
            header={<p className='font-medium text-[12px] leading-[16px] text-left text-textBlack'>Amount</p>}
            body={row => row?.amount}
            sortable={!!isSortable}
            sortField="representative.name"
            className='font-medium text-[12px] leading-[16px] text-left text-textLight'
          />
          <Column
            sortable={!!isSortable}
            body={row => row?.valueInUSD}
            className='font-medium text-[12px] leading-[16px] text-left text-textLight'
            header={<p className='font-medium text-[12px] leading-[16px] text-left text-textBlack'>Value in USD</p>}
          />
          <Column
            hidden={isMobile}
            sortable={!!isSortable}
            body={row => (
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  row.status === "Pending"
                    ? "bg-warningLight text-alert"
                    : row.status === "Rejected"
                      ? "bg-warningLight text-warning"
                      : "bg-successLight text-success"
                }`}
              >
                {row.status}
              </span>
            )}
            className='font-medium text-[12px] leading-[16px] text-left text-textLight'
            header={<p className='font-medium text-[12px] leading-[16px] text-left text-textBlack'>Status</p>}
          />
          <Column
            hidden={isMobile}
            sortable={!!isSortable}
            body={assetActionTemplate}
            className='font-medium text-[12px] leading-[16px] text-left text-textLight'
            header={<p className='font-medium text-[12px] leading-[16px] text-left text-textBlack'>Action</p>}
          />
        </DataTable>
      ) : (
        <p className="flex items-center w-full p-4">
          No {title?.toLowerCase()} available to show
        </p>
      )}
    </div>
  )
}

export default FinancialSummaryTableComponent
