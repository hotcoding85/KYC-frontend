"use client";
import React, { useState, useEffect } from "react";
import useApi from "@/hooks/useApi";
import Card from "@/components/Elements/Card/Card";
import Indicator from "@/components/Elements/Indicator/Indicator";
import FinancialsTable from "./FinancialsTable";
import Statistics from "@/components/Home/Statistics/Statistics";
import TotalAssets from "@/components/Analytics/TotalAssets/TotalAssets";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import FinancialOverview from "./FinancialsOverviewCards";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

export default function FinancialsTab() {
  const { fetchData, loading, error } = useApi();
  const [companies, setCompanies] = useState(null);

  useEffect(() => {
    async function listComapnies() {
      const { result, error } = await fetchData(`/company/all`, {
        method: "GET",
      });
      if (error) {
        setCompanies([]);
      } else {
        setCompanies(result);
      }
    }

    listComapnies();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-y-2">
        <FinancialOverview />
        <div className="grid h-auto grid-cols-1 gap-2 md:grid-cols-3">
          <div className="col-span-2">
            <Statistics />
          </div>
          <TotalAssets />
        </div>
        <FinancialsTable companies={companies} />
      </div>
    </>
  );
}
