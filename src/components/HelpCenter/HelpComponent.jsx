import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const HelpComponent = ({ question, answer, isLastItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${!isLastItem && "mb-3"}`}>
      <div className="bg-white border rounded-2xl">
        <div
          className={`flex items-center justify-between pt-4 ${
            isOpen ? "pb-2" : "pb-4"
          } px-4 rounded-lg cursor-pointer`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-xs font-semibold">{question}</span>
          <span className="font-medium text-textLight">
            {isOpen ? (
              <FaChevronUp className="w-[12px] h-[12px]" />
            ) : (
              <FaChevronDown className="w-[12px] h-[12px]" />
            )}
          </span>
        </div>

        {/* Conditional rendering based on whether the answer is an array or a string */}
        {isOpen && (
          <div className="p-4 text-xs text-justify">
            {Array.isArray(answer) ? (
              <div className="list-decimal">
                {answer.map((step, index) => (
                  <div key={index} className="">
                    {step}
                  </div>
                ))}
              </div>
            ) : (
              <p className="p-4 text-xs">{answer}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpComponent;
