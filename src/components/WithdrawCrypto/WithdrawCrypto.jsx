import React, { useState } from "react";
import Search from "@/Icons/Search";
import Button from "../Elements/Button/Button";
import Back from "@/Icons/Back";
import SelectCurrencyModal from "../Accounts/Modals/SelectCurrencyModal";
import SelectBTCAccountModal from "../Accounts/Modals/SelectBTCAccountModal";
import SelectBeneficiaryModal from "../Accounts/Modals/SelectBeneficiary";
import Alice from "@/Icons/imageicon/Alice";
import USDT from "@/Icons/imageicon/USDT";
import LTC from "@/Icons/imageicon/LTC";
import Btc from "@/Icons/CrytpoAssets/Btc";
import Dollar from "@/Icons/imageicon/Dollar";

const ArrowIcon = () => {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.99952 3.78263L8.29952 0.482635L9.24219 1.4253L4.99952 5.66797L0.756853 1.4253L1.69952 0.482634L4.99952 3.78263Z"
        fill="#4D4D4D"
      />
    </svg>
  );
};

const WithdrawCrypto = ({ onNext, onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isBeneficiaryModalOpen, setIsBeneficiaryModalOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("BTC");
  const [selectedAccount, setSelectedAccount] = useState("USD");
  const [selectedBeneficiary, setSelectedBeneficiary] = useState("Charlie Brown");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const currencies = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      value: "btc",
      icon: <Btc className="w-4 h-4" />,
      amount: "0.0004232 BTC",
      amountInUSD: "$52.00 USD",
      totalInUSD: "$68,632.00 USD",
    },
    {
      name: "Tether USD",
      symbol: "USDT",
      value: "usdt_ethereum",
      icon: <USDT className="w-4 h-4" />,
      network: "Ethereum",
      amount: "130.00 USDT",
      amountInUSD: "$130.00 USD",
      totalInUSD: "$1.00 USD",
    },
    {
      name: "Litecoin",
      symbol: "LTC",
      value: "ltc",
      icon: <LTC className="w-4 h-4" />,
      amount: "12.203 LTC",
      amountInUSD: "$1,040.04 USD",
      totalInUSD: "$75.33 USD",
    },
  ];

  const currency = currencies.find((currency) => currency.symbol === selectedCurrency);

  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <div className="items-center justify-center w-full bg-white border md:w-[500px] rounded-2xl">
        <div className="flex-col p-4 ">
          <div className="flex items-center mb-4 space-x-2">
            <button onClick={onBack}>
              <Back />
            </button>
            <h1 className="text-sm font-semibold">Withdraw Crypto</h1>
          </div>

          {/* Beneficiary */}
          <div className="mb-4">
            <label className="block mb-1 text-xs font-normal text-gray-700">Beneficiary</label>
            <div
              className="flex items-center justify-between h-8 py-1 px-2 border rounded-[10px]"
              onClick={() => setIsBeneficiaryModalOpen(true)}
            >
              <div className="flex items-center space-x-1">
                <Alice className="w-4 h-4 rounded-full" />
                <p className="text-xs font-normal text-gray-900">Charlie Brown</p>
              </div>
              <ArrowIcon />
            </div>
          </div>

          {/* Currency */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <label className="block mb-1 text-xs font-normal text-gray-700">Currency</label>
              <p className="text-xs text-gray-500">Available: {currency.totalInUSD}</p>
            </div>
            <div className="flex items-center justify-between h-8 py-1 px-2 border rounded-[10px]" onClick={openModal}>
              <div className="flex items-center space-x-1">
                {currency.icon}
                <p className="text-xs font-normal text-gray-900">{currency.name}</p>
              </div>
              <ArrowIcon />
            </div>
          </div>

          {/* Account */}
          <div className="mb-4">
            <label className="block mb-1 text-xs font-normal text-gray-700">Account</label>
            <div
              className="flex items-center justify-between h-8 py-1 px-2 border rounded-[10px]"
              onClick={() => setIsAccountModalOpen(true)}
            >
              <div className="flex items-center space-x-1">
                <Dollar className="w-4 h-4" />
                <p className="text-xs font-normal text-gray-900">USD Savings</p>
              </div>
              <ArrowIcon />
            </div>
          </div>

          {/* Amount */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <label className="block mb-1 text-xs font-normal text-gray-700">Amount</label>
              <div className="flex items-center text-xs font-semibold text-textSecondary">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_374_21598)">
                    <path
                      d="M6.37306 0.541265C6.29494 0.619402 6.25106 0.725364 6.25106 0.835849C6.25106 0.946334 6.29494 1.0523 6.37306 1.13043L7.74514 2.50252L1.25097 2.50252C1.14047 2.50252 1.03449 2.54641 0.956346 2.62455C0.878205 2.70269 0.834307 2.80868 0.834307 2.91918C0.834307 3.02969 0.878205 3.13567 0.956346 3.21381C1.03449 3.29195 1.14047 3.33585 1.25097 3.33585L7.74514 3.33585L6.37306 4.70793C6.29716 4.78652 6.25516 4.89177 6.25611 5.00102C6.25706 5.11027 6.30088 5.21477 6.37813 5.29202C6.45539 5.36928 6.55989 5.4131 6.66914 5.41405C6.77839 5.415 6.88364 5.373 6.96222 5.2971L9.04556 3.21377C9.08436 3.17506 9.11515 3.12908 9.13615 3.07846C9.15716 3.02784 9.16797 2.97357 9.16797 2.91877C9.16797 2.86396 9.15716 2.80969 9.13615 2.75907C9.11515 2.70845 9.08436 2.66247 9.04556 2.62377L6.96222 0.540432C6.88398 0.46243 6.77795 0.418698 6.66747 0.418854C6.55698 0.41901 6.45108 0.463042 6.37306 0.541265Z"
                      fill="#14151A"
                    />
                    <path
                      d="M3.04005 4.70597L0.956718 6.78931C0.917836 6.82811 0.887095 6.87429 0.866302 6.92514C0.82417 7.02707 0.82417 7.14154 0.866302 7.24347C0.887095 7.29432 0.917836 7.3405 0.956718 7.37931L3.04005 9.46264C3.07849 9.50244 3.12447 9.53418 3.1753 9.55602C3.22614 9.57785 3.28081 9.58935 3.33614 9.58983C3.39146 9.59031 3.44633 9.57977 3.49753 9.55882C3.54874 9.53787 3.59526 9.50693 3.63438 9.4678C3.67351 9.42868 3.70444 9.38216 3.72539 9.33095C3.74635 9.27975 3.75689 9.22488 3.75641 9.16956C3.75593 9.11423 3.74443 9.05956 3.72259 9.00872C3.70076 8.95789 3.66901 8.91191 3.62922 8.87347L2.25714 7.50056L8.7513 7.50056C8.86181 7.50056 8.96779 7.45666 9.04593 7.37852C9.12407 7.30038 9.16797 7.1944 9.16797 7.08389C9.16797 6.97338 9.12407 6.8674 9.04593 6.78926C8.96779 6.71112 8.86181 6.66722 8.7513 6.66722L2.25714 6.66722L3.62922 5.29514C3.70512 5.21656 3.74712 5.11131 3.74617 5.00206C3.74522 4.89281 3.7014 4.7883 3.62414 4.71105C3.54689 4.6338 3.44238 4.58998 3.33314 4.58903C3.22389 4.58808 3.11864 4.63007 3.04005 4.70597Z"
                      fill="#14151A"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_374_21598">
                      <rect width="10" height="10" fill="white" transform="matrix(-1 0 0 -1 10 10)" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="ml-1">USD</span>
              </div>
            </div>
            <div className="flex items-center h-8 py-1 px-2 border rounded-[10px]">
              <input
                type="number"
                placeholder="Minimal 0.000001"
                className="w-full text-xs font-normal text-gray-900 border-none focus:outline-none"
              />
              <p className="text-xs font-semibold text-textSecondary">Max</p>
            </div>
          </div>

          {/* Note (optional) */}
          <div className="mb-4">
            <label className="block mb-2 text-xs font-normal text-gray-700">Note (optional)</label>
            <input
              type="text"
              placeholder="Leave a note"
              className="w-full h-8 px-2 py-1 text-xs font-normal border rounded-[10px] focus:outline-none"
            />
          </div>

          {/* Send Button */}
          <Button title={"Continue"} className={"w-full p-4 h-8 bg-primary text-white"} onClick={onNext} />
        </div>
      </div>

      {/* Select Currency Modal */}
      <SelectCurrencyModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        setSelectedCurrency={setSelectedCurrency}
      />
      <SelectBTCAccountModal
        isModalOpen={isAccountModalOpen}
        closeModal={() => setIsAccountModalOpen(false)}
        setSelectedAccount={setSelectedAccount}
      />
      <SelectBeneficiaryModal
        isModalOpen={isBeneficiaryModalOpen}
        closeModal={() => setIsBeneficiaryModalOpen(false)}
        setSelectedBeneficiary={setSelectedBeneficiary}
      />
    </div>
  );
};

export default WithdrawCrypto;
