import React, { useState } from 'react';
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import {
  assetIdTemplate,
  NetworkIPTemplate,
  NetworkNameTemplate,
  NetworkActionTemplate,
  NetworkUpTimeTemplate,
  NetworkWalletTemplate,
  cryptoCheckboxTemplate,
  CryptoAssetTemplate,
  CryptoPriceTemplate,
  CryptoBalanceTemplate,
  CryptoPortfolioTemplate,
} from "@/components/Elements/DataTable/templates";
import useIsMobile from "@/hooks/useIsMobile";
import { Checkbox } from "primereact/checkbox";
import TableTopCard from "@/components/Elements/DataTable/topCard";

const DashboardCryptoTable = ({
  data,
  title,
  btnText,
  isSortable,
  handleClick,
  filteredData,
  handleSearch,
  handleSortChange,
  setDetailSideCard,
  handleFilterChange,
  isSortVisible = true,
  isAddBtnVisible = true,
  isFilterVisible = true,
  isSearchVisible = true,
  isStatementVisible = true,
  isFilterValueVisible = false,
  setOutput = false,
}) => {
  const isMobile = useIsMobile()
  const [searchTerm, setSearchTerm] = useState("")

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
          // selection={selectedCustomer}
          // onSelectionChange={(e) => setSelectedCustomer(e.value)}
          // onClick={() => setDetailSideCard(true)}
          onRowClick={(e) => { setDetailSideCard(true); setOutput(e.data); }}
        >
          <Column
            header={
              <div className="flex items-start gap-1">
                <Checkbox className="custom-checkbox" checked={false} />
              </div>
            }
            body={cryptoCheckboxTemplate}
            sortable={!!isSortable}
            sortField="representative.name"
            className="text-xs font-medium text-textBlack w-[4%]"
          />
          <Column
            align="left"
            sortable={!!isSortable}
            className="text-xs font-medium text-textLight"
            body={CryptoAssetTemplate}
            header={<p className="text-sm font-normal text-[#272727]">Asset</p>}
          />
          <Column
            align="center"
            hidden={isMobile}
            sortable={!!isSortable}
            body={CryptoPriceTemplate}
            className="text-xs font-medium text-textLight"
            header={<p className="text-sm font-normal text-[#272727]">Price</p>}
          />
          <Column
            align="center"
            hidden={isMobile}
            sortable={!!isSortable}
            body={CryptoBalanceTemplate}
            className="text-xs font-medium text-textLight"
            header={
              <p className="text-sm font-normal text-[#272727]">Balance</p>
            }
          />
          <Column
            align="right"
            hidden={isMobile}
            sortable={!!isSortable}
            body={CryptoPortfolioTemplate}
            className="text-xs font-medium text-textBlack"
            header={
              <p className="text-sm font-normal text-[#272727]">Portfolio %</p>
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

export default DashboardCryptoTable
