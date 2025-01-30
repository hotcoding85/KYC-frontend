import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { country as Countries } from "@/data/Country/Country";

export default function Country({
  id,
  countries = [],
  disabled = false,
  onChange,
  selectedValue = null,
  className = "",
}) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    if (open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [open]);

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
    setQuery(""); // Reset search when opening the dropdown
  };

  const handleSelect = (value) => {
    onChange(value); // Update the selected value in the parent component
    setOpen(false); // Close the dropdown
    setQuery(""); // Clear the search query
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className={`${
          disabled ? "bg-neutral-100" : "bg-white"
        } ${className} text-textSecondary relative w-full border border-gray-300 rounded-[10px] h-[32px] text-xs px-3 py-1 text-left cursor-default focus:outline-none focus:ring-1`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby="listbox-label"
        onClick={toggleDropdown}
        disabled={disabled}
      >
        <span className="text-textSecondary truncate flex items-center">
          {selectedValue ? (
            <>
              <img
                alt={`${selectedValue.value}`}
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedValue.value}.svg`}
                className="inline h-4 rounded-sm mr-1"
              />
              <span>{selectedValue.title}</span>
            </>
          ) : (
            <p>Select a country</p>
          )}
        </span>
        <span
          className={`absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none ${
            disabled ? "hidden" : ""
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1795_328201)">
              <path
                d="M17.4198 2.95589L18.4798 4.01689L12.7028 9.79589C12.6102 9.88905 12.5001 9.96298 12.3789 10.0134C12.2576 10.0639 12.1276 10.0898 11.9963 10.0898C11.8649 10.0898 11.7349 10.0639 11.6137 10.0134C11.4924 9.96298 11.3823 9.88905 11.2898 9.79589L5.50977 4.01689L6.56977 2.95689L11.9948 8.38089L17.4198 2.95589Z"
                fill="#4D4D4D"
              />
            </g>
            <defs>
              <clipPath id="clip0_1795_328201">
                <rect
                  width="12"
                  height="24"
                  fill="white"
                  transform="matrix(0 1 -1 0 24 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            style={{
              position: "fixed",
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              width: dropdownPosition.width,
            }}
            className="z-[9999]"
          >
            <ul
              className="bg-white shadow-lg max-h-80 rounded-md text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              tabIndex={-1}
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-3"
            >
              <div className="sticky top-0 z-10 bg-white">
                <li className="text-gray-900 cursor-default select-none relative py-2 px-3">
                  <input
                    type="search"
                    name="search"
                    autoComplete="off"
                    className="w-full px-3 py-2.5 text-xs mt-1 border rounded-[10px] h-[32px] border-gray-300 rounded-xl text-xs"
                    placeholder="Search a country"
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                  />
                </li>
                <hr />
              </div>

              <div className="max-h-64 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-600 scrollbar-thumb-rounded scrollbar-thin overflow-y-scroll">
                {Countries.filter((country) =>
                  country.title.toLowerCase().startsWith(query.toLowerCase())
                ).length === 0 ? (
                  <li className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9">
                    No countries found
                  </li>
                ) : (
                  Countries.filter((country) => {
                    if (countries.length === 0) {
                      return country.title
                        .toLowerCase()
                        .startsWith(query.toLowerCase());
                    }
                    return (
                      countries.includes(country.value) &&
                      country.title
                        .toLowerCase()
                        .startsWith(query.toLowerCase())
                    );
                  }).map((value, index) => (
                    <li
                      key={`${id}-${index}`}
                      className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 flex items-center hover:bg-gray-50 transition"
                      id="listbox-option-0"
                      role="option"
                      onClick={() => handleSelect(value)}
                    >
                      <img
                        alt={`${value.value}`}
                        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${value.value}.svg`}
                        className="inline mr-2 h-4 rounded-sm"
                      />

                      <span className="font-normal truncate">
                        {value.title}
                      </span>
                      {value.value === selectedValue?.value ? (
                        <span className="text-blue-600 absolute inset-y-0 right-0 flex items-center pr-8">
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      ) : null}
                    </li>
                  ))
                )}
              </div>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}