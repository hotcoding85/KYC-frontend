import React, { useState, useEffect } from "react";
import Back from "@/Icons/Back";
import Button from "@/components/Elements/Button/Button";
import CryptoDropdown from "@/components/Otc/CryptoDropDown";

const ExchangeComponent = () => {
    const currencies = [
        { name: 'BTC', logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png' },
        { name: 'USD', logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png' },
    ];
    const [selectedCurrency, setSelectedCurrency] = useState('BTC');
    const [selectedSCurrency, setSelectedSCurrency] = useState('USD');
    const [isOpen, setIsOpen] = useState(false);
    const [isSOpen, setIsSOpen] = useState(false);
    const handleCurrencySelect = (currency) => {
        setSelectedCurrency(currency);
        setIsOpen(false);
    };
    const handleCurrencySSelect = (currency) => {
        setSelectedSCurrency(currency);
        setIsSOpen(false);
    };

    return (
        <div className="items-center justify-center w-full p-4 bg-white border rounded-2xl !ml-0">
            <p className="pb-2 text-sm font-semibold">Exchange</p>
            <div className="px-4 py-2 mb-4 space-y-4 border border-primary50 rounded-xl">
                <div className="flex flex-row justify-between">
                    <label className="block mb-2 text-sm text-gray-700">From</label>
                    <p className="text-sm text-gray-500">Balance: 700.00</p>
                </div>
                <div className="flex flex-row items-center justify-between space-x-2">
                    <input
                        type="number"
                        placeholder="0.00"
                        className="w-full text-lg font-semibold text-gray-800 bg-transparent border-none focus:outline-none"
                    />
                    <CryptoDropdown
                        width={"w-40"}
                        currencies={currencies} selectedCurrency={selectedCurrency} isOpen={isOpen} setIsOpen={setIsOpen} handleCurrencySelect={handleCurrencySelect} />
                </div>
            </div>
            <div className="px-4 py-1 mb-4 space-y-4 border border-primary50 rounded-xl">
                <div className="flex flex-row justify-between">
                    <label className="block mb-2 text-sm text-gray-700">To</label>
                    <p className="text-sm text-gray-500">Balance: 700.00</p>
                </div>
                <div className="flex flex-row items-center justify-between space-x-2">
                    <input
                        type="number"
                        placeholder="0.00"
                        className="w-full text-lg font-semibold text-gray-800 bg-transparent border-none focus:outline-none"
                    />
                    <CryptoDropdown
                        width={"w-40"}
                        currencies={currencies} selectedCurrency={selectedSCurrency} isOpen={isSOpen} setIsOpen={setIsSOpen} handleCurrencySelect={handleCurrencySSelect} />
                </div>
            </div>
            <div className="flex items-center justify-between mt-4 text-textSecondary">
                <p className="block mb-2 text-sm text-textSecondary">Rate</p>
                <p className="text-sm font-semibold text-textSecondary">1 USD = 1.50 AUD</p>
            </div>
            <div className="mt-4">
                <Button title={"Exchange Now"} className={"w-full p-4 bg-primary text-white"} />
            </div>
        </div>
    );
};

export default ExchangeComponent;
