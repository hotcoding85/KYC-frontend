import React, { useState, useEffect } from "react";
import Button from "@/components/Elements/Button/Button";
import WhiteCheck from "@/Icons/WhiteCheck";
import DropDown from "../Elements/DropDown/DropDown";
import CryptoDropdown from "../Otc/CryptoDropDown";
import Warning from "@/Icons/Warning";
import SelectCurrencyModal from "../Accounts/Modals/SelectCurrencyModal";
import Btc from "@/Icons/imageicon/Btc";
import USDT from "@/Icons/imageicon/USDT";
import Ltc from "@/Icons/CrytpoAssets/Ltc";
import Placeholder from "@/Icons/imageicon/Placeholder";
import CQR from "@/Icons/imageicon/CQR";
import QrCode from "../Elements/QRCode/QRCode";
import CurrencyDropdown from "../Elements/DropDown/CurrencyDropdown";
import { ASSET_TYPE } from "@/shared/enums";

export default function CryptoTab({user, account}) {
  const currencies = [
    { name: "BTC", logo: <Btc className="w-4 h-4" /> },
    { name: "USDT", logo: <USDT className="w-4 h-4" /> },
    { name: "LTC", logo: <Ltc className="w-4 h-4" /> },
  ];
  const [selectedCurrency, setSelectedCurrency] = useState("BTC");
  const [isOpen, setIsOpen] = useState(false);
  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
  };
  return (
    <>
      <div className="space-y-6">
        <div className="items-center space-y-4">
          <div className="w-full">
            <CurrencyDropdown
              selectedItem={{
                name: account?.asset,
                icon: account?.icon,
              }}
              type={ASSET_TYPE.TOKEN}
            ></CurrencyDropdown>
            {/* <button
              type="button"
              className={
                "inline-flex justify-between items-center w-full text-xs border border-primary50 rounded-[10px] px-2 py-1 h-8"
              }
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex items-center space-x-2">
                {currencies.find((c) => c.name === selectedCurrency).logo}
                <span>{selectedCurrency}</span>
              </div>
              <svg
                className={`w-4 h-4 transform transition-transform ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button> */}
          </div>
          <div className="flex items-center justify-center p-5 text-center border border-primary50 rounded-xl">
            <QrCode data={account?.address} className="size-40" />
          </div>
          <div className="flex flex-wrap items-center justify-between p-4 space-y-1 border border-primary50 rounded-xl md:space-y-0">
            <div className="flex flex-col space-y-1">
              <p className="text-xs font-semibold">Deposit address</p>
              <p className="text-[11px] break-all text-textSecondary">
                {account?.address}
              </p>
            </div>
            <Button title="Copy" className={"bg-white w-20 h-8 text-primary"} />
          </div>
          <div className="flex items-start justify-between p-3 space-x-4 border border-primary50 rounded-xl">
            <Warning />
            <p className="text-[11px] text-textSecondary">
              This address can only receive {account?.ticker} from {" "}
              {account?.network?.name || account?.asset} network. Do not send{" "}
              {account?.ticker} from other networks, or it may result in a loss
              of funds.
            </p>
          </div>
        </div>
      </div>
      <SelectCurrencyModal
        isModalOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        setSelectedCurrency={setSelectedCurrency}
      />
    </>
  );
}
