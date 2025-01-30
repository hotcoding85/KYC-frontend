import React, { useState } from "react";
import Back from "@/Icons/Back";
import Button from "@/components/Elements/Button/Button";
import CryptoDropdown from "@/components/Otc/CryptoDropDown";
import Transfer from "@/Icons/imageicon/Transfer";

const BuyCryptoStepOne = ({ onAmountEntered }) => {
  const [amount, setAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("BTC");
  const [isOpen, setIsOpen] = useState(false);

  const isButtonDisabled = amount === "" || parseFloat(amount) <= 0;

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleButtonClick = () => {
    const convertedAmount = 15.3; // Example converted amount
    onAmountEntered(parseFloat(amount), convertedAmount);
  };

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setIsOpen(false);
  };

  const currencies = [
    { name: "BTC", logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
    {
      name: "USD",
      logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    },
  ];

  return (
    <div className="flex flex-col justify-between items-center h-screen">
      <div className="bg-white rounded-2xl border w-full md:w-3/6 justify-center items-center">
        <div className="flex-col p-6 gap-2 w-full">
          <div className="flex flex-row items-center gap-2">
            <Back />
            <p className="text-sm font-bold py-2">Buy Crypto</p>
          </div>

          <div className="flex flex-col w-full gap-2 text-sm">
            <p>Crypto to buy</p>
            <CryptoDropdown
              width={"w-full"}
              className="inline-flex h-8 justify-between items-center rounded-[10px] bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 border border-primary50"
              currencies={currencies}
              selectedCurrency={selectedCurrency}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              handleCurrencySelect={handleCurrencySelect}
            />
          </div>

          <div className="flex flex-col gap-2 w-full mt-4">
            <div className="flex flex-row items-center justify-between">
              <p className="text-sm">Amount</p>
              <div className="flex flex-row items-center gap-2 w-max">
                <Transfer className="h-[10px] w-[10px]" />
                <p className="text-xs">USD</p>
              </div>
            </div>

            <input
              type="number"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              placeholder="0.00"
              className="block w-full h-8 py-1 px-2 mt-1 border rounded-[10px] border-primary50 text-xs placeholder:text-xs"
            />
          </div>
          <div className="mt-4">
            <Button
              title={"Add Payment Method"}
              className={`w-full p-4 ${
                isButtonDisabled
                  ? "bg-gray-50 text-gray-400"
                  : "bg-black text-white"
              }`}
              onClick={handleButtonClick}
              disabled={isButtonDisabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCryptoStepOne;
