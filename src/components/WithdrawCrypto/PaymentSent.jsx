import Button from "../Elements/Button/Button";
import Back from "@/Icons/Back";
import SuccessIcon from "@/Icons/imageicon/SuccessIcon";
import React from "react";

const PaymentSent = ({ onBack }) => {
    return (
        <div className="flex flex-col items-center justify-between h-screen">
            <div className="items-center justify-center w-full bg-white border md:w-[500px] rounded-2xl">
                <div className="flex-col p-4 ">
                    <button className="mb-4" onClick={onBack}>
                        <Back />
                    </button>
                    <div className="flex flex-col items-center justify-center mb-4 space-y-1">
                        <SuccessIcon className="w-8 h-8" />
                        <h1 className="text-xs text-textSecondary">You sent</h1>
                        <p className="text-sm font-semibold text-center text-textBlack">10.00 BTC</p>
                    </div>
                    {/* Transaction Details */}
                    <div className="p-4 mb-4 space-y-2 border border-primary50 rounded-xl">
                        <div className="flex flex-col justify-between md:flex-row md:items-center text-textSecondary">
                            <p className="text-xs text-textSecondary">To</p>
                            <p className="text-xs font-normal text-primary">@adsmith1995</p>
                        </div>
                        <div className="flex flex-col justify-between mt-6 md:flex-row md:items-center text-textSecondary">
                            <p className="text-xs text-textSecondary">Amount</p>
                            <p className="text-xs font-normal text-primary">10.00 BTC</p>
                        </div>
                        <div className="flex flex-col justify-between mt-6 md:flex-row md:items-center text-textSecondary">
                            <p className="text-xs text-textSecondary">Network</p>
                            <p className="text-xs font-normal text-primary">Bitcoin</p>
                        </div>
                        <div className="flex flex-col justify-between mt-2 md:flex-row md:items-center text-textSecondary">
                            <p className="text-xs text-textSecondary">Conversion fee</p>
                            <p className="text-xs font-normal text-primary">0.0005 BTC</p>
                        </div>
                        <div className="flex flex-col justify-between mt-2 md:flex-row md:items-center text-textSecondary">
                            <p className="text-xs text-textSecondary">Note</p>
                            <p className="text-xs font-normal text-primary">funds</p>
                        </div>
                        <div className="flex flex-col justify-between mt-2 md:flex-row md:items-center text-textSecondary">
                            <p className="text-xs font-semibold text-primary">You will receive</p>
                            <p className="text-xs font-semibold text-primary">9.9995 BTC</p>
                        </div>
                    </div>
                    <Button title={"Ok"} className={"w-full p-4 bg-primary text-white"} />
                </div>
            </div>
        </div>
    );
};

export default PaymentSent;
