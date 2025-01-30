import React, { useState } from "react";
import Image from "next/image";
import { Calendar } from "primereact/calendar";
import Time from "@/Icons/Time";
import CalendarIcon from "@/Icons/Calendar";

const CustomDateTimePicker = ({ name, selectedDate, onSelect, timeOnly }) => {
  const [state, setState] = useState(selectedDate);
  return (
    <div className={`font-sans relative`}>
      <Calendar
        name={name}
        timeOnly={timeOnly}
        onChange={(event) => {
          onSelect(event);
          setState(event.value);
        }}
        value={state}
        className="text-textSecondary bg-white text-textBlack w-full    p-3 rounded-[10px] h-[32px] pl-12 flex justify-between items-center border border-primary50 cursor-pointer"
      />
      <span className="absolute top-1/2 left-2 -translate-y-1/2 translate-x-1/2">
        {timeOnly ? (
          <Time className="w-5 h-5" />
        ) : (
          <CalendarIcon className="w-5 h-5" />
        )}
      </span>
    </div>
  );
};

export default CustomDateTimePicker;
