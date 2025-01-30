import React from 'react'
import { SingleInput } from "@/components/register/business/create-business"

const AnticipatedActivity = () => {
  return (
    <div className="flex justify-center max-h-[60vh] overflow-y-auto mt-4">
      <div className="flex flex-col items-start w-[500px] gap-4">
        <h2 className="font-semibold text-base text-textBlack">Anticipated Activity</h2>

        <div className="flex flex-col gap-4 w-full">
          <SingleInput label="Monthly Turnover*" />
          <SingleInput label="Anticipated Turnover - Next 12 Months*" />
        </div>

        <h2 className="font-semibold text-sm text-textBlack">Crypto Activity</h2>

        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="col-span-2 w-full">
            <SingleInput label="Cryptocurrency OTC Desk - Selling Crypto - Monthly Volume*" />
          </div>
          <div className="col-span-2 w-full">
            <SingleInput label="Cryptocurrency OTC Desk - Selling Crypto - Average Amount (USD)*" />
          </div>
          <div className="col-span-2 w-full">
            <SingleInput label="Cryptocurrency OTC Desk - Selling Crypto - Total Amount Per Month (USD)*" />
          </div>
          <div className="col-span-2 w-full">
            <SingleInput label="Cryptocurrency OTC Desk - Purchasing Crypto - Monthly Volume*" />
          </div>
          <div className="col-span-2 w-full">
            <SingleInput label="Cryptocurrency OTC Desk - Crypto to Crypto - Average Amount (USD)*" />
          </div>
          <div className="col-span-2 w-full">
            <SingleInput label="Cryptocurrency OTC Desk - Crypto to Crypto - Total Amount Per Month (USD)*" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <SingleInput label="Total for All Monthly Volume*" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <SingleInput label="Total for All Average Amount (USD)*" />
          </div>
          <div className="col-span-2 w-full">
            <SingleInput label="Percentage (%) of Anticipated Trading Activity by Coin - BTC*" />
          </div>
          <div className="col-span-2 w-full">
            <SingleInput label="Percentage (%) of Anticipated Trading Activity by Coin - ETH*" />
          </div>
          <div className="col-span-2 w-full">
            <SingleInput label="Percentage (%) of Anticipated Trading Activity by Coin - USDC*" />
          </div>
          <div className="col-span-2 w-full">
            <SingleInput label="Percentage (%) of Anticipated Trading Activity by Coin - Other Coins*" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnticipatedActivity
