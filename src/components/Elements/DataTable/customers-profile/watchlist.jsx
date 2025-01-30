import React, { useState } from 'react'
import { Column } from "primereact/column"
import useIsMobile from "@/hooks/useIsMobile"
import { DataTable } from "primereact/datatable"
import { CountryNameTemplate } from "@/components/Elements/DataTable/templates"

const WatchlistTableComponent = ({
  data,
  title,
  isSortable,
  filteredData,
  handleRowClick,
}) => {
  const isMobile = useIsMobile()
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="overflow-x-auto bg-white border rounded-2xl border-primary50">
      {data ? (
        <DataTable
          rows={20}
          dataKey="id"
          value={searchTerm?.length ? filteredData : data}
          selectionMode="single"
          stateStorage="session"
          stateKey="dt-state-demo-local"
          onClick={handleRowClick}
        >
          <Column
            header={<p className='text-sm font-medium leading-4 font-inter text-textBlack'>Name</p>}
            body={row => row['Name']}
            sortable={!!isSortable}
            sortField="representative.name"
            className='text-sm font-medium leading-4 font-inter text-textLight'
          />
          <Column
            header={<p className='text-sm font-medium leading-4 font-inter text-textBlack'>Matches</p>}
            body={row => row['Matches']}
            sortable={!!isSortable}
            sortField="representative.name"
            className='text-sm font-medium leading-4 font-inter text-textLight'
          />
          <Column
            sortable={!!isSortable}
            body={(rowData) => rowData['Relevance']}
            className='text-sm font-medium leading-4 font-inter text-textLight'
            header={<p className='text-sm font-medium leading-4 font-inter text-textBlack'>Relevance</p>}
          />
          <Column
            hidden={isMobile}
            sortable={!!isSortable}
            body={CountryNameTemplate}
            className='text-sm font-medium leading-4 font-inter text-textLight'
            header={<p className='text-sm font-medium leading-4 font-inter text-textBlack'>Country</p>}
          />
          <Column
            hidden={isMobile}
            sortable={!!isSortable}
            body={row => row['Is While-listed']}
            className='text-sm font-medium leading-4 font-inter text-textLight'
            header={<p className='text-sm font-medium leading-4 font-inter text-textBlack'>Is While-listed</p>}
          />
          <Column
            hidden={isMobile}
            sortable={!!isSortable}
            body={row => row['Match Status']}
            className='text-sm font-medium leading-4 font-inter text-textLight'
            header={<p className='text-sm font-medium leading-4 font-inter text-textBlack'>Match Status</p>}
          />
          <Column
            hidden={isMobile}
            sortable={!!isSortable}
            body={row => row['Risk Level']}
            className='text-sm font-medium leading-4 font-inter text-textLight'
            header={<p className='text-sm font-medium leading-4 font-inter text-textBlack'>Risk Level</p>}
          />
          <Column
            hidden={isMobile}
            sortable={!!isSortable}
            body={row => row['Additional Info']}
            className='text-sm font-medium leading-4 font-inter text-textLight'
            header={<p className='text-sm font-medium leading-4 font-inter text-textBlack'>Additional Info</p>}
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

export default WatchlistTableComponent
