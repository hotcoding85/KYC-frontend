import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import useApi from "@/hooks/useApi";
import S3Image from "../S3Image/S3Image";
import { ASSET_TYPE } from "@/shared/enums";

const CurrencyDropdown = ({ items, selectedItem, type='', onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const { fetchData, loading, error } = useApi();
  const dropdownRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({
      top: 0,
      left: 0,
    });

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
  }, []);

  const [assets, setAssets] = useState(items || []);

  async function fetchListAssets() {
    const { result, error } = await fetchData(`/asset/all`, {
      method: "GET",
    });
    if (error) {
      setAssets([]);
      setFilteredItems([]);
    } else {
      let filtered = []
      if (type.toLocaleLowerCase() === 'fiat') {
        filtered = result.filter(asset => asset.type === 'FIAT')
      }
      else if (
        type.toLocaleLowerCase() === "crypto" ||
        type.toLocaleLowerCase() === "cryptocurrency" ||
        type.toLocaleLowerCase() === "token"
      ) {
        filtered = result.filter((asset) => asset.type !== "FIAT");
      } else {
        filtered = result;
      }
      setAssets(filtered);
      setFilteredItems(filtered);
    }
  }

  useEffect(() => {
    if(!items){
      fetchListAssets();
    }
  }, [items]);


  useEffect(() => {
    if (assets) {
      setFilteredItems(
        assets.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
  }, [searchTerm]);

  useEffect(() => {
      if (open && dropdownRef.current) {
        const rect = dropdownRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
        });
      }
    }, [isOpen]);

  const handleSelect = (item) => {
    onSelect(item);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="text-textSecondary relative w-full border border-gray-300 rounded-[10px] h-[32px] text-xs px-3 py-1 text-left cursor-default focus:outline-none focus:ring-1 flex items-center">
        <button
          className="flex items-center w-full gap-2 "
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedItem ? (
            <>
              <S3Image
                s3Url={selectedItem?.icon}
                className="inline mr-2 h-4 rounded-sm"
              ></S3Image>
              <span>{selectedItem?.name || selectedItem?.asset || ""}</span>
            </>
          ) : (
            "Select Asset"
          )}
        </button>
        <span
          className={`absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none`}
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
      </div>
      <AnimatePresence>
        {isOpen && (
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
                    placeholder="Search an asset"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                  />
                </li>
                <hr />
              </div>

              <div className="max-h-64 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-600 scrollbar-thumb-rounded scrollbar-thin overflow-y-scroll">
                {filteredItems.length === 0 ? (
                  <li className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9">
                    No assets found
                  </li>
                ) : (
                  filteredItems.map((asset, index) => (
                    <li
                      key={`${asset.id}-${index}`}
                      className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 flex items-center hover:bg-gray-50 transition"
                      id="listbox-option-0"
                      role="option"
                      onClick={() => handleSelect(asset)}
                    >
                      <S3Image
                        s3Url={asset?.icon}
                        className="inline mr-2 h-4 rounded-sm"
                      ></S3Image>

                      <span className="font-normal truncate">
                        {asset?.name}
                      </span>
                      {asset?.id === selectedItem?.id ? (
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
};

export default CurrencyDropdown;
/*

{isOpen && (
        <div
          className={`absolute md:w-full mt-1 px-4  z-10 w-full overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-md max-h-64`}
        >
          <div className="flex items-center justify-between p-2 mt-4">
            <input
              type="text"
              placeholder="Search Currencies"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="relative w-full p-3 border border-gray-300 outline-none rounded-xl"
            />
          </div>

          <ul>
            {assets.map((item) => (
              <li
                key={item?.name}
                className="flex items-center justify-between gap-2 p-3 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelect(item)}
              >
                <div className="flex items-start gap-2">
                  { <Image
                    src={item?.logo}
                    alt={item?.name}
                    width={24}
                    height={23}
                  /> }
                  <p className="flex flex-col gap-0.5">
                    <span className="font-semibold text-xs text-textBlack">
                      {item?.name}
                    </span>
                    <span className="font-normal text-[11px] text-textBlack">
                      {item?.price}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-textBlack">
                    {item?.price}
                  </p>
                  <p className="text-xs font-normal text-textSecondary">
                    {item?.amount} USD
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

*/