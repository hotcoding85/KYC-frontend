import React, { useState } from "react";
import Button from "@/components/Elements/Button/Button";
import Modal from "@/components/Elements/Modal/Modal";
import Search from "@/Icons/Search";
import Btc from "@/Icons/imageicon/Btc";
import Ltc from "@/Icons/CrytpoAssets/Ltc";
import USDT from "@/Icons/imageicon/USDT";

const SelectCurrencyModal = ({ isModalOpen, closeModal, setSelectedCurrency }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const currencies = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      value: "btc",
      icon: <Btc className="size-6" />,
      amount: "0.0004232 BTC",
      amountInUSD: "$52.00 USD",
      totalInUSD: "$68,632.00 USD",
    },
    {
      name: "Tether USD",
      symbol: "USDT",
      value: "usdt_ethereum",
      icon: <USDT className="size-6" />,
      network: "Ethereum",
      amount: "130.00 USDT",
      amountInUSD: "$130.00 USD",
      totalInUSD: "$1.00 USD",
    },
    {
      name: "Litecoin",
      symbol: "LTC",
      value: "ltc",
      icon: <Ltc className="size-6" />,
      amount: "12.203 LTC",
      amountInUSD: "$1,040.04 USD",
      totalInUSD: "$75.33 USD",
    },
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Should be e.target.value for input change
  };

  // Filter the list of languages based on the search term
  const filteredCurrencies = currencies.filter((currency) =>
    currency.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Select Currency" size="lg">
        {/* Modal Body */}
        <div className="p-4">
          {/* Search Input */}
          <div className="flex items-center h-8 p-3 pr-3 mb-4 text-xs border border-gray-300 rounded-2xl">
            <Search />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full ml-2 border-none outline-none"
            />
          </div>

          {/* List of Currencies */}
          <div className="space-y-2">
            {filteredCurrencies.map((currency, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedCurrency(currency.symbol);
                  closeModal();
                }}
                className="flex items-center justify-between w-full py-4 space-x-2 border-b cursor-pointer"
              >
                <div className="flex flex-row items-center space-x-2">
                  {currency.icon}
                  <div className="flex flex-col space-y-1">
                    <span className="text-xs font-semibold">{currency.name}</span>
                    <span className="text-[11px] text-textSecondary">{currency.amount}</span>
                  </div>
                </div>
                <div className="flex flex-col space-y-1 text-right">
                  <p className="text-xs font-semibold">{currency.amountInUSD}</p>
                  <p className="text-xs">{currency.totalInUSD}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SelectCurrencyModal;
