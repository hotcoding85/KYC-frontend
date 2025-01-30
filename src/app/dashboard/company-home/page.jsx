"use client"
import React, { useState, useEffect } from "react";
import AllAccounts from "@/components/Home/AllAccounts/AllAccounts";
import AllCards from "@/components/Home/AllCards/AllCards";
import Container from "@/components/Container/Container";
import ExchangeComponent from "@/components/Elements/Exchange/Exchange";
import useApi from "@/hooks/useApi";
import List from "@/components/CompanyHome/List/List";
import ChevronRight from "@/Icons/ChevronRight";
import Close from "@/Icons/Close";
import Placeholder from "@/Icons/imageicon/Placeholder";

export default function HomePage() {
  const { fetchData, loading, error } = useApi();
  const [companies, setCompanies] = useState(null);

  useEffect(() => {
    async function listComapnies() {
      const { result, error } = await fetchData(
        `/company/all`,
        {
          method: "GET",
        }
      );
      if (error) {
        setCompanies([]);
      } else {
        setCompanies(result);
      }
    }

    listComapnies();
  }, [])


  const dataLine = [
    ["x", "Companies"],
    ["01/08/24", 0],
    ["02/08/24", 10],
    ["03/08/24", 15],
    ["04/08/24", 40],
    ["05/08/24", 10],
    ["06/08/24", 80],
    ["07/08/24", 40],
    ["08/08/24", 100],
  ];

  const optionsLine = {
    hAxis: {
      gridlines: { color: "transparent" }, // Hide horizontal gridlines
      baselineColor: "transparent", // Hide horizontal axis line
      textPosition: "none", // Hide horizontal axis labels
    },
    vAxis: {
      gridlines: { color: "transparent" }, // Hide vertical gridlines
      baselineColor: "transparent", // Hide vertical axis line
      textPosition: "none", // Hide vertical axis labels
    },
    curveType: "function",
    chartArea: {
      left: 0, // Remove margin on the left
      top: 0, // Remove margin on the top
      right: 0, // Remove margin on the right
      bottom: 0, // Remove margin on the bottom
      width: "100%", // Take the full width
      height: "100%", // Take the full height
    },
    series: {
      1: { curveType: "function" },
    },
    colors: ["#01C892"],
    legend: { position: "none" }, // Hide legend
    height: 100, // Set chart height to 100px
  };

  const sideItems = [
    {
      title: "Send & receive crypto",
      icon: "Verify your ID",
      onClick: () => { },
    },
    {
      title: "Buy Crypto",
      icon: "Start your investment journey",
      onClick: () => { },
    },
    {
      title: "Secure your Account",
      icon: "Enhance security with 2FA",
      onClick: () => { },
    },
    {
      title: "Learn about crypto",
      icon: "Explore more about crypto",
      onClick: () => { },
    },
  ];
  return (
    <Container pageName={"Dashboard"}>
      {/* Main container for the content */}
      <div className="flex flex-col lg:flex-row w-full space-y-5 lg:space-y-0 lg:space-x-5 items-start">
        {/* Left column: AllAccounts, AllCards, List */}
        <div className="w-full lg:w-2/3 space-y-5">
          {/* Welcome Banner */}
          <div className="p-4 bg-white border border-primary50 rounded-2xl space-y-2 w-full flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex flex-row space-x-4 items-center">
              <Placeholder className="size-20" />
              <div className="flex flex-col">
                <h2 className="text-lg text-textBlack font-semibold">
                  Welcome to your dashboard!
                </h2>
                <h2 className="text-base text-textLight">
                  Let&apos;s get started by setting up your first account or card.
                </h2>
              </div>
            </div>
            <button className="mt-4 md:mt-0 text-gray-500 hover:text-gray-700">
              <Close />
            </button>
          </div>
          {/* AllAccounts */}
          <AllAccounts />
          {/* AllCards */}
          <AllCards />
          {/* List Component */}
          <List companies={companies} />
        </div>

        {/* Right column: Explore More, ExchangeComponent */}
        <div className="w-full lg:w-1/3 space-y-5">
          {/* Explore More Section */}
          <div className="p-4 bg-white border border-primary50 rounded-2xl w-full">
            <h2 className="text-lg text-textBlack font-semibold">Explore More</h2>
            <h2 className="text-base text-textLight mb-4">
              Check out a few things you can do right away.
            </h2>
            {sideItems.map((item, index) => (
              <div
                className="flex flex-row items-center justify-between hover:cursor-pointer mb-4"
                key={index}
                onClick={item.onClick}
              >
                <div className="flex flex-row space-x-4 items-center">
                  <Placeholder className="w-[40px] h-[40px] aspect-square" />
                  <div className="flex flex-col">
                    <h2 className="text-lg text-textBlack font-semibold">
                      {item.title}
                    </h2>
                    <h2 className="text-base text-textLight">{item.icon}</h2>
                  </div>
                </div>
                <div>
                  <ChevronRight />
                </div>
              </div>
            ))}
          </div>
          {/* Exchange Component */}
          <ExchangeComponent />
        </div>
      </div>
    </Container>

  );
}