"use client";
import React, { useState, useEffect, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import DateTime from "@/components/Elements/DateTime/DateTime";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "../List/List.css";
import Tag from "@/components/Elements/Tag/Tag";
import Action from "@/components/Elements/Action/Action";
import { Checkbox } from "primereact/checkbox";
import TableTopCard from "@/components/Elements/DataTable/topCard";
import useIsMobile from "@/hooks/useIsMobile";
import TransactionDetailsModal from "@/components/Elements/TransactionDetailsModal";
import VerticalThreeDots from "@/Icons/VerticalThreeDots";
import ConfirmationModal from "@/components/Elements/ConfirmationModal";
import { FaArrowDown, FaArrowUp, FaExchangeAlt, FaTimes } from "react-icons/fa";
import S3Image from "@/components/Elements/S3Image/S3Image";
import { COMPANY_ACCOUNT_TYPE, ROLE } from "@/shared/enums";
import { useUser } from "@/app/context/UserContext";

export default function FinancialsTable({
  transactions,
  isFromFinancialsTable,
  title = "Transactions",
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const isMobile = useIsMobile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const { user } = useUser();
  
  const handleOption = (action, transaction) => {
    if (action === "View Details") {
      setSelectedTransaction(transaction);
      setIsModalOpen(true);
    }

    if (action === "Request More Info") {
      setIsInfoModalOpen(true);
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    setData(transactions ? transactions : []);
    setFilteredData(transactions ? transactions : []);
  }, [transactions]);

  // Handle search functionality
  useEffect(() => {
    if ((data && data.length == 0)|| !data) return;

    const filtered = data && data.length > 0 && data.filter((item) => {
      const searchString = searchTerm.toLowerCase();
      return (
        item.id.toString().toLowerCase().includes(searchString) ||
        item.name.toLowerCase().includes(searchString) ||
        item.currency.toLowerCase().includes(searchString)
      );
    });
    
    setFilteredData(filtered);
  }, [searchTerm, data]);

  // Handle sort functionality
  const handleSortChange = useCallback(({ sort, order }) => {
    if (filteredData.length == 0 || !filteredData) return;

    let sorted =
      filteredData && filteredData.length > 0 ? [...filteredData] : [];

    switch (sort) {
      case "date":
        sorted.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return order === "asc" ? dateA - dateB : dateB - dateA;
        });
        break;
      case "amount":
        sorted.sort((a, b) => {
          return order === "asc" ? a.amount - b.amount : b.amount - a.amount;
        });
        break;
      case "id":
        sorted.sort((a, b) => {
          return order === "asc"
            ? a.id.localeCompare(b.id)
            : b.id.localeCompare(a.id);
        });
        break;
      case "name":
        sorted.sort((a, b) => {
          return order === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        });
        break;
      default:
        break;
    }

    setFilteredData(sorted);
    setSortField(sort);
    setSortOrder(order);
  }, [filteredData]);

  // Handle filter functionality
  const handleFilterChange = useCallback((filters) => {
     if ((filteredData && filteredData.length == 0) || !filteredData) return;

    let filtered = [...filteredData];

    // Apply each filter
    if (filters) {
      if (filters.transactionType) {
        filtered = filtered.filter(
          (item) =>
            item.name.toLowerCase() === filters.transactionType.toLowerCase()
        );
      }
      if (filters.currency) {
        filtered = filtered.filter(
          (item) =>
            item.currency.toLowerCase() === filters.currency.toLowerCase()
        );
      }
      if (filters.dateRange) {
        const startDate = new Date(filters.dateRange.from);
        const endDate = new Date(filters.dateRange.to);
        filtered = filtered.filter((item) => {
          const itemDate = new Date(item.date);
          return itemDate >= startDate && itemDate <= endDate;
        });
      }
    }

    setFilteredData(filtered);
  }, [filteredData]);

  const receiveIcon = () => {
    return (
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12.082"
          r="12"
          transform="rotate(180 12 12.082)"
          fill="#A8A8A8"
          fill-opacity="0.4"
        />
        <path
          d="M12 6.93917V16.082M12 16.082L16 12.082M12 16.082L8 12.082"
          stroke="#14151A"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  };

  const sendIcon = (rowData) => {
    return (
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12.082" r="12" fill="#A8A8A8" fill-opacity="0.4" />
        <path
          d="M12 16.2249L12 7.08203M12 7.08203L8 11.082M12 7.08203L16 11.082"
          stroke="#14151A"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  };

  const transactionsIdTemplate = (rowData) => {
    return (
      <div className="flex items-start gap-1">
        <Checkbox
          className="custom-checkbox checked:bg-black"
          checked={selectedTransactions.includes(rowData.id)}
          onChange={() => {
            if (selectedTransactions.includes(rowData.id)) {
              setSelectedTransactions(
                selectedTransactions.filter((id) => id !== rowData.id)
              );
            } else {
              setSelectedTransactions([...selectedTransactions, rowData.id]);
            }
          }}
          onClick={(e) => e.stopPropagation()}
        />
        <p className="text-xs font-medium text-textBlack">#{rowData?.id}</p>
      </div>
    );
  };

  const transactionsNameTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-x-2">
        <div>{rowData?.name === "Received" ? receiveIcon() : sendIcon()}</div>
        <p className="text-xs font-medium">{rowData?.name}</p>
      </div>
    );
  };

  const transactionsDateJoinedTemplate = (rowData) => {
    return (
      <div className="flex gap-2 align-items-center text-textBlack">
        <div className="flex flex-row">
          {rowData?.type == "credit" ? (
            <p>From: {rowData?.from_address}</p>
          ) : (
            <p>To: {rowData?.to_address}</p>
          )}
        </div>
      </div>
    );
  };

  const transactionDateTemplate = (rowData) => {
    return (
      <div className="flex gap-2 align-items-center text-textBlack">
        <div className="flex flex-row">
          <DateTime
            date={rowData?.created_at}
            time={rowData?.created_at}
          ></DateTime>
        </div>
      </div>
    );
  };

 

  const transactionAccountTemplate = (rowData) => {
    return (
      <div className="flex gap-2 align-items-center text-textBlack">
        <div className="flex flex-row">
          {rowData?.type == "credit" ? (
            <p>
              From:{" "}
              {rowData?.from_address ||
                rowData?.transaction_detail ? (JSON.parse(rowData?.transaction_detail)?.SenderDetails
                  ?.AccountNumber) : ''}
            </p>
          ) : (
            <p>
              To:{" "}
              {rowData?.to_address ||
                rowData?.transaction_detail ? (JSON.parse(rowData?.transaction_detail)?.RecipientDetails
                  ?.AccountNumber) : ''}
            </p>
          )}
        </div>
      </div>
    );
  };

  const transactionsLastActivityTemplate = (rowData) => {
    return (
      <div className="flex gap-2 align-items-center">
        <div className="flex flex-row">
          <DateTime date={rowData?.updated_at}></DateTime>
        </div>
      </div>
      );
    };

  const transactionCurrencyTemplate = (rowData) => {
    return (
      <div className="flex relative items-center justify-start gap-2">
        <S3Image
          className="w-[24px] h-[24px] rounded-full"
          s3Url={rowData?.account?.asset?.icon}
        />
        {rowData?.account?.network && (rowData?.account?.network?.name !=
          rowData?.account?.asset?.name) && (
          <S3Image
            className="w-[12px] h-[12px] rounded-full bottom-0 right-0 absolute"
            s3Url={rowData?.account?.network?.icon}
          />
        )}
        <p>{`${Number(rowData?.amount).toFixed(4)} ${
          rowData?.account?.asset?.ticker
        }`}</p>
      </div>
    ); 
  }


  const transactionStatusTemplate = (rowData) => {
    const status =
        rowData.status == "Failed"
          ? "danger"
          : rowData.status == "Pending" ? "warning" 
        : "success";
    return <Tag status={status} text={rowData.status} className="capitalize"></Tag>;
  };

  const transactionsStatusTemplate = (rowData) => {
    const status = rowData.status
      ? rowData.active
        ? "success"
        : "danger"
      : "warning";
  }
  
  const transactionTypeTemplate = (rowData) => {
    return (
      <div className="flex gap-2 align-items-center">
        <div className="flex flex-row gap-2 items-center">
          <div className=" cursor-pointer capitalize">
            {rowData?.type == "credit" ? (
              <div className="p-1 object-cover bg-[#A8A8A866] bg-opacity-40 rounded-full">
                <FaArrowDown width={20} height={20} />
              </div>
            ) : (
              <div className="p-1 object-cover bg-[#A8A8A866] bg-opacity-40 rounded-full">
                <FaArrowUp width={20} height={20} />
              </div>
            )}
          </div>
          <p className="font-semibold text-xs text-textBlack">
            {rowData?.type == "credit" ? "Received" : "Sent"}
          </p>
        </div>
      </div>
    );
  };

  const isEndUser = user?.role === "END_USER";

  const transactionsToFromTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2">
        <p className="text-xs font-medium">{rowData?.toFrom}</p>
      </div>
    );
  };

  const transactionsActionTemplate = (rowData) => {
    const status = rowData.status
      ? rowData.active
        ? "success"
        : "danger"
      : "warning";
    return !isModalOpen && !isInfoModalOpen ? (
      <Action>
        {isEndUser && (
          <li
            onClick={(e) => {
              e.stopPropagation();
              handleOption("Approve");
            }}
            className="px-4 py-2 text-success cursor-pointer hover:bg-gray-50"
          >
            Approve
          </li>
        )}
        <li
          onClick={(e) => {
            e.stopPropagation();
            handleOption("View Details", rowData);
          }}
          className="px-4 py-2 cursor-pointer text-textBlack hover:bg-gray-50"
        >
          View Details
        </li>
        <li
          onClick={(e) => {
            e.stopPropagation();
            handleOption("Request More Info");
          }}
          className="px-4 py-2 cursor-pointer text-textBlack hover:bg-gray-50"
        >
          Request More Info
        </li>
        {status == "warning" && (
          <li
            onClick={(e) => {
              e.stopPropagation();
              handleOption("Reject");
            }}
            className="px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-50"
          >
            Reject
          </li>
        )}
        {status == "success" && (
          <li
            onClick={(e) => {
              e.stopPropagation();
              handleOption("Suspend");
            }}
            className="px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-50"
          >
            Suspend
          </li>
        )}
        {status == "danger" ? (
          <li
            onClick={(e) => {
              e.stopPropagation();
              handleOption("Activate");
            }}
            className="px-4 py-2 text-success cursor-pointer hover:bg-gray-50"
          >
            Activate
          </li>
        ) : (
          <>
            {status == "warning" && (
              <li
                onClick={() => handleOption("Approve")}
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
              onClick={() => handleOption("Request More Info")}
              className="px-4 py-2 cursor-pointer text-textBlack hover:bg-gray-50"
            >
              Request More Info
            </li>
            {status == "warning" && (
              <li
                onClick={() => handleOption("Reject")}
                className="px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-50"
              >
                Reject
              </li>
            )}
            {status == "success" && (
              <li
                onClick={() => handleOption("Suspend")}
                className="px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-50"
              >
                Suspend
              </li>
            )}
            {status == "danger" && (
              <li
                onClick={() => handleOption("Activate")}
                className="px-4 py-2 text-success cursor-pointer hover:bg-gray-50"
              >
                Activate
              </li>
            )}
          </>
        )}
      </Action>
    ) : (
      <VerticalThreeDots />
    );
  };

  const handleRowClick = (e) => {
    // Get the clicked element
    const clickedElement = e.originalEvent.target;

    // Check if the clicked element is a header or within a header
    const isHeader = clickedElement.closest("th") !== null;
    const isCheckbox = clickedElement.closest(".custom-checkbox") !== null;
    const isActionButton = clickedElement.closest("li") !== null;

    // Only open modal if it's not a header, checkbox, or action button click
    if (!isHeader && !isCheckbox && !isActionButton) {
      setSelectedTransaction(e.data);
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="pt-4 overflow-x-auto bg-white border rounded-2xl border-primary50">
        <TableTopCard
          title={title}
          isStatementVisible={true}
          searchTerm={searchTerm}
          isAddBtnVisible={false}
          isSearchVisible={true}
          setSearchTerm={setSearchTerm}
          handleSortChange={handleSortChange}
          handleFilterChange={handleFilterChange}
          isFromFinancialsTable={isFromFinancialsTable}
        />
        {filteredData && filteredData.length> 0 ? (
          <>
            <DataTable
              value={filteredData}
              paginator
              paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} transactions"
              rows={20}
              selectionMode="single"
              dataKey="id"
              stateStorage="session"
              stateKey="dt-state-demo-local"
              onRowClick={handleRowClick}
            >
              <Column
                header={
                  <div className="flex gap-1">
                    <Checkbox
                      className="custom-checkbox"
                      checked={
                        filteredData?.length > 0 &&
                        filteredData?.length === selectedTransactions.length
                      }
                      onChange={() => {
                        if (filteredData.length === selectedTransactions.length) {
                          setSelectedTransactions([]);
                        } else {
                          setSelectedTransactions(filteredData?.map((item) => item.id));
                        }
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <p className="text-xs font-medium text-textBlack">ID</p>
                  </div>
                }
                body={transactionsIdTemplate}
                sortable
                sortField="representative.name"
              />
              <Column
                body={transactionTypeTemplate}
                header={
                  <p className="text-xs font-medium text-textBlack">
                    Transaction Type
                  </p>
                }
                sortable
                className="text-xs font-medium text-textLight"
              />
              {!isMobile && (
                <Column
                  body={transactionCurrencyTemplate}
                  header={
                    <p className="text-xs font-medium text-textBlack">Amount</p>
                  }
                  sortable
                  className="text-xs font-medium text-textLight"
                />
              )}
              {!isMobile && (
                <Column
                  body={transactionAccountTemplate}
                  header={
                    <p className="text-xs font-medium text-textBlack">
                      To/From
                    </p>
                  }
                  sortable
                  className="text-xs font-medium text-textLight"
                />
              )}
              {!isMobile && (
                <Column
                  body={transactionDateTemplate}
                  header={
                    <p className="text-xs font-medium text-textBlack">On</p>
                  }
                  sortable
                  className="text-xs font-medium text-textLight"
                />
              )}
              {!isMobile && (
                <Column
                  header={
                    <p className="text-xs font-medium text-textBlack">Status</p>
                  }
                  body={transactionStatusTemplate}
                  sortable
                  className="text-xs font-medium text-textBlack"
                />
              )}
              {!isMobile && (
                <Column
                  header={
                    <p className="text-xs font-medium text-textBlack">Action</p>
                  }
                  body={transactionsActionTemplate}
                  sortable
                  className="text-xs font-medium text-textLight"
                />
              )}
            </DataTable>
          </>
        ) : (
          <p className="flex items-center w-full p-4 text-textBlack">
            No transactions available to show
          </p>
        )}
      </div>

      {selectedTransaction && (
        <TransactionDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          transaction={selectedTransaction}
        />
      )}
      <ConfirmationModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        title={"Request Additional Information"}
        confirmText={"Send"}
        confirmColor={"bg-primary"}
        onConfirm={() => setIsInfoModalOpen(false)}
        showForm={true}
      />
    </>
  );
}
