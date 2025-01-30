import React, { useEffect, useRef, useState } from "react";
import { BalanceComponent } from "./BalanceComponent";
import { TransactionStatistics } from "./TransactionStatistics";
import { TransactionRiskLevel } from "./TransactionRiskLevel";
import { TransactionHistoryTable } from "./TransactionHistoryTable";
import TableTopCard from "@/components/Elements/DataTable/topCard";

export default function AccountActionsTab() {
  return (
    <>
      <div className="flex flex-col gap-3 md:flex-row">
        {/* Left Column */}
        <div className="flex flex-col gap-3 md:w-[40%]">
          <BalanceComponent />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-3 md:w-[60%]">
          <TransactionStatistics />
          <TransactionRiskLevel />
        </div>
      </div>

      <div className="flex flex-col w-full gap-3 mt-3 md:flex-row">
        {/* Left Table */}
        <div className="md:w-[50%] w-full">
          <TransactionHistoryTable title='Transaction History' />
        </div>

        {/* Right Table */}
        <div className="md:w-[50%] w-full">
          <TransactionHistoryTable title='Risk Transaction History' />
        </div>
      </div>
    </>
  );
}
