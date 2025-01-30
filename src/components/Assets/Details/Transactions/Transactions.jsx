import React, { useState } from "react";
import TransactionsTable from "@/components/Transactions/TransactionsTable";
import TransactionsSweep from "@/components/Transactions/TransactionsSweep";
import TransactionsServiceFee from "@/components/Transactions/TransactionsServiceFee";
import SubTabNavigation from "@/components/Elements/TabNavigationBar/SubTabsNavigation";
import FinancialsTable from "@/components/Companies/FinancialsTab/FinancialsTable";

export default function DetailsTransactions() {
  const [activeTab, setActiveTab] = useState(0);

  const [dummyData, setDummyData] = useState([
    {
      id: "302012",
      name: "Received",
      amount: 100,
      date: "01/08/24",
      currency: "Credit",
    },
    {
      id: "302013",
      name: "Sent",
      amount: 200,
      date: "02/08/24",
      currency: "Debit",
    },
  ]);

  const tabs = [
    {
      name: "Internal",
      content: (
        <FinancialsTable companies={dummyData} isFromFinancialsTable={true} />
      ),
    },
    { name: "External", content: <TransactionsTable /> },
    { name: "Sweep", content: <TransactionsSweep /> },
    { name: "Service Fees", content: <TransactionsServiceFee /> },
  ];

  return (
    <>
      <div className="mx-auto">
        {/* Tabs Navigation */}
        <SubTabNavigation
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectIndex={true}
        />

        {/* Tab Content */}
        <div className="py-2">
          <p>{tabs[activeTab].content}</p>
        </div>
      </div>
    </>
  );
}
