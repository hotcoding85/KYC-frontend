import React, { useState, useEffect } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import {
  FeeTemplate,
  RulesTemplate,
  AssetIdTemplate,
  NetworkActionTemplate,
  ActivityNameTemplate
} from "@/components/Elements/DataTable/templates";
import useIsMobile from "@/hooks/useIsMobile";
import { Checkbox } from "primereact/checkbox";
import TableTopCard from "@/components/Elements/DataTable/topCard";

const AssetsFeeScheduleDataTableComponent = ({
  data,
  title,
  btnText,
  isSortable,
  handleClick,
  filteredData,
  handleSearch,
  openEditModal,
  openDeleteModal,
  setSingleScheme,
  handleFilterChange,
  isSortVisible = true,
  isAddBtnVisible = true,
  isFilterVisible = true,
  isSearchVisible = true,
  isStatementVisible = true,
  isFilterValueVisible = false
}) => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(""); // Debounced term
  const [results, setResults] = useState([]); // Search results
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300); // 500ms debounce delay

    return () => {
      clearTimeout(handler); // Cleanup timeout on component unmount or new input
    };
  }, [searchTerm]);

   // Perform the search whenever debouncedTerm changes
   useEffect(() => {
    if (debouncedTerm) {
      const _data = data.filter(
        (asset) =>
          asset?.activity
            .toLowerCase()
            .includes(debouncedTerm.toLowerCase()) ||
          asset?.startTime
            .toLowerCase()
            .includes(debouncedTerm.toLowerCase()) ||
          asset?.endTime
            .toLowerCase()
            .includes(debouncedTerm.toLowerCase()) ||
          asset?.fee
            .toLowerCase()
            .includes(debouncedTerm.toLowerCase()) ||
          asset?.gasPrice
            .toLowerCase()
            .includes(debouncedTerm.toLowerCase()) ||
          asset?.feeType
            .toLowerCase()
            .includes(debouncedTerm.toLowerCase()) ||
          asset?.gasPriceType
            .toLowerCase()
            .includes(debouncedTerm.toLowerCase())
      );
      setResults(_data)
    } else {
      setResults(data); // Clear results when input is empty
    }
  }, [debouncedTerm, data]);

  const handleSortChange = (sortData) => {
    console.log(sortData)
    const _data = [...results].sort((a, b) => {
      const { sort, order } = sortData;

      if (sort === "usd_value") {
        if (order === "desc") {
          return b?.fee - a?.fee; // Highest to Lowest
        } else {
          return a?.fee - b?.fee; // Lowest to Highest
        }
      }

      if (sort === "name") {
        const comparison = a?.activity
          .toLowerCase()
          .localeCompare(b?.activity.toLowerCase());
        return order === "desc" ? -comparison : comparison; // desc = A-Z, asc = Z-A
      }

      if (sort === "created_at") {
        const dateA = new Date(a.created_at); // Convert to Date object
        const dateB = new Date(b.created_at); // Convert to Date object
        if (order === "desc") {
          return dateB - dateA; // Most recent first
        } else {
          return dateA - dateB; // Oldest first
        }
      }

      return 0;
    });
    setResults(_data)
  };

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

      {results ? (
        <DataTable
          paginator
          rows={20}
          dataKey="id"
          value={results}
          selectionMode="single"
          stateStorage="session"
          paginatorClassName="justify-end"
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
            body={ActivityNameTemplate}
            className="text-xs font-medium text-textLight"
            header={
              <p className="text-xs font-medium text-textBlack">
                Activity Name
              </p>
            }
          />
          <Column
            hidden={isMobile}
            body={RulesTemplate}
            sortable={!!isSortable}
            className="text-xs font-medium text-textLight"
            header={<p className="text-xs font-medium text-textBlack">Rules</p>}
          />
          <Column
            hidden={isMobile}
            body={FeeTemplate}
            sortable={!!isSortable}
            className="text-xs font-medium text-textLight"
            header={
              <p className="text-xs font-medium text-textBlack">Service Fee</p>
            }
          />
          <Column
            sortable={!!isSortable}
            className="text-xs font-medium text-textBlack"
            header={
              <p className="text-xs font-medium text-textBlack">Action</p>
            }
            body={(rowData) =>
              NetworkActionTemplate(
                rowData,
                setSingleScheme,
                openEditModal,
                openDeleteModal
              )
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

export default AssetsFeeScheduleDataTableComponent;
