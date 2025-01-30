import React from "react";
import { AuthButton } from "@/components/Elements/Button/Button";
import Image from "next/image";
import Check from "@/Icons/Check";

const VerificationComplete = ({ onNext }) => {
  return (
    <div className="flex flex-col w-full">
      <h2 className="mb-6 sm:mb-4 text-base font-semibold">{`Great! You're all set.`}</h2>
      <div className="flex items-center justify-center sm:my-10 rounded-full">
       
        <Check className="w-[100px] h-[100px]" />
      </div>
      <AuthButton
        title="Continue"
        onClick={onNext}
        className="w-full mt-6 sm:mt-4 text-white bg-black rounded-lg"
      />
    </div>
  );
};

export default VerificationComplete;
