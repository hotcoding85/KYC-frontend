/* eslint-disable @next/next/no-img-element */
import ChevronRight from "@/Icons/ChevronRight";
import { useRouter } from "next/navigation";
import React from "react";
import Alice from "@/Icons/imageicon/Alice";

const transactions = []

const AllBenificieariesList = ({beneficiaries}) => {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col gap-2 px-4 pb-2">
      {beneficiaries &&
        beneficiaries.map((beneficiary, index) => (
          <div
            key={index}
            className={`flex items-center justify-between py-4 hover:bg-gray-50 transition-colors duration-200 ${
              index !== transactions.length - 1 && "border-b border-b-gray-100"
            }`}
            onClick={() =>
              router.push(`/dashboard/beneficiaries/${beneficiary?.beneficiary_id}`)
            }
          >
            <div className="flex items-center space-x-3">
              <img
                src={beneficiary?.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                alt="Logo"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-900">
                  {beneficiary.full_name}
                </span>
                {/* <span className="text-xs text-gray-500">
                You sent {transaction.amount}
              </span> */}
              </div>
            </div>
            <ChevronRight className="h-[14px] w-[14px]" />
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

export default AllBenificieariesList;
