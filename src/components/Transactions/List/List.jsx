import React, { useState, useEffect, useRef, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import DateTime from "@/components/Elements/DateTime/DateTime";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "./List.css";
import Tag from "@/components/Elements/Tag/Tag";
import Action from "@/components/Elements/Action/Action";
import useIsMobile from "@/hooks/useIsMobile";
import { Checkbox } from "primereact/checkbox";
import TableTopCard from "@/components/Elements/DataTable/topCard";
import { classNames } from "primereact/utils";

export default function List({ transactions }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]); // New state for selected rows
  const [selectAll, setSelectAll] = useState(false); // New state for select all checkbox
  const isMobile = useIsMobile();
  // Debounced search term state
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [filters, setFilters] = useState([]);
  const handler = useRef(null)

  useEffect(() => {
    let _transactions = transactions;

    if (debouncedSearchTerm !== "") {
      _transactions = _transactions.filter((tr) => {
        const searchLower = debouncedSearchTerm.toLowerCase().trim();
        return (
          tr.company_name.toLowerCase().includes(searchLower) 
        );
      });
    }
    // Assuming you have a state to hold filtered Accounts
    _transactions = _transactions?.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === "") return true; // Skip empty filters

        switch (key) {
          case "status":
            return item.status === (value.toLowerCase() === "active");
          case "activity":
            const daysSinceUpdate =
              (new Date() - new Date(item.updated_at)) / (1000 * 60 * 60 * 24);
            switch (value.toLowerCase()) {
              case "daily":
                return daysSinceUpdate <= 1;
              case "weekly":
                return daysSinceUpdate <= 7;
              case "monthly":
                return daysSinceUpdate <= 30;
              default:
                return true;
            }
          case "totalAssets":
            // Assuming totalAssets is a string like "$10-50K"
            const [min, max] = value
              .replace("$", "")
              .split("-")
              .map((v) => parseInt(v.replace("K", "000")));
            const companyAssets = parseInt(
              item?.totalAssets.replace("$", "").replace("K", "000")
            );
            return companyAssets >= min && companyAssets <= max;
          case "totalUsers":
            return value === "" || item?.totalUsers.toString() === value;
          default:
            return (
              item[key] &&
              item[key].toString().toLowerCase().includes(value.toLowerCase())
            );
        }
      });
    });
    setData(_transactions);
  }, [debouncedSearchTerm, transactions, filters]);

  // New function to handle select all
  const handleSelectAll = (e) => {
    setSelectAll(e.checked);
    if (e.checked) {
      setSelectedRows(data);
    } else {
      setSelectedRows([]);
    }
  };

  useEffect(() => {
    handler.current && clearTimeout(handler.current);
    handler.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Adjust debounce time (300ms is common)
  }, [searchTerm]);

  useEffect(() => {
    // Cleanup function
    return () => {
      handler.current && clearTimeout(handler.current);
    };
  }, [])

  // Modified to handle individual row selection
  const companyIdTemplate = (rowData) => {
    const isSelected = selectedRows.some((row) => row.id === rowData.id);
    return (
      <div className="flex gap-x-1">
        <Checkbox
          className="custom-checkbox"
          checked={isSelected}
          onChange={(e) => {
            if (e.checked) {
              setSelectedRows([...selectedRows, rowData]);
            } else {
              setSelectedRows(
                selectedRows.filter((row) => row.id !== rowData.id)
              );
            }
          }}
        />
        <p className="text-xs font-medium text-textBlack">#{rowData?.id}</p>
      </div>
    );
  };

  const handleOption = (option, rowData) => {
    // Add rowData parameter to handle actions for specific rows
    console.log(`${option} selected for company:`, rowData);
  };

  const companyNameTemplate = (rowData) => {
    return (
      <div className="flex gap-2 align-items-center">
        <div className="flex flex-row">
          <p className="text-blue-600 cursor-pointer">{rowData?.name}</p>
        </div>
      </div>
    );
  };

  const companyDateJoinedTemplate = (rowData) => {
    return (
      <div className="flex gap-2 align-items-center">
        <div className="flex flex-row">
          <DateTime date={rowData?.created_at}></DateTime>
        </div>
      </div>
    );
  };

  const companyLastActivityTemplate = (rowData) => {
    return (
      <div className="flex gap-2 align-items-center">
        <DateTime date={rowData?.updated_at}></DateTime>
      </div>
    );
  };

  const companyStatusTemplate = (rowData) => {
    const status = rowData.status
      ? rowData.active
        ? "success"
        : "danger"
      : "warning";
    return (
      <Tag
        status={status}
        text={
          status == "success"
            ? "Active"
            : status == "danger"
            ? "Suspended"
            : "Pending"
        }
      ></Tag>
    );
  };

  const companyActionTemplate = (rowData) => {
    const status = rowData.status
      ? rowData.active
        ? "success"
        : "danger"
      : "warning";
    return (
      <Action>
        {status == "warning" && (
          <li
            onClick={() => handleOption("Approve", rowData)}
            className="px-4 py-2 text-success cursor-pointer hover:bg-gray-50"
          >
            Approve
          </li>
        )}
        <li
          onClick={() => handleOption("View Details", rowData)}
          className="px-4 py-2 cursor-pointer text-textBlack hover:bg-gray-50"
        >
          View Details
        </li>
        <li
          onClick={() => handleOption("Request More Info", rowData)}
          className="px-4 py-2 cursor-pointer text-textBlack hover:bg-gray-50"
        >
          Request More Info
        </li>
        {status == "warning" && (
          <li
            onClick={() => handleOption("Reject", rowData)}
            className="px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-50"
          >
            Reject
          </li>
        )}
        {status == "success" && (
          <li
            onClick={() => handleOption("Suspend", rowData)}
            className="px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-50"
          >
            Suspend
          </li>
        )}
        {status == "danger" && (
          <li
            onClick={() => handleOption("Activate", rowData)}
            className="px-4 py-2 text-success cursor-pointer hover:bg-gray-50"
          >
            Activate
          </li>
        )}
      </Action>
    );
  };

  const sortData = (array, sortKey, sortOrder) => {
    if (!Array.isArray(array)) {
      console.error("sortData received non-array data:", array);
      return array; // Return the input as-is if it's not an array
    }

    return array.slice().sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  };

  const handleSortChange = (sort) => {
    const { sort: sortKey, order: sortOrder } = sort;
    setData(sortData(data, sortKey, sortOrder));
  };

  const handleFilterChange = (filter) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...filter }));
  };


  const paginatorTemplate = {
    layout: "PrevPageLink PageLinks NextPageLink",
    PrevPageLink: (options) => {
      return (
        <button
          type="button"
          className={classNames("p-2 hover:bg-gray-100 rounded-lg", {
            "opacity-50 cursor-not-allowed": options.disabled,
          })}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      );
    },
    NextPageLink: (options) => {
      return (
        <button
          type="button"
          className={classNames("p-2 hover:bg-gray-100 rounded-lg", {
            "opacity-50 cursor-not-allowed": options.disabled,
          })}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      );
    },
    PageLinks: (options) => {
      if (!options.view || !options.totalPages) return null;

      const pages = [];
      for (let i = 0; i < options.totalPages; i++) {
        pages.push(
          <button
            key={i}
            className={classNames(
              "mx-1 w-8 h-8 rounded-lg text-sm flex items-center justify-center transition-colors",
              {
                "bg-black text-white": i === options.page,
                "hover:bg-gray-100": i !== options.page,
              }
            )}
            onClick={() => options.onChange(i)}
          >
            {i + 1}
          </button>
        );
      }

      return (
        <div className="flex items-center">
          {pages}
          {options.totalPages > 5 && (
            <>
              <span className="mx-1">...</span>
            </>
          )}
        </div>
      );
    },
  };

  return (
    <>
      <div className="pt-3 overflow-x-auto bg-white border rounded-2xl border-primary50">
        <TableTopCard
          title={"Recent Transactions"}
          isAddBtnVisible={false}
          isStatementVisible={true}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSortChange={handleSortChange}
          handleFilterChange={handleFilterChange}
        />
        {data ? (
          <>
            <DataTable
              value={data}
              paginator
              paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} companies"
              rows={20}
              selection={selectedRows}
              onSelectionChange={(e) => setSelectedRows(e.value)}
              selectionMode="multiple"
              dataKey="id"
              stateStorage="session"
              stateKey="dt-state-demo-local"
            >
              <Column
                header={
                  <div className="flex gap-x-1">
                    <Checkbox
                      className="custom-checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                    <p className="text-xs font-medium text-textBlack">ID</p>
                  </div>
                }
                body={companyIdTemplate}
                sortable
                sortField="representative.name"
              ></Column>
              <Column
                header={
                  <p className="text-xs font-medium text-textBlack">
                    Company Name
                  </p>
                }
                body={companyNameTemplate}
                className="text-xs font-medium text-textLight"
                sortable
              ></Column>
              {!isMobile && (
                <Column
                  header={
                    <p className="text-xs font-medium text-textBlack">
                      Date Joined
                    </p>
                  }
                  body={companyDateJoinedTemplate}
                  className="text-xs font-medium text-textLight"
                  hidden={isMobile}
                  sortable
                ></Column>
              )}
              <Column
                header={
                  <p className="text-xs font-medium text-textBlack">Status</p>
                }
                body={companyStatusTemplate}
                className="text-xs font-medium text-textBlack"
                hidden={isMobile}
                sortable
              ></Column>
              <Column
                header={
                  <p className="text-xs font-medium text-textBlack">
                    Last Activity
                  </p>
                }
                body={companyLastActivityTemplate}
                hidden={isMobile}
                className="text-xs font-medium text-textLight"
                sortable
              ></Column>
              <Column
                header={
                  <p className="text-xs font-medium text-textBlack">Action</p>
                }
                body={companyActionTemplate}
                hidden={isMobile}
                sortable
              ></Column>
            </DataTable>
          </>
        ) : (
          <p className="flex items-center w-full p-4 text-textBlack">
            No transactions available to show
          </p>
        )}
      </div>
    </>
  );
}
