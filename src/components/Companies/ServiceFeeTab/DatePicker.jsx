import React from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "@/Icons/Calendar";

const CustomDatePicker = ({ name, selectedDate, onSelect }) => {
  return (
    <div className={`font-sans relative custom__datepicker__main`}>
      <DatePicker
        name={name}
        className="w-full"
        dateFormat="MMM d-yyyy"
        selected={selectedDate}
        onChange={(date) => onSelect(date)}
        customInput={
          <div className="bg-white rounded-2xl h-12 px-4 flex justify-between items-center border border-primary50 cursor-pointer">
            <span className="text-gray-700">
              {new Date(selectedDate)
                .toLocaleDateString("en-UK", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
                .replace(",", "-")}
            </span>
            <Calendar className="mr-2 w-[14px] h-[14px]" />
          </div>
        }
      />
    </div>
  );
};

export default CustomDatePicker;
