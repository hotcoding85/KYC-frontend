"use client"
import Back from "@/Icons/Back";

import React, { useState, useEffect } from "react";
import CryptoDropdown from "@/components/Otc/CryptoDropDown";
import Container from "@/components/Container/Container";
import FiatTab from "@/components/Deposit/FiatTab";
import CryptoTab from "@/components/Deposit/CryptoTab";
import { useRouter } from "next/navigation";

export default function DepositPage() {
    const [activeTab, setActiveTab] = useState(0);
    const router = useRouter();
    const currencies = [
        { name: 'BTC', logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png' },
        { name: 'USD', logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png' },
        // Add more currencies if needed
    ];
    const [selectedCurrency, setSelectedCurrency] = useState('BTC');
    const [isOpen, setIsOpen] = useState(false);
    const tabs = [
        { name: 'Fiat', content: <FiatTab /> },
        { name: 'Crypto', content: <CryptoTab /> },
    ];

    const handleCurrencySelect = (currency) => {
        setSelectedCurrency(currency);
        setIsOpenSell(false);
    };
    return (
        <>
            <Container pageName={"Accounts"}>
                <div className="flex flex-col items-center justify-between h-screen">
                    <div className="items-center justify-center w-full bg-white border rounded-2xl sm:w-full md:w-4/6 lg:w-4/6 xl:w-4/6 2xl:w-3/6">
                        <div className="flex-col p-6">
                            <div className="flex items-center mb-4 space-x-2">
                            <div onClick={() => router.back()}>
                            <Back />
                            </div>
                            <p className="text-sm font-semibold">How much would you like to deposit?</p>
                            </div>

                            {/* Tabs Navigation */}
                            <div className="flex rounded-xl justify-between border border-primary50 p-[0.1]">
                                {tabs.map((tab, index) => (
                                    <button
                                        key={index}
                                        className={`py-2 px-4 m-1 h-10 focus:outline-none w-full  ${activeTab === index
                                            ? 'border rounded-lg bg-primary text-white'
                                            : 'text-textLight hover:text-primary'
                                            }`}
                                        onClick={() => setActiveTab(index)}
                                    >
                                        {tab.name}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div className="mt-4 rounded-lg">
                                <div>{tabs[activeTab].content}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

        </>
    )
}