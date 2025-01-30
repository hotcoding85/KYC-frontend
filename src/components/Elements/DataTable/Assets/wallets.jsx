import React, { useState } from "react"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import {
  AssetIdTemplate,
  AssetActionTemplate,
  assetWalletStatusTemplate,
} from "@/components/Elements/DataTable/templates"
import useIsMobile from "@/hooks/useIsMobile"
import { Checkbox } from "primereact/checkbox"
import TableTopCard from "@/components/Elements/DataTable/topCard"

const AssetWalletTableComponent = ({
  data,
  title,
  btnText,
  isSortable,
  handleClick,
  filteredData,
  handleSearch,
  handleSortChange,
  handleFilterChange,
  isSortVisible = true,
  isAddBtnVisible = true,
  isFilterVisible = true,
  isSearchVisible = true,
  isStatementVisible = true,
  isFilterValueVisible = false,
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
            body={(rowData) => rowData?.walletName}
            className="text-xs text-textLight truncate"
            header={
              <p className="text-xs font-medium text-textBlack truncate">
                Wallet Name
              </p>
            }
          />
          <Column
            hidden={isMobile}
            sortable={!!isSortable}
            body={(row) => row?.amount}
            className="text-xs text-textLight truncatet"
            header={
              <p className="text-xs font-medium text-textBlack">Amount</p>
            }
          />
          <Column
            hidden={isMobile}
            sortable={!!isSortable}
            body={(row) => row?.value}
            className="text-xs text-textLight truncate"
            header={
              <p className="text-xs font-medium text-textBlack truncate">
                Value in USD
              </p>
            }
          />
          <Column
            hidden={isMobile}
            body={assetWalletStatusTemplate}
            sortable={!!isSortable}
            className="text-xs text-textLight truncatet"
            header={
              <p className="text-xs font-medium text-textBlack truncate">
                Status
              </p>
            }
          />
          <Column
            sortable={!!isSortable}
            body={AssetActionTemplate}
            className="text-xs font-medium text-textBlack truncate"
            header={
              <p className="text-xs font-medium text-textBlack truncate">
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
  )
}

export default AssetWalletTableComponent
