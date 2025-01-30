import React from "react";
import Image from "next/image";
import { TextButton } from "@/components/Elements/Button/Button";

const ExchangeSummary = ({
  onBack,
  fromCurrency,
  toCurrency,
  exchangeRate,
  onContinue,
}) => {
  return (
    <div className="w-full h-full p-4">
      <div className="flex items-center justify-between px-16 py-4 mb-4 border border-primary50 rounded-2xl">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-normal text-textSecondary">From</p>
          <Image
            src={fromCurrency.logo}
            alt={fromCurrency.name}
            width={45}
            height={45}
          />
          <div>
            <p className="text-base font-semibold">
              {fromCurrency.amount} {fromCurrency.name}
            </p>
            <p className="text-xs text-[#BABABA] font-semibold text-center">
              ≈ {fromCurrency.price}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center w-[45px] h-[45px] text-xl border-[0.39px] rounded-full border-primary50">
          →
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-normal text-textSecondary">To</p>
          <Image
            src={toCurrency.logo}
            alt={toCurrency.name}
            width={45}
            height={45}
          />
          <div>
            <p className="text-base font-semibold">
              {toCurrency.amount} {toCurrency.name}
            </p>
            <p className="text-xs text-[#BABABA] font-semibold mt-1 text-center">
              ≈ {toCurrency.price}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 mb-3 flex flex-col gap-2 border border-primary50 rounded-2xl">
        <div className="flex flex-row justify-between gap-1">
          <p className="text-xs font-normal text-textSecondary">
            Exchange rate
          </p>
          <p className="font-medium text-xs text-textBlack">
            1 {fromCurrency.name} FOR {exchangeRate}
          </p>
        </div>

        <div className="flex flex-row justify-between gap-1">
          <p className="text-xs font-semibold text-textBlack">Amount</p>
          <div>
            <p className="font-semibold text-xs text-textBlack">
              {toCurrency.amount} {toCurrency.name}
            </p>
            <p className="text-xs font-semibold text-textLight mt-1">
              ≈ {toCurrency.price}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between my-4 text-xs font-semibold text-textBlack">
        <p>Quote will expire in</p>
        <p>58s</p>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-4 pt-3 border-t border-t-primary50">
        <TextButton
          title="Back"
          textColor="text-primary"
          backgroundColor="bg-white"
          borderColor="border border-primary50"
          className="py-1 px-4 rounded-xl"
          onClick={onBack}
        />
        <TextButton
          title="Continue"
          textColor="text-white"
          backgroundColor="bg-primary"
          className="py-1 px-4 rounded-xl"
          onClick={onContinue}
        />
      </div>
    </div>
  );
};

export default ExchangeSummary;
