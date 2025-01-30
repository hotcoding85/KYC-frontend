import Back from "@/Icons/Back";
import ChevronRight from "@/Icons/ChevronRight";
import Search from "@/Icons/Search";
import Button from "../Elements/Button/Button";
import { useRouter } from "next/navigation";
import Alice from "@/Icons/imageicon/Alice";
import React from "react";
import Dollar from "@/Icons/imageicon/Dollar";

const ChooseBeneficiary = ({ onNext, onAdd }) => {
  const router = useRouter();
  const beneficiaries = [
    {
      name: "Alice John",
      flag: <Dollar className="w-2 h-2 rounded-full" />
    },
    {
      name: "Charlie Brown",
      flag: <Dollar className="w-2 h-2 rounded-full" />
    },
    {
      name: "Frank Wilson",
      flag: <Dollar className="w-2 h-2 rounded-full" />
    },
  ];

  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <div className="items-center justify-center w-full bg-white border md:w-[500px] rounded-2xl">
        <div className="flex-col p-6 ">
          <div className="flex items-center mb-4 space-x-2">
            <button onClick={() => router.back()}>
              <Back />
            </button>
            <h1 className="text-sm font-semibold">Choose Beneficiary</h1>
          </div>
          <div className="flex items-center justify-between my-2 space-x-4">
            <div className="flex items-center w-full h-10 px-2 text-xs border border-primary50 rounded-2xl">
              <Search />
              <input type="text" placeholder="Name, email, phone" className="w-full h-8 ml-2 border-none outline-none" />
            </div>
            <Button title={"Add Beneficiary"} className={"bg-black text-white h-8 w-max text-nowrap text-sm py-1 px-4"} onClick={onAdd}></Button>
          </div>
          {/* Beneficiaries List */}
          <p className="text-[11px] mb-2">Recent</p>
          <hr />
          <div className="flex mt-4 space-x-8">
            {beneficiaries.map((beneficiary, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  <Alice className="object-cover w-8 h-8 border rounded-full" />
                  <span className="absolute bottom-0 text-2xl right-1">
                    {beneficiary.flag}
                  </span>
                </div>
                <p className="mt-2 text-xs font-normal">{beneficiary.name.split(" ")[0]}</p>
                <p className="text-xs font-normal">{beneficiary.name.split(" ")[1]}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 mb-2 text-[11px]">All</p>
          <hr />
          <div className="mt-4 space-y-4">
            <button className="flex items-center justify-between w-full space-x-4" onClick={onNext}>
              <div className="flex items-center space-x-4">
                <Alice className="w-8 h-8 rounded-full" />
                <p className="text-xs font-medium">Alice John</p>
              </div>
              <ChevronRight />
            </button>
            <button className="flex items-center justify-between w-full space-x-4" onClick={onNext}>
              <div className="flex items-center space-x-4">
                <Alice className="w-4 h-4 rounded-full" />
                <p className="text-xs font-medium">Alice John</p>
              </div>
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseBeneficiary;
