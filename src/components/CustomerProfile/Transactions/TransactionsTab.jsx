import FinancialsTable from "@/components/Companies/FinancialsTab/FinancialsTable";
import React, { useState } from "react";

const TransactionsTab = () => {
  const [dummyData, setDummyData] = useState([
    {
      id: "302012",
      name: "Received",
      amount: 100,
      toFrom: "AUC346..YU76",
      created_at: "01/08/24",
      currency: "Credit"
    },
    {
      id: "302013",
      name: "Sent",
      amount: 200,
      toFrom: "john.watwallet",
      created_at: "02/08/24",
      currency: "Debit"
    }
  ]);
  return (
    <>
      <FinancialsTable transactions={dummyData} isFromFinancialsTable={true} />
    </>
  );
};

export default TransactionsTab;
