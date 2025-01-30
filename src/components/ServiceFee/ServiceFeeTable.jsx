import React, { useState } from "react";
import { useTable } from "react-table";
import VerticalThreeDots from "@/Icons/VerticalThreeDots";
import CheckBox from "../Elements/Checkbox/CheckBox";
import ChevronRight from "@/Icons/ChevronRight";
import ChevronLeft from "@/Icons/ChevronLeft";

const ServiceFeeTable = ({AddSchema}) => {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    // State to handle dropdown visibility for each row
    const [dropdownOpen, setDropdownOpen] = useState(null);

    // Toggle function to open/close dropdown
    const toggleDropdown = (rowIndex) => {
        setDropdownOpen((prev) => (prev === rowIndex ? null : rowIndex));
    };

    const data = React.useMemo(
        () => [
            {
                id: "#302012",
                activityName: "Activity Name",
                rules: "Rule",
                serviceFee: "14.00",
            },
            {
                id: "#302013",
                activityName: "Activity Name",
                rules: "Rule",
                serviceFee: "14.00",
            },
            {
                id: "#302012",
                activityName: "Activity Name",
                rules: "Rule",
                serviceFee: "14.00",
            },
            {
                id: "#302013",
                activityName: "Activity Name",
                rules: "Rule",
                serviceFee: "14.00",
            },
            {
                id: "#302012",
                activityName: "Activity Name",
                rules: "Rule",
                serviceFee: "14.00",
            },
            {
                id: "#302013",
                activityName: "Activity Name",
                rules: "Rule",
                serviceFee: "14.00",
            },

        ],

        []
    );

    const columns = React.useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id",
                Cell: ({ value }) => (
                    <span
                        className="font-bold text-textBlack"

                    >
                        {value}
                    </span>
                ),
            },
            {
                Header: "Activity Name",
                accessor: "activityName",
            },
            {
                Header: "Rules",
                accessor: "rules",
            },
            {
                Header: "Service Fee",
                accessor: "serviceFee",
            },
            {
                Header: "Action",
                accessor: "action",
                Cell: ({ row }) => (
                    <div className="relative">
                        <button
                            className="text-primary hover:text-gray-600"
                            onClick={() => toggleDropdown(row.index)}
                        >
                            <VerticalThreeDots />
                        </button>

                        {/* Dropdown */}
                        {dropdownOpen === row.index && (
                            <div className="absolute right-0 z-10 mt-2 bg-white shadow-lg w-36 rounded-2xl ">
                                <ul className="py-1">
                                    <li className="px-4 py-2 text-sm cursor-pointer text-textBlack hover:bg-gray-100">
                                        View
                                    </li>
                                    <li className="px-4 py-2 text-sm cursor-pointer text-textBlack hover:bg-gray-100">
                                        Edit
                                    </li>
                                    <li className="px-4 py-2 text-sm cursor-pointer text-textBlack hover:bg-gray-100">
                                        Pause
                                    </li>
                                    <li className="px-4 py-2 text-sm text-red-600 cursor-pointer hover:bg-gray-100">
                                        Delete
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ),
            },
        ],
        [dropdownOpen]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <>
            <div className="p-6 bg-white rounded-2xl">
                <div className="relative w-full">
                    <div className="flex flex-row items-center justify-between h-16 space-x-4">
                        <h2 className="text-lg font-semibold text-textBlack">Fee Scheme</h2>
                        <button
                            onClick={() => {
                                AddSchema()
                            }}
                            className="px-5 py-2 text-sm text-white bg-black rounded-xl">
                            Add new scheme
                        </button>
                    </div>

                    <table key={rows.id} className="w-full text-left border-collapse">
                        <thead>
                        {headerGroups.map(headerGroup => (
                            <tr key={headerGroup.id} className="border-b border-gray-200">
                                {headerGroup.headers.map(column => (
                                    <th
                                        key={column.id}
                                        className="px-4 py-4 text-sm font-medium bg-lightGrey text-textBlack"
                                    >
                                        <div className="flex flex-row">
                                            {column.id === "id" ? (
                                                <CheckBox
                                                    checked={isChecked}
                                                    onChange={handleCheckboxChange}
                                                />
                                            ) : null}
                                            {column.render("Header")}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                        </thead>
                        <tbody key={rows.id}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr
                                    key={row.id}
                                    className="border-b border-gray-200 cursor-pointer"
                                >
                                    {row.cells.map(cell => (
                                        <td
                                            key={cell.column.id}
                                            className="px-5 py-4 text-sm text-left text-textLight"
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>

                    <div className="flex items-center justify-between mt-4">
                        <p className="text-sm text-gray-500">Showing 2 from 2</p>
                        <div className="flex space-x-1">
                            <ChevronLeft/>
                            <button className="px-3 py-1 text-white bg-black rounded-lg">1</button>
                            <ChevronRight/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServiceFeeTable;
