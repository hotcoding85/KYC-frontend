import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { TextButton } from "@/components/Elements/Button/Button";
import Action from "@/components/Elements/Action/Action";
import useIsMobile from "@/hooks/useIsMobile";
import SearchBar from "@/components/Elements/search/SearchBar";
import { paginatorTemplate } from "@/components/Elements/PaginationTemplate/PaginationTemplate";

// Dummy data
const dummySignatures = [
  {
    id: 1,
    name: "John Doe",
    signatureAuthorityLevel: "Full",
    nationality: "American",
    identificationNumber: "A123456789",
    kycStatus: "50%",
  },
  {
    id: 2,
    name: "Kevin Smith",
    signatureAuthorityLevel: "Limited",
    nationality: "American",
    identificationNumber: "A123456789",
    kycStatus: "50%",
  },
  {
    id: 3,
    name: "ACME Holdings upd0ated",
    signatureAuthorityLevel: "Specific Transaction",
    nationality: "American",
    identificationNumber: "A123456789",
    kycStatus: "50%",
  },
];

export default function OwnershipTable() {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("Authorised Signatures");
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useIsMobile(); // Using the custom hook to detect mobile screen

  useEffect(() => {
    setData(dummySignatures); // Set dummy data
  }, []);

  const companyNameTemplate = (rowData) => {
    return <p className="text-xs font-medium text-textLight">{rowData.name}</p>;
  };

  const signatureAuthorityTemplate = (rowData) => {
    return (
      <p className="text-xs font-medium text-textBlack text-left leading-tight">
        {rowData.signatureAuthorityLevel}
      </p>
    );
  };

  const nationalityTemplate = (rowData) => {
    return (
      <p className="text-xs font-medium text-textLight">
        {rowData.nationality}
      </p>
    );
  };

  const identificationNumberTemplate = (rowData) => {
    return (
      <p className="text-xs font-medium text-textLight">
        {rowData.identificationNumber}
      </p>
    );
  };

  const kycTemplate = (rowData) => {
    return (
      <div className="flex items-center w-full space-x-2">
        <div className="relative w-full h-2 overflow-hidden bg-gray-200 rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-success"
            style={{ width: `${rowData.kycStatus}` }}
          ></div>
        </div>
        <p className="text-sm">{rowData.kycStatus}</p>
      </div>
    );
  };

  const actionTemplate = () => {
    return <Action></Action>;
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  console.log("use is mobile", isMobile);

  return (
    <div className="overflow-x-auto bg-white border rounded-2xl border-primary50">
      {/* Search and Tabs */}
      <div className="p-4">
        <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
          <div className="flex flex-wrap items-center space-x-0 space-y-2 md:flex-nowrap md:space-x-2 md:space-y-0">
            <SearchBar />
            <button
              className={`px-4 py-2 w-full md:w-auto text-xs h-8 text-xs border-2 ${
                activeTab === "UBOs" ? "border-black" : "border-gray-300"
              }  rounded-[10px]  whitespace-nowrap text-center flex items-center justify-center`}
              onClick={() => handleTabClick("UBOs")}
            >
              UBOs
            </button>
            <button
              className={`text-xs px-4 py-2 w-full md:w-auto h-8 text-xs border-2 ${
                activeTab === "Shareholders"
                  ? "border-black"
                  : "border-gray-300"
              } rounded-[10px]  whitespace-nowrap text-center flex items-center justify-center`}
              onClick={() => handleTabClick("Shareholders")}
            >
              Shareholders
            </button>
            <button
              className={`text-xs px-4 w-full md:w-auto py-2 h-8 text-xs border-2 ${
                activeTab === "Authorised Signatures"
                  ? "border-black"
                  : "border-gray-300"
              } rounded-[10px]  whitespace-nowrap text-center flex items-center justify-center`}
              onClick={() => handleTabClick("Authorised Signatures")}
            >
              Authorised Signatures
            </button>
            <button
              className={`text-xs px-4 w-full md:w-auto py-2 h-8 text-xs border-2 ${
                activeTab === "Team Members"
                  ? "border-black"
                  : "border-gray-300"
              } rounded-[10px]  whitespace-nowrap text-center flex items-center justify-center`}
              onClick={() => handleTabClick("Team Members")}
            >
              Team Members
            </button>
          </div>
          <TextButton
            title="Add"
            textColor="text-white"
            backgroundColor="bg-black"
            borderColor="border-primary50"
            className={
              "flex items-center justify-center font-normal text-xs rounded-[10px] w-[112px] py-1.5 px-4 leading-4 text-center"
            }
          />
        </div>
      </div>
      {/* Table */}
      {data ? (
        <DataTable
          value={data}
          paginator
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} signatures"
          rows={40}
              paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink"
          dataKey="id"
          stateStorage="session"
          stateKey="dt-state-demo-local"
        >
          <Column
            header={<p className="text-xs font-medium text-textBlack text-left leading-tight">Name</p>}
            body={companyNameTemplate}
            className="text-xs font-medium text-textLight"
            sortable
          ></Column>
          <Column
            header={
              <p className="text-xs font-medium text-textBlack text-left leading-tight">
                Signature Authority Level
              </p>
            }
            body={signatureAuthorityTemplate}
            className="text-xs font-medium text-textLight"
            sortable
          ></Column>
          {!isMobile && (
            <Column
              header={
                <p className="text-xs font-medium text-textBlack text-left leading-tight">
                  Nationality
                </p>
              }
              body={nationalityTemplate}
              className="text-xs font-medium text-textLight"
              sortable
            ></Column>
          )}
          {!isMobile && (
            <Column
              header={
                <p className="text-xs font-medium text-textBlack text-left leading-tight">
                  Identification Number
                </p>
              }
              body={identificationNumberTemplate}
              className="text-xs font-medium text-textLight"
              sortable
            ></Column>
          )}
          {!isMobile && (
            <Column
              header={
                <p className="text-xs font-medium text-textBlack text-left leading-tight">KYC/KYB</p>
              }
              body={kycTemplate}
              className="text-xs font-medium text-textLight"
              sortable
            ></Column>
          )}
          {!isMobile && (
            <Column
              header={
                <p className="text-xs font-medium text-textBlack text-left leading-tight">Action</p>
              }
              body={actionTemplate}
              className="text-xs font-medium text-textLight"
            ></Column>
          )}
        </DataTable>
      ) : (
        <p className="flex items-center w-full p-4">
          No data available to show
        </p>
      )}
    </div>
  );
}
