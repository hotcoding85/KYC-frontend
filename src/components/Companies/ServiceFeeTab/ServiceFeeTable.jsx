import React, { useState, useEffect } from "react";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "../List/List.css";
import Action from "@/components/Elements/Action/Action";
import SchemeDeleteModal from "@/components/Companies/ServiceFeeTab/DeleteSchemeModal";
import AddSchemeModal from "@/components/Companies/ServiceFeeTab/AddSchemeModal";
import useIsMobile from "@/hooks/useIsMobile";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import TableTopCard from "@/components/Elements/DataTable/topCard";
import { paginatorTemplate } from "@/components/Elements/PaginationTemplate/PaginationTemplate";

export default function ServiceFeeTable({
  companyScheme,
  addFeeScheme,
  handleFetchAllScheme,
}) {
  const [data, setData] = useState(companyScheme);
  const [singleScheme, setSingleScheme] = useState({});
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEdit, setIsEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(companyScheme);
  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);
  const isMobile = useIsMobile();
  const [searchTimeout, setSearchTimeout] = useState(null);
  const openEditModal = () => setIsEditModal(true);
  const closeEditModal = () => setIsEditModal(false);

  useEffect(() => {
    setData(companyScheme);
    setFilteredData(companyScheme)
  }, [companyScheme]);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredData(companyScheme); // Reset to full data when searchTerm is empty
    } else {
      // Clear the previous timeout
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
  
      // Set a new timeout for debounce functionality
      const newTimeout = setTimeout(() => {
        const filtered = companyScheme.filter((company) => 
          Object.values(company).some((value) => 
            typeof value === 'string' && 
            value.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
  
        setFilteredData(filtered);
      }, 300);
  
      setSearchTimeout(newTimeout);
    }
  }, [searchTerm, companyScheme]);

  const activityNameTemplate = (rowData) => {
    return (
      <div className="flex gap-2 align-items-center">
        <div className="flex flex-row items-center justify-center">
          <span className="w-3 h-3 mr-2 bg-success rounded-full"></span>
          <p>{rowData?.activity}</p>
        </div>
      </div>
    );
  };

  const serviceActionTemplate = (rowData) => {
    return (
      <Action>
        <li
          onClick={() => {
            setSingleScheme(rowData);
            openEditModal();
          }}
          className="px-4 py-2 cursor-pointer text-textBlack hover:bg-gray-50"
        >
          Edit Scheme
        </li>
        <li
          onClick={() => {
            setSingleScheme(rowData);
            openDeleteModal();
          }}
          className="px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-50"
        >
          Delete Scheme
        </li>
      </Action>
    );
  };

  const serviceIdTemplate = (rowData) => {
    return (
      <div className="flex items-start gap-1">
        <Checkbox className="custom-checkbox" checked={false} />
        <p className="text-xs font-medium text-textBlack">#{rowData?.id}</p>
      </div>
    );
  };

  const handleSortChange = (sort) => {
    //SORT Logic
    if (!filteredData || filteredData.length === 0) return
    const data=  [...filteredData]
    switch (sort.sort) {
      case 'name':
        data.sort((a, b) => {
          const nameA = `${a.activity}`;
          const nameB = `${b.activity}`;
          return sort.order === 'desc' 
            ? nameA.localeCompare(nameB) 
            : nameB.localeCompare(nameA); // Ascending or descending by name
        });
        break;
    
      case 'created_at':
        data.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return sort.order === 'desc' 
            ? dateA - dateB 
            : dateB - dateA; // Ascending or descending by creation date
        });
        break;
    
      case 'usd_value':
        // Assuming no action is needed for usd_value
        data.sort((a, b) => {
          const dateA = a.fee;
          const dateB = b.fee;
          return sort.order === 'asc' 
            ? dateA - dateB 
            : dateB - dateA; // Ascending or descending by creation date
        });
        break;
    
      default:
        // If no valid `sort` key, leave data unmodified
        break;
    }
    setFilteredData(data)
  };

  const handleFilterChange = (filter) => {
    //Filter Logic
  };

  return (
    <>
      <div className="pt-3 space-y-1 bg-white border border-white rounded-2xl">
        <TableTopCard
          title={"Fee Scheme"}
          btnText={"Add new scheme"}
          handleClick={() => addFeeScheme()}
          isStatementVisible={false}
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
                <p className="text-xs font-medium text-textBlack">ID</p>
              </div>
            }
            body={serviceIdTemplate}
            sortable
            sortField="representative.name"
          ></Column>
          <Column
            header={
              <p className="text-xs font-medium text-textBlack">
                Activity Name
              </p>
            }
            body={activityNameTemplate}
            className="text-xs font-medium text-textLight"
            sortable
          ></Column>
          <Column
            header={<p className="text-xs font-medium text-textBlack">Rules</p>}
            body={(row) => <p>{row.rules}</p>}
            className="text-xs font-medium text-textLight"
            hidden={isMobile}
            sortable
          ></Column>
          <Column
            header={
              <p className="text-xs font-medium text-textBlack">Service Fee</p>
            }
            body={(row) => <p>{parseInt(row.fee).toFixed(2)}</p>}
            className="text-xs font-medium text-textLight"
            hidden={isMobile}
            sortable
          ></Column>
          <Column
            header={
              <p className="text-xs font-medium text-textBlack">Action</p>
            }
            body={serviceActionTemplate}
            hidden={isMobile}
            sortable
          ></Column>
        </DataTable>
      </div>
      {isDeleteModalOpen && (
        <SchemeDeleteModal
          closeModal={closeDeleteModal}
          isModalOpen={isDeleteModalOpen}
          handleFetchAllScheme={handleFetchAllScheme}
          selectedScheme={singleScheme}
          setSingleScheme={setSingleScheme}
        />
      )}
      {/*Edit Fee Scheme Modal*/}
      {singleScheme && isEdit && (
        <AddSchemeModal
          isEdit={isEdit}
          initialData={singleScheme}
          closeModal={closeEditModal}
          isModalOpen={isEdit}
          setSingleScheme={setSingleScheme}
          handleFetchAllScheme={handleFetchAllScheme}
        />
      )}
    </>
  );
}
