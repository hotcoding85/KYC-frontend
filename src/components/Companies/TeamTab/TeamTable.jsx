import React, { useState, useEffect } from "react";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "../List/List.css";
import Action from "@/components/Elements/Action/Action";
import TeamStatusTemplate from "@/components/Companies/TeamTab/TeamStatusTemplate";
import { useRouter } from "next/navigation";
import useApi from "@/hooks/useApi";
import ConfirmationModal from "@/components/Elements/ConfirmationModal";
import useIsMobile from "@/hooks/useIsMobile";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import DateTime from "@/components/Elements/DateTime/DateTime";
import TableTopCard from "@/components/Elements/DataTable/topCard";
import { paginatorTemplate } from "@/components/Elements/PaginationTemplate/PaginationTemplate";

export default function TeamTable({
  companyTeam,
  company_id,
  fetchCompanyTeam,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(companyTeam);
  const { fetchData } = useApi();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [filteredData, setFilteredData] = useState(companyTeam);
  const isMobile = useIsMobile();

  const router = useRouter();

  const [searchTimeout, setSearchTimeout] = useState(null);

  const handleSearch = (searchTerm) => {
    // Clear the previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set a new timeout
    const newTimeout = setTimeout(() => {
      const filtered = companyTeam.filter((company) =>
        company?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) || company?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) || company?.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }, 300);

    setSearchTimeout(newTimeout);
  };

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredData(companyTeam); // Reset to full data when searchTerm is empty
    } else {
      // Clear the previous timeout
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
  
      // Set a new timeout for debounce functionality
      const newTimeout = setTimeout(() => {
        const filtered = companyTeam.filter((company) => 
          Object.values(company).some((value) => 
            typeof value === 'string' && 
            value.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
  
        setFilteredData(filtered);
      }, 300);
  
      setSearchTimeout(newTimeout);
    }
  }, [searchTerm, companyTeam]);

  useEffect(() => {
    setData(companyTeam);
    setFilteredData(companyTeam);
  }, [companyTeam]);

  async function handleUserStatus(user) {
    const { result, error } = await fetchData(`/users/${user.user_id}`, {
      method: "PUT",
      body: {
        status: user.status,
      },
    });
    if (error) {
      setIsModalOpen(false);
    } else {
      await fetchCompanyTeam();
      setIsModalOpen(false);
    }
  }

  const handleOption = async (option, data) => {
    let content = {};
    switch (option) {
      case "Add Member":
        router.push(`/dashboard/team?companyId=${company_id}&option=Add`);
        break;
      case "Edit Details":
        router.push(
          `/dashboard/team?userId=${data}&companyId=${company_id}&option=Edit`
        );
        break;
      case "View Details":
        router.push(
          `/dashboard/team?userId=${data}&companyId=${company_id}&option=View`
        );
        break;
      case "status":
        content = {
          title: ` ${data.status ? "Activate" : "Suspend"}`,
          description: `Are you sure you want to ${
            data.status ? "Confirm activate" : "Confirm Suspension"
          } this user?`,
          confirmText: data.status ? "Activate" : "suspend",
          confirmColor: data.status ? "bg-primary" : "bg-alert",
          onConfirm: () => handleUserStatus(data),
        };
        setModalContent(content);
        setIsModalOpen(true);
        break;
      default:
        console.log("Unknown action:", option);
        return;
    }
  };

  const handleSortChange = (sort) => {
    const data=  [...filteredData]
    switch (sort.sort) {
      case 'name':
        data.sort((a, b) => {
          const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
          const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
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
        break;
    
      default:
        // If no valid `sort` key, leave data unmodified
        break;
    }
    setFilteredData(data)
  };

  const handleFilterChange = (filter) => {
    console.log(filter)
    //Filter Logic
  };

  const teamIdTemplate = (rowData) => {
    return (
      <div className="flex items-start gap-1">
        <Checkbox className="custom-checkbox" checked={false} />
        <p className="text-xs font-medium text-textBlack">#{rowData?.id}</p>
      </div>
    );
  };

  const userNameTemplate = (rowData) => {
    return (
      <div className="flex gap-2 align-items-center">
        <div className="flex flex-row items-center justify-center">
          <span className="w-3 h-3 mr-2 bg-success rounded-full"></span>
          <p>{rowData?.first_name + " " + rowData?.last_name}</p>
        </div>
      </div>
    );
  };

  const userEmailTemplate = (rowData) => {
    return <p>{rowData?.email}</p>;
  };

  const userRoleTemplate = (rowData) => {
    return <p>{rowData?.role}</p>;
  };

  const lastLoginTemplate = (rowData) => {
    return (
      <div className="flex gap-2 align-items-center">
        <DateTime date={rowData?.updated_at}></DateTime>
      </div>
    );
  };

  const userStatusTemplate = (rowData) => {
    return <TeamStatusTemplate status={rowData?.status} />;
  };

  const userActionTemplate = (rowData) => {
    return (
      <Action>
        <li
          onClick={() => handleOption("View Details", rowData?.user_id)}
          className="px-4 py-2 cursor-pointer text-textBlack hover:bg-gray-50"
        >
          View Details
        </li>
        <li
          onClick={() => handleOption("Edit Details", rowData?.user_id)}
          className="px-4 py-2 cursor-pointer text-textBlack hover:bg-gray-50"
        >
          Edit Details
        </li>
        <li
          className={`font-medium px-4 py-1 rounded-full cursor-pointer ${
            !rowData?.status ? "text-success" : "text-alert"
          }`}
          onClick={() =>
            handleOption("status", {
              status: !rowData?.status,
              user_id: rowData?.id,
            })
          }
        >
          {rowData?.status ? "Suspend" : "Active"}
        </li>
      </Action>
    );
  };

  return (
    <>
      <div  className="pt-3 overflow-x-auto bg-white border rounded-2xl border-primary50">
        <TableTopCard
          title={"Team"}
          btnText={"Add new member"}
          handleClick={() => handleOption("Add Member", "")}
          isStatementVisible={false}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSortChange={handleSortChange}
          handleFilterChange={handleFilterChange}
          handleSearch={handleSearch}
        />
        {filteredData ? (
          <>
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
                body={teamIdTemplate}
                sortable
                sortField="representative.name"
              ></Column>
              <Column
                header={
                  <p className="text-xs font-medium text-textBlack">
                    User Name
                  </p>
                }
                body={userNameTemplate}
                className="text-xs font-medium text-textLight"
                sortable
              ></Column>
              <Column
                header={
                  <p className="text-xs font-medium text-textBlack">
                    Email Address
                  </p>
                }
                body={userEmailTemplate}
                className="text-xs font-medium text-textLight"
                hidden={isMobile}
                sortable
              ></Column>
              <Column
                header={
                  <p className="text-xs font-medium text-textBlack">Role</p>
                }
                body={userRoleTemplate}
                className="text-xs font-medium text-textLight"
                hidden={isMobile}
                sortable
              ></Column>
              <Column
                header={
                  <p className="text-xs font-medium text-textBlack">Status</p>
                }
                body={userStatusTemplate}
                className="text-xs font-medium text-textBlack"
                hidden={isMobile}
                sortable
              ></Column>
              <Column
                header={
                  <p className="text-xs font-medium text-textBlack">
                    Last Login
                  </p>
                }
                body={lastLoginTemplate}
                className="text-xs font-medium text-textBlack"
                hidden={isMobile}
                sortable
              ></Column>
              <Column
                header={
                  <p className="text-xs font-medium text-textBlack">Action</p>
                }
                body={userActionTemplate}
                hidden={isMobile}
                sortable
              ></Column>
            </DataTable>
          </>
        ) : (
          <p className="flex items-center w-full p-4">
            No teams available to show
          </p>
        )}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent.title}
        description={modalContent.description}
        confirmText={modalContent.confirmText}
        confirmColor={modalContent.confirmColor}
        onConfirm={modalContent.onConfirm}
        showForm={modalContent.showForm}
      />
    </>
  );
}
