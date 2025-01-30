import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Checkbox } from "primereact/checkbox";
import Action from "@/components/Elements/Action/Action";
import useIsMobile from "@/hooks/useIsMobile";
import { paginatorTemplate } from "@/components/Elements/PaginationTemplate/PaginationTemplate";

// Dummy data
const dummyCompanies = [
  {
    id: 1,
    name: "John Doe",
    role: "UBO",
    ownershipPercentage: "40%",
    nationality: "American",
    identificationNumber: "A123456789",
    dateOfBirth: "01/01/1980",
    document: "Document",
  },
  {
    id: 2,
    name: "Kevin Smith",
    role: "Shareholder",
    ownershipPercentage: "21%",
    nationality: "American",
    identificationNumber: "A123456789",
    dateOfBirth: "01/01/1980",
    document: "Document",
  },
  {
    id: 3,
    name: "ACME Holdings",
    role: "Corporate UBO",
    ownershipPercentage: "19%",
    nationality: "American",
    identificationNumber: "A123456789",
    dateOfBirth: "01/01/1980",
    document: "Document",
  },
];

export default function QuestionnaireTable() {
  const [data, setData] = useState([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    setData(dummyCompanies); // Set dummy data
  }, []);

  const companyNameTemplate = (rowData) => {
    return <p className="text-xs font-medium text-left leading-4 text-textLight">{rowData.name}</p>;
  };

  const companyRoleTemplate = (rowData) => {
    return <p className="text-xs font-medium text-left leading-4 text-textLight">{rowData.role}</p>;
  };

  const ownershipPercentageTemplate = (rowData) => {
    return (
      <p className="text-xs font-medium text-left leading-4 text-textBlack">
        {rowData.ownershipPercentage}
      </p>
    );
  };

  const nationalityTemplate = (rowData) => {
    return (
      <p className="text-xs font-medium text-left leading-4 text-textLight">
        {rowData.nationality}
      </p>
    );
  };

  const identificationNumberTemplate = (rowData) => {
    return (
      <p className="text-xs font-medium text-left leading-4 text-textLight">
        {rowData.identificationNumber}
      </p>
    );
  };

  const dateOfBirthTemplate = (rowData) => {
    return (
      <p className="text-xs font-medium text-left leading-4 text-textLight">
        {rowData.dateOfBirth}
      </p>
    );
  };

  const documentTemplate = (rowData) => {
    return (
      <button className="px-4 py-2 text-xs h-8 text-gray-600 border border-gray-300 rounded-[10px] whitespace-nowrap">
        Download Document
      </button>
    );
  };

  const actionTemplate = () => {
    return <Action></Action>;
  };

  return (
    <div className="overflow-x-auto bg-white border rounded-2xl border-primary50">
      <div className="p-4">
        <div className="flex justify-between mb-2">
          <h2 className="text-sm font-semibold text-left leading-5 tracking-tight">Ownership Structure</h2>
        </div>
        <div className="flex items-center">
          <p className=" text-xs font-medium text-gray-500 text-left leading-4">Submitted 12/06/2023</p>
        </div>
      </div>
      {data ? (
        <>
          <DataTable
            value={data}
            paginator
              paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} companies"
            rows={40}
            dataKey="id"
            stateStorage="session"
            stateKey="dt-state-demo-local"
          >
            <Column
              header={
                <p className="text-xs font-medium text-left leading-4 text-textBlack">Name</p>
              }
              body={companyNameTemplate}
              className="text-xs font-medium text-left leading-4 text-textLight"
              sortable
            ></Column>
            <Column
              header={
                <p className="text-xs font-medium text-left leading-4 text-textBlack">Role</p>
              }
              body={companyRoleTemplate}
              className="text-xs font-medium text-left leading-4 text-textLight"
              sortable
            ></Column>
            {!isMobile && (
              <Column
                header={
                  <p className="text-xs font-medium text-left leading-4 text-textBlack">
                    Ownership Percentage
                  </p>
                }
                body={ownershipPercentageTemplate}
                className="text-xs font-medium text-left leading-4 text-textBlack"
                sortable
              ></Column>
            )}
            {!isMobile && (
              <Column
                header={
                  <p className="text-xs font-medium text-left leading-4 text-textBlack">
                    Nationality
                  </p>
                }
                body={nationalityTemplate}
                className="text-xs font-medium text-left leading-4 text-textLight"
                sortable
              ></Column>
            )}
            {!isMobile && (
              <Column
                header={
                  <p className="text-xs font-medium text-left leading-4 text-textBlack">
                    Identification Number
                  </p>
                }
                body={identificationNumberTemplate}
                className="text-xs font-medium text-left leading-4 text-textLight"
                sortable
              ></Column>
            )}
            {!isMobile && (
              <Column
                header={
                  <p className="text-xs font-medium text-left leading-4 text-textBlack">
                    Date of birth
                  </p>
                }
                body={dateOfBirthTemplate}
                className="text-xs font-medium text-left leading-4 text-textLight"
                sortable
              ></Column>
            )}
            {!isMobile && (
              <Column
                header={
                  <p className="text-xs font-medium text-left leading-4 text-textBlack">Document</p>
                }
                body={documentTemplate}
                className="text-xs font-medium text-left leading-4 text-textLight"
                sortable
              ></Column>
            )}
            {!isMobile && (
              <Column
                header={
                  <p className="text-xs font-medium text-left leading-4 text-textBlack">Action</p>
                }
                body={actionTemplate}
                className="text-xs font-medium text-left leading-4 text-textLight"
              ></Column>
            )}
          </DataTable>
        </>
      ) : (
        <p className="flex items-center w-full p-4">
          No data available to show
        </p>
      )}
    </div>
  );
}
