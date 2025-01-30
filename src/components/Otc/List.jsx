import React, { useState, useMemo } from "react";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Search from "@/Icons/Search";

import Star from "@/Icons/Star";
import ArrowDown from "@/Icons/ArrowDown";
import Chart from "@/Icons/Chart";
import ArrowUp from "@/Icons/ArrowUp";
import Button from "../Elements/Button/Button";
import OtcCard from "./OtcCard";
import OtcCardModal from "./OtcCardModal";

export default function List() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <>
      <div className="p-4 space-y-4 overflow-x-auto bg-white border border-white rounded-2xl">
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center w-[200px] h-8 p-2 pr-3 border border-primary50 rounded-[10px]">
            <Search />
            <input
              type="text"
              placeholder="Search"
              className="w-full ml-2 text-xs border-none outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center justify-center w-auto h-8 px-3 py-2 text-xs font-normal text-center bg-white border border-gray-300 rounded-[10px]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.07116 3.15499C5.81024 1.82966 6.17949 1.16699 6.73191 1.16699C7.28432 1.16699 7.65357 1.82966 8.39266 3.15499L8.58399 3.49799C8.79399 3.87483 8.89899 4.06324 9.06232 4.18749C9.22566 4.31174 9.42982 4.35783 9.83816 4.44999L10.2092 4.53399C11.6442 4.85891 12.3611 5.02108 12.532 5.56999C12.7023 6.11833 12.2135 6.69058 11.2352 7.83449L10.9821 8.13024C10.7044 8.45516 10.565 8.61791 10.5026 8.81858C10.4402 9.01983 10.4612 9.23683 10.5032 9.67024L10.5417 10.0652C10.6892 11.5917 10.7633 12.3547 10.3165 12.6937C9.86966 13.0326 9.19766 12.7234 7.85482 12.1051L7.50657 11.9452C7.12507 11.7691 6.93432 11.6816 6.73191 11.6816C6.52949 11.6816 6.33874 11.7691 5.95724 11.9452L5.60957 12.1051C4.26616 12.7234 3.59416 13.0326 3.14791 12.6942C2.70049 12.3547 2.77457 11.5917 2.92216 10.0652L2.96066 9.67083C3.00266 9.23683 3.02366 9.01983 2.96066 8.81916C2.89882 8.61791 2.75941 8.45516 2.48174 8.13083L2.22857 7.83449C1.25032 6.69116 0.761491 6.11891 0.931825 5.56999C1.10216 5.02108 1.82024 4.85833 3.25524 4.53399L3.62624 4.44999C4.03399 4.35783 4.23757 4.31174 4.40149 4.18749C4.56541 4.06324 4.66982 3.87483 4.87982 3.49799L5.07116 3.15499Z"
                  stroke="#14151A"
                  stroke-width="1.05"
                />
              </svg>

              <span className="ml-1">Favorites</span>
            </button>
            <button className="flex items-center w-[88px] h-8 px-3 py-2 text-xs font-normal text-center bg-white border border-gray-300 rounded-[10px]">
              <ArrowDown />
              <span className="ml-1">All</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          <OtcCard title={"BTC/USD"} onClickBooking={openModal} />
          <OtcCard title={"BTC/USD"} />
          <OtcCard title={"BTC/USD"} />
          <OtcCard title={"BTC/USD"} />
          <OtcCard title={"BTC/USD"} />
          <OtcCard title={"BTC/USD"} />
          <OtcCard title={"BTC/USD"} />
          <OtcCard title={"BTC/USD"} />
          <OtcCard title={"BTC/USD"} />
          <OtcCard title={"BTC/USD"} />
        </div>
      </div>
      <OtcCardModal title={"BTC/USD"} isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
}
