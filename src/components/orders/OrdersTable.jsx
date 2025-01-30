import React, { useState, useEffect, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import TableTopCard from "../Elements/DataTable/topCard";
import VerticalThreeDots from "@/Icons/VerticalThreeDots";
import OrderDetailsModal from "../Elements/OrderDetailsModal";

const RecentOrdersTable = ({ orders }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(orders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);

  useEffect(() => {
    if (!orders) return;

    const filtered = orders.filter((item) => {
      const searchString = searchTerm.toLowerCase();
      return (
        item.id.toString().toLowerCase().includes(searchString) ||
        item.source.toLowerCase().includes(searchString) ||
        item.currency.toLowerCase().includes(searchString)
      );
    });

    setFilteredData(filtered);
  }, [searchTerm, orders]);

  const StatusBadge = ({ status }) => {
    const getStatusStyles = (status) => {
      switch (status.toLowerCase()) {
        case "completed":
          return "bg-successLight text-success";
        case "failed":
          return "bg-alertLight text-red-600";
        default:
          return "bg-gray-100 text-gray-600";
      }
    };

    return <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(status)}`}>{status}</span>;
  };

  const BTCIcon = () => (
    <div className="flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full">
      <span className="text-sm text-warning">₿</span>
    </div>
  );

  const ActionMenu = () => <VerticalThreeDots />;

  const idTemplate = (rowData) => (
    <div className="flex items-center gap-2">
      <Checkbox
        className="custom-checkbox checked:bg-black"
        checked={selectedOrders.includes(rowData.id)}
        onChange={() => {
          if (selectedOrders.includes(rowData.id)) {
            setSelectedOrders(selectedOrders.filter((id) => id !== rowData.id));
          } else {
            setSelectedOrders([...selectedOrders, rowData.id]);
          }
        }}
      />
      <span className="text-xs font-medium text-gray-900">#{rowData.id}</span>
    </div>
  );

  const sourceTemplate = (rowData) => (
    <p className="text-xs font-medium text-textSecondary">{rowData.source}</p>
  );
  const amountTemplate = (rowData) => <p className="text-xs font-medium text-gray-900">{rowData.amount}</p>;

  const currencyTemplate = (rowData) => (
    <div className="flex items-center gap-2">
      <img src={`/assets/images/${rowData.currency.toLowerCase()}.svg`} alt={rowData.currency} className="w-6 h-6" />
      <span className="text-xs font-medium text-textLight">{rowData.currency}</span>
    </div>
  );

  const handleSortChange = useCallback(({ sort, order }) => {
    if (!filteredData) return;

    let sorted = [...filteredData];
    switch (sort) {
      case "created_at":
        sorted.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return order === "asc" ? dateA - dateB : dateB - dateA;
        });
        break;
      case "usd_value":
        sorted.sort((a, b) => {
          return order === "asc" ? a.amount - b.amount : b.amount - a.amount;
        });
        break;
      case "id":
        sorted.sort((a, b) => {
          return order === "asc" ? a.id?.localeCompare(b.id) : b.id?.localeCompare(a.id);
        });
        break;
      case "name":
        sorted.sort((a, b) => {
          return order === "asc" ? a.source?.localeCompare(b.source) : b.source?.localeCompare(a.source);
        });
        break;
      default:
        break;
    }

    setFilteredData(sorted);
    setSortField(sort);
    setSortOrder(order);
  }, [filteredData]);

  const handleFilterChange = (filters) => {
    if (!orders) return;

    let filtered = [...orders];

    if (filters) {
      if (filters.transactionType) {
        filtered = filtered.filter((item) => item.name.toLowerCase() === filters.transactionType.toLowerCase());
      }
      if (filters.currency) {
        filtered = filtered.filter((item) => item.currency.toLowerCase() === filters.currency.toLowerCase());
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
      setSelectedOrder(e.data);
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="pt-4 overflow-x-auto bg-white border rounded-2xl border-primary50">
        <TableTopCard
          title={"Recent Orders"}
          isStatementVisible={true}
          searchTerm={searchTerm}
          isAddBtnVisible={false}
          isSearchVisible={true}
          isGeneratePaymentVisible={true}
          setSearchTerm={setSearchTerm}
          handleSortChange={handleSortChange}
          handleFilterChange={handleFilterChange}
        />
        <DataTable
          value={filteredData}
          paginator
          paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} orders"
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
                  checked={orders.length > 0 && orders.length === selectedOrders.length}
                  onChange={() => {
                    if (orders.length === selectedOrders.length) {
                      setSelectedOrders([]);
                    } else {
                      setSelectedOrders(orders.map((item) => item.id));
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <p className="text-xs font-medium text-textBlack">ID</p>
              </div>
            }
            body={idTemplate}
          />
          <Column
            body={sourceTemplate}
            header={<p className="text-xs font-medium text-textBlack">Source</p>}
          />
          <Column
            body={amountTemplate}
            header={<p className="text-xs font-medium text-textBlack">Amount</p>}
          />
          <Column
            header={<p className="text-xs font-medium text-textBlack">Currency</p>}
            body={currencyTemplate}
          />
          <Column
            h
            header={<p className="text-xs font-medium text-textBlack">Status</p>}
            body={(rowData) => <StatusBadge status={rowData.status} />}
          />
          <Column header={<p className="text-xs font-medium text-textBlack">Action</p>} body={ActionMenu} />
        </DataTable>
      </div>

      {selectedOrder && (
        <OrderDetailsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} transaction={selectedOrder} />
      )}
    </>
  );
};

export default RecentOrdersTable;
