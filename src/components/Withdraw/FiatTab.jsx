import React, { useState, useEffect } from "react";
import Button from "@/components/Elements/Button/Button";
import WhiteCheck from "@/Icons/WhiteCheck";
import DropDown from "../Elements/DropDown/DropDown";
import CryptoDropdown from "../Otc/CryptoDropDown";

export default function FiatTab({ setStep }) {
  const [currency, setCurrency] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("BTC");
  const [isOpen, setIsOpen] = useState(false);

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setIsOpen(false);
  };
  const handleCurrencyChange = (e) => setCurrency(e.target.value);
  const handleRecipientChange = (e) => setRecipient(e.target.value);
  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleNoteChange = (e) => setNote(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log({ currency, recipient, amount, note });
  };

  const currencies = [
    { name: "BTC", logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
    {
      name: "USD",
      logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    },
  ];
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <label htmlFor="currency" className="block mb-2 text-sm text-gray-700">
          Currency
        </label>
        <CryptoDropdown
          width={"w-full"}
          currencies={currencies}
          selectedCurrency={selectedCurrency}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleCurrencySelect={handleCurrencySelect}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="recipient" className="block mb-2 text-sm text-gray-700">
          Amount
        </label>
        <div className="relative">
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Minimal 0.000001"
            min="0.000001"
            step="0.000001"
            className="w-full px-3 py-3 h-10 border rounded-lg border-primary50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center px-3"
          >
            Max
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="note" className="block mb-2 text-sm text-gray-700">
          Note (optional)
        </label>
        <textarea
          id="note"
          value={note}
          onChange={handleNoteChange}
          placeholder="Leave a note"
          className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <Button
        title="Continue to add beneficiary"
        className={"bg-primary w-full h-10 text-white"}
        onClick={() => setStep(2)}
      />
    </div>
  );
}
