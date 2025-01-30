"use client";
import React, { useState, useEffect } from "react";

import Container from "@/components/Container/Container";

import Card from "@/components/Elements/Card/Card";
import List from "@/components/Companies/List/List";
import Indicator from "@/components/Elements/Indicator/Indicator";
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

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

import useApi from "@/hooks/useApi";
import { COMPANY_MANAGEMENT_TABLE_DATA } from "@/data/Company Management";
import DashboardCards from "@/components/Transactions/DashboardCards";
import CompanyDashboardCards from "@/components/Companies/CompanyDashboardCards";

export default function CompanyPage() {
  const { fetchData, loading, error } = useApi();
  const [companies, setCompanies] = useState(null);

  const _metrics = [
    {
      title: "Total Companies",
      value: "128",
      change: 10,
      isPositive: true,
      chartLabel: "Total", // Changed from data.label
      chartValues: [800, 900, 700, 1100, 1000, 1200, 1234], // Changed from data.values
      color: "#16a34a",
    },
    {
      title: "Active Companies",
      value: "115",
      change: -10,
      isPositive: false,
      chartLabel: "Active",
      chartValues: [120, 115, 110, 100, 105, 98, 100],
      color: "#dc2626",
    },
    {
      title: "Pending Companies",
      value: "10",
      change: 10,
      isPositive: true,
      chartLabel: "Pending",
      chartValues: [6, 7, 8, 5, 7, 6, 8],
      color: "#16a34a",
    },
    {
      title: "Suspended Companies",
      value: "10",
      change: -10,
      isPositive: false,
      chartLabel: "Suspended",
      chartValues: [3, 4, 2, 5, 4, 6, 5],
      color: "#dc2626",
    },
  ];

  // Helper to filter by date range
  const filterByDateRange = (data, start, end) => {
    return data.filter(company => {
      const createdAt = new Date(company.created_at);
      return createdAt >= start && createdAt <= end;
    });
  };

  // Helper to count statuses
  const countStatuses = (data) => {
    const active = data.filter(company => company.active).length;
    const pending = data.filter(company => !company.status).length;
    const suspended = data.filter(company => !company.active && company.status).length;
    return { active, pending, suspended };
  };

  const generateDateArray = (start, days) => {
    return Array.from({ length: days }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    });
  };

  // Calculate metrics
  const calculateMetrics = (data) => {
    const today = new Date(); // Example, replace with `new Date()` for current date
    const recentStart = new Date(today);
    recentStart.setDate(today.getDate() - 6);
    const recentEnd = today;

    const previousStart = new Date(recentStart);
    previousStart.setDate(recentStart.getDate() - 7);
    const previousEnd = new Date(recentStart);
    previousEnd.setDate(recentEnd.getDate() - 7);

    // Get recent and previous data
    const recentData = filterByDateRange(data, recentStart, recentEnd);
    const previousData = filterByDateRange(data, previousStart, previousEnd);

    const dateArray = generateDateArray(recentStart, 7);

    // Count statuses
    const recentCounts = countStatuses(recentData);
    const previousCounts = countStatuses(previousData);

    // Prepare chart values (daily counts for last 7 days)
    const chartValues = {
      active: Array(7).fill(0),
      pending: Array(7).fill(0),
      suspended: Array(7).fill(0),
    };

    recentData.forEach(company => {
      const dayIndex = Math.floor((new Date(company.created_at) - recentStart) / (1000 * 60 * 60 * 24));
      if (dayIndex >= 0 && dayIndex < 7) {
        if (company.active) chartValues.active[dayIndex]++;
        else if (!company.status) chartValues.pending[dayIndex]++;
        else if (!company.active && company.status) chartValues.suspended[dayIndex]++;
      }
    });

    // Build the metrics array
    return [
      {
        title: "Total Companies",
        value: recentData.length,
        change: recentData.length - previousData.length,
        isPositive: recentData.length >= previousData.length,
        chartLabel: "Total",
        chartValues: chartValues.active.map((v, i) => v + chartValues.pending[i] + chartValues.suspended[i]),
        color: recentData.length >= previousData.length ? "#16a34a" : "#dc2626",
        dates: dateArray,
      },
      {
        title: "Active Companies",
        value: recentCounts.active,
        change: recentCounts.active - previousCounts.active,
        isPositive: recentCounts.active >= previousCounts.active,
        chartLabel: "Active",
        chartValues: chartValues.active,
        color: recentCounts.active >= previousCounts.active ? "#16a34a" : "#dc2626",
        dates: dateArray,
      },
      {
        title: "Pending Companies",
        value: recentCounts.pending,
        change: recentCounts.pending - previousCounts.pending,
        isPositive: recentCounts.pending >= previousCounts.pending,
        chartLabel: "Pending",
        chartValues: chartValues.pending,
        color: recentCounts.pending >= previousCounts.pending ? "#16a34a" : "#dc2626",
        dates: dateArray,
      },
      {
        title: "Suspended Companies",
        value: recentCounts.suspended,
        change: recentCounts.suspended - previousCounts.suspended,
        isPositive: recentCounts.suspended >= previousCounts.suspended,
        chartLabel: "Suspended",
        chartValues: chartValues.suspended,
        color: recentCounts.suspended >= previousCounts.suspended ? "#16a34a" : "#dc2626",
        dates: dateArray,
      },
    ];
  };

  const [metrics, setMetrics] = useState([])

  useEffect(() => {
    async function listComapnies() {
      const { result, error } = await fetchData(`/company/all`, {
        method: "GET",
      });
      if (error) {
        setCompanies(COMPANY_MANAGEMENT_TABLE_DATA);
      } else {
        setCompanies(result);
        setMetrics(calculateMetrics(result))
      }
    }
    //
    // async function listWallets() {
    //   const { result, error } = await fetchData(`/wallet/all`, {
    //     method: "GET",
    //   });
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log(result);
    //   }
    // }

    listComapnies();
    // listWallets();
  }, []);



  return (
    <Container pageName={"Company Management"}>
      <div className="w-full h-max pb-2">
        <CompanyDashboardCards metrics={metrics} />
      </div>

      <List companies={companies} />
    </Container>
  );
}
