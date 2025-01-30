import GreenCheck from "@/Icons/GreenCheck";
import Redcross from "@/Icons/Redcross";
import Tickgreen from "@/Icons/Tickgreen";
import React, { useState } from "react";
import Image from "next/image";
import S3Image from "@/components/Elements/S3Image/S3Image";
import { LiquidityAction } from "@/components/Elements/Action/Action";
import RedCheck from "@/Icons/RedCheck";
import Pencilblack from "@/Icons/Pencilblack";

const LiquidityProviderCard = ({
  openEditModal,
  openDeleteModal,
  singleLiquidityState,
  setSingleLiquidityState,
  handleSetSelectedLiquidity,
}) => {
  const [gridData] = useState([
    { label: "Account Type", value: singleLiquidityState.type || "xxxxx" },
    { label: "Account Type", value: singleLiquidityState.type || "xxxxx" },
    { label: "Transaction In:", value: "15,852" },
    { label: "Transaction In:", value: "15,852" },
    { label: "Transaction Out", value: "12,203" },
    { label: "Transaction Out", value: "12,203" },
  ]);

  return (
    <div
      className="relative cursor-pointer pl-1.5 max-w-[339px]"
      onClick={() => handleSetSelectedLiquidity(singleLiquidityState)}
    >
      <div className="bg-white rounded-2xl shadow-md p-4 w-[339px] mx-auto h-[232.59px] border-t border-gray-300">
        <div className="flex items-center justify-between mb-4">
          {singleLiquidityState.logo &&
          singleLiquidityState.logo.includes(
            "watpay.s3.eu-north-1.amazonaws.com"
          ) ? (
            <S3Image
              className="w-[60px]  h-8 object-cover"
              s3Url={singleLiquidityState.logo}
            />
          ) : (
            <img
              src={singleLiquidityState.logo}
              alt="Logo"
              className="w-[60px]  h-8 object-cover"
            />
          )}
          <p
            className="inline-block border border-primary50 rounded-[10px] p-2.5 w-8 h-8"
            onClick={() => {
              setSingleLiquidityState(singleLiquidityState);
              openEditModal();
            }}
          >
            <Pencilblack className="w-[12px]  h-[12px] " />
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {gridData.map((item, index) => (
            <div
              key={index}
              className="col-span-1 flex items-center justify-between"
            >
              <p className="text-[12px] font-medium leading-[16px] text-textSecondary font-inter text-left ">
                {item.label}
              </p>
              <p className="text-[12px] font-semibold leading-[16px] text-textBlack font-inter text-right gap-2 ">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 mt-4">
          <p className="text-[12px] leading-[16px] text-textBlack font-inter text-left">
            Current Balances
          </p>
          <p className="text-xs  font-semibold leading-[16px] text-textBlack font-inter text-right">
            20.293288 BTC
          </p>
        </div>
      </div>

      <div className="absolute left-0 -top-2">
        {singleLiquidityState.status ? (
          <Tickgreen className="w-6 h-6" />
        ) : (
          <Redcross className="w-6 h-6" />
        )}
      </div>
    </div>
  );
};

export default LiquidityProviderCard;
