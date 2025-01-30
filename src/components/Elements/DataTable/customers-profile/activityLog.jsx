import React, { useState } from 'react'
import { Column } from "primereact/column"
import useIsMobile from "@/hooks/useIsMobile"
import Tag from "@/components/Elements/Tag/Tag"
import { DataTable } from "primereact/datatable"
import TableTopCard from "@/components/Elements/DataTable/topCard"

const ActivityLogTableComponent = ({
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
}) => {
  const isMobile = useIsMobile()
  const [searchTerm, setSearchTerm] = useState("")
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
  
    const options = {
      month: 'short', // Short month format, e.g., 'Sep'
      day: '2-digit', // Day of the month
      year: 'numeric', // Full year
      hour: '2-digit', // Hour
      minute: '2-digit', // Minute
      hour12: true, // Use 12-hour clock
    };
  
    const formattedDate = date.toLocaleString('en-US', options);
  
    // Rearrange the format to match the desired output: "Sep 23 - 2023 01:11 PM"
    const [monthDay, time] = formattedDate.split(', ');
    const [month, day] = monthDay.split(' ');
    const year = formattedDate.match(/\d{4}/)[0];
  
    return `${month} ${day} - ${year} ${time}`;
  };
  return (
    <div className="pt-3 overflow-x-auto bg-white border rounded-2xl border-primary50">
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
            header={<p className='text-xs font-medium text-textBlack'>Date & Time</p>}
            body={row => formatDateTime(row.dateTime)}
            sortable={!!isSortable}
            sortField="representative.name"
            className='text-xs font-medium text-textLight'
          />
          {/*// */}
          {/*// */}
          {/*// */}
          {/*// */}
          {/*// */}
          <Column
            header={<p className='text-xs font-medium text-textBlack'>Activity Type</p>}
            body={row => row?.activityType}
            sortable={!!isSortable}
            sortField="representative.name"
            className='text-xs font-medium text-textLight'
          />
          <Column
            sortable={!!isSortable}
            body={(rowData) => {
              const status = rowData.status
                ? rowData.active
                  ? "success"
                  : "danger"
                : "warning"
              return (
                <Tag
                  status={status}
                  text={
                    status === "Success"
                      ? "Success"
                      : status === "Failed"
                        ? "Failed"
                        : "Pending"
                  }
                />
              )
            }}
            className='text-xs font-medium text-textLight'
            header={<p className='text-xs font-medium text-textBlack'>Status</p>}
          />
          <Column
            hidden={isMobile}
            sortable={!!isSortable}
            body={row => row?.details}
            className='text-xs font-medium text-textLight'
            header={<p className='text-xs font-medium text-textBlack'>Details</p>}
          />
          <Column
            hidden={isMobile}
            sortable={!!isSortable}
            body={row => row.ipAddress}
            className='text-xs font-medium text-textLight'
            header={<p className='text-xs font-medium text-textBlack'>IP Address</p>}
          />
          <Column
            hidden={isMobile}
            sortable={!!isSortable}
            body={row => row.deviceBrowser}
            className='text-xs font-medium text-textLight'
            header={<p className='text-xs font-medium text-textBlack'>Device/Browser</p>}
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

export default ActivityLogTableComponent
