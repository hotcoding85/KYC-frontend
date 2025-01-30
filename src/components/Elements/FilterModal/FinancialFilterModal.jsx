/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef } from "react";
import Image from "next/image";
import Button, { TextButton } from "@/components/Elements/Button/Button";
import Modal from "@/components/Elements/Modal/Modal";
import Filters from "@/Icons/Filters";
import { Calendar } from "primereact/calendar";
import CalendarIcon from "@/Icons/Calendar";
import Crosscircle from "@/Icons/Crosscircle";
import Flag1 from "@/Icons/imageicon/Flag1";

export default function FinancialFilterModal({
  title,
  onChange,
  isValueVisible = true,
  className,
  iconClasses,
  textClasses,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    transactionType: "",
    amountRange: "",
    assetType: "",
    dateRange: "",
    startDate: null,
    endDate: null,
    selectedCurrency: "",
    selectedCrypto: "",
  });

  // Refs for calendar components
  const startDateCalendarRef = useRef(null);
  const endDateCalendarRef = useRef(null);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const setFilterValue = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({
      transactionType: "",
      amountRange: "",
      assetType: "",
      dateRange: "",
      startDate: null,
      endDate: null,
      selectedCurrency: "",
      selectedCrypto: "",
    });
  };

  const applyFilters = () => {
    if (onChange) {
      onChange(filters);
    }
    closeModal();
  };

  // Updated functions to use PrimeReact Calendar's show method
  const openStartDateCalendar = () => {
    if (startDateCalendarRef.current) {
      startDateCalendarRef.current.show();
    }
  };

  const openEndDateCalendar = () => {
    if (endDateCalendarRef.current) {
      endDateCalendarRef.current.show();
    }
  };

  // Function to handle currency selection
  const handleCurrencySelect = (currency) => {
    setFilterValue("selectedCurrency", currency);
  };

  // Function to handle crypto selection
  const handleCryptoSelect = (crypto) => {
    setFilterValue("selectedCrypto", crypto);
  };

  // Function to count active filters
  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.transactionType) count++;
    if (filters.amountRange) count++;
    if (filters.assetType) count++;
    if (filters.dateRange) count++;
    if (filters.selectedCurrency) count++;
    if (filters.selectedCrypto) count++;
    // Count custom date range as one filter if either start or end date is set
    if (filters.startDate || filters.endDate) count++;
    return count;
  };

  // Get active filters count
  const activeFiltersCount = getActiveFiltersCount();

  // Handle clear filters from the main button
  const handleClearFiltersFromButton = (e) => {
    e.stopPropagation(); // Prevent opening modal when clearing
    clearFilters();
  };

  // Define unique currency arrays
  const fiatCurrencies = [
    "USD", // US Dollar
    "EUR", // Euro
    "GBP", // British Pound
    "JPY", // Japanese Yen
    "AUD", // Australian Dollar
    "CAD", // Canadian Dollar
    "CHF", // Swiss Franc
    "CNY", // Chinese Yuan
    "HKD", // Hong Kong Dollar
    "NZD", // New Zealand Dollar
    "SGD", // Singapore Dollar
    "INR", // Indian Rupee
    "BRL", // Brazilian Real
    "ZAR", // South African Rand
    "AED", // UAE Dirham
    "SAR", // Saudi Riyal
  ];

  const cryptoCurrencies = [
    "BTC", // Bitcoin
    "ETH", // Ethereum
    "BNB", // Binance Coin
    "SOL", // Solana
    "ADA", // Cardano
    "XRP", // Ripple
    "DOT", // Polkadot
    "AVA", // Avalanche
    "MAT", // Polygon
    "LIN", // Chainlink
    "UNI", // Uniswap
    "ATO", // Cosmos
    "ALG", // Algorand
    "FIL", // Filecoin
    "NEA", // NEAR Protocol
    "VET", // VeChain
  ];

  return (
    <>
      <button
        className={`relative h-8 w-24 py-1.5 flex items-center justify-center gap-1 rounded-[10px] px-1.5 border border-primary50 bg-white text-center text-xs font-normal text-textBlack ${className}`}
        onClick={openModal}
      >
        {activeFiltersCount > 0 && (
          <button
            onClick={handleClearFiltersFromButton}
            className="absolute -left-2 -top-1 w-4 h-4 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
          >
            <Crosscircle className="w-4 h-4" />
          </button>
        )}
        <span className={`w-5 h-5 ${iconClasses}`}>
          <Filters />
        </span>
        <p
          className={`text-xs text-textBlack flex flex-row items-center gap-[4px] ${textClasses}`}
        ></p>
        <p>Filters</p>
        {activeFiltersCount > 0 && (
          <p className="bg-primary50 text-[8px] font-bold rounded-full h-4 w-4 text-center">
            {activeFiltersCount}
          </p>
        )}
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={title || "Filters"}
        customWidth="max-w-sm md:max-w-3xl"
      >
        <div className="w-full p-4 mx-auto overflow-y-auto h-96 md:h-max">
          {/* Transaction Type */}
          <div className="pb-4 mb-4 border-b border-b-primary50">
            <h3 className="mb-2 text-xs font-medium">Transaction type</h3>
            <div className="flex flex-wrap gap-2">
              {["Sent", "Received"].map((type, index) => (
                <button
                  key={index}
                  className={`py-2 px-4 h-8 text-xs rounded-[10px] border !w-[90px] ${
                    filters.transactionType === type
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                  onClick={() => setFilterValue("transactionType", type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Amount Range */}
          <div className="pb-4 mb-4 border-b border-b-primary50">
            <h3 className="mb-2 text-xs font-medium">Amount</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Under $10K",
                "$10K - $50K",
                "$50K - $100K",
                "$100K - $500K",
                "Over $500K",
              ].map((amount, index) => (
                <button
                  key={index}
                  className={`py-2  px-4 h-8 text-xs rounded-[10px] border !w-[114px] text-nowrap ${
                    filters.amountRange === amount
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                  onClick={() => setFilterValue("amountRange", amount)}
                >
                  {amount}
                </button>
              ))}
            </div>
          </div>

          {/* Asset Type */}
          <div className="pb-4 mb-4 border-b border-b-primary50">
            <h3 className="mb-2 text-xs font-medium">Asset</h3>
            <div className="flex flex-wrap gap-2">
              {["Fiat", "Crypto"].map((asset, index) => (
                <button
                  key={index}
                  className={`md:w-24   py-2 px-4 h-8 text-xs rounded-[10px] border !w-[114px] ${
                    filters.assetType === asset
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                  onClick={() => setFilterValue("assetType", asset)}
                >
                  {asset}
                </button>
              ))}
            </div>

            {/* Conditionally rendering content based on the selected asset type */}
            {filters.assetType === "Fiat" && (
              <div className="pt-2 rounded-lg ">
                <div className="flex flex-wrap gap-2 mt-2">
                  {fiatCurrencies.map((currency, index) => (
                    <button
                      key={index}
                      className={`flex items-center h-8 gap-1 px-3 py-2 text-xs border rounded-lg w-[70px] ${
                        filters.selectedCurrency === currency
                          ? "border-black bg-gray-50"
                          : "border-gray-300"
                      }`}
                      onClick={() => handleCurrencySelect(currency)}
                    >
                      <Flag1 className="w-[16px] h-[16px]" />
                      {currency}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {filters.assetType === "Crypto" && (
              <div className="pt-2 rounded-lg">
                <div className="flex flex-wrap gap-2 mt-2">
                  {cryptoCurrencies.map((crypto, index) => (
                    <button
                      key={index}
                      className={`flex items-center h-8 gap-1 px-3 py-2 text-xs border rounded-lg w-[70px] ${
                        filters.selectedCrypto === crypto
                          ? "border-black bg-gray-50"
                          : "border-gray-300"
                      }`}
                      onClick={() => handleCryptoSelect(crypto)}
                    >
                      <Flag1 className="w-[16px] h-[16px]" />
                      {crypto}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Date Range */}
          <div className={``}>
            <h3 className="mb-2 text-xs font-medium">Date</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Last week",
                "Last month",
                "Last 3 months",
                "Last year",
                "Custom date",
              ].map((date, index) => (
                <button
                  key={index}
                  className={`py-2 px-4 h-8 text-xs rounded-[10px] border w-[114px] text-nowrap ${
                    filters.dateRange === date
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                  onClick={() => setFilterValue("dateRange", date)}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>

          {filters.dateRange === "Custom date" && (
            <div className="flex flex-col w-full gap-4 mt-4">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex flex-col w-full">
                  <label className="mb-1 text-xs font-medium">Start date</label>
                  <div className="relative w-full h-max">
                    <Calendar
                      ref={startDateCalendarRef}
                      value={filters.startDate || ""}
                      onChange={(e) =>
                        setFilterValue("startDate", e.target.value)
                      }
                      className="w-full h-8 px-4 py-2 text-sm border rounded-[10px] pr-4"
                      touchUI
                    />
                    <button
                      type="button"
                      onClick={openStartDateCalendar}
                      className="absolute top-[8px] right-2 w-[14px] h-[14px] cursor-pointer"
                    >
                      <CalendarIcon className="w-full h-full" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <label className="mb-1 text-xs font-medium">End date</label>
                  <div className="relative w-full h-max">
                    <Calendar
                      ref={endDateCalendarRef}
                      value={filters.endDate || ""}
                      onChange={(e) =>
                        setFilterValue("endDate", e.target.value)
                      }
                      className="w-full h-8 px-4 py-2 text-sm border rounded-[10px] pr-4"
                      touchUI
                    />
                    <button
                      type="button"
                      onClick={openEndDateCalendar}
                      className="absolute top-[8px] right-2 w-[14px] h-[14px] cursor-pointer"
                    >
                      <CalendarIcon className="w-full h-full" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Apply and Clear Buttons */}
        <div className="flex justify-between p-4 border-t">
          <button
            className="h-8 text-xs font-semibold text-gray-700"
            onClick={clearFilters}
          >
            Clear all
          </button>
          <div className="flex gap-4">
            <Button
              title="Cancel"
              className="h-8 text-sm px-4 !w-[114px] bg-white border-[1px] text-primary border-gray-300 rounded-[10px] "
              onClick={closeModal}
            />
            <Button
              title="Apply"
              className="h-8 px-4 text-sm !w-[114px] text-center border-none text-white bg-primary rounded-[10px]"
              onClick={applyFilters}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
