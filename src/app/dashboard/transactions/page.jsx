"use client"
import React, { useState, useEffect } from "react";
import Container from "@/components/Container/Container";
import useApi from "@/hooks/useApi";
import DashboardCards from "@/components/Transactions/DashboardCards";
import FinancialsTable from "@/components/Companies/FinancialsTab/FinancialsTable";
import { useUser } from "@/app/context/UserContext";
import { COMPANY_ACCOUNT_TYPE, ROLE } from "@/shared/enums";

export default function TransactionsPage() {
  const { fetchData, loading, error } = useApi();
  const [companies, setCompanies] = useState(null);
  const { user } = useUser();
  const [statData, setStatData] = useState();
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

  const [cardTableData, setCardTableData] = useState(null);

  useEffect(() => {
    async function listTransactions() {
      const { result, error } = await fetchData(`/transaction/all`, {
        method: "POST",
      });
      if (error) {
        setStatData([]);
      } else {
        setCardTableData(result);
      }
    }

    listTransactions();

    async function listTransactionStats() {
      const { result, error } = await fetchData(`/transaction/stat`, {
        method: "POST",
      });
      if (error) {
        setStatData([]);
      } else {
        console.log(result);
        
        const titles = [
          "Total Transactions",
          "Total Volume",
          "Pending Transactions",
          "Failed Volume",
        ];

        const colors = ["#16a34a", "#1d4ed8", "#facc15", "#dc2626"];
        const stats = [
        {
          title: titles[0],
          value: result.totalTransactions.count.toString(),
          change: result.totalTransactions.change,
          isPositive: result.totalTransactions.change >= 0,
          chartLabel: "Total Transactions",
          chartValues: [], // Example trend data
          color: colors[0],
        },
        {
          title: titles[1],
          value: result.totalVolume.amount.toString(),
          change: result.totalVolume.change,
          isPositive: result.totalVolume.change >= 0,
          chartLabel: "Total Volume",
          chartValues: [], // Example trend data
          color: colors[1],
        },
        {
          title: titles[2],
          value: result.pendingTransactions.count.toString(),
          change: result.pendingTransactions.change,
          isPositive: result.pendingTransactions.change >= 0,
          chartLabel: "Pending Transactions",
          chartValues: [], // Example trend data
          color: colors[2],
        },
        {
          title: titles[3],
          value: result.failedVolume.amount.toString(),
          change: result.failedVolume.change,
          isPositive: result.failedVolume.change >= 0,
          chartLabel: "Failed Transactions",
          chartValues: [], // Example trend data
          color: colors[3],
        }];
        setStatData(stats);
      }
    }

    listTransactionStats();
  }, [user]);

  return (
    <Container pageName={"Transactions"}>
      <div className="flex flex-col gap-y-2 gap-x-4">
        <DashboardCards
          stats={statData}
          isGraphHidden="False"
          isFixedHeight
          className="grid gap-2 grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
        />
        <FinancialsTable
          transactions={cardTableData}
          isFromFinancialsTable={true}
        />
      </div>
    </Container>
  );
}
