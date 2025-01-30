import Back from "@/Icons/Back";
import Button from "../Elements/Button/Button";
import Mastercard from "@/Icons/imageicon/Mastercard";
import React from "react";
import Success from "@/Icons/imageicon/Success";
import SuccessIcon from "@/Icons/imageicon/SuccessIcon";

const BuyCryptoStepFive = ({ onBack }) => {
  return (
    <div className="flex flex-col justify-between items-center h-screen">
      <div className="bg-white rounded-2xl border w-full md:w-3/6 justify-center items-center">
        <div className=" flex-col p-6">
          <button className="mb-4" onClick={onBack}>
            <Back />
          </button>
          <div className="mb-4 space-y-1 flex flex-col justify-center items-center">
            <SuccessIcon className="size-24 mb-4" />
            <p className="text-textSecondary text-xs">You bought</p>
            <p className="font-bold text-sm">648,700 USDT</p>
            <p className="text-lg text-textSecondary ">
              Your assets are now in your USDT Wallet.
            </p>
          </div>
          <div className="border border-primary50 rounded-xl p-4 space-y-2 mb-4">
            <div className="flex items-center justify-between mt-2 text-textSecondary">
              <p className="text-xs text-textSecondary">Paid with</p>
              <p className="flex flex-row items-center space-x-2 text-sm font-semibold text-primary">
                <Mastercard  className="w-6 h-4" />
                <span className="text-xs font-normal">Mastercard</span>
              </p>
            </div>
            <div className="flex items-center justify-between mt-2 text-textSecondary">
              <p className="text-xs text-textSecondary">Bought</p>
              <p className="flex flex-row items-center space-x-2 text-xs font-normal text-primary">
                $ 150.00 USD
              </p>
            </div>
            <div className="flex items-center justify-between mt-2 text-textSecondary">
              <p className="text-xs text-textSecondary">Date</p>
              <p className="flex flex-row items-center space-x-2 text-xs font-normal text-primary">
                2024-07-25 14:31:12
              </p>
            </div>
            <div className="flex items-center justify-between mt-2 text-textSecondary">
              <p className="text-xs text-textSecondary">Transaction ID</p>
              <p className="flex flex-row items-center space-x-2 text-xs font-normal text-primary">
                2209423Kklk192j555
              </p>
            </div>
            {/* <div className="flex items-center justify-between mt-6 text-textSecondary">
              <p className="text-sm text-textSecondary">Rate</p>
              <p className="text-sm font-semibold text-primary">
                1 BTC = 25,000 USDT
              </p>
            </div> */}
            {/* <div className="flex items-center justify-between mt-2 text-textSecondary">
              <p className="text-sm text-textSecondary">Conversion fee</p>
              <p className="text-sm font-semibold text-primary">0.0005 BTC</p>
            </div> */}

            <div className="flex items-center justify-between mt-2 text-textSecondary">
              <p className="text-xs text-textBlack font-semibold">Total</p>
              <p className="text-xs font-semibold text-primary">0.0005 BTC</p>
            </div>
          </div>
          <Button title="Done" className={"w-full bg-primary text-white"} />
        </div>
      </div>
    </div>
  );
};

export default BuyCryptoStepFive;
