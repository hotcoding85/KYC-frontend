// Import necessary modules
"use client";
import { React, Suspense, useEffect, useRef, useState } from "react";
import Container from "@/components/Container/Container";
import DashboardCards from "@/components/Transactions/DashboardCards";
import TopBar from "@/components/Team/TopBar/TopBar";
import TeamTable from "@/components/Team/TeamTable/TeamTable";
import MemberDetails from "@/components/Team/MemberDetails/MemberDetails";
import EditAddMember from "@/components/Team/EditAddMember/EditAddMember";
import { useRouter, useSearchParams } from "next/navigation";
import useApi from "@/hooks/useApi";
import { useUser} from "@/app/context/UserContext";

// This is the core AnalyticsPage component
function TeamsPage() {
  //view edit delete
  const handleOnSelectOption = (option) => {
    console.log(option)
    setOption(option)
  };
  const handleOnEditOption = () => setOption("Edit");
  const [company_id, setCompanyId] =  useState(null)
  const { user, fetchUser } = useUser();
  useEffect(() => {
    if (!user) return

    setCompanyId(user?.company.company_id)
}, [user])

  const searchParams = useSearchParams();
  
  useEffect(() => {
  }, [])
  const companyId = searchParams.get("companyId");
  const userId = searchParams.get("userId");
  const router = useRouter();

  const initialOption = searchParams.get("option") ? searchParams.get("option") : '';
  const [option, setOption] = useState(initialOption);
  const [userData, setUserData] = useState();

  const { fetchData, loading, error } = useApi();
  const submitFunctionRef = useRef();

  async function fetchUserData() {
    if (!user) return
    const { result, error } = await fetchData(`/company-teams/user/${userId}`, {
      method: "GET",
    });
    if (error) {
      setUserData(undefined);
    } else {
      setUserData((prevState) => result);
    }
  }

  const goBack = () => {
    router.push('/dashboard/team');
    setOption('');
  };

  const [companyTeam, setCompanyTeam] = useState([]);
  async function fetchCompanyTeam() {
    const { result, error } = await fetchData(
      `/company-teams/company/${company_id}`,
      {
        method: "GET",
      }
    );
    if (error) {
      setCompanyTeam([]);
    } else {
      setCompanyTeam(result);
      setMetrics(calculateMetrics(result))
      console.log(calculateMetrics(result))
    }
  }

  useEffect(() => {
    if (company_id) {
      fetchCompanyTeam()
    }
  }, [company_id])

  useEffect(() => {
    if (["View", "Edit"].includes(option) && userId) fetchUserData();
  }, [initialOption, user]);

  // Helper function to format values
  const formatValue = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  // Helper function to calculate percentage change
  const calculatePercentageChange = (values) => {
    if (!values || values.length < 2) return 0;
    const lastValue = values[values.length - 1];
    const previousValue = values[values.length - 2];

    if (previousValue === 0) return 0;

    const percentageChange =
      ((lastValue - previousValue) / previousValue) * 100;
    return Number(percentageChange.toFixed(1));
  };

  const _metrics = [
    {
      title: "Total Users",
      value: formatValue(1234),
      change: calculatePercentageChange([
        800, 900, 700, 1100, 1000, 1200, 1234,
      ]),
      isPositive:
        calculatePercentageChange([800, 900, 700, 1100, 1000, 1200, 1234]) > 0,
      chartLabel: "Total Users",
      chartValues: [800, 900, 700, 1100, 1000, 1200, 1234],
      color: "#16a34a",
    },
    {
      title: "Active Users",
      value: formatValue(100),
      change: calculatePercentageChange([120, 115, 110, 100, 105, 98, 100]),
      isPositive:
        calculatePercentageChange([120, 115, 110, 100, 105, 98, 100]) > 0,
      chartLabel: "Active Users",
      chartValues: [120, 115, 110, 100, 105, 98, 100],
      color: "#dc2626",
    },
    {
      title: "Inactive Users",
      value: formatValue(8),
      change: calculatePercentageChange([6, 7, 8, 5, 7, 6, 8]),
      isPositive: calculatePercentageChange([6, 7, 8, 5, 7, 6, 8]) > 0,
      chartLabel: "Inactive Users",
      chartValues: [6, 7, 8, 5, 7, 6, 8],
      color: "#16a34a",
    },
    {
      title: "New Users",
      value: formatValue(5),
      change: calculatePercentageChange([3, 4, 2, 5, 4, 6, 5]),
      isPositive: calculatePercentageChange([3, 4, 2, 5, 4, 6, 5]) > 0,
      chartLabel: "New Users",
      chartValues: [3, 4, 2, 5, 4, 6, 5],
      color: "#dc2626",
    },
  ];

  // Helper to filter by date range
  const filterByDateRange = (data, start, end) => {
    return data.filter(team => {
      const createdAt = new Date(team.created_at);
      return createdAt >= start && createdAt <= end;
    });
  };

  // Helper to count statuses
  const countStatuses = (data) => {
    const active = data.filter(team => team.status).length;
    const pending = data.filter(team => !team.status).length;
    const suspended = data.filter(team => !team.status).length;
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

    recentData.forEach(team => {
      const dayIndex = Math.floor((new Date(team.created_at) - recentStart) / (1000 * 60 * 60 * 24));
      if (dayIndex >= 0 && dayIndex < 7) {
        if (team.status) chartValues.active[dayIndex]++;
        else if (!team.status) chartValues.pending[dayIndex]++;
        else if (!team.status) chartValues.suspended[dayIndex]++;
      }
    });

    // Build the metrics array
    return [
      {
        title: "Total Users",
        value: recentData.length,
        change: recentData.length - previousData.length,
        isPositive: recentData.length >= previousData.length,
        chartLabel: "Total",
        chartValues: chartValues.active.map((v, i) => v + chartValues.pending[i] + chartValues.suspended[i]),
        color: recentData.length >= previousData.length ? "#16a34a" : "#dc2626",
        dates: dateArray,
      },
      {
        title: "Active Users",
        value: recentCounts.active,
        change: recentCounts.active - previousCounts.active,
        isPositive: recentCounts.active >= previousCounts.active,
        chartLabel: "Active",
        chartValues: chartValues.active,
        color: recentCounts.active >= previousCounts.active ? "#16a34a" : "#dc2626",
        dates: dateArray,
      },
      {
        title: "Pending Users",
        value: recentCounts.pending,
        change: recentCounts.pending - previousCounts.pending,
        isPositive: recentCounts.pending >= previousCounts.pending,
        chartLabel: "Pending",
        chartValues: chartValues.pending,
        color: recentCounts.pending >= previousCounts.pending ? "#16a34a" : "#dc2626",
        dates: dateArray,
      },
      {
        title: "Suspended Users",
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

  return (
    <Container pageName={"Company Management"}>
      <Suspense>
        <div className="flex flex-col size-full">
          <>
            <TopBar
              option={option}
              onEdit={handleOnEditOption}
              userData={userData}
              onEditSave={() => {
                submitFunctionRef.current.submitFormData();
              }}
              onSave={() => {
                submitFunctionRef.current.submitFormData();
              }}
              fetchUserData={fetchUserData}
              goBack={goBack}
              isAdd={option === "Add"}
            />
            {option === "" && <DashboardCards stats={metrics}  />}

            {option === "" && (
              <TeamTable
                addMember={() => handleOnSelectOption('Add')}
                companyTeam={companyTeam}
                company_id={company_id}
                onSelectOption={handleOnSelectOption}
                fetchCompanyTeam={fetchCompanyTeam}
              />
            )}

            {option === "View" && <MemberDetails userData={userData} />}

            {option === "Edit" && (
              <EditAddMember
                ref={submitFunctionRef}
                isEdit={true}
                userData={userData}
                company_id={companyId}
                redirect={goBack}
              />
            )}

            {option === "Add" && (
              <EditAddMember
                ref={submitFunctionRef}
                isEdit={false}
                company_id={companyId}
                redirect={goBack}
              />
            )}
          </>
        </div>
      </Suspense>
    </Container>
  );
}

export default TeamsPage;
