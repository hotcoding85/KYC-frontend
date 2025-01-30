import React from "react";

const accounts = [
  {
    id: 1,
    name: "Alexa Doe John - Personal",
    type: "personal",
  },
  {
    id: 2,
    name: "Acmp Solutions Tec - Business",
    type: "business",
  },
  {
    id: 3,
    name: "World Advanced Inc - Business",
    type: "business",
  },
];

const AccountDropdown = ({ closeDropdown, selectedAccount, setSelectedAccount, accounts }) => {
  return (
    <div className="absolute bg-white border border-gray-300 shadow-lg w-60 md:w-64 md:right-20 right-40 rounded-xl top-14">
      <div className="py-2 px-[2px]">
        {accounts.map((account) => (
          <button
            key={account.id}
            onClick={() => {
              setSelectedAccount(account.name);
              closeDropdown();
            }}
            className={`w-full px-4 py-3 text-left transition-colors hover:bg-gray-50 text-xs text-textBlack ${
              selectedAccount === account.name ? "font-medium" : ""
            }`}
          >
            {account.name} - {account.type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AccountDropdown;
