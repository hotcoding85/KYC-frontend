"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useTable } from "react-table";
import Search from "@/Icons/Search";
import VerticalThreeDots from "@/Icons/VerticalThreeDots";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import DateTime from "@/components/Elements/DateTime/DateTime";
import ConfirmationModal from "@/components/Elements/ConfirmationModal";
import useIsMobile from "@/hooks/useIsMobile";
import TeamStatusTemplate from "@/components/Companies/TeamTab/TeamStatusTemplate";
import Action from "@/components/Elements/Action/Action";
import { useRouter } from "next/navigation";

const roleValue = [
    { value: "SUPER_ADMINISTRATOR", label: "Super Administrator" },
    { value: "SUPER_USER", label: "Super User" },
    { value: "COMPANY_ADMINISTRATOR", label: "Company Administrator" },
    { value: "COMPANY_USER", label: "Company User" },
    { value: "END_USER", label: "End User" },
];

const TeamTable = ({onSelectOption ,addMember, companyTeam, company_id}) => {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    const [searchTimeout, setSearchTimeout] = useState(null);
    const router = useRouter();
    const isMobile = useIsMobile();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({});
    // State to handle dropdown visibility for each row
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [filteredData, setFilteredData] = useState(companyTeam);
    const handleOnSelectOption = async (option, _data) => {
        let content = {};
        switch (option) {
          case "Add":
            router.push(`/dashboard/team?companyId=${company_id}&option=Add`);
            break;
          case "Edit":
            router.push(
              `/dashboard/team?userId=${_data}&companyId=${company_id}&option=Edit`
            );
            break;
          case "View":
            router.push(
              `/dashboard/team?userId=${_data}&companyId=${company_id}&option=View`
            );
            break;
          case "status":
            content = {
              title: ` ${_data.status ? "Activate" : "Suspend"}`,
              description: `Are you sure you want to ${
                _data.status ? "Confirm activate" : "Confirm Suspension"
              } this user?`,
              confirmText: _data.status ? "Activate" : "suspend",
              confirmColor: _data.status ? "bg-primary" : "bg-alert",
              onConfirm: () => handleUserStatus(_data),
            };
            setModalContent(content);
            setIsModalOpen(true);
            break;
          default:
            console.log("Unknown action:", option);
            return;
        }
        onSelectOption(option)
    };

    const data = React.useMemo(
        () => {
            if (companyTeam) {
                return companyTeam
            }
            else{
                return []
            }
        },
        [companyTeam]
    );
    const [searchTerm, setSearchTerm] = useState('')

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
    }, [searchTerm, data]);
    

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

    const userPhoneTemplate = (rowData) => {
        return <p className="whitespace-nowrap">{rowData?.userProfile?.phoneCountryCode + ' ' + rowData?.userProfile?.phone}</p>;
    }
    
    const userRoleTemplate = (rowData) => {
        return <p>{roleValue.find(r => r.value === rowData?.role) ? roleValue.find(r => r.value === rowData?.role).label : rowData?.role}</p>;
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
              onClick={() => handleOnSelectOption("View", rowData?.user_id)}
              className="px-4 py-2 cursor-pointer text-textBlack hover:bg-gray-50"
            >
              View Details
            </li>
            <li
              onClick={() => handleOnSelectOption("Edit", rowData?.user_id)}
              className="px-4 py-2 cursor-pointer text-textBlack hover:bg-gray-50"
            >
              Edit Details
            </li>
            <li
              className={`font-medium px-4 py-1 rounded-full cursor-pointer ${
                !rowData?.status ? "text-success" : "text-alert"
              }`}
              onClick={() =>
                handleOnSelectOption("status", {
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
            <div className="bg-white p-6 rounded-2xl mt-2">
                <h2 className="text-lg text-textBlack font-semibold mb-4">Team</h2>
                <div className="relative overflow-x-auto">
                    <div className="flex flex-row items-center mb-4 space-x-2 justify-between">
                        <div className="flex items-center border border-gray-300 rounded-2xl pr-3 p-3 w-1/4">
                            <Search />
                            <input
                                type="text"
                                placeholder="Search"
                                className="ml-2 border-none outline-none w-full text-xs text-textBlack h-4"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-row items-center space-x-4">
                            <button 
                              onClick={() => addMember("Add Member")} // Use row.original.id
                            className="bg-black text-white rounded-xl px-5 text-sm py-2" >
                                Add new member
                              
                            </button>
                        </div>
                    </div>
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
                                <p className="text-xs font-medium text-textBlack">
                                    Phone Number
                                </p>
                                }
                                body={userPhoneTemplate}
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
                </div>
        </>
    );
};

export default TeamTable;
