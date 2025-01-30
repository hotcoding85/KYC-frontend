import React, { useState } from "react";
import { TextButton } from "@/components/Elements/Button/Button";
import Image from "next/image";
import FilterModal from "@/components/Elements/FilterModal/FilterModal";
import { FILTER_SAMPLE_DATA, SORT_BY_SAMPLE_DATA } from "@/utils/constants";
import SortModal from "@/components/Elements/SortModal/SortModal";
import FinancialFilterModal from "../FilterModal/FinancialFilterModal";
import SearchBar from "../search/SearchBar";
import { useRouter } from "next/navigation";
import Document from "@/Icons/Document";

const TableTopCard = ({
  title,
  btnText,
  searchTerm,
  handleClick,
  handleSearch,
  setSearchTerm,
  handleSortChange,
  handleFilterChange,
  isFilterValueVisible = false,
  isGeneratePaymentVisible = false,
  isSortVisible = true,
  isSearchVisible = true,
  isFilterVisible = true,
  isAddBtnVisible = true,
  isStatementVisible = true,
  isFromFinancialsTable = false,
  buttonClassName = "",
  isAnalytics,
}) => {
  const router = useRouter();
  return (
    <>
      {title && (
        <h3 className="px-2 pb-2 sm:px-4 text-[14px] font-semibold leading-[20px] tracking-[-0.005em] text-textBlack text-left">
          {title}
        </h3>
      )}

      <div className="flex flex-col items-start justify-between gap-2 px-2 pb-2 md:flex-row md:items-center sm:px-4 sm:pb-3">
        <div className="flex w-full md:w-[200px]">
          {isSearchVisible && (
            <SearchBar
              className={"!w-full"}
              value={searchTerm}
              onValueChange={setSearchTerm}
            />
          )}
        </div>
        <div className="flex flex-wrap items-center justify-start gap-2 md:flex-nowrap md:justify-end">
          {isGeneratePaymentVisible && (
            <TextButton
              title="Generate Payment Link"
              textColor="text-textBlack"
              backgroundColor="bg-white"
              borderColor="border-primary50"
              className={
                "border rounded-[10px] font-normal text-xs text-textBlack min-w-[95px] h-8"
              }
              onClick={() => {
                router.push("/dashboard/orders/create-payment-link");
              }}
              icon={
                <svg
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5877 5.66635C13.3596 5.43827 12.9897 5.43827 12.7616 5.66635L6.39801 12.0574C5.25719 13.1984 3.40748 13.1985 2.26651 12.0577C1.12553 10.9169 1.12542 9.0672 2.26621 7.92623L8.42943 1.73789C9.11937 1.05893 10.2291 1.06783 10.9081 1.75778C11.5793 2.43981 11.5794 3.53406 10.9084 4.21626L4.74518 10.4046C4.51423 10.6258 4.14999 10.6258 3.91906 10.4046C3.69099 10.1764 3.69099 9.80661 3.91906 9.57848L9.4063 4.06613C9.63046 3.83403 9.62405 3.46417 9.39195 3.24001C9.16555 3.02133 8.80659 3.02133 8.58019 3.24001L3.09295 8.75237C2.4084 9.43678 2.40831 10.5466 3.09273 11.2311C3.09281 11.2312 3.09287 11.2313 3.09295 11.2313C3.78668 11.8933 4.87817 11.8933 5.57189 11.2313L11.7345 5.04243C12.8607 3.88719 12.8371 2.03772 11.6819 0.911534C10.5472 -0.194579 8.73774 -0.194442 7.60331 0.91178L1.44009 7.10009C-0.157114 8.69729 -0.157114 11.2869 1.44009 12.8841C3.0373 14.4813 5.62691 14.4813 7.22412 12.8841L13.5877 6.49482C13.8165 6.26726 13.8175 5.89735 13.5899 5.66857C13.5892 5.66783 13.5885 5.66709 13.5877 5.66635Z"
                    fill="#14151A"
                  />
                </svg>
              }
            />
          )}
          {isStatementVisible && (
            <TextButton
              title="Statement"
              textColor="text-textBlack"
              backgroundColor="bg-white"
              borderColor="border-primary50"
              className={
                "border rounded-[10px] font-normal text-xs text-textBlack min-w-[95px] h-8"
              }
              onClick={() => {
                router.push("/dashboard/statement-export");
              }}
              icon={<Document className="w-5 h-5" />}
            />
          )}
          {isFilterVisible &&
            (isFromFinancialsTable ? (
              <FinancialFilterModal
                filters={FILTER_SAMPLE_DATA}
                isValueVisible={isFilterValueVisible}
                onChange={(e) => handleFilterChange && handleFilterChange(e)}
              />
            ) : (
              <FilterModal
                filters={FILTER_SAMPLE_DATA}
                isValueVisible={isFilterValueVisible}
                onChange={(e) => handleSortChange && handleFilterChange(e)}
                isAnalytics
              />
            ))}
          {isSortVisible && (
            <SortModal
              sortBy={SORT_BY_SAMPLE_DATA}
              onChange={(e) => handleSortChange && handleSortChange(e)}
            />
          )}
          {isAddBtnVisible && (
            <TextButton
              title={btnText || "Add new assets"}
              className={`bg-primary text-white text-xs rounded-[10px] text-nowrap h-8 sm:h-8 ${buttonClassName} `}
              onClick={() => handleClick && handleClick()}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TableTopCard;
