import CurrencyDropdown from "@/components/Elements/DropDown/CurrencyDropdown";
import React, { useState } from "react";
import Modal from "@/components/Elements/Modal/Modal";
import ExchangeSummary from "@/components/Home/ExchangeSummary";
import ExchangeSuccess from "@/components/Home/ExchangeSuccess";
// import CurrencyDropdown from "@/components/Elements/Dropdown/CurrencyDropdown";
import { TextButton } from "@/components/Elements/Button/Button";
import Image from "next/image";

const CryptoExchangeModal = ({ isModalOpen, onCloseModal }) => {
  const currencies = [
    {
      name: "USDT",
      logo: "/assets/icons/theter.svg",
      price: "$130.00 USD",
      amount: "130.00"
    },
    {
      name: "BTC",
      logo: "/assets/images/btc.png",
      price: "$75.33 USD",
      amount: "1,040.04"
    }
    // Add more currencies as needed
  ];

  const [fromCurrency, setFromCurrency] = useState(currencies[0]);
  const [toCurrency, setToCurrency] = useState(currencies[1]);
  const [currentStep, setCurrentStep] = useState("form");

  const exchangeRate = "0.0015 BTC"; // Example exchange rate

  const goToSummary = () => setCurrentStep("summary");
  const goToSuccess = () => setCurrentStep("success");
  const handleDone = () => {
    setCurrentStep("form");
    onCloseModal();
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={onCloseModal}
      title="Exchange"
      customWidth="max-w-[96%] md:max-w-[500px]"
    >
      {currentStep === "form" && (
        <div className="w-full h-full p-4">
          {/* From Section */}
          <div className="mb-4">
            <p className="font-normal text-sm text-[#4D4D4D] mb-2">From</p>
            <div className="flex items-center border border-primary50 rounded-2xl">
              <div className="border-r border-r-primary50 pr-3">
                <CurrencyDropdown
                  items={currencies}
                  selectedItem={fromCurrency}
                  onSelect={setFromCurrency}
                />
              </div>
              <input
                type="text"
                placeholder={`Enter ${fromCurrency.name} amount`}
                className="ml-2 p-1 outline-none w-full text-textBlack placeholder:text-[#BABABA]"
              />
              <button className="mx-2 px-2 py-1 text-sm font-medium text-textBlack bg-[#F8F8F9] rounded-lg">
                Max
              </button>
            </div>
          </div>

          {/* Exchange Icon */}
          <div className="flex items-center justify-start my-4">
            <div className="w-10 h-10 flex items-center justify-center bg-[#F8F8F9] rounded-full">
              <Image
                src="/assets/icons/arrows-exchange-vertical.svg"
                alt="exchange"
                width={20}
                height={20}
              />
            </div>
          </div>

          {/* To Section */}
          <div className="mb-4">
            <p className="font-normal text-sm text-[#4D4D4D] mb-2">To</p>
            <div className="flex items-center border border-primary50 rounded-2xl">
              <div className="border-r border-r-primary50 pr-3">
                <CurrencyDropdown
                  items={currencies}
                  selectedItem={toCurrency}
                  onSelect={setToCurrency}
                />
              </div>
              <input
                type="text"
                placeholder={`Enter ${toCurrency.name} amount`}
                className="ml-2 p-1 outline-none w-full text-textBlack placeholder:text-[#BABABA]"
              />
              <button className="mx-2 px-2 py-1 text-sm font-medium text-textBlack bg-[#F8F8F9] rounded-lg">
                Max
              </button>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-4 pt-3 border-t border-t-primary50">
            <TextButton
              title="Cancel"
              textColor="text-primary"
              backgroundColor="bg-white"
              borderColor="border border-primary50"
              className="h-10 rounded-xl"
              onClick={onCloseModal}
            />
            <TextButton
              title="Continue"
              textColor="text-white"
              backgroundColor="bg-primary"
              className="h-10 rounded-xl"
              onClick={goToSummary}
            />
          </div>
        </div>
      )}

      {currentStep === "summary" && (
        <ExchangeSummary
          onBack={() => setCurrentStep("form")}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          exchangeRate={exchangeRate}
          onContinue={goToSuccess}
        />
      )}

      {currentStep === "success" && (
        <ExchangeSuccess
          onDone={handleDone}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          exchangeRate={exchangeRate}
        />
      )}
    </Modal>
  );
};

export default CryptoExchangeModal;
