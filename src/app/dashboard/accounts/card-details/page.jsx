"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/Container/Container";
import ArrowDown from "@/Icons/ArrowDown";
import Button, { TextButton } from "@/components/Elements/Button/Button";
import Add from "@/Icons/Add";
import Setting from "@/Icons/Setting";
import Freeze from "@/Icons/Freeze";
import UpDownArros from "@/Icons/UpDownArrows";
import Minus from "@/Icons/Minus";
import Copy from "@/Icons/Copy";
import Back from "@/Icons/Back";
import FinancialsTable from "@/components/Companies/FinancialsTab/FinancialsTable";
import Placeholder from "@/Icons/imageicon/Placeholder";

export default function AccountsDetails() {
  const router = useRouter();
  const [companies, setCompanies] = useState(null);
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
    <Container pageName={"Cards"}>
      <div className="flex flex-col gap-2 sm:gap-5">
        <div onClick={() => router.back()}>
          <Back />
        </div>
        <div className="p-4 overflow-x-auto bg-white border border-white rounded-2xl">
          <div className="flex items-center">
            <Placeholder className="w-[67.5px] h-[42.72px]" />
            <div className="flex flex-col">
              <p className="flex flex-row items-center ml-4 text-sm font-semibold">
                <span className="mr-2">Multi-Virtual use card</span>
                <ArrowDown />
              </p>
              <p className="ml-4 text-xs font-normal text-textSecondary">
                •••• 2354
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-row sm:flex-wrap items-center w-full py-6 gap-2">
            <TextButton
              title={"Deposit"}
              icon={<Add />}
              backgroundColor="bg-white"
              textColor="text-textBlack"
              borderColor="border-[1px] border-primary50"
              className={"text-xs"}
            />
            <TextButton
              title={"Withdraw"}
              icon={<Minus />}
              backgroundColor="bg-white"
              textColor="text-textBlack"
              borderColor="border-[1px] border-primary50"
              className={"text-xs"}
            />
            <TextButton
              title={"Exchange"}
              icon={<UpDownArros />}
              backgroundColor="bg-white"
              textColor="text-textBlack"
              borderColor="border-[1px] border-primary50"
              className={"text-xs"}
            />
            <TextButton
              title={"Settings"}
              icon={<Setting />}
              backgroundColor="bg-white"
              textColor="text-textBlack"
              borderColor="border-[1px] border-primary50"
              className={"text-xs"}
              onClick={() =>
                router.push(`/dashboard/accounts/card-details/settings`)
              }
            />
            <TextButton
              title={"Freeze"}
              icon={<Freeze />}
              backgroundColor="bg-white"
              textColor="text-textBlack"
              borderColor="border-[1px] border-primary50"
              className={"text-xs"}
            />
          </div>
          <hr />
          {/* Additional Details */}
          <div className="mt-6">
            <div className="grid grid-cols-1 gap-2 sm:gap-4 md:grid-cols-3">
              {/* Column 1 */}
              <div className="space-y-4">
                <div className="mb-2 text-xs">
                  <p className="text-xs font-medium text-textSecondary">
                    Holder Name
                  </p>
                  <p className="flex items-center text-xs font-semibold text-blue-600">
                    john.watwallet
                    <button className="ml-2">
                      <Copy />
                    </button>
                  </p>
                </div>
                <div className="mb-2 text-sm">
                  <p className="text-xs font-medium text-textSecondary">
                    Security Code
                  </p>
                  <p className="flex items-center text-xs font-semibold">
                    114
                    <button className="ml-2">
                      <Copy />
                    </button>
                  </p>
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-4">
                <div className="mb-2 text-xs">
                  <p className="font-medium text-textSecondary">Card number</p>
                  <p className="flex items-center font-semibold">
                    4568 0023 8238 9288
                    <button className="ml-2">
                      <Copy />
                    </button>
                  </p>
                </div>
                <div className="mb-2 text-xs">
                  <p className="font-medium text-textSecondary">Billing Address</p>
                  <p className="flex items-center font-semibold">
                    ernst-ludwig-strasse 13, bensheim, 64625, United States
                    <button className="ml-2">
                      <Copy />
                    </button>
                  </p>
                </div>
              </div>
              {/* Column 3 */}
              <div className="space-y-4">
                <div className="mb-2 text-xs">
                  <p className="font-medium text-textSecondary">Expiry Date</p>
                  <p className="flex items-center font-semibold">
                    03/31
                    <button className="ml-2">
                      <Copy />
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <TransactionsTable companies={companies} /> */}
        <FinancialsTable transactions={dummyData} />
      </div>
    </Container>
  );
}
