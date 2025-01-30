import React, { useEffect, useRef, useState } from "react";
import Copy from "@/Icons/Copy";
import CombinedCard from "../Profile/CombinedCard";

const userData = [
  { label: "Full Name", value: "Emily John Zhang" },
  { label: "Account Type", value: "Individual" },
  { label: "Date of birth", value: "Mar 27 -1994" },
  { label: "Passport Number", value: "1372847892" },
  { label: "Date Registered", value: "Sep 10 -2022" }
]

const userData_two = [
  { label: "Current Occupation", value: "Chief Development Officer (CDO)" },
  { label: "Account Plan", value: "Plus +" },
  { label: "Place of birth", value: "Liverpool" },
  { label: "Citizenship", value: "United Kingdom" },
  { label: "Last Login", value: "Aug 20 -2024" }
]

const contactData = [
  {
    label: "Email Address",
    value: "Emilyzhang@gmail.com",
    isCopyable: true
  },
  {
    label: "Phone Number",
    value: "+971 786 7966",
    isCopyable: true
  },
  {
    label: "Residential Address",
    value: ["123 Main Street, Suite 400", "Springfield, IL 62704", "USA"],
    isCopyable: false
  }
]

const riskData = [
  { label: "Risk Score", value: "100%" },
  { label: "Transaction Flags", value: "XXXXXXXXXX" },
  { label: "PEP Affiliation Flag", value: "XXXXXXXXXX" },
  { label: "Blacklisted Occasions", value: "XXXXXXXXXX" }
]

const riskData_two = [
  { label: "Account Flags", value: "XXXXXXXXXX" },
  { label: "Suspicious Activity Flags", value: "XXXXXXXXXX" },
  { label: "Transaction Limit Breach Flag", value: "XXXXXXXXXX" },
  { label: "Blocked Occasions", value: "XXXXXXXXXX" }
];

export default function ProfileOverviewTab() {
  const handleAddNote = () => {
    console.log("Add note clicked");
  };
  return (
    <>
      <div className="flex flex-col justify-between gap-3 md:flex-row">
        {/* Left Section */}
        <div className="flex flex-col w-full gap-3 md:w-2/3">
          <div className="p-4 bg-white shadow-sm rounded-2xl">
            <h2 className="mb-3 text-sm font-semibold sm:text-base">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {/* Column 1 */}
              <div className="flex flex-col w-full gap-3">
                {userData.map((item, index) => (
                  <div key={index}>
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="text-xs font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Column 2 */}
              <div className="flex flex-col w-full gap-3">
                {userData_two.map((item, index) => (
                  <div key={index}>
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="text-xs font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-4 bg-white shadow-sm rounded-2xl">
            <h2 className="mb-3 text-sm font-semibold sm:text-base">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {/* Column 1 */}
              <div className="flex flex-col w-full gap-3">
                {contactData.map((item, index) => (
                  <div key={index}>
                    <p className="text-xs text-gray-500">{item.label}</p>
                    {Array.isArray(item.value) ? (
                      <p className="flex flex-col font-semibold">
                        {item.value.map((line, i) => (
                          <span key={i} className="text-xs">
                            {line}
                          </span>
                        ))}
                      </p>
                    ) : (
                      <p className="flex items-center text-xs text-blue-600">
                        {item.value}
                        {item.isCopyable && (
                          <button className="ml-2">
                            <Copy size={14} />
                          </button>
                        )}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Column 2 */}
              <div className="flex flex-col w-full gap-3">
                {contactData.map((item, index) => (
                  <div key={index}>
                    <p className="text-xs text-gray-500">{item.label}</p>
                    {Array.isArray(item.value) ? (
                      <p className="flex flex-col font-semibold">
                        {item.value.map((line, i) => (
                          <span key={i} className="text-xs">
                            {line}
                          </span>
                        ))}
                      </p>
                    ) : (
                      <p className="flex items-center text-xs text-blue-600">
                        {item.value}
                        {item.isCopyable && (
                          <button className="ml-2">
                            <Copy size={14} />
                          </button>
                        )}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-4 bg-white shadow-sm rounded-2xl">
            <h2 className="mb-3 text-sm font-semibold sm:text-base">
              Risk Level
            </h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {/* Column 1 */}
              <div className="flex flex-col w-full gap-3">
                {riskData.map((item, index) => (
                  <div key={index}>
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="text-xs font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Column 2 */}
              <div className="flex flex-col w-full gap-3">
                {riskData_two.map((item, index) => (
                  <div key={index}>
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="text-xs font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col w-full gap-3 mb-3 md:mt-0 md:w-1/3 md:mb-0 ">
          <CombinedCard
            status="Active"
            role="Admin"
            onAddNote={handleAddNote}
          />
        </div>
      </div>
    </>
  );
}
