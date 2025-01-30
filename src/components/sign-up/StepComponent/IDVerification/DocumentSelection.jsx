import React from "react";
import Image from "next/image";

export const DocumentSelection = ({
  options,
  selectedOption,
  onSelectOption,
}) => {
  return (
    <div className="flex flex-col items-start w-full gap-4">
      {options.map((option, index) => (
        <button
          key={index}
          className={`w-full py-1 sm:py-2 px-2 sm:px-4 border flex items-center text-xs hover:border-textBlack  rounded-[10px] ${
            selectedOption === option.text
              ? "border-textBlack"
              : "border-primary50"
          }`}
          onClick={() => onSelectOption(option.text)}
        >
          {/* <Image
            src={option.icon}
            alt={`${option.text} icon`}
            width={14}
            height={14}
            className="mr-3"
          /> */}
          {option.icon}
          {option.text}
        </button>
      ))}
    </div>
  );
};
