import React from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "@/Icons/Calendar";

const CustomDatePicker = ({ name, selectedDate, onSelect, height }) => {
  return (
    <div className={`font-sans relative custom__datepicker__main`}>
      <DatePicker
        name={name}
        className="w-full h-8 text-xs rounded-[10px]"
        dateFormat="MMM d-yyyy"
        selected={selectedDate}
        onChange={(date) => onSelect(date)}
        customInput={
          <div
            className={`flex items-center gap-2 ${
              height ? "h-[32px]" : "h-8"
            } border border-primary50 px-2 py-1 h-8 rounded-[10px] w-full  text-textBlack`}
          >
            <Calendar className="w-5 h-5" />

            <span className="text-gray-700">
              {new Date(selectedDate)
                .toLocaleDateString("en-UK", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
                .replace(",", "-")}
            </span>
          </div>
        }
      />
    </div>
  );
};

export default CustomDatePicker;
