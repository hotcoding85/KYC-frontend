/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import { Calendar } from "primereact/calendar";
import { FaCalendar } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { format, addDays, subDays, startOfWeek, startOfMonth } from "date-fns";
import { TextButton } from "@/components/Elements/Button/Button";
import { getDateRangeString } from "@/utils/helper";
import CalendarIcon from "@/Icons/Calendar";

const CustomCalendar = ({
  isDatePickerOpen,
  setIsDatePickerOpen,
  isVisibleOnAll = false,
  isCompareVisible,
}) => {
  const [dates, setDates] = useState([new Date(), new Date()]);
  const [requestedInformationDetail, setSelectedOption] = useState("Today");
  const calendarRef = useRef(null);

  const toggleDatePicker = () => {
    setIsDatePickerOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsDatePickerOpen(false);
      }
    };

    if (isDatePickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDatePickerOpen]);

  const handleDateSelection = (option) => {
    let newStartDate = new Date();
    let newEndDate = new Date();

    switch (option) {
      case "Today":
        newStartDate = new Date();
        newEndDate = new Date();
        break;
      case "Yesterday":
        newStartDate = subDays(new Date(), 1);
        newEndDate = newStartDate;
        break;
      case "Last week":
        newStartDate = startOfWeek(new Date(), { weekStartsOn: 1 });
        newEndDate = addDays(newStartDate, 6);
        break;
      case "Last month":
        newStartDate = startOfMonth(subDays(new Date(), 30));
        newEndDate = addDays(newStartDate, 29);
        break;
      case "Custom range":
        break;
      default:
        break;
    }

    setDates([newStartDate, newEndDate]);
    setSelectedOption(option);
  };

  const applySelection = () => {
    setIsDatePickerOpen(false);
  };

  const cancelSelection = () => {
    setIsDatePickerOpen(false);
  };

  return (
    <div ref={calendarRef}>
      {/* Trigger Buttons */}
      <div
        className={`${
          isVisibleOnAll ? "flex" : "hidden lg:flex"
        } gap-2 mt-2 lg:mt-0`}
      >
        <button
          className="flex items-center h-8 px-4 py-2 text-xs bg-white rounded-[10px] border border-primary50 font-normal text-gray-700"
          onClick={toggleDatePicker}
        >
          {/* <FaCalendar className="mr-2 text-textBlack" /> */}
          <CalendarIcon className="mr-2 w-[14px] h-[14px]" />
          {getDateRangeString(dates[0], dates[1])}
        </button>
        <button
          className={`${
            !isCompareVisible ? "hidden" : "flex"
          } items-center h-8 px-4 py-2 text-xs bg-white rounded-[10px] border border-primary50 font-normal text-gray-700`}
          onClick={toggleDatePicker}
        >
          Compare: {requestedInformationDetail}
        </button>
      </div>

      {/* Date Picker Dropdown */}
      {isDatePickerOpen && (
        <div className="absolute z-50 md:right-5">
          <div className="flex w-full p-4 mt-4 bg-white shadow-lg rounded-tr-2xl rounded-tl-2xl">
            <div className="pr-6 border-r border-r-primary50">
              <div className="flex flex-col gap-2.5 w-[114px] h-[274px]">
                {[
                  "Today",
                  "Yesterday",
                  "Last week",
                  "Last month",
                  "Custom range",
                ].map((option) => (
                  <div
                    key={option}
                    className={`text-xs font-normal text-gray-700 cursor-pointer py-1 px-2 rounded-[10px] ${
                      requestedInformationDetail === option ? "bg-gray-300" : ""
                    }`}
                    onClick={() => handleDateSelection(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-start justify-center w-full h-auto gap-6 pl-6">
              <Calendar
                value={dates}
                onChange={(e) => setDates(e.value)}
                selectionMode="range"
                readOnlyInput
                inline
              />
            </div>
          </div>
          {requestedInformationDetail !== "Custom range" && (
            <div className="bg-white border border-primary50 rounded-br-2xl rounded-bl-2xl">
              <div className="flex items-center justify-end gap-4 px-4 py-3">
                <TextButton
                  title="Cancel"
                  onClick={cancelSelection}
                  textColor="text-gray-700"
                  backgroundColor="bg-white"
                  borderColor="border border-gray-700 h-8"
                />
                <TextButton title="Apply" onClick={applySelection} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;
