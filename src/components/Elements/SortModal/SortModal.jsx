import React, { useState, useEffect, useRef } from "react";
import UpDownArros from "@/Icons/UpDownArrows";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { createPortal } from "react-dom";

export default function SortDropdown({
  sortBy,
  selected,
  onChange,
  className,
  position,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sort, setSort] = useState(selected || sortBy[0]?.value);
  const [type, setType] = useState();
  const [order, setOrder] = useState("desc");
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const sortType = sortBy.find((item) => item.value === sort);
    if (sortType) {
      setType(sortType.type);
    }
  }, [sort]);

  useEffect(() => {
    if (onChange) {
      onChange({
        sort: sort,
        order: order,
      });
    }
  }, [sort, order]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isDropdownOpen &&
        !buttonRef.current?.contains(event.target) &&
        !dropdownRef.current?.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const setSortOrder = (option) => {
    setOrder(option);
  };

  const setSortBy = (value) => {
    setSort(value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getDropdownPosition = () => {
    if (!buttonRef.current) return {};

    const rect = buttonRef.current.getBoundingClientRect();
    // Calculate offset to shift dropdown to the right
    const rightOffset = rect.width - 176; // 176px is the width of dropdown (w-44)

    return {
      top: `${rect.bottom + window.scrollY + 8}px`,
      left: `${rect.left + window.scrollX + rightOffset}px`,
    };
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className={`min-w-[95px] h-8 flex justify-center items-center gap-1 p-2.5 border border-primary50 bg-white text-center text-xs font-normal text-textBlack py-1.5 rounded-[10px] ${className}`}
      >
        <div className="content-center text-center">
          <UpDownArros className='text-textBlack' />
        </div>
        <span className="text-xs">Sort</span>
      </button>

      {isDropdownOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              ...getDropdownPosition(),
              position: "absolute",
              zIndex: 9999,
            }}
            className="bg-white border shadow-lg border-primary50 rounded-xl w-44"
          >
            <div className="flex flex-col gap-2 py-2 text-sm">
              <h3 className="px-4 mb-2 text-sm font-normal text-textBlack font-inter">
                Sort by
              </h3>
              <div className="flex flex-col gap-2 px-4">
                {sortBy.map((s, index) => (
                  <div key={index} className="flex items-center mb-1">
                    <input
                      type="radio"
                      name="sort"
                      checked={s.value === sort}
                      value={s.value}
                      onChange={() => setSortBy(s.value)}
                      className="w-4 h-4 mr-2 text-textBlack bg-gray-100 border-gray-300 accent-black"
                    />
                    <label className="text-sm font-normal text-textBlack font-inter">
                      {s.label}
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex flex-col mt-2 text-sm border-t">
                {type && type === "date" && (
                  <>
                    <button
                      className={`flex items-center py-2 gap-2 px-4 ${
                        order === "asc" ? "bg-gray-100" : ""
                      }`}
                      onClick={() => setSortOrder("asc")}
                    >
                      <FaArrowDown className="text-textBlack" />
                      <span className="text-sm font-normal text-textBlack font-inter">
                        Newest to oldest
                      </span>
                    </button>
                    <button
                      className={`flex items-center py-2 gap-2 px-4 ${
                        order === "desc" ? "bg-gray-100" : ""
                      }`}
                      onClick={() => setSortOrder("desc")}
                    >
                      <FaArrowUp className="text-textBlack" />
                      <span className="text-sm font-normal text-textBlack font-inter">
                        Oldest to newest
                      </span>
                    </button>
                  </>
                )}
                {type && type === "value" && (
                  <>
                    <button
                      className={`flex items-center py-2 gap-2 px-4 ${
                        order === "asc" ? "bg-gray-100" : ""
                      }`}
                      onClick={() => setSortOrder("asc")}
                    >
                      <FaArrowDown className="text-textBlack" />
                      <span className="text-textBlack">Lowest to Highest</span>
                    </button>
                    <button
                      className={`flex items-center py-2 gap-2 px-4 ${
                        order === "desc" ? "bg-gray-100" : ""
                      }`}
                      onClick={() => setSortOrder("desc")}
                    >
                      <FaArrowUp className="text-textBlack" />
                      <span className="text-textBlack">Highest to Lowest</span>
                    </button>
                  </>
                )}
                {type && type === "text" && (
                  <>
                    <button
                      className={`flex items-center py-2 gap-2 px-4 ${
                        order === "asc" ? "bg-gray-100" : ""
                      }`}
                      onClick={() => setSortOrder("asc")}
                    >
                      <FaArrowDown className="text-textBlack" />
                      <span className="text-textBlack">Z-A</span>
                    </button>
                    <button
                      className={`flex items-center py-2 gap-2 px-4 ${
                        order === "desc" ? "bg-gray-100" : ""
                      }`}
                      onClick={() => setSortOrder("desc")}
                    >
                      <FaArrowUp className="text-textBlack" />
                      <span className="text-textBlack">A-Z</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
