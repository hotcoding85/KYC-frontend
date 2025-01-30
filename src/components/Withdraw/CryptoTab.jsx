import React, { useState, useEffect } from "react"
import Button from "@/components/Elements/Button/Button";
import WhiteCheck from "@/Icons/WhiteCheck";
import DropDown from "../Elements/DropDown/DropDown";

export default function CryptoTab() {
    const [currency, setCurrency] = useState('');
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');

    const handleCurrencyChange = (e) => setCurrency(e.target.value);
    const handleRecipientChange = (e) => setRecipient(e.target.value);
    const handleAmountChange = (e) => setAmount(e.target.value);
    const handleNoteChange = (e) => setNote(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        console.log({ currency, recipient, amount, note });
    };

    const asset = [
        { value: "1", label: "BTC" },
        { value: "2", label: "USD" },
    ];
    return (
        <div className="space-y-6">
            <div className="mb-4">
                <label htmlFor="currency" className="block text-gray-700 text-sm mb-2">Currency</label>
                <DropDown items={asset} title="Select currency" className={"h-14 p-3"} />
            </div>

            <div className="mb-4">
                <label htmlFor="recipient" className="block text-gray-700 text-sm mb-2">Recipient</label>
                <div className="relative">
                    <input
                        id="recipient"
                        type="text"
                        value={recipient}
                        onChange={handleRecipientChange}
                        placeholder="Wallet Address"
                        className="w-full px-3 py-3 border border-primary50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="button" className="absolute inset-y-0 right-0 flex items-center px-3">
                        Paste
                    </button>
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="recipient" className="block text-gray-700 text-sm mb-2">Amount</label>
                <div className="relative">
                    <input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={handleAmountChange}
                        placeholder="Minimal 0.000001"
                        min="0.000001"
                        step="0.000001"
                        className="w-full px-3 py-3 border border-primary50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="button" className="absolute inset-y-0 right-0 flex items-center px-3">
                        Max
                    </button>
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="note" className="block text-gray-700 text-sm mb-2">Note (optional)</label>
                <textarea
                    id="note"
                    value={note}
                    onChange={handleNoteChange}
                    placeholder="Leave a note"
                    className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <Button title="Send" className={"bg-primary w-full h-12 text-white"} />
        </div>
    );
}