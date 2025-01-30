import React, { useState } from 'react';
import Button from "../Elements/Button/Button";
import Modal from "../Modal/Modal";
import Usdt from '@/Icons/CrytpoAssets/Usdt';
import Usd from '@/Icons/CrytpoAssets/Usd';
import Btc from '@/Icons/CrytpoAssets/Btc';
import Eth from '@/Icons/CrytpoAssets/Eth';
import Ltc from '@/Icons/CrytpoAssets/Ltc';
import Bnb from '@/Icons/CrytpoAssets/Bnb';
import Ada from '@/Icons/CrytpoAssets/Ada';
import Xrp from '@/Icons/CrytpoAssets/Xrp';
import Sar from '@/Icons/CrytpoAssets/Sar';
///
import Krw from '@/Icons/CrytpoAssets/Krw';

const FiltersModal = ({ isModalOpen, closeModal }) => {

    const [transactionType, setTransactionType] = useState(null);
    const [amountRange, setAmountRange] = useState(null);
    const [chooseDate, setDate] = useState(null);
    const [assetType, setAssetType] = useState(null);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [startDate, setStartDate] = useState('1994-09-10');
    const [endDate, setEndDate] = useState('1994-09-10');

    const transactionTypes = ['Sent', 'Received', 'Exchanged', 'NFT Purchases'];
    const amounts = ['Under $10K', '$10K - 50K', '$50K - 100K', '$100K - 500K', 'Over 500K'];
    const dates = ['Last week', 'Last Month', 'Last 3 Months', 'Last Year', 'Custom Date'];

    const [selectedTab, setSelectedTab] = useState('Fiat');
    const assets = {
        Crypto: [
            { name: 'USDT', symbol: 'USDT', img: <Usdt /> },
            { name: 'BTC', symbol: 'BTC', img: <Btc /> },
            { name: 'ETH', symbol: 'ETH', img: <Eth /> },
            { name: 'LTC', symbol: 'LTC', img: <Ltc /> },
            { name: 'BNB', symbol: 'BNB', img: <Bnb /> },
            { name: 'ADA', symbol: 'ADA', img: <Ada /> },
            { name: 'XRP', symbol: 'XRP', img: <Xrp /> },
        ],
        Fiat: [
            { name: 'USD', symbol: 'USD', img: <Usd /> },
            { name: 'SAR', symbol: 'SAR', img: <Sar /> },
            { name: 'KRW', symbol: 'KRW', img: <Krw /> },
        ],
    };

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title="Filters"
                size="w-2/4"
            >
                {/* Modal Body */}
                <div className="w-full mx-auto  p-6">

                    {/* Transaction Type */}
                    <div className="">
                        <h3 className="text-sm mb-2">Transaction type</h3>
                        <div className="flex space-x-4">
                            {transactionTypes.map((type) => (
                                <button
                                    key={type}
                                    className={`py-2 px-4 text-sm rounded-lg text-primary border ${transactionType === type ? ' border-primary' : 'border-primary50 '
                                        }`}
                                    onClick={() => setTransactionType(type)}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                    <hr className="my-4"></hr>
                    {/* Amount */}
                    <div className="">
                        <h3 className="text-sm mb-2">Amount</h3>
                        <div className="flex space-x-4">
                            {amounts.map((amount) => (
                                <button
                                    key={amount}
                                    className={`py-2 px-4 text-sm rounded-lg text-primary border ${amountRange === amount ? ' border-primary' : 'border-primary50 '
                                        }`}
                                    onClick={() => setAmountRange(amount)}
                                >
                                    {amount}
                                </button>
                            ))}
                        </div>
                    </div>
                    <hr className="my-4"></hr>
                    {/* Asset Type */}
                    <div className="">
                        <h3 className="text-sm mb-2">Asset</h3>
                        {/* Tabs */}
                        <div className="flex space-x-4 mb-4">
                            <button
                                className={`py-2 px-4 rounded-lg text-sm border ${selectedTab === 'Fiat' ? 'border-primary' : 'bg-white border'}`}
                                onClick={() => setSelectedTab('Fiat')}
                            >
                                Fiat
                            </button>
                            <button
                                className={`py-2 px-4 rounded-lg text-sm border ${selectedTab === 'Crypto' ? 'border-primary' : 'bg-white border'}`}
                                onClick={() => setSelectedTab('Crypto')}
                            >
                                Crypto
                            </button>
                        </div>
                        {/* Asset Buttons */}
                        <div className="grid grid-cols-6 gap-4">
                            {assets[selectedTab].map((asset) => (
                                <button
                                    key={asset.symbol}
                                    className={`border py-2 px-4 rounded-lg flex items-center text-sm justify-center ${asset.symbol === assetType ? 'border-primary' : 'border-gray-300'
                                        }`}
                                    onClick={() => setAssetType(asset.symbol)}
                                >
                                    <span className="flex flex-row items-center space-x-2">{asset.img}
                                        <p>{asset.symbol}</p>
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <hr className="my-4"></hr>
                    {/* Date Picker */}
                    <div className="">
                        <h3 className="text-sm mb-2">Date</h3>
                        <div className="flex space-x-4">
                            {dates.map((date) => (
                                <button
                                    key={date}
                                    className={`py-2 px-4 text-sm rounded-lg text-primary border ${chooseDate === date ? ' border-primary' : 'border-primary50 '
                                        }`}
                                    onClick={() => setDate(date)}
                                >
                                    {date}
                                </button>
                            ))}
                        </div>
                        {"Custom Date" == chooseDate && (
                            <div className="mt-4 flex space-x-4">
                                <div className="w-1/2">
                                    <h3 className="text-xs mb-2">Start date</h3>
                                    <input
                                        type="date"
                                        className="border rounded-lg p-2 w-full"
                                        value={startDate || ''}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        placeholder="Start Date"
                                    />
                                </div>
                                <div className="w-1/2">
                                    <h3 className="text-xs mb-2">End date</h3>
                                    <input
                                        type="date"
                                        className="border rounded-lg p-2 w-full"
                                        value={endDate || ''}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        placeholder="End Date"
                                    />
                                </div>


                            </div>
                        )}
                    </div>
                </div>
                {/* Modal Footer */}
                <div className="flex justify-between p-4 border-t space-x-4">
                    <button
                        className="  text-textBlack rounded-lg text-sm"
                        onClick={() => {
                            // Reset all states to null
                            setTransactionType(null);
                            setAmountRange(null);
                            setAssetType(null);
                            setSelectedAsset(null);
                            setStartDate(null);
                            setEndDate(null);
                            setDate(null);
                        }}
                    >
                        Clear all
                    </button>
                    <div className="space-x-4">
                        <Button title="Cancel" className={"bg-white text-primary"} onClick={closeModal} />
                        <Button title="Apply" className={"bg-black text-white"} />
                    </div>
                </div>
            </Modal >
        </>
    )
}
export default FiltersModal;