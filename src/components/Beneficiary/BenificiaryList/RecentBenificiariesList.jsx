/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";
import React from "react";
import Alice from "@/Icons/imageicon/Alice";
const beneficiaries = [
  // {
  //   id: 1,
  //   name: "Alice John",
  //   amount: "$40",
  //   date: "Mon",
  // },
  // {
  //   id: 2,
  //   name: "Bob Smith",
  //   amount: "216.520249 USDT",
  //   date: "4 Sep",
  // },
  // {
  //   id: 3,
  //   name: "Charlie Brown",
  //   amount: "$180",
  //   date: "4 Sep",
  // },
];

const RecentBenificiariesList = ({beneficiaries}) => {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col gap-2 px-4 pb-2">
      {beneficiaries &&
        beneficiaries.map((beneficiary, index) => (
          <div
            key={beneficiary?.id}
            className={`flex items-center justify-between gap-3 py-4 hover:bg-gray-50 transition-colors duration-200 ${
              index !== beneficiary.length - 1 && "border-b border-b-gray-100"
            }`}
            onClick={() => {
              router.push(
                `/dashboard/beneficiaries/${beneficiary?.beneficiary_id}`
              );
            }}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <img
                src={beneficiary?.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                alt="Logo"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-medium text-textBlack">
                  {beneficiary?.full_name}
                </span>
                <span className="font-normal text-xs text-textSecondary">
                  You sent {beneficiary?.amount}
                </span>
              </div>
            </div>
            <span className="font-normal text-xs text-textSecondary">
              {beneficiary?.date}
            </span>
          </div>
        ))}
      {beneficiaries.length == 0 && (
        <>
          <p class="text-sm">You do not have any beneficiaries</p>
        </>
      )}
    </div>
  );
};

export default RecentBenificiariesList;
