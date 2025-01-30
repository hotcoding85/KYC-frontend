import React, { useState, useEffect } from "react";
import Back from "@/Icons/Back";
import Button from "@/components/Elements/Button/Button";
import CryptoDropdown from "@/components/Otc/CryptoDropDown";
import { useRouter } from "next/navigation";

const ExchangeStepOne = ({ onAmountEntered }) => {
  const router = useRouter();
  const handleButtonClick = () => {
    const enteredAmount = 10; // Example amount
    const convertedAmount = 15.3; // Example converted amount
    onAmountEntered(enteredAmount, convertedAmount);
  };

  const currencies = [
    { name: "BTC", logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
    {
      name: "USD",
      logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    },
  ];
  const [selectedCurrency, setSelectedCurrency] = useState("BTC");
  const [selectedCurrencyTo, setSelectedCurrencyTo] = useState("BTC");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTo, setIsOpenTo] = useState(false);
  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setIsOpen(false);
  };
  const handleCurrencySelectTo = (currency) => {
    setSelectedCurrencyTo(currency);
    setIsOpenTo(false);
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <div className="items-center justify-center w-full bg-white border md:w-[500px] rounded-2xl">
        <div className="flex-col p-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="cursor-pointer" onClick={() => router.back()}>
                <Back />
              </div>
              <p className="text-sm font-semibold">How much do you want to exchange?</p>
            </div>
            <div className="p-4 space-y-6 border border-primary50 rounded-xl">
              <div className="flex flex-row justify-between">
                <label className="block mb-2 text-xs text-gray-700">From</label>
                <p className="text-xs text-gray-500">Balance: 700.00</p>
              </div>
              <div className="flex flex-row items-center justify-between space-x-2">
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full text-sm font-bold text-gray-800 bg-transparent border-none focus:outline-none"
                />
                <CryptoDropdown
                  width={"w-24"}
                  currencies={currencies}
                  selectedCurrency={selectedCurrency}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  handleCurrencySelect={handleCurrencySelect}
                />
              </div>
            </div>

            <div>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect
                  x="0.208333"
                  y="31.7917"
                  width="31.5833"
                  height="31.5833"
                  rx="15.7917"
                  transform="rotate(-90 0.208333 31.7917)"
                  stroke="#E9E9E9"
                  strokeWidth="0.416667"
                />
                <path
                  d="M19.5 9C19.85 9 20.0833 9.23333 20.0833 9.58333V21.0167L22.0083 19.0917C22.2417 18.8583 22.5917 18.8583 22.825 19.0917C23.0583 19.325 23.0583 19.675 22.825 19.9083L19.9083 22.825C19.675 23.0583 19.325 23.0583 19.0917 22.825L16.175 19.9083C15.9417 19.675 15.9417 19.325 16.175 19.0917C16.4083 18.8583 16.7583 18.8583 16.9917 19.0917L18.9167 21.0167V9.58333C18.9167 9.23333 19.15 9 19.5 9ZM13.0833 22.4167V10.9833L15.0083 12.9083C15.2417 13.1417 15.5917 13.1417 15.825 12.9083C16.0583 12.675 16.0583 12.325 15.825 12.0917L12.9083 9.175C12.675 8.94167 12.325 8.94167 12.0917 9.175L9.175 12.0917C8.94167 12.325 8.94167 12.675 9.175 12.9083C9.40833 13.1417 9.75833 13.1417 9.99167 12.9083L11.9167 10.9833V22.4167C11.9167 22.7667 12.15 23 12.5 23C12.85 23 13.0833 22.7667 13.0833 22.4167Z"
                  fill="#4D4D4D"
                />
              </svg>
            </div>

            <div className="p-4 space-y-6 border border-primary50 rounded-xl">
              <div className="flex flex-row justify-between">
                <label className="block mb-2 text-xs text-gray-700">To</label>
                <p className="text-xs text-gray-500">Balance: 700.00</p>
              </div>
              <div className="flex flex-row items-center justify-between space-x-2">
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full text-sm font-bold text-gray-800 bg-transparent border-none focus:outline-none"
                />
                <CryptoDropdown
                  width={"w-24"}
                  currencies={currencies}
                  selectedCurrency={selectedCurrencyTo}
                  isOpen={isOpenTo}
                  setIsOpen={setIsOpenTo}
                  handleCurrencySelect={handleCurrencySelectTo}
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-textSecondary">
              <p className="text-xs font-normal text-textSecondary">Rate</p>
              <p className="text-xs font-normal text-primary">1 USD = 1.50 AUD</p>
            </div>
            <div className="flex items-center justify-between text-textSecondary">
              <p className="text-xs font-normal text-textSecondary">Conversion fee</p>
              <p className="text-xs font-normal text-primary">0.06 USD</p>
            </div>
          </div>
          <div className="mt-4">
            <Button
              title={"Exchange"}
              className={"w-full h-8 p-4 bg-black text-white text-xs rounded-[10px]"}
              onClick={handleButtonClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeStepOne;
