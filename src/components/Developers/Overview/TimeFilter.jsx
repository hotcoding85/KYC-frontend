import React, { useState } from "react";

const TimeFilter = () => {
  const [selected, setSelected] = useState("1w");

  const handleSelect = (value) => {
    setSelected(value);
  };

  const options = ["4h", "12h", "24h", "1w"];

  return (
    <div className="inline-flex p-1 border border-gray-300 rounded-lg">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => handleSelect(option)}
          className={`px-1 py-1 text-xs ${
            selected === option ? "text-textBlack font-semibold" : "text-gray-600"
          } focus:outline-none`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default TimeFilter;
