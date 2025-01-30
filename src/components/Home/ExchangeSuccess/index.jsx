import React from "react";
import Image from "next/image";
import { TextButton } from "@/components/Elements/Button/Button";

const ExchangeSuccess = ({
  onDone,
  fromCurrency,
  toCurrency,
  exchangeRate,
}) => {
  return (
    <div className="w-full h-full p-4">
      <div className="p-6 mb-3 text-center border border-primary50 rounded-2xl">
        <p className="mb-2 text-xs font-normal">
          You swapped {fromCurrency.name} for {toCurrency.name}
        </p>
        <div className="flex items-center justify-center mb-2">
          <Image
            src={fromCurrency.logo}
            alt={fromCurrency.name}
            width={32}
            height={32}
          />
          <Image
            src={toCurrency.logo}
            alt={toCurrency.name}
            width={32}
            height={32}
            className="-ml-2"
          />
        </div>
        <p className="text-base font-semibold text-textBlack">
          {toCurrency.amount} {toCurrency.name}
        </p>
        <p className="text-xs font-semibold text-[#BABABA]">
          ≈ {fromCurrency.amount} {fromCurrency.name}
        </p>
        <p className="mt-2 text-xs text-success font-normal">✓ Successful</p>
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

      {/* Footer Button */}
      <div className="flex justify-end gap-4 pt-3 border-t border-t-primary50">
        <TextButton
          title="Done"
          textColor="text-white"
          backgroundColor="bg-primary"
          className="py-1 px-4 rounded-xl"
          onClick={onDone}
        />
      </div>
    </div>
  );
};

export default ExchangeSuccess;
