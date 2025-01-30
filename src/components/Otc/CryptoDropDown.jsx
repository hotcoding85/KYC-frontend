import React, { useState, useRef, useEffect } from "react";
import S3Image from "../Elements/S3Image/S3Image";

const CryptoDropdown = ({
  currencies,
  selectedCurrency,
  isOpen,
  setIsOpen,
  handleCurrencySelect,
  className,
  width,
}) => {
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

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
  }, [setIsOpen]);

  return (
    <div
      className={`relative inline-block text-left ${width}`}
      ref={dropdownRef}
    >
      {/* Dropdown button */}
      <div className="w-full">
        <button
          type="button"
          ref={buttonRef}
          className={`${width} ${
            className ??
            "inline-flex h-8 justify-between items-center rounded-[10px] bg-lightGrey px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center space-x-2">
            <S3Image
              s3Url={
                currencies.find((c) => c.name === selectedCurrency)?.logo ?? ""
              }
              alt={selectedCurrency}
              className="w-2"
            />
            <span className="text-xs">{selectedCurrency}</span>
          </div>
          <svg
            className={`w-4 h-4 transform transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className={`fixed z-[9999] mt-2 w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
          style={{
            // width: buttonRef.current?.offsetWidth,
            // top:
            //   buttonRef.current?.getBoundingClientRect().bottom +
            //   window.scrollY,
            // left:
            //   buttonRef.current?.getBoundingClientRect().left + window.scrollX,
          }}
        >
          <div className={`py-1 ${width}`}>
            {currencies.map((currency) => (
              <button
                key={currency.name}
                onClick={() => handleCurrencySelect(currency?.id || currency?.name )}
                className="flex items-center w-full px-4 py-2 space-x-2 text-gray-700 hover:bg-gray-100"
              >
                <S3Image s3Url={currency.logo} className="w-2"></S3Image>
                <span>{currency.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoDropdown;
