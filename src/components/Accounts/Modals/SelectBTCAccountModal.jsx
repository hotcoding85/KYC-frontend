import React, { useState } from "react";
import Modal from "@/components/Elements/Modal/Modal";
import Search from "@/Icons/Search";
import Dollar from "@/Icons/imageicon/Dollar";

const SelectBTCAccountModal = ({ isModalOpen, closeModal, setSelectedAccount }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const accounts = [
    {
      name: "US Savings",
      currency: "USD",
      icon: <Dollar className="w-6 h-6" />,
      balance: "$125.00 USD",
      amountInUSD: "$125.00 USD",
    },
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAccounts = accounts.filter((account) => account.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} title="Select BTC Account" size="lg">
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

        {/* List of Accounts */}
        <div className="space-y-2">
          {filteredAccounts.map((account, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedAccount(account.name);
                closeModal();
              }}
              className="flex items-center justify-between w-full py-4 space-x-2 border-b cursor-pointer"
            >
              <div className="flex flex-row items-center space-x-2">
                {account.icon}
                <div className="flex flex-col space-y-1">
                  <span className="text-xs font-semibold">{account.name}</span>
                  <span className="text-[11px] text-textSecondary">{account.currency}</span>
                </div>
              </div>
              <div className="flex flex-col space-y-1 text-right">
                <p className="text-xs font-semibold">{account.balance}</p>
                <p className="text-xs">{account.amountInUSD}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Account Option */}
        <div
          onClick={() => {
            // Handle adding a new account
          }}
          className="flex items-center justify-start w-full mt-5 space-x-2 cursor-pointer"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 22.5C6.201 22.5 1.5 17.7975 1.5 12C1.5 6.2025 6.201 1.5 12 1.5C17.799 1.5 22.5 6.2025 22.5 12C22.5 17.7975 17.799 22.5 12 22.5ZM12 0C5.37225 0 0 5.37 0 12C0 18.63 5.37225 24 12 24C18.6278 24 24 18.63 24 12C24 5.37 18.6278 0 12 0ZM16.5 11.25H12.75V7.5C12.75 7.0875 12.4148 6.75 12 6.75C11.5852 6.75 11.25 7.0875 11.25 7.5V11.25H7.5C7.08525 11.25 6.75 11.5875 6.75 12C6.75 12.4125 7.08525 12.75 7.5 12.75H11.25V16.5C11.25 16.9125 11.5852 17.25 12 17.25C12.4148 17.25 12.75 16.9125 12.75 16.5V12.75H16.5C16.9147 12.75 17.25 12.4125 17.25 12C17.25 11.5875 16.9147 11.25 16.5 11.25Z"
              fill="#14151A"
            />
          </svg>

          <span className="text-xs font-semibold">Add new BTC account</span>
        </div>
      </div>
    </Modal>
  );
};

export default SelectBTCAccountModal;
