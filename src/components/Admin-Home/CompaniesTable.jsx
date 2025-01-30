import React, { useState, useMemo } from "react";
import { useTable } from "react-table";
import VerticalThreeDots from "@/Icons/VerticalThreeDots";
import CheckBox from "@/components/Elements/Checkbox/CheckBox";

import SortDropdown from "../Elements/SortModal/SortModal";
import Filter from "@/Icons/Filter";

const CompaniesTable = ({ handleOption }) => {
  const [isModalOpen, setModalOpen] = useState(null); // Track which row modal is open for
  const [checkedRows, setCheckedRows] = useState([]); // Track selected rows (checkbox)
  const [searchTerm, setSearchTerm] = useState(""); // Track search term
  const [selectedCategories, setSelectedCategories] = useState([]); // Track selected categories
  const [sortBy, setSortBy] = useState("id"); // Default sorting column
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order
  const [sortOption, setSortOption] = useState("Newest to oldest"); // Sort option

  const data = useMemo(
    () => [
      {
        id: "#302012",
        companyName: "Tech Innovations Inc",
        email: "emilyzhang@gmail.com",
        phone: "00971 3453 56743",
        country: "UAE",
        dateJoined: "Sep 23 -2023",
        totalAssets: "$500K",
        type: "Individual",
        lastActivity: "Sep 23 -2023",
        status: "Pending",
        statusType: "pending",
      },
      {
        id: "#302013",
        companyName: "Tech Innovations Inc",
        email: "contact@acm.com",
        phone: "00971 3453 56743",
        country: "Saudi Arabia",
        dateJoined: "Sep 23 -2023",
        totalAssets: "$500K",
        type: "Business",
        lastActivity: "Sep 23 -2023",
        status: "Active",
        statusType: "active",
      },
      {
        id: "#302014",
        companyName: "Tech Innovations Inc",
        email: "contact@acm.com",
        phone: "00971 3453 56743",
        country: "Saudi Arabia",
        dateJoined: "Sep 23 -2023",
        totalAssets: "$500K",
        type: "Business",
        lastActivity: "Sep 23 -2023",
        status: "Deactivated",
        statusType: "deactivated",
      },
    ],
    []
  );

  // Filter and sort logic
  const filteredData = useMemo(() => {
    let filtered = [...data];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort the filtered data
    filtered = filtered.sort((a, b) => {
      if (sortBy === "dateJoined" || sortBy === "lastActivity") {
        const dateA = new Date(a[sortBy]);
        const dateB = new Date(b[sortBy]);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      }
      return sortOrder === "asc" ? a[sortBy].localeCompare(b[sortBy]) : b[sortBy].localeCompare(a[sortBy]);
    });

    return filtered;
  }, [data, searchTerm, sortBy, sortOrder]);

  const columns = useMemo(
    () => [
      {
        Header: () => <CheckBox />, // For the header checkbox
        accessor: "checkbox",
        Cell: ({ row }) => (
          <CheckBox checked={checkedRows.includes(row.id)} onChange={() => handleCheckboxChange(row.id)} />
        ),
      },
      {
        Header: "ID",
        accessor: "id",
        Cell: ({ value }) => (
          <a href="#" className="text-sm font-semibold text-primary">
            {value}
          </a>
        ),
      },
      {
        Header: "Company Name",
        accessor: "companyName",
        Cell: ({ value }) => (
          <a href="#" className="text-sm text-blue-500">
            {value}
          </a>
        ),
      },
      {
        Header: "Date Joined",
        accessor: "dateJoined",
        Cell: ({ value }) => <div>{new Date(value).toDateString()}</div>,
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <div
            className={`px-2 py-1 rounded-full w-24 text-center text-xs ${
              value === "Completed"
                ? "bg-successLight text-success"
                : value === "Active"
                ? "bg-successLight text-success"
                : value === "Pending"
                ? "bg-alertLight text-red-600"
                : "bg-alertLight text-red-600"
            }`}
          >
            {value}
          </div>
        ),
      },
      {
        Header: "Last Activity",
        accessor: "lastActivity",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <div className="relative">
            <button onClick={() => toggleModal(row.id)} className="text-primary hover:text-gray-600">
              <VerticalThreeDots />
            </button>
            {isModalOpen === row.id && (
              <div className="absolute right-0 z-10 w-40 mt-2 bg-white border border-gray-200 rounded-xl">
                <ul className="py-1">
                  <li
                    onClick={() => handleOption("Approve")}
                    className="px-4 py-2 text-success cursor-pointer hover:bg-gray-50"
                  >
                    Approve
                  </li>
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
                  <li
                    onClick={() => handleOption("Reject")}
                    className="px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-50"
                  >
                    Reject
                  </li>
                </ul>
              </div>
            )}
          </div>
        ),
      },
    ],
    [isModalOpen, checkedRows]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: filteredData,
  });

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

  const handleSortChange = (column) => {
    if (sortBy === column) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const handleSelectCategory = (category) => {
    if (Array.isArray(category) && category.length === 0) {
      setSelectedCategories([]);
    } else if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <>
      <div className="overflow-x-auto bg-white border border-white rounded-2xl">
        <div className="mt-2 ml-4 text-lg font-normal text-textBlack">Companies</div>
        {/* Search and Filters */}
        <div className="flex flex-row items-center h-20">
          {/* Search Input */}
          <div className="flex w-full h-10 pl-4">
            <input
              type="text"
              placeholder="Search"
              className="w-4/12 px-4 py-2 border border-gray-300 rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex items-center pr-10 space-x-4">
            {/* Categories Dropdown */}
            <button className="flex items-center w-full px-3 py-2 text-sm font-normal text-center bg-white border border-gray-300 rounded-2xl">
              <Filter /> {/* Adjust icon component name as needed */}
              <span className="ml-1">Filters</span> {/* This adds space between the icon and the text */}
            </button>

            {/* Sort By Dropdown */}
            <SortDropdown sortBy={sortBy} setSortBy={setSortBy} sortOption={sortOption} setSortOption={setSortOption} />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table {...getTableProps()} className="min-w-full text-left border-collapse">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-gray-200">
                  {headerGroup.headers.map((column) => (
                    <th key={column.id} className="px-4 py-4 text-sm font-medium bg-lightGrey">
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr key={row.id} className="border-b border-gray-200 cursor-pointer hover:bg-lightGrey">
                    {row.cells.map((cell) => (
                      <td key={cell.column.id} className="px-4 py-4 text-sm text-textLight">
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex flex-row items-center justify-between px-4 pb-4 mt-4">
            <p className="text-sm text-gray-500">Showing 1-3 from 100</p>
            <div className="flex space-x-1">
              <button className="px-3 py-1 text-white bg-black rounded-lg">1</button>
              <button className="px-3 py-1 rounded-lg">2</button>
              <button className="px-3 py-1 rounded-lg">3</button>
              <button className="px-3 py-1 rounded-lg">...</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompaniesTable;
