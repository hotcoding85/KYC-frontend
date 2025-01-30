import React, { useState, useEffect } from "react";
import Search from "@/Icons/Search";
import Button from "../Elements/Button/Button";
import Back from "@/Icons/Back";
import SelectCurrencyModal from "../Accounts/Modals/SelectCurrencyModal";
import SelectAccountModal from "../Accounts/Modals/SelectAccountModal";
import SelectBeneficiaryModal from "../Accounts/Modals/SelectBeneficiary";
import USDT from "@/Icons/imageicon/USDT";
import LTC from "@/Icons/imageicon/LTC";
import CurrencyDropdown from "../Elements/DropDown/CurrencyDropdown";
import S3Image from "../Elements/S3Image/S3Image";
import { FaExchangeAlt } from "react-icons/fa";

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

const WithdrawFiat = ({ account, beneficiary, onNext, onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isBeneficiaryModalOpen, setIsBeneficiaryModalOpen] = useState(false);
  const [altCurrency, setAltCurrency] = useState('USD');
  const [currency, setCurrency] = useState(account?.ticker);
  const [selectedAccount, setSelectedAccount] = useState(account);
  const [beneficiaryAccount, setBeneficiaryAccount] = useState({});
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(beneficiary);
  const [amountValidation, setAmountValidation] = useState(true);
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState('');
  // const openModal = () => setIsModalOpen(true);
  // const closeModal = () => setIsModalOpen(false);

  const changeAccount = (beneficiaryAccount) => {
   // setBeneficiaryAccount(beneficiaryAccount);
  }

  const handleChangeCurrency = () => {
    setAmount(0);
    const activeCurrency = currency;
    setCurrency(altCurrency);
    setAltCurrency(activeCurrency);
  }

  const handleMaxBalance = () => {
    if (currency == account?.ticker) {
      setAmount(account?.balance);
    } else {
      setAmount(account?.balanceUSD);
    }
  };

  const handleChangeAmount = async () => {
    if ( amount == "" ||
        parseFloat(amount) <= 0 ){
       setAmountValidation(true);
    }
    else if (
      (currency == account?.ticker &&
        parseFloat(amount) > parseFloat(account?.balance)) ||
      (currency != account?.ticker &&
        parseFloat(amount) > parseFloat(account?.balanceUSD))
    ) {
      setAmountValidation(false);
    } else {
    }
  }

  

  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <div className="items-center justify-center w-full bg-white border md:w-[500px] rounded-2xl">
        <div className="flex-col p-4 ">
          <div className="flex items-center mb-4 space-x-2">
            <button onClick={onBack}>
              <Back />
            </button>
            <h1 className="text-sm font-semibold">Withdraw Fiat</h1>
          </div>

          {/* Beneficiary */}
          <div className="mb-4">
            <label className="block mb-1 text-xs font-normal text-gray-700">
              Beneficiary
            </label>
            <div
              className="flex items-center justify-between h-8 py-1 px-3 border rounded-[10px]"
              onClick={() => setIsBeneficiaryModalOpen(true)}
            >
              <div className="flex items-center space-x-1">
                <S3Image
                  s3Url={selectedBeneficiary?.avatar}
                  className="w-4 h-4 mr-2"
                ></S3Image>
                <p className="text-xs font-normal text-gray-900">
                  {selectedBeneficiary?.full_name}
                </p>
              </div>
              <ArrowIcon />
            </div>
          </div>

          {/* Currency */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <label className="block mb-1 text-xs font-normal text-gray-700">
                Currency
              </label>
              <p className="text-xs text-gray-500">
                Available: {account?.balance} {account?.ticker}
              </p>
            </div>
            <CurrencyDropdown
              type={account?.assetType}
              selectedItem={selectedAccount}
              onSelect={changeAccount}
            ></CurrencyDropdown>
          </div>

          {/* Account */}
          <div className="mb-4">
            <label className="block mb-1 text-xs font-normal text-gray-700">
              Account
            </label>
            <div
              className="flex items-center justify-between h-8 py-1 px-3 border rounded-[10px]"
              onClick={() => setIsAccountModalOpen(true)}
            >
              <div className="flex items-center space-x-1">
                <S3Image
                  s3Url={beneficiaryAccount?.asset?.icon}
                  className="w-4 h-4 mr-2"
                ></S3Image>
                <p className="text-xs font-normal text-gray-900">
                  {beneficiaryAccount.account_number}
                </p>
              </div>
              <ArrowIcon />
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-normal text-textBlack">Amount</p>
              <p
                className="flex items-center gap-1 font-semibold text-xs text-[#272727]"
                onClick={handleChangeCurrency}
              >
                {currency}
                <FaExchangeAlt></FaExchangeAlt>
                <span className="text-[#BABABA]">{altCurrency}</span>
              </p>
            </div>
            <div className="flex items-center justify-between h-8 py-1 px-3 border rounded-[10px]">
              <input
                type="text"
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9.]/g, ""); // Allow numbers and one decimal point
                  const decimalCheck = numericValue.split("."); // Check for multiple decimals
                  if (decimalCheck.length <= 2) {
                    // If there's only one or no decimal point
                    setAmount(numericValue);
                  }
                }}
                onKeyUp={() => handleChangeAmount()}
                value={amount}
                placeholder="Amount"
                className={`w-full text-xs bg-white text-textBlack active:border-none hover:border-none focus-visible:outline-none ${
                  amountValidation === false
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              <p
                className="font-semibold text-xs text-[#858C95]"
                onClick={handleMaxBalance}
              >
                Max
              </p>
            </div>
            <span
              className={`text-alert text-sm ${
                amountValidation === false ? "flex" : "hidden"
              }`}
            >
              Your account does not have enough balance to make this
              transaction.
            </span>
          </div>
          {/**@note*/}
          <div className="flex flex-col gap-2 mb-4">
            <p className="text-xs font-normal text-textBlack">
              Note (optional)
            </p>
            <div className="flex items-center justify-between h-8 py-1 px-3 border rounded-[10px]">
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Leave a note"
                className="w-full text-xs bg-white text-textBlack active:border-none hover:border-none focus-visible:outline-none"
              />
            </div>
          </div>

          {/* Send Button */}
          <Button
            title={"Continue"}
            className={"w-full p-4 h-8 bg-primary text-white"}
            onClick={() => onNext(beneficiary, beneficiaryAccount, amount, note)}
          />
        </div>
      </div>

      {/* Select Currency Modal */}
      {/* <SelectCurrencyModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        setSelectedCurrency={setSelectedCurrency}
      /> */}
      <SelectAccountModal
        isModalOpen={isAccountModalOpen}
        asset={account.asset}
        beneficiary={beneficiary}
        closeModal={() => setIsAccountModalOpen(false)}
        setSelectedAccount={(beneficiaryAccount) =>
          setBeneficiaryAccount(beneficiaryAccount)
        }
      />
      <SelectBeneficiaryModal
        isModalOpen={isBeneficiaryModalOpen}
        closeModal={() => setIsBeneficiaryModalOpen(false)}
        setSelectedBeneficiary={() => setSelectedBeneficiary(beneficiary)}
      />
    </div>
  );
};

export default WithdrawFiat;
