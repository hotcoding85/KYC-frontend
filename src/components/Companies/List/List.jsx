import { CompanyIdTemplate } from "@/components/Elements/DataTable/templates";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "./List.css";
import useApi from "@/hooks/useApi";
import CompanyActions from "@/components/Elements/ActionTemplate";
import { formatDate } from "@/utils/helper";
import CompanyStatusTemplate from "@/app/dashboard/company/company_components/status_template";
import { useRouter } from "next/navigation";
import useIsMobile from "@/hooks/useIsMobile";
import TableTopCard from "@/components/Elements/DataTable/topCard";
import { Checkbox } from "primereact/checkbox";
import { paginatorTemplate } from "@/components/Elements/PaginationTemplate/PaginationTemplate";
export default function List({ companies }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(companies);
  const [isCheckedAll, setCheckedAll] = useState(false);
  const [filteredData, setFilteredData] = useState(companies);
  const router = useRouter();
  const isMobile = useIsMobile(); // Using the custom hook to detect mobile screen
  const [filters, setFilters] = useState({
    status: "",
    activity: "",
    totalAssets: "",
    totalUsers: "",
  });
  // Debounced search term state
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const handler = useRef(null)
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

  const { fetchData, loading, error } = useApi();

  const handleOption = async (action, company_id, formData) => {
    let updateData = {};
    let endpoint = `/company/${company_id}/update`;
    switch (action) {
      case "Approve":
        updateData = { status: true, active: true };
        break;
      case "Reinstate":
        updateData = { active: true };
        break;
      case "Delete":
        updateData = { deleted: true };
        endpoint = `/company/${company_id}/delete`;
        break;
      case "Suspend":
        updateData = { active: false };
        break;
      case "Request More Info":
        endpoint = `/company/${company_id}/additional-info`;
        updateData = {
          requestedInformationDetail: formData.requestedInformationDetail,
          proofOfAddress: formData.proofOfAddress,
          financialStatement: formData.financialStatement,
          businessLicense: formData.businessLicense,
          other: formData.other,
          otherDescription: formData.otherDescription,
        };
        break;
      default:
        console.log("Unknown action:", action);
        return;
    }
    const { result, error } = await fetchData(endpoint, {
      method: action === "Delete" ? "DELETE" : "PATCH",
      body: updateData,
    });

    if (result) {
      setData((prevCompanies) =>
      prevCompanies ? prevCompanies.map((company) =>
          company.company_id === company_id
            ? { ...company, ...updateData }
            : company
        ) : []
      );
    } else if (error) {
      console.error("Error updating company:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  // Placeholder functions - replace these with actual implementations
  const calculateTotalAssets = (item) => {
    // Implement the logic to calculate total assets for an item
    return 0; // Placeholder return
  };

  const calculateTotalUsers = (item) => {
    // Implement the logic to calculate total users for an item
    return 0; // Placeholder return
  };

  const filterData = useCallback(() => {
    
  }, [companies, filters]);

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

  useEffect(() => {
    if (!companies) {
      setFilteredData([]);
      return
    }
    const filtered = companies.filter(company =>
      company.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
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
  }, [companies, debouncedSearchTerm, filters]);

  const handleSortChange = useCallback((sort) => {
    const { sort: sortKey, order: sortOrder } = sort;
    setFilteredData(sortData(filteredData, sortKey, sortOrder));
  }, [filteredData]);

  const handleFilterChange = (filter) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...filter }));
  };

  const companyNameTemplate = (rowData) => {
    return (
      <p
        className="text-primary font-medium text-xs cursor-pointer tracking-[-0.005em] font-inter"
        onClick={() => {
          router.push(`/dashboard/company/${rowData?.company_id}`);
        }}
      >
        {rowData?.name}
      </p>
    );
  };

  const companyDateJoinedTemplate = (rowData) => {
    return (
      <p className="font-medium text-xs tracking-[-0.005em] text-textLight font-inter">
        {formatDate(rowData?.created_at)}
      </p>
    );
  };

  const companyLastActivityTemplate = (rowData) => {
    return (
      <p className="font-medium text-xs tracking-[-0.005em] text-textLight font-inter">
        {formatDate(rowData?.updated_at)}
      </p>
    );
  };

  const companyActionTemplate = (rowData) => {
    return (
      <CompanyActions
        status={rowData.status}
        active={rowData.active}
        company_id={rowData.company_id}
        handleOption={handleOption}
      />
    );
  };

  return (
    <div className="pt-3 overflow-x-auto bg-white border rounded-2xl border-primary50">
      <TableTopCard
        title={"Companies"}
        isAddBtnVisible={false}
        isStatementVisible={false}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSortChange={handleSortChange}
        handleFilterChange={handleFilterChange}
      />
      {filteredData ? (
        <>
          <DataTable
            value={filteredData}
            paginator
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} companies"
            // selection={selectedCustomer}
            // onSelectionChange={(e) => setSelectedCustomer(e.value)}
            rows={40}
              paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink"
            selectionMode="single"
            // onClick={handleClick}
            dataKey="id"
            stateStorage="session"
            stateKey="dt-state-demo-local"
          >
            <Column
              header={
                <div
                  className="flex h-full mt-auto gap-x-1 cursor-pointer"
                  onClick={() => setCheckedAll(prev => !prev)}
                >
                  <Checkbox className="custom-checkbox" checked={isCheckedAll} />
                  <p className="text-xs font-medium text-textBlack">ID</p>
                </div>
              }
              body={CompanyIdTemplate}
              sortable
              sortField="representative.name"
            />
            <Column
              header={
                <p className="text-xs font-medium text-textBlack">
                  Company Name
                </p>
              }
              className="text-xs font-medium text-textLight"
              body={companyNameTemplate}
              sortable
            />
            <Column
              header={
                <p className="text-xs font-medium text-textBlack">
                  Date Joined
                </p>
              }
              className="text-xs font-medium text-textLight"
              body={companyDateJoinedTemplate}
              hidden={isMobile}
              sortable
            />
            <Column
              header={
                <p className="text-xs font-medium text-textBlack">Status</p>
              }
              className="text-xs font-medium text-textBlack"
              body={CompanyStatusTemplate}
              hidden={isMobile}
              sortable
            />
            <Column
              header={
                <p className="text-xs font-medium text-textBlack">
                  Last Activity
                </p>
              }
              body={companyLastActivityTemplate}
              className="text-xs font-medium text-textLight"
              hidden={isMobile}
              sortable
            />
            <Column
              header={
                <p className="text-xs font-medium text-textBlack">Action</p>
              }
              body={companyActionTemplate}
              hidden={isMobile}
              sortable
            />
          </DataTable>
        </>
      ) : (
        <p className="flex items-center w-full p-4">
          No companies available to show
        </p>
      )}
    </div>
  );
}
