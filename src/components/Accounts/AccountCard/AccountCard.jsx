import React from "react";
import Link from "next/link";


const AccountCard = ({
  name,
  balance,
  currency,
  imageUrl,
  selectedType,
  href,
  className = "w-full md:w-[158px]",
}) => {
  const formattedBalance =
    typeof balance === "number" ? balance.toFixed(2) : "0.00";
  const accountHref =
    href ||
    `/dashboard/accounts/account-details?type=${selectedType.toLowerCase()}`;

  return (
    <Link href={accountHref} className={className}>
      <div className="relative w-full justify-between flex-shrink-0 p-4 bg-white border rounded-2xl border-primary50 scroll-auto h-[6.3rem]">
        <div className="flex flex-row items-start ">
        {imageUrl && (
            <img className="w-6 " src={imageUrl} alt={`${currency} icon`} />
          )}
          <span className="w-8 h-12 text-sm font-semibold text-textBlack ml-1">
            {name}
          </span>
        
        </div>

        <div className="flex items-end justify-start">
          <p className="text-sm font-semibold text-textBlack">
            {formattedBalance} <span className="text-gray-300">{currency}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default AccountCard;
