import React from "react";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";

export default function Indicator({ value, label }) {
  return (
    <p
      className={`text-[11px] ${
        value > 0
          ? "text-success"
          : value < 0
            ? "text-red-600"
            : "text-gray-600"
      } flex-row flex  items-center gap-2 text-nowrap`}
    >
      {value > 0 ? (
        <FaArrowUp></FaArrowUp>
      ) : (
        value < 0 && <FaArrowDown></FaArrowDown>
      )}
      <span>{Math.abs(value)}%</span>
      <span className="pl-1 text-textLight">{label}</span>
    </p>
  );
}
