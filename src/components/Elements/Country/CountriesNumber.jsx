import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { country as Countries } from "@/data/Country/Country";

export default function CountriesPhone({
  id,
  countries = [],
  disabled = false,
  selectedValue = {},
  className = "",
  width,
  onChange,
}) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false); // Manage `open` state internally
  const [query, setQuery] = useState(""); // Manage the search query

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target) && open) {
        setOpen(false); // Close the dropdown if clicked outside
        setQuery(""); // Clear the query
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleToggle = () => {
    setOpen((prev) => !prev); // Toggle dropdown open/close
  };

  const handleSelect = (value) => {
    onChange(value); // Notify the parent about the selected value
    setOpen(false); // Close the dropdown
    setQuery(""); // Clear the query
  };

  return (
    <div ref={ref}>
      <div className={`relative ${width || "w-20"}`}>
        {/* Toggle Dropdown Button */}
        <button
          type="button"
          onClick={handleToggle} // Toggle the dropdown internally
          disabled={disabled}
          aria-expanded={open}
          aria-haspopup="listbox"
          className={`${
            disabled ? "bg-neutral-100" : "bg-white"
          } ${className} flex items-center relative w-full h-8 border border-gray-300 rounded-[10px] shadow-sm py-1 px-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs text-textBlack font-normal`}
        >
          <span className="text-textSecondary truncate flex items-center">
            {selectedValue?.areaCode ? (
              <>
                <img
                  alt={`${selectedValue.areaCode}`}
                  src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedValue.value}.svg`}
                  className="inline mr-1 w-4 h-4"
                />
                <span>{selectedValue.areaCode}</span>
              </>
            ) : (
              <span>Select a country</span>
            )}
          </span>
        </button>

        {/* Dropdown List */}
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-80 rounded-[10px] ring-1 ring-black ring-opacity-5 focus:outline-none text-xs text-textBlack font-normal"
              tabIndex={-1}
              role="listbox"
            >
              <div className="sticky top-0 z-10 bg-white">
                <li className="text-gray-900 cursor-default select-none relative px-1">
                  <input
                    type="search"
                    name="search"
                    autoComplete="off"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full text-xs border-gray-300 rounded-md py-3 focus-visible:outline-none"
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
                      countries.includes(country.areaCode) &&
                      country.title
                        .toLowerCase()
                        .startsWith(query.toLowerCase())
                    );
                  }).map((value, index) => (
                    <li
                      key={`${id}-${index}`}
                      className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 flex items-center hover:bg-gray-50 transition"
                      role="option"
                      onClick={() => handleSelect(value)}
                    >
                      <img
                        alt={`${value.value}`}
                        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${value.value}.svg`}
                        className="inline mr-1 w-3 h-3 rounded-sm"
                      />
                      <p className="flex items-center gap-0.5">
                        <span className="text-[10px] text-textBlack font-normal truncate">
                          {value.areaCode}
                        </span>
                        {value.areaCode === selectedValue?.areaCode && (
                          <span className="text-blue-600 flex items-center">
                            <svg
                              className="h-4 w-4"
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
                        )}
                      </p>
                    </li>
                  ))
                )}
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
