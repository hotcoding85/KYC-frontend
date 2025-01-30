import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import DateTime from "@/components/Elements/DateTime/DateTime";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Action from "@/components/Elements/Action/Action";
import useIsMobile from "@/hooks/useIsMobile";
import { Checkbox } from "primereact/checkbox";
import TableTopCard from "@/components/Elements/DataTable/topCard";
import AddReportModal from "../AddReportModal/AddReportModal";

const reportsData = [
  {
    id: "#302012",
    name: "Net sales overview",
    date: "2024-09-04T10:10:00",
    category: "Finances",
  },
  {
    id: "#302011",
    name: "Geographic session distribution",
    date: "2024-09-04T09:10:00",
    category: "Acquisition",
  },
  {
    id: "#302002",
    name: "Traffic source analysis",
    date: "2024-09-04T05:00:00",
    category: "Acquisition",
  },
  {
    id: "#301901",
    name: "Session trends",
    date: "2024-09-03T10:10:00",
    category: "Acquisition",
  },
  {
    id: "#301900",
    name: "Shopping cart metrics",
    date: "2024-09-02T10:10:00",
    category: "Behavior",
  },
  {
    id: "#301881",
    name: "Store conversion trends",
    date: "2023-01-05T10:10:00",
    category: "Behavior",
  },
  {
    id: "#301643",
    name: "Store performance metrics",
    date: "2023-01-01T10:10:00",
    category: "Behavior",
  },
  {
    id: "#301600",
    name: "Product recommendations impact",
    date: "2022-12-24T10:10:00",
    category: "Customers",
  },
  {
    id: "#301555",
    name: "Search effectiveness report",
    date: "2022-12-02T10:10:00",
    category: "Customers",
  },
  {
    id: "#301002",
    name: "Device usage breakdown",
    date: "2022-12-02T10:10:00",
    category: "Customers",
  }
];

const ReportsTable = ({
  isAnalytics,
  reportsName,
  setReportsName,
  setActiveTab,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const isMobile = useIsMobile();
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    setData(reportsData);
    setSortedData(reportsData);
  }, []);

  // Helper function to sort dates
  const sortByDate = (array, order) => {
    return [...array].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
  };

  // Helper function to sort text
  const sortByText = (array, field, order) => {
    return [...array].sort((a, b) => {
      const valueA = a[field].toLowerCase();
      const valueB = b[field].toLowerCase();
      if (order === "asc") {
        return valueA.localeCompare(valueB);
      }
      return valueB.localeCompare(valueA);
    });
  };

  // Main sorting handler
  const handleSortChange = (sortConfig) => {
    let sortedResults = [...data];

    switch (sortConfig.sort) {
      case "date":
        sortedResults = sortByDate(sortedResults, sortConfig.order);
        break;

      case "name":
        sortedResults = sortByText(sortedResults, "name", sortConfig.order);
        break;

      case "category":
        sortedResults = sortByText(sortedResults, "category", sortConfig.order);
        break;

      case "id":
        sortedResults = sortByText(sortedResults, "id", sortConfig.order);
        break;

      default:
        break;
    }

    setSortedData(sortedResults);
  };

  const handleFilterChange = (filter) => {
    // Filter Logic - implement as needed
  };

  const handleOption = (option) => {
    // Action handling logic
  };

  // Your existing template functions
  const reportIdTemplate = (rowData) => {
    const isSelected = selectedRows.includes(rowData.id);
    return (
      <div className="flex items-center gap-1">
        <Checkbox
          className="mt-1 custom-checkbox"
          checked={isSelected}
          onChange={(e) => {
            if (e.checked) {
              setSelectedRows([...selectedRows, rowData.id]);
            } else {
              setSelectedRows(selectedRows.filter((id) => id !== rowData.id));
            }
          }}
        />
        <p className="my-auto text-xs font-medium text-textBlack">
          {rowData?.id}
        </p>
      </div>
    );
  };

  const headerCheckboxTemplate = () => {
    const allSelected = data.length > 0 && selectedRows.length === data.length;
    return (
      <div className="flex items-center gap-1">
        <Checkbox
          className="custom-checkbox mt-2"
          checked={allSelected}
          onChange={(e) => {
            if (e.checked) {
              setSelectedRows(data.map((row) => row.id));
            } else {
              setSelectedRows([]);
            }
          }}
        />
        <p className="text-xs font-medium text-textBlack">ID</p>
      </div>
    );
  };

  const reportNameTemplate = (rowData) => {
    return (
      <div className="flex gap-2 align-items-center">
        <p className="text-xs font-medium text-textBlack">{rowData?.name}</p>
      </div>
    );
  };

  const reportDateTemplate = (rowData) => {
    return (
      <div className="flex gap-2 align-items-center">
        <DateTime date={rowData?.date}></DateTime>
      </div>
    );
  };

  const reportCategoryTemplate = (rowData) => {
    return (
      <div className="py-2 mr-auto font-medium bg-gray-100 rounded-lg w-28 text-textBlack">
        {rowData?.category}
      </div>
    );
  };

  const reportActionTemplate = (rowData) => {
    return (
      <Action>
        <li className="px-4 py-2 cursor-pointer text-textBlack hover:bg-gray-50" onClick={()=>{
          setActiveTab("AddReport")
        }} >
          View Details
        </li>
        <li
          onClick={() => setActiveTab("AddReport")}
          className="px-4 py-2 cursor-pointer text-textBlack hover:bg-gray-50"
        >
          Edit Details
        </li>
      </Action>
    );
  };

  const paginatorLeft = (
    <div className="text-xs text-gray-500">
      Showing {1} to {10} of {reportsData.length} reports
    </div>
  );

  return (
    <div className="pt-3 overflow-x-auto bg-white border rounded-2xl border-primary50">
      <TableTopCard
        title={""}
        isAddBtnVisible={false}
        isStatementVisible={true}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSortChange={handleSortChange}
        handleFilterChange={handleFilterChange}
        isAnalytics
      />
      {sortedData.length > 0 ? (
        <div className="relative">
          <DataTable
            paginator
            rows={10}
            dataKey="id"
            value={sortedData}
            stateStorage="session"
            selectionMode="multiple"
            className="custom-datatable"
            paginatorLeft={paginatorLeft}
            stateKey="dt-state-demo-local"
            paginatorTemplate="PrevPageLink PageLinks NextPageLink"
            paginatorClassName="flex justify-between items-center px-4"
          >
            <Column
              header={headerCheckboxTemplate}
              body={reportIdTemplate}
            />
            <Column
              header={
                <p className="text-xs font-medium text-textBlack">
                  Report Name
                </p>
              }
              body={reportNameTemplate}
              className="text-xs font-medium text-textLight"
            />
            <Column
              header={
                <p className="text-xs font-medium text-textBlack">Date</p>
              }
              body={reportDateTemplate}
              className="text-xs font-medium text-textLight"
              hidden={isMobile}
            />
            <Column
              header={
                <p className="text-xs font-medium text-center text-textBlack">
                  Category
                </p>
              }
              body={reportCategoryTemplate}
              className="text-xs font-medium text-center text-textBlack"
              hidden={isMobile}
            />
            <Column
              header={
                <p className="text-xs font-medium text-textBlack">Action</p>
              }
              body={reportActionTemplate}
              className="text-xs font-medium text-textBlack"
              hidden={isMobile}
            />
          </DataTable>

          <style jsx global>{`
            .custom-datatable .p-paginator {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-top: 1px solid #e5e7eb;
              padding: 1rem;
            }

            .custom-datatable .p-paginator-left {
              order: 1;
            }

            .custom-datatable .p-paginator .p-paginator-pages,
            .custom-datatable .p-paginator .p-paginator-prev,
            .custom-datatable .p-paginator .p-paginator-next {
              order: 2;
            }
          `}</style>
        </div>
      ) : (
        <p className="flex items-center w-full p-4">
          No reports available to show
        </p>
      )}
      <AddReportModal
        reportsName={reportsName}
        setReportsName={setReportsName}
      />
    </div>
  );
};

export default ReportsTable;
