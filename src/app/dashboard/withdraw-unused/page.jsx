"use client";
import Back from "@/Icons/Back";

import React, { useState, useEffect } from "react";

import Container from "@/components/Container/Container";
import FiatTab from "@/components/Withdraw/FiatTab";
import CryptoTab from "@/components/Withdraw/CryptoTab";
import ChooseBeneficiary from "@/components/WithdrawCrypto/ChooseBeneficiary";
import { useRouter } from "next/navigation";

const WithdrawTabs = ({ setStep }) => {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();

  const tabs = [
    { name: "Fiat", content: <FiatTab setStep={setStep} /> },
    { name: "Crypto", content: <CryptoTab /> },
  ];
  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <div className="items-center justify-center w-3/6 bg-white border rounded-2xl">
        <div className="flex-col p-6 ">
          <div onClick={() => router.back()}>
            <Back />
          </div>
          <p className="py-2 text-2xl font-bold">How much would you like to withdraw?</p>
          <div className="flex rounded-xl justify-between border border-primary50 p[0.1]">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`py-2 px-4 m-1 focus:outline-none w-full h-10  ${
                  activeTab === index ? "border rounded-lg bg-primary text-white" : "text-textLight hover:text-primary"
                }`}
                onClick={() => setActiveTab(index)}
              >
                {tab.name}
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-lg">
            <div>{tabs[activeTab].content}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function WithdrawPage() {
  const [step, setStep] = useState(1);
  return (
    <Container pageName={"Accounts"}>
      {step === 1 && <WithdrawTabs setStep={setStep} />}
      {step === 2 && <ChooseBeneficiary setStep={setStep} />}
    </Container>
  );
}
