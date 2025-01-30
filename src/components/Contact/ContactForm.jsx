import React from "react";
import InfoSection from "../Elements/InfoSection";
import WalletTypeDropdown from "../Elements/DropDown/WalletTypeDropdown";

const ContactForm = ({ formType, onCancel, onAdd }) => {
  return (
    <div>
      <p className="text-xs text-[#5F5F6F]">
        You can add a beneficiary to easily send them assets without a fee.
        Please complete the form below to add a beneficiary:
      </p>

      {formType === "username" && (
        <div className="mt-4 space-y-4">
          <label className="block">
            <span className="text-sm font-semibold text-textBlack">Name</span>
            <input
              type="text"
              placeholder="John Wick Bitcoin"
              className="block w-full p-3 mt-1 text-xs border rounded-xl"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-textBlack">
              Username
            </span>
            <input
              type="text"
              placeholder="johnwick123"
              className="block w-full p-3 mt-1 text-xs border rounded-xl"
            />
          </label>
        </div>
      )}

      {formType === "wallet" && (
        <div className="flex flex-col gap-4 mt-2">
          <label className="block">
            <span className="text-sm font-semibold text-textBlack">Name</span>
            <input
              type="text"
              placeholder="John Wick Bitcoin"
              className="block w-full p-3 mt-1 text-xs border rounded-xl"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-gray-700">
              Wallet Address
            </span>
            <input
              type="text"
              placeholder="Enter or paste wallet address"
              className="block w-full p-3 mt-1 text-xs border rounded-xl"
            />
          </label>
          <label className="block">
            <span className="mb-2 text-sm font-semibold text-gray-700">
              Wallet Type
            </span>
            <WalletTypeDropdown />
          </label>
        </div>
      )}

      <div className="flex justify-end gap-2 mt-4 ">
        <button
          className="px-6 py-2.5 w-[114px] text-xs text-gray-500 border border-primary50 rounded-xl"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button className="px-5 py-2.5 w-[114px] text-xs text-white bg-black rounded-xl">
          Add Contact
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
