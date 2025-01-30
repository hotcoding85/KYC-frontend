import React, { useState } from "react";
import Search from "@/Icons/Search";
import DropDown from "@/components/Elements/DropDown/DropDown";
import VerticalThreeDots from "@/Icons/VerticalThreeDots";
import ChevronLeft from "@/Icons/ChevronLeft";
import ChevronRight from "@/Icons/ChevronRight";
import FinancialSummaryTableComponent from "@/components/Elements/DataTable/customers-profile/summary";
import TableTopCard from "@/components/Elements/DataTable/topCard";

export const TransactionHistoryTable = ({ title }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const transactionData = [
    { date: "Sep 20 -2023", amount: 10, valueInUSD: 100, status: "Pending" },
    { date: "Sep 20 -2023", amount: 10, valueInUSD: 100, status: "Rejected" },
    { date: "Sep 20 -2023", amount: 10, valueInUSD: 100, status: "Pending" },
  ];

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "rejected", label: "Rejected" },
    { value: "approved", label: "Approved" },
  ];

  return (
    <>
      <FinancialSummaryTableComponent
        title={title}
        data={transactionData}
        isAddBtnVisible={false}
        isStatementVisible={false}
      />
    </>
  );
};
