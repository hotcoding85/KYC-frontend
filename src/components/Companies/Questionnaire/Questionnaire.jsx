"use client";

import { useState } from "react";
import QuestionnaireTable from "./QuestionnaireTable";

export default function QuestionnaireCard() {
  const [progress] = useState(50);

  const information = [
    {
      id: 1,
      title: "Legal Information",
      dateSubmitted: "12/06/2023",
      companyName: "Watwallet LLC",
      countryOfRegistration: "United Arab Emirates",
      legalStructure: "Limited Liability",
    },
    {
      id: 2,
      title: "Financial Details",
      dateSubmitted: "12/06/2023",
      annualRevenue: "USD 1,000,000",
      latestFinancialStatement: "12/06/2023",
    },
  ];

  return (
    <div className="space-y-2">
      {/* Compliance Questionnaire */}
      <div className="p-4 bg-white border rounded-2xl border-primary50">
        <h2 className="mb-4 text-sm font-semibold text-left leading-5 tracking-tight">Compliance Questionnaire</h2>
        <div className="flex flex-wrap items-center md:flex-nowrap gap-x-2 gap-y-2 md:gap-y-0">
          <p className="text-xs font-normal text-left leading-4 text-nowrap md:text-nowrap">
            Up Next: <span className="font-semibold text-wrap md:text-nowrap text-left leading-4 text-xs">Company is yet to provide Financial Details</span>
          </p>
          <div className="flex items-center w-full space-x-2">
            <div className="relative w-full h-2 overflow-hidden bg-gray-200 rounded-full">
              <div className="absolute top-0 left-0 h-full bg-success" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-sm">{progress}%</p>
            <div className="w-4 h-4 border-2 border-gray-300 rounded-full animate-spin border-t-transparent"></div>
          </div>
        </div>
      </div>

      {/* Questionnaire Info */}
      {information.map((info) => (
        <div key={info.id} className="p-4 bg-white border shadow-sm border-primary50 rounded-2xl">
          <div className="pb-2 border-b">
            <div className="flex justify-between mb-2">
              <h2 className="text-sm font-semibold text-left leading-5 tracking-tight">{info.title}</h2>
            </div>
            <div className="flex items-center">
              <p className="text-xs font-medium text-gray-500 text-left leading-4">Submitted {info.dateSubmitted}</p>
              <span className={`text-xs font-semibold px-4 py-2 rounded-full ${info.statusColor} ml-2`}>
                {info.status}
              </span>
            </div>
          </div>

          {/* Content for each type of infoument */}
          {info.title === "Legal Information" && (
            <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3">
              <div>
                <p className="mb-2 text-xs font-medium text-gray-500 text-left leading-4">Company Name</p>
                <p className="text-xs font-semibold text-left leading-4">{info.companyName}</p>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-gray-500 text-left leading-4">Country of Registration</p>
                <p className="text-xs font-semibold text-left leading-4">{info.countryOfRegistration}</p>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-gray-500 text-left leading-4">Legal Structure</p>
                <p className="text-xs font-semibold text-left leading-4">{info.legalStructure}</p>
              </div>
            </div>
          )}

          {info.title === "Financial Details" && (
            <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3">
              <div>
                <p className="mb-2 text-xs font-medium text-gray-500 text-left leading-4">Annual Revenue</p>
                <p className="text-xs font-semibold text-left leading-4">{info.annualRevenue}</p>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-gray-500 text-left leading-4">Latest Financial Statement</p>
                <p className="text-xs font-semibold text-left leading-4">{info.latestFinancialStatement}</p>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Questionnaire Table */}
      <QuestionnaireTable />

      {/* Financial Details */}
      <div className="flex items-center justify-between p-4 bg-white border shadow-sm border-primary50 rounded-2xl">
        <div>
          <h2 className="mb-2 text-sm font-semibold text-left leading-5 tracking-tight">Financial Details</h2>
          <p className="text-xs font-medium text-gray-500 text-left leading-">To be submitted</p>
        </div>

        <button className="px-4 py-2 text-xs text-gray-600 border border-gray-300 rounded-[10px] whitespace-nowrap">
          Nudge
        </button>
      </div>
    </div>
  );
}
