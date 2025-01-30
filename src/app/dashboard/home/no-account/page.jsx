"use client";
import Container from "@/components/Container/Container";
import Button, { TextButton } from "@/components/Elements/Button/Button";
import CryptoDropdown from "@/components/Otc/CryptoDropDown";
import Add from "@/Icons/Add";
import ChevronRight from "@/Icons/ChevronRight";
import Close from "@/Icons/Close";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const exploreMoreItems = [
  {
    heading: "Send & receive crypto",
    description: "Verify your ID",
  },
  {
    heading: "Buy Crypto",
    description: "Start your investment journey",
  },
  {
    heading: "Secure your Account",
    description: "Enhance security with 2FA ",
  },
  {
    heading: "Learn about crypto",
    description: "Explore more about crypto",
  },
];

const currencies = [
  { name: "BTC", logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
  {
    name: "USD",
    logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
  },
  // Add more currencies if needed
];

const NoAccountPage = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("BTC");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrencySell, setSelectedCurrencySell] = useState("USD");
  const [isOpenSell, setIsOpenSell] = useState(false);

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setIsOpen(false);
  };
  const handleCurrencySelectSell = (currency) => {
    setSelectedCurrencySell(currency);
    setIsOpenSell(false);
  };
  return (
    <Container>
      <div className="w-full h-max grid grid-cols-12 gap-4">
        {/* left side */}
        <div className="col-span-12  md:col-span-8 w-full h-max flex flex-col gap-2">
          {/* welcome to dashboard card */}
          <div className="p-4 bg-white border rounded-2xl border-primary50 flex flex-row justify-between">
            {/* left side */}
            <div className="w-max h-max flex flex-row items-center gap-4">
              {/* black box */}
              <div className="w-[45px] h-[45px] bg-black rounded-sm" />
              {/* text on the right of black box */}
              <div className="flex flex-col gap-[6px]">
                <p className="text-sm font-semibold text-textBlack">
                  Welcome to your dashboard!
                </p>
                <p className="text-xs text-textSecondary ">
                  Let’s get started by settings up your first account or card
                </p>
              </div>
            </div>
            {/* right side close icon */}
            <div>
              <button className="text-gray-500 hover:text-gray-700 h-[24px] w-[24px]">
                <Close />
              </button>
            </div>
          </div>
          {/* All accounts Card */}
          <div className="p-4 bg-white border rounded-2xl border-primary50 flex flex-row justify-between">
            {/* left side */}
            <div className="w-max h-max flex flex-row items-center gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold text-textBlack">All Accounts</p>
                <p className="text-xs text-textBlack ">
                  You don’t have any accounts yet.
                </p>
              </div>
            </div>
            {/* right side close icon */}
            <div>
              <TextButton
                className="flex flex-row items-center gap-2 bg-white !text-textBlack border border-primary50 "
                title="New Wallet"
                icon={<Add />}
              />
            </div>
          </div>
          {/* All Cards card */}
          <div className="p-4 bg-white border rounded-2xl border-primary50 flex flex-row justify-between">
            {/* left side */}
            <div className="w-max h-max flex flex-row items-center gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold text-textBlack">All Cards</p>
                <p className="text-xs text-textBlack ">
                  You don’t have any accounts yet.
                </p>
              </div>
            </div>
            {/* right side close icon */}
            <div>
              <TextButton
                className="flex flex-row items-center gap-2 bg-white !text-textBlack border border-primary50 "
                title="New Card"
                icon={<Add />}
              />
            </div>
          </div>

          {/* No recent Transactions Card */}
          <div className="p-4 bg-white border rounded-2xl border-primary50 flex flex-row justify-between">
            {/* left side */}
            <div className="w-max h-max flex flex-row items-center gap-4">
              {/* black box */}
              <div className="w-[45px] h-[45px] bg-black rounded-sm" />
              {/* text on the right of black box */}
              <div className="flex flex-col gap-[6px]">
                <p className="text-sm font-semibold text-textBlack">
                  No Recent Transactions
                </p>
                <p className="text-xs text-textSecondary ">
                  Start exploring and make your first purchase or transfer to
                  see your recent activity here!
                </p>
              </div>
            </div>
            {/* right side close icon */}
            <div>
              <TextButton className="!px-4" title="Get Started" />
            </div>
          </div>
        </div>
        {/* right side */}
        <div className=" col-span-12 md:col-span-4 w-full h-max flex flex-col gap-4">
          {/* explore more section */}
          <div className="p-4 bg-white border rounded-2xl border-primary50 flex flex-col w-full">
            <p className="text-sm font-semibold text-textBlack">Explore More</p>
            <p className="text-xs text-textSecondary ">
              Check out a few things you can do right away.
            </p>

            <div className="flex flex-col w-full gap-2 mt-4">
              {exploreMoreItems.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-row items-center justify-between w-full"
                  >
                    {/* left side */}
                    <div className="flex flex-row items-center h-max w-max">
                      <div className="w-[32px] h-[32px] rounded-lg bg-lightGrey border border-textBlack" />
                      <div className="flex flex-col gap-1 ml-3">
                        <p className="text-xs font-semibold text-textBlack">
                          {item.heading}
                        </p>
                        <p className="text-xs text-textSecondary ">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    {/* right side */}
                    <div>
                      <ChevronRight className="h-[11px] w-[6px]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* exchange section */}
          <div className="p-4 bg-white border rounded-2xl border-primary50 flex flex-col w-full">
            <p className="text-sm font-semibold text-textBlack">Exchange</p>
            <div className="flex flex-col w-full gap-4 mt-4">
              <div className="h-10 w-full rounded-lg flex flex-row  items-center justify-between border border-primary50">
                <input className="w-[calc(100%-130px)] h-full  m-2 placeholder:text-textSecondary text-textSecondary text-sm placeholder:text-sm font-normal focus-visible:outline-0" />
                <CryptoDropdown
                  width={"!w-26"}
                  className="flex  justify-between items-center flex-nowrap rounded-xl bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none "
                  currencies={currencies}
                  selectedCurrency={selectedCurrency}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  handleCurrencySelect={handleCurrencySelect}
                />
              </div>
              <div className="h-10 w-full rounded-lg flex flex-row  items-center justify-between border border-primary50">
                <input className="w-[calc(100%-130px)] h-full  m-2 placeholder:text-textSecondary text-textSecondary text-sm placeholder:text-sm font-normal focus-visible:outline-0" />
                <CryptoDropdown
                  width={"!w-26"}
                  className="flex  justify-between items-center flex-nowrap rounded-xl bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none "
                  currencies={currencies}
                  selectedCurrency={selectedCurrencySell}
                  isOpen={isOpenSell}
                  setIsOpen={setIsOpenSell}
                  handleCurrencySelect={handleCurrencySelectSell}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default NoAccountPage;
