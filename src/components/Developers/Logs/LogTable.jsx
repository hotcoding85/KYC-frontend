import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import Tag from "@/components/Elements/Tag/Tag";
import Action from "@/components/Elements/Action/Action";
import Modal from "@/components/Modal/Modal";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import TableTopCard from "@/components/Elements/DataTable/topCard";

const LogTable = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const dummyData = [
    {
      id: "#302012",
      date: "12/12/2024 03:03:03",
      request: "POST",
      event: "Function Name",
      status: "Completed",
      origin: "https://www.google.com",
      header: `{'header':'value'}`,
      requestUrl: "https://www.google.com",
      requestBody: `{'header':'value'}`,
      response: `{'header':'value'}`,
    },
    {
      id: "#302013",
      date: "12/12/2024 03:03:03",
      request: "GET",
      event: "Function Name",
      status: "Failed",
      origin: "https://www.example.com",
      header: `{'header':'value'}`,
      requestUrl: "https://www.example.com",
      requestBody: `{'header':'value'}`,
      response: `{'header':'value'}`,
    },
  ];

  const statusTemplate = (rowData) => {
    const statusColor = rowData.status === "Completed" ? "success" : "danger";
    return <Tag status={statusColor} text={rowData.status} />;
  };

  const actionTemplate = (rowData) => (
    <Action>
      <li
        className="px-4 py-2 cursor-pointer text-textBlack hover:bg-gray-50"
        onClick={() => handleViewDetails(rowData)}
      >
        View Details
      </li>
      <li className="px-4 py-2 cursor-pointer text-alert hover:bg-gray-50">
        Delete
      </li>
    </Action>
  );

  const idTemplate = (rowData) => {
    const isSelected = selectedRows.some((row) => row.id === rowData.id);
    return (
      <div className="flex items-center gap-1">
        <div className="mt-1">
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
        </div>
        <p className="text-xs font-medium text-textBlack">{rowData.id}</p>
      </div>
    );
  };

  const handleViewDetails = (rowData) => {
    setModalData(rowData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  return (
    <div className="pt-3 overflow-x-auto bg-white border rounded-2xl border-primary50">
      <div>
        <TableTopCard
          title={"Logs"}
          isAddBtnVisible={false}
          isStatementVisible={true}
        />
        <DataTable
          value={dummyData}
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
          paginatorLeft={<div className="text-xs text-gray-500"> </div>}
        >
          <Column
            header={
              <div className="flex gap-x-1">
                <Checkbox
                  className="custom-checkbox"
                  checked={selectAll}
                  onChange={(e) => {
                    setSelectAll(e.checked);
                    setSelectedRows(e.checked ? dummyData : []);
                  }}
                />
                <p className="text-xs font-medium text-textBlack">ID</p>
              </div>
            }
            body={idTemplate}
          />
          <Column
            field="date"
            header={<p className="text-xs font-medium text-textBlack">Date</p>}
            className="text-xs"
          />
          <Column
            field="request"
            header={
              <p className="text-xs font-medium text-textBlack">Request</p>
            }
            className="text-xs"
          />
          <Column
            field="event"
            header={<p className="text-xs font-medium text-textBlack">Event</p>}
            className="text-xs"
          />
          <Column
            field="status"
            header={
              <p className="text-xs font-medium text-textBlack">Status</p>
            }
            body={statusTemplate}
            className="text-xs"
          />
          <Column
            header={
              <p className="text-xs font-medium text-textBlack">Action</p>
            }
            body={actionTemplate}
            className="text-xs"
          />
        </DataTable>
      </div>

      {modalData && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Log Information"
          customWidth={"w-[500px]"}
        >
          <div className="px-4">
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-[11px] ">{modalData.event}</p>
              <p className="text-sm font-bold ">METHOD</p>
              <Tag
                status={modalData.status === "Completed" ? "success" : "danger"}
                text={modalData.status}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mt-4">
              <p className="text-xs">Origin</p>
              <p className="text-xs font-medium">{modalData.origin}</p>
            </div>
            <div className="flex justify-between mt-4">
              <p className="text-xs">Header</p>
              <p className="text-xs font-medium">{modalData.header}</p>
            </div>
            <div className="flex justify-between mt-4">
              <p className="text-xs">Request URL</p>
              <p className="text-xs font-medium">{modalData.requestUrl}</p>
            </div>
            <div className="flex justify-between mt-4">
              <p className="text-xs">Request Body</p>
              <p className="text-xs font-medium">{modalData.requestBody}</p>
            </div>
            <div className="flex justify-between mt-4">
              <p className="text-xs">Response</p>
              <p className="text-xs font-medium">{modalData.response}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LogTable;
