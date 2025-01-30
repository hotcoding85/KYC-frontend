import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const walletOptions = [
  { label: "USDT", icon: "/assets/images/usdt.png" },
  { label: "BTC", icon: "/assets/images/btc.png" },
  { label: "LTC", icon: "/assets/images/ltc.png" },
];

const WalletTypeDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);

  const handleSelect = (wallet) => {
    setSelectedWallet(wallet);
    setIsOpen(false);
  };

  return (
    <div style={{ position: "relative", zIndex: 100 }} className="w-full mt-1 ">
      <button
        className="flex items-center justify-between w-full px-3 py-2.5 text-left border rounded-xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm text-gray-600">
          {selectedWallet ? (
            <div className="flex items-center space-x-2 text-xs text-textBlack">
              <img src={selectedWallet.icon} alt="" className="w-5 h-5" />
              <span>{selectedWallet.label}</span>
            </div>
          ) : (
            <span className="text-xs text-textBlack">Select Wallet Type</span>
          )}
        </span>
        <FaChevronDown className="text-gray-500" />
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border shadow-lg rounded-xl max-h-60">
          {walletOptions.map((wallet, index) => (
            <li
              key={index}
              className="flex items-center p-3 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(wallet)}
            >
              <img
                src={wallet.icon}
                alt={wallet.label}
                className="w-5 h-5 mr-3"
              />
              <span className="text-xs font-medium text-gray-700">
                {wallet.label}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WalletTypeDropdown;
