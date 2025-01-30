import React, { useState, useEffect, useRef, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import useIsMobile from "@/hooks/useIsMobile";
import DateTime from "@/components/Elements/DateTime/DateTime";
import Action from "@/components/Elements/Action/Action";
import TeamStatusTemplate from "@/components/Companies/TeamTab/TeamStatusTemplate";
import TableTopCard from "@/components/Elements/DataTable/topCard";
import { paginatorTemplate } from "@/components/Elements/PaginationTemplate/PaginationTemplate";

const CustomerTable = ({ companyCustomers, handleOption }) => {
  const [isModalOpen, setModalOpen] = useState(null); // Track which row modal is open for
  const [checkedRows, setCheckedRows] = useState([]); // Track selected rows (checkbox)
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(companyCustomers);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [filters, setFilters] = useState({
    status: "",
    activity: "",
    totalAssets: "",
    totalUsers: "",
  });
  useEffect(() => {
    // setFilteredData(companyCustomers)
  }, [companyCustomers]);

  useEffect(() => {
    if (!companyCustomers) {
      setFilteredData([]);
      return
    }
    const filtered = companyCustomers.filter(company =>
      company.first_name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      company.email?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      company?.userProfile?.phone?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || 
      company?.userProfile?.phoneCountryCode?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    if (filters) {
      const _filteredData = filtered?.filter((item) => {
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
                item.totalAssets.replace("$", "").replace("K", "000")
              );
              return companyAssets >= min && companyAssets <= max;
            case "totalUsers":
              return value === "" || item.totalUsers.toString() === value;
            default:
              return (
                item[key] &&
                item[key].toString().toLowerCase().includes(value.toLowerCase())
              );
          }
        });
      });
      setFilteredData(_filteredData);
    }
    else{
      setFilteredData(filtered);
    }
  }, [companyCustomers, debouncedSearchTerm, filters]);

  useEffect(() => {
    // Cleanup function
    return () => {
      handler.current && clearTimeout(handler.current);
    };
  }, [])

  const handler = useRef(null)
  useEffect(() => {
    handler.current && clearTimeout(handler.current);
    handler.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Adjust debounce time (300ms is common)
  }, [searchTerm]);

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


  const handleSortChange = useCallback((sort) => {
    const { sort: sortKey, order: sortOrder } = sort;
    setFilteredData(sortData(filteredData, sortKey, sortOrder));
  }, [filteredData]);

  const handleFilterChange = (filter) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...filter }));
  };

  const data = React.useMemo(() => companyCustomers, [companyCustomers]);

  const closeModal = () => setModalOpen(null);

  const customerIdTemplate = (rowData) => {
    return (
      <div className="flex items-start gap-1">
        <Checkbox className="custom-checkbox" checked={false} />
        <p className="text-xs font-medium leading-4 text-textBlack text-left">#{rowData?.id}</p>
      </div>
    );
  };

  const customerNameTemplate = (rowData) => {
    return (
      <div className="flex gap-2 align-items-center">
        <div className="flex flex-row">
          <p className="text-blue-600 cursor-pointer">{rowData?.first_name + ' ' + rowData?.last_name}</p>
        </div>
      </div>
    );
  };

  const customerEmailTemplate = (rowData) => {
    return <p>{rowData?.email}</p>;
  };

  const customerPhoneNumberTemplate = (rowData) => {
    return <p>{(rowData?.userProfile?.phoneCountryCode || '') + ' ' + (rowData?.userProfile?.phone || '')}</p>;
  };

  const customerCountryTemplate = (rowData) => {
    return <p>{rowData?.userProfile?.country || 'Not Provided'}</p>;
  };

  const customerDateJoinedTemplate = (rowData) => {
    return (
      <div className="flex gap-2 align-items-center">
        <div className="flex flex-row">
          <DateTime date={rowData?.created_at}></DateTime>
        </div>
      </div>
    );
  };

  const customerTypeTemplate = (rowData) => {
    return <p>{rowData?.role}</p>;
  };

  const customerLastActivityTemplate = (rowData) => {
    return (
      <div className="flex gap-2 align-items-center">
        <DateTime date={rowData?.updated_at}></DateTime>
      </div>
    );
  };

  const customerStatusTemplate = (rowData) => {
    return <TeamStatusTemplate status={rowData?.status} />;
  };

  const customerActionTemplate = (rowData) => {
    return (
      <Action>
        <ul className="py-1">
          {!rowData?.status && (
            <li
              onClick={() => handleOption("Approve", rowData?.id)}
              className="px-4 py-2 text-success cursor-pointer hover:bg-gray-50"
            >
              Approve
            </li>
          )}
          <li
            onClick={() => handleOption("View Details", rowData?.user_id)}
            className="px-4 py-2 cursor-pointer text-textBlack hover:bg-gray-50"
          >
            View Details
          </li>
          <li
            onClick={() => handleOption("Request More Info")}
            className="px-4 py-2 cursor-pointer text-textBlack hover:bg-gray-50"
          >
            Request More Info
          </li>
          {rowData?.status && (
            <li
              onClick={() => handleOption("Suspend", rowData?.id)}
              className="px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-50"
            >
              Suspend
            </li>
          )}
        </ul>
      </Action>
    );
  };

  const toggleModal = (id) => {
    setModalOpen(isModalOpen === id ? null : id);
  };

  const handleCheckboxChange = (id) => {
    if (checkedRows.includes(id)) {
      setCheckedRows(checkedRows.filter((rowId) => rowId !== id));
    } else {
      setCheckedRows([...checkedRows, id]);
    }
  };

  return (
    <div className="pt-3 overflow-x-auto bg-white border rounded-2xl border-primary50">
      <TableTopCard
        title={"Customers"}
        handleClick={() => addFeeScheme()}
        isStatementVisible={false}
        isAddBtnVisible={false}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSortChange={handleSortChange}
        handleFilterChange={handleFilterChange}
      />
      <DataTable
        value={filteredData}
        paginator
              paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} companies"
        rows={40}
        // selection={selectedCustomer}
        // onSelectionChange={(e) => setSelectedCustomer(e.value)}
        selectionMode="single"
        dataKey="id"
        stateStorage="session"
        stateKey="dt-state-demo-local"
      >
        <Column
          header={
            <div className="flex items-start gap-1">
              <Checkbox className="custom-checkbox" checked={false} />
              <p className="text-xs font-medium leading-4 text-textBlack text-left">ID</p>
            </div>
          }
          body={customerIdTemplate}
        ></Column>
        <Column
          header={
            <p className="text-xs font-medium leading-4 text-textBlack text-left">Customer Name</p>
          }
          body={customerNameTemplate}
          className="text-xs font-medium text-textLight"
          sortable
        ></Column>
        <Column
          header={
            <p className="text-xs font-medium leading-4 text-textBlack text-left">Email Address</p>
          }
          body={customerEmailTemplate}
          className="text-xs font-medium text-textLight"
          hidden={isMobile}
          sortable
        ></Column>
        <Column
          header={
            <p className="text-xs font-medium leading-4 text-textBlack text-left">Phone Number</p>
          }
          body={customerPhoneNumberTemplate}
          className="text-xs font-medium text-textLight"
          hidden={isMobile}
          sortable
        ></Column>
        <Column
          header={<p className="text-xs font-medium leading-4 text-textBlack text-left">Country</p>}
          body={customerCountryTemplate}
          className="text-xs font-medium text-textLight"
          hidden={isMobile}
          sortable
        ></Column>
        <Column
          header={
            <p className="text-xs font-medium leading-4 text-textBlack text-left">Date Joined</p>
          }
          body={customerDateJoinedTemplate}
          className="text-xs font-medium text-textLight"
          hidden={isMobile}
          sortable
        ></Column>
        <Column
          header={<p className="text-xs font-medium leading-4 text-textBlack text-left">Type</p>}
          body={customerTypeTemplate}
          className="text-xs font-medium text-textLight"
          hidden={isMobile}
          sortable
        ></Column>
        <Column
          header={
            <p className="text-xs font-medium leading-4 text-textBlack text-left">Last Activity</p>
          }
          body={customerLastActivityTemplate}
          className="text-xs font-medium text-textLight"
          hidden={isMobile}
          sortable
        ></Column>
        <Column
          header={<p className="text-xs font-medium leading-4 text-textBlack text-left">Status</p>}
          body={customerStatusTemplate}
          className="text-xs font-medium leading-4 text-textBlack text-left"
          hidden={isMobile}
          sortable
        ></Column>
        <Column
          header={<p className="text-xs font-medium leading-4 text-textBlack text-left">Action</p>}
          body={customerActionTemplate}
          hidden={isMobile}
          sortable
        ></Column>
      </DataTable>
    </div>
  );
};

export default CustomerTable;
