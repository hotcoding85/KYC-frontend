import React, { useEffect, useRef, useState } from "react";
import AddNotesModal from "../Elements/AddNotes/AddNotesModal";
import SortModal from "@/components/Elements/SortModal/SortModal";
import FilterModal from "@/components/Elements/FilterModal/FilterModal";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Tag from '@/components/Elements/Tag/Tag';
import Action from '@/components/Elements/Action/Action';
import "@/components/Companies/List/List.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import ActivityLogTableComponent from "@/components/Elements/DataTable/customers-profile/activityLog";
import useApi from "@/hooks/useApi";

export default function ActivityLogsTab({customerDetails}) {
  const [searchTerm, setSearchTerm] = useState("");
  const { fetchData } = useApi();
  useEffect(() => {
    if (customerDetails?.user_id) {
      getActivityLogs(customerDetails?.user_id)
    }
  }, [customerDetails])
  const [logs, setLogs] = useState([])
  const getActivityLogs = async (user_id) => {
    const { result, error } = await fetchData(
      `/company-customers/activity-log/user/${user_id}`,
      {
        method: "GET",
      }
    );
    if (error) {
      setLogs([]);
    } else {
      setLogs(result);
    }
  }
  const filterSample = [
    {
      label: "Amount",
      icon: "Icon",
      value: "amount",
      type: "string",
      options: [
        {
          label: "10 K",
          icon: "Icon",
          value: "10",
        },
      ],
    },
    {
      label: "Amount",
      icon: "Icon",
      value: "amountc",
      type: "string",
      options: [
        {
          label: "10 K",
          icon: "Icon",
          value: "10",
        },
      ],
    },
    {
      label: "Amount",
      icon: "Icon",
      value: "amountd",
      type: "date",
    },
    {
      label: "Amount",
      icon: "Icon",
      value: "amountr",
      type: "category",
      category: [
        {
          value: "Fiatd",
          label: "Fiat",
          options: [
            {
              label: "10 K",
              value: "10",
            },
          ],
        },
        {
          value: "Fiatre",
          label: "Fiat",
          icon: "Icon",
          options: [
            {
              label: "10 K",
              icon: "Icon",
              value: "10",
            },
          ],
        },
      ],
    },
  ];
  const handleFilterChange = (filter) => {
    //Filter Logic
  };
  const sortBy = [
    {
      label: "Created Data",
      value: "created_at",
      type: "date",
    },
    {
      label: "Name",
      value: "name",
      type: "text",
    },
    {
      label: "Amount",
      value: "amount",
      type: "value",
    },
  ];
  const handleSortChange = (sort) => {
    //SORT Logic
  };
  const data = React.useMemo(
    () => [
      {
        date: "Sep 23 -2023 09:15 AM",
        activityType: "Login",
        status: "Success",
        details: "Logged in from Web App",
        ipAddress: "192.168.1.1",
        deviceBrowser: "Chrome on Windows",
      },
      {
        date: "Sep 23 -2023 10:45 AM",
        activityType: "Transaction",
        status: "Success",
        details: "Transferred $500 to X",
        ipAddress: "192.168.1.2",
        deviceBrowser: "Safari on iOS",
      },
      {
        date: "Sep 23 -2023 11:30 AM",
        activityType: "Settings change",
        status: "Success",
        details: "Updated email address",
        ipAddress: "192.168.1.3",
        deviceBrowser: "Firefox on Mac",
      },
      {
        date: "Sep 23 -2023 01:11 PM",
        activityType: "Login Attempt",
        status: "Failed",
        details: "Incorrect password",
        ipAddress: "192.168.1.4",
        deviceBrowser: "Edge on Windows",
      },
      // Add more data rows as needed
    ],
    []
  );
  const companyNameTemplate = (rowData) => {
    const date = new Date(rowData?.date);
  
    // Format the date and time separately
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
    
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    });
  
    return (
      <div className="flex flex-col items-start gap-1">
        <p className="text-base font-medium text-gray-800">
          {formattedDate}
        </p>
        <p className="text-sm text-gray-600">
          {formattedTime}
        </p>
      </div>
    );
  };
  

  const companyDateJoinedTemplate = (rowData) => {
    return (
      <div className="flex gap-2 text-sm align-items-center">
        <div className="flex flex-row">
          <p className="text-sm cursor-pointer text-textLight">
            {rowData?.activityType}
          </p>
        </div>
      </div>
    );
  };

  const companyLastActivityTemplate = (rowData) => {
    return (
      <div className="flex gap-2 align-items-center">
        <div className="flex flex-row">
          <p className="text-sm cursor-pointer text-textLight">
            {rowData?.details}
          </p>
        </div>
      </div>
    );
  };
  const companyIpTemplate = (rowData) => {
    return (
      <div className="flex gap-2 text-sm align-items-center ">
        <div className="flex flex-row">
          <p className="text-sm cursor-pointer text-textLight">
            {rowData?.ipAddress}
          </p>
        </div>
      </div>
    );
  };

  const companyDeviceTemplate = (rowData) => {
    return (
      <div className="flex gap-2 text-sm align-items-center">
        <div className="flex flex-row">
          <p className="text-sm cursor-pointer text-textLight">
            {rowData?.deviceBrowser}
          </p>
        </div>
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
          status == "Success"
            ? "Success"
            : status == "Failed"
              ? "Failed"
              : "Pending"
        }
      ></Tag>
    );
  };

  const companyIPTemplate = (rowData) => {
    const status = rowData.status
      ? rowData.active
        ? "success"
        : "danger"
      : "warning";
    return (
      <Action>
        {status == "warning" && (
          <li
            onClick={() => handleOption("Approve")}
            className="px-4 py-2 text-success cursor-pointer hover:bg-gray-50"
          >
            Approve
          </li>
        )}
        <li
          onClick={() => handleOption("View Details")}
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
        {status == "warning" && (
          <li
            onClick={() => handleOption("Reject")}
            className="px-4 py-2 text-sm text-red-600 cursor-pointer hover:bg-gray-50"
          >
            Reject
          </li>
        )}
        {status == "success" && (
          <li
            onClick={() => handleOption("Suspend")}
            className="px-4 py-2 text-sm text-red-600 cursor-pointer hover:bg-gray-50"
          >
            Suspend
          </li>
        )}
        {status == "danger" && (
          <li
            onClick={() => handleOption("Activate")}
            className="px-4 py-2 text-sm text-success cursor-pointer hover:bg-gray-50"
          >
            Activate
          </li>
        )}
      </Action>
    );
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <>
      {/* Left Section */}
      <ActivityLogTableComponent
        data={logs}
        title='Activity Log'
        isAddBtnVisible={false}
        isStatementVisible={false}
      />

      <AddNotesModal isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
}
