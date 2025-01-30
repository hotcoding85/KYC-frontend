import React, { useState } from "react";
import Button from "@/components/Elements/Button/Button";
import Modal from "@/components/Elements/Modal/Modal";
import CryptoDropdown from "@/components/Otc/CryptoDropDown";
import useIsMobile from "@/hooks/useIsMobile";

const SpendingLimitModal = ({ isModalOpen, closeModal }) => {
  const [buyAmount, setBuyAmount] = useState(1);
  const [sellAmount, setSellAmount] = useState(58289.32);
  const [rate] = useState(0.00001716);
  const [comment, setComment] = useState("");
  const isMobile = useIsMobile(); // Using the custom hook to detect mobile screen

  const currencies = [
    { name: "BTC", logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
    {
      name: "USD",
      logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    },
    // Add more currencies if needed
  ];
  const [selectedCurrency, setSelectedCurrency] = useState("BTC");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrencySell, setSelectedCurrencySell] = useState("BTC");
  const [isOpenSell, setIsOpenSell] = useState(false);

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setIsOpenSell(false);
  };
  const handleCurrencySelectSell = (currency) => {
    setSelectedCurrencySell(currency);
    setIsOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Spending Limit"
        size={isMobile ? "md" : "2xl"}
      >
        {/* Modal Body */}
        <div className="flex flex-col p-4 space-y-2">
          <div className="p-4 space-y-8 border rounded-xl">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-700">Daily Limit</p>
            </div>
            <div className="flex items-center justify-between rounded-md">
              <p className="text-sm font-bold">{buyAmount.toFixed(2)}</p>
              <CryptoDropdown
                width={"w-36"}
                currencies={currencies}
                selectedCurrency={selectedCurrency}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                handleCurrencySelect={handleCurrencySelect}
              />
            </div>
          </div>

          {/* Selling Section */}
          <div className="p-4 space-y-8 border rounded-xl">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-700">Monthly Limit</p>
            </div>
            <div className="flex items-center justify-between rounded-md">
              <p className="text-sm font-bold">{sellAmount.toFixed(2)}</p>
              <CryptoDropdown
                width={"w-36"}
                currencies={currencies}
                selectedCurrency={selectedCurrencySell}
                isOpen={isOpenSell}
                setIsOpen={setIsOpenSell}
                handleCurrencySelect={handleCurrencySelectSell}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SpendingLimitModal;
