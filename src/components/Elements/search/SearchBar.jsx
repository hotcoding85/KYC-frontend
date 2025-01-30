import React from "react";
import Search from "@/Icons/Search";

const SearchBar = ({ className, value, onValueChange, inputClassName, placeholder="Search" }) => {
  return (
    <div
    className={`items-center h-8 text-xs p-2 border hidden md:flex border-primary50 rounded-[10px] ${className}`}    >
      <Search />
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onValueChange(e.target.value);
        }}
        placeholder={placeholder}
        className={`custom-placeholder ml-2 mb-[0px] border-none outline-none ${inputClassName} text-textSecondary placeholder:text-textSecondary`}
      />
    </div>
  );
};

export default SearchBar;
