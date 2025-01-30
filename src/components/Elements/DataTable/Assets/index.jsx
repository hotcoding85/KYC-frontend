import React, { useState, useRef, useEffect } from 'react'
import { Column } from "primereact/column"
import useIsMobile from "@/hooks/useIsMobile"
import { Checkbox } from "primereact/checkbox"
import { DataTable } from "primereact/datatable"
import TableTopCard from "@/components/Elements/DataTable/topCard"
import {
  AssetIdTemplate,
  assetTypeTemplate,
  AssetNameTemplate,
  AssetActionTemplate,
  assetStatusTemplate,
  assetUsdValueTemplate
} from "@/components/Elements/DataTable/templates"

const AssetsDataTableComponent = ({
  data,
  title,
  btnText,
  isSortable,
  handleClick,
  handleOption,
  handleSearch,
  handleRowClick,
  handleSortChange,
  handleFilterChange,
  isFilterValueVisible = false
}) => {
  const isMobile = useIsMobile()
  const [searchTerm, setSearchTerm] = useState("")
  const [isCheckedAll, setCheckedAll] = useState(false)
  const [filteredData, setFilteredData] = useState(data);
  // Debounced search term state
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  const handler = useRef(null)
  useEffect(() => {
    handler.current && clearTimeout(handler.current);
    handler.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Adjust debounce time (300ms is common)
  }, [searchTerm]);

  useEffect(() => {
    // Cleanup function
    return () => {
      handler.current && clearTimeout(handler.current);
    };
  }, [])

  useEffect(() => {
    if (!data) {
      setFilteredData([]);
      return
    }
    const filtered = data.filter(asset =>
      asset.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [data, debouncedSearchTerm]);

  return (
    <div className="bg-white rounded-2xl border border-primary50 overflow-x-auto pt-3">
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
        buttonClassName="!w-[117px] !min-w-[117px]"
      />

      {data ? (
        <DataTable
          paginator
          rows={20}
          dataKey="id"
          selectionMode="single"
          stateStorage="session"
          stateKey="dt-state-demo-local"
          value={filteredData}
          paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink"
          currentPageReportTemplate={`Showing {first} to {last} of {totalRecords} ${title?.toLowerCase()}`}
          // onClick={handleClick}
          // selection={selectedCustomer}
          // onSelectionChange={(e) => setSelectedCustomer(e.value)}
        >
          <Column
            header={
              <div
                className="flex items-start cursor-pointer"
                onClick={() => setCheckedAll(prev => !prev)}
              >
                <Checkbox
                  checked={isCheckedAll}
                  className="custom-checkbox"
                />
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
            className="text-xs font-medium text-textLight"
            header={<p className="text-xs font-medium text-textBlack">Name</p>}
            body={rowData => AssetNameTemplate(rowData, `/dashboard/assets/detail/${rowData?.asset_id}`)}
          />
          <Column
            hidden={isMobile}
            sortable={!!isSortable}
            body={row => assetUsdValueTemplate(row, `/dashboard/assets/detail/${row?.asset_id}`)}
            className="text-xs font-medium text-textLight"
            header={<p className="text-xs font-medium text-textBlack">USD Value</p>}
          />
          <Column
            hidden={isMobile}
            sortable={!!isSortable}
            body={row => assetTypeTemplate(row, `/dashboard/assets/detail/${row?.asset_id}`)}
            className="text-xs font-medium text-textLight"
            header={<p className="text-xs font-medium text-textBlack">Type</p>}
          />
          <Column
            hidden={isMobile}
            sortable={!!isSortable}
            body={assetStatusTemplate}
            className="text-xs font-medium text-textBlack"
            header={<p className="text-xs font-medium text-textBlack content-start">Status</p>}
          />
          <Column
            sortable={!!isSortable}
            className="text-xs font-medium text-textBlack"
            body={rowData => AssetActionTemplate(rowData, handleOption)}
            header={<p className="text-xs font-medium text-textBlack">Action</p>}
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

export default AssetsDataTableComponent
