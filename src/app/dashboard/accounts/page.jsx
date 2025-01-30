"use client"
import React, { useState, useEffect } from "react";
import Container from "@/components/Container/Container";
import Card from "@/components/Elements/Card/Card";
import List from "@/components/Companies/List/List";
import { Chart } from "react-google-charts";
import Indicator from "@/components/Elements/Indicator/Indicator";
import useApi from "@/hooks/useApi";
import AllAccounts from "@/components/Home/AllAccounts/AllAccounts";
import AllCards from "@/components/Home/AllCards/AllCards";

export default function CompanyPage() {

  const dataLine = [
    ["x", "Companies"],
    ["01/08/24", 0],
    ["02/08/24", 10],
    ["03/08/24", 15],
    ["04/08/24", 40],
    ["05/08/24", 10],
    ["06/08/24", 80],
    ["07/08/24", 40],
    ["08/08/24", 100]
  ];

  const optionsLine = {
    hAxis: {
      gridlines: { color: "transparent" }, // Hide horizontal gridlines
      baselineColor: "transparent", // Hide horizontal axis line
      textPosition: "none" // Hide horizontal axis labels
    },
    vAxis: {
      gridlines: { color: "transparent" }, // Hide vertical gridlines
      baselineColor: "transparent", // Hide vertical axis line
      textPosition: "none" // Hide vertical axis labels
    },
    curveType: "function",
    chartArea: {
      left: 0, // Remove margin on the left
      top: 0, // Remove margin on the top
      right: 0, // Remove margin on the right
      bottom: 0, // Remove margin on the bottom
      width: "100%", // Take the full width
      height: "100%" // Take the full height
    },
    series: {
      1: { curveType: "function" }
    },
    colors: ["#01C892"],
    legend: { position: "none" }, // Hide legend
    height: 100 // Set chart height to 100px
  };

  return (
    <Container pageName={"Account"}>
      <div className="flex flex-col gap-2">
        <AllAccounts />
        <AllCards />
      </div>
    </Container>
  );
}
