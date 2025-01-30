import React, { useState } from "react"
import { Column } from "primereact/column"
import useIsMobile from "@/hooks/useIsMobile"
import { Checkbox } from "primereact/checkbox"
import { DataTable } from "primereact/datatable"
import TableTopCard from "@/components/Elements/DataTable/topCard"
import { AssetIdTemplate } from "@/components/Elements/DataTable/templates"

const NFTTableComponent = ({
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
  isSortVisible = false,
  isAddBtnVisible = true,
  isFilterVisible = true,
  isSearchVisible = true,
  isStatementVisible = true,
  isFilterValueVisible = false
}) => {
  const isMobile = useIsMobile()
  const [searchTerm, setSearchTerm] = useState("")

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
                <p className="text-xs font-medium text-textBlack">ID</p>
              </div>
            }
            body={AssetIdTemplate}
            sortable={!!isSortable}
            sortField="representative.name"
            className="text-xs font-medium text-textBlack"
          />
          <Column
            sortable={!!isSortable}
            body={(row) => row?.value}
            className="text-xs font-medium text-textLight"
            header={
              <p className="text-xs font-medium text-textBlack">Currency</p>
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
            sortable={!!isSortable}
            body={(row) => row?.date}
            className="text-xs font-medium text-textLight"
            header={<p className="text-xs font-medium text-textBlack">Date</p>}
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

export default NFTTableComponent
