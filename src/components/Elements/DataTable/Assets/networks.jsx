import React, { useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import {
  AssetIdTemplate,
  NetworkIPTemplate,
  NetworkNameTemplate,
  NetworkActionTemplate,
  NetworkUpTimeTemplate,
  NetworkWalletTemplate,
} from "@/components/Elements/DataTable/templates";
import useIsMobile from "@/hooks/useIsMobile";
import { Checkbox } from "primereact/checkbox";
import TableTopCard from "@/components/Elements/DataTable/topCard";

const AssetsNetworkDataTableComponent = ({
  data,
  title,
  btnText,
  isSortable,
  handleClick,
  filteredData,
  handleSearch,
  openEditModal,
  openDeleteModal,
  handleSortChange,
  openDetailsModal,
  handleFilterChange,
  setSelectedNetwork,
  isSortVisible = true,
  isAddBtnVisible = true,
  isFilterVisible = true,
  isSearchVisible = true,
  isStatementVisible = true,
  isFilterValueVisible = false,
}) => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState(null);
  const [selectedTransactions, setSelectedTransactions] = useState([]);

  // Function to handle the selection header checkbox
  const headerCheckboxTemplate = (options) => {
    return (
      <div className="flex items-start">
        <Checkbox
          checked={options.checked}
          onChange={options.onChange}
          className="custom-checkbox"
        />
        <p className="text-xs font-medium text-textBlack leading-[16px] text-left">
          ID
        </p>
      </div>
    );
  };

  const transactionsIdTemplate = (rowData) => {
    return (
      <div className="flex items-start gap-1">
        <Checkbox
          className="custom-checkbox checked:bg-black"
          checked={selectedTransactions.includes(rowData.id)}
          onChange={() => {
            if (selectedTransactions.includes(rowData.id)) {
              setSelectedTransactions(
                selectedTransactions.filter((id) => id !== rowData.id)
              );
            } else {
              setSelectedTransactions([...selectedTransactions, rowData.id]);
            }
          }}
          onClick={(e) => e.stopPropagation()}
        />
        <p className="text-xs font-medium text-textBlack">#{rowData?.id}</p>
      </div>
    );
  };

  // Function to handle the row checkbox template
  const rowCheckboxTemplate = (rowData) => {
    return (
      <div className="flex items-center">
        <Checkbox className="custom-checkbox" />
        {AssetIdTemplate(rowData)}
      </div>
    );
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
        buttonClassName="!w-[132px] !min-w-[132px]"
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
          paginatorClassName="justify-end"
          currentPageReportTemplate={`Showing {first} to {last} of {totalRecords} ${title?.toLowerCase()}`}
        >
          <Column
            header={
              <div className="flex gap-1">
                <Checkbox
                  className="custom-checkbox"
                  checked={
                    data.length > 0 &&
                    data.length === selectedTransactions.length
                  }
                  onChange={() => {
                    if (data.length === selectedTransactions.length) {
                      setSelectedTransactions([]);
                    } else {
                      setSelectedTransactions(data.map((item) => item.id));
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <p className="text-xs font-medium text-textBlack">ID</p>
              </div>
            }
            body={transactionsIdTemplate}
            sortable
            sortField="representative.name"
          ></Column>
          <Column
            sortable={!!isSortable}
            className="text-xs font-medium text-textLight leading-[16px] text-left"
            body={(rowData) => NetworkNameTemplate(rowData, openDetailsModal)}
            header={
              <p className="text-xs font-medium text-textBlack leading-[16px] text-left">
                Name
              </p>
            }
          />
          <Column
            hidden={isMobile}
            sortable={!!isSortable}
            body={NetworkWalletTemplate}
            className="text-xs font-medium text-textLight leading-[16px] text-left"
            header={
              <p className="text-xs font-medium text-textBlack leading-[16px] text-left">
                Wallet
              </p>
            }
          />
          <Column
            hidden={isMobile}
            sortable={!!isSortable}
            body={NetworkIPTemplate}
            className="text-xs font-medium text-textLight leading-[16px] text-left"
            header={
              <p className="text-xs font-medium text-textBlack leading-[16px] text-left">
                IP
              </p>
            }
          />
          <Column
            hidden={isMobile}
            sortable={!!isSortable}
            body={NetworkUpTimeTemplate}
            className="text-xs font-medium text-textLight leading-[16px] text-left"
            header={
              <p className="text-xs font-medium text-textBlack leading-[16px] text-left content-start">
                Uptime
              </p>
            }
          />
          <Column
            sortable={!!isSortable}
            header={
              <p className="text-xs font-medium text-textBlack leading-[16px] text-left">
                Action
              </p>
            }
            className="text-xs font-medium text-textBlack leading-[16px] text-left"
            body={(rowData) =>
              NetworkActionTemplate(
                rowData,
                setSelectedNetwork,
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

export default AssetsNetworkDataTableComponent;
