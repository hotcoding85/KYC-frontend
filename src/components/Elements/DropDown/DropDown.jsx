import React, { useState, useEffect, useRef } from "react";
import Chevron from "@/Icons/Chevron";
import { capitalizeFirstLetter } from "@/utils/helper";

const DropDown = ({
  items,
  onSelect,
  className,
  labelClasses,
  multiselect = false,
  width,
  height,
  title = "Select an option",
  defaultValue,
  updateOnValueChange,
  initialItems = [],
}) => {
  const [selectedItems, setSelectedItems] = useState(initialItems);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (item) => {
    let newSelectedItems;
    if (multiselect) {
      if (selectedItems.filter((each) => each.value === item.value).length) {
        newSelectedItems = selectedItems.filter(
          (each) => each.value !== item.value
        );
      } else {
        newSelectedItems = [...selectedItems, item];
      }
    } else {
      newSelectedItems = [item];
      setIsOpen(false); // Close dropdown only in single-select mode after selection
    }

    setSelectedItems(newSelectedItems);
    if (onSelect) {
      onSelect(multiselect ? newSelectedItems : item);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation(); // Prevent the dropdown from closing
    setSelectedItems([]);
    if (onSelect) onSelect([]);
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (typeof defaultValue === "boolean") {
      setSelectedItems([
        {
          value: defaultValue,
          label: defaultValue ? "Active" : "Inactive",
        },
      ]);
      return;
    }
    if (defaultValue && !selectedItems.length) {
      if (typeof defaultValue === "object" && defaultValue.value) {
        setSelectedItems([defaultValue]);
        return;
      }
      if (
        Array.isArray(defaultValue) &&
        defaultValue[0] &&
        defaultValue[0].value
      ) {
        setSelectedItems(defaultValue);
        if (onSelect) {
          onSelect(defaultValue);
        }
        return;
      }
      if (!Array.isArray(defaultValue)) {
        const item = {
          value: defaultValue,
          label:
            typeof defaultValue === "string"
              ? capitalizeFirstLetter(defaultValue)
              : defaultValue,
        };
        setSelectedItems([item]);
      }
    }
  }, [defaultValue]);

  useEffect(() => {
    if (updateOnValueChange) {
      if (
        typeof updateOnValueChange === "object" &&
        updateOnValueChange.value
      ) {
        setSelectedItems([updateOnValueChange]);
      }
    }
  }, [updateOnValueChange]);

  return (
    <div
      ref={dropdownRef}
      className={`relative inline-block ${width ? width : "w-full"}`}
    >
      <button
        className={`${width ? width : "w-full"} ${className || ""} ${
          height && height
        } text-textSecondary bg-white text-xs border border-primary50 rounded-[10px] p-2 text-left cursor-pointer flex items-center justify-between`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex-grow w-12 truncate">
          {multiselect
            ? selectedItems.length
              ? selectedItems.map((item) => item.label).join(", ")
              : title
            : selectedItems[0]
            ? selectedItems[0].label
            : title}
        </span>
        <Chevron
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div
          className={`absolute z-10 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto ${
            width ? width : "w-full"
          }`}
        >
          {items.map((item) => (
            <div
              key={item.value}
              className="flex flex-row items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(item)}
            >
              {multiselect && (
                <input
                  type="checkbox"
                  checked={
                    selectedItems.filter((each) => each.value === item.value)
                      .length > 0
                  }
                  onChange={() => handleSelect(item)}
                  className="mr-2 text-white bg-black border-2 border-gray-400 rounded size-5 checked:bg-black"
                />
              )}
              {item.img && <span className="mr-2">{item.img}</span>}
              <span className={labelClasses}>{item.label}</span>
            </div>
          ))}
          {multiselect && selectedItems.length > 0 && (
            <div
              className="px-4 py-2 text-sm text-blue-500 cursor-pointer hover:text-blue-700 hover:bg-gray-100"
              onClick={handleClear}
            >
              Clear
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropDown;
