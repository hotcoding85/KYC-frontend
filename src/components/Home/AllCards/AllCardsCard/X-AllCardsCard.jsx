import React from "react";
import Link from "next/link";

const AllCardsCard = ({
  name,
  description,
  balance,
  currency,
  imageUrl,
  selectedType,
  href,
  className = "w-full md:w-[158px]",
}) => {
  const formattedBalance =
    typeof balance === "number" ? balance.toFixed(2) : "0.00";
  const cardHref =
    href || `/dashboard/accounts/card-details?type=${selectedType}`;

  return (
    <Link href={cardHref} className={className}>
      <div className="flex justify-start h-[6.3rem] p-4 bg-white border border-gray-200 rounded-2xl hover:cursor-pointer">
        <div className="flex flex-col justify-between w-full">
          <div className="flex flex-row items-center justify-between w-full gap-2">
            <div className="w-full">
              <div className="flex flex-row items-center  w-full">
                {imageUrl && <img className="w-6 " src={imageUrl} alt={name} />}

                <p className="text-sm font-semibold text-textBlack  ml-1">
                  {name}
                </p>
              </div>
              <p className="text-[10px] text-textSecondary">{description}</p>
            </div>
          </div>
          <p className="h-12 pt-4 text-sm font-semibold text-textBlack">
            {formattedBalance} <span className="text-gray-300">{currency}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default AllCardsCard;
