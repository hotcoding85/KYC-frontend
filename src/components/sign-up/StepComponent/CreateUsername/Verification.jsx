import VerificationIcon from "@/Icons/Verification";
import React from "react";
import Image from "next/image";
import { AuthButton } from "@/components/Elements/Button/Button";

const Verification = ({ onDone }) => {
  return (
    <div className="flex flex-col w-full sm:w-[500px]">
      <h2 className="mb-2 text-base font-semibold text-textBlack">Verification Completed</h2>
      <p className="text-xs text-textSecondary">
        Your identity verification is in progress. Please allow approximately 24
        hours for this process to complete.
      </p>

      <div className="flex items-center justify-center my-6 sm:my-10">
        <VerificationIcon className="w-[140px] h-[140px]" />
      </div>

      <AuthButton
        title="Done"
        onClick={onDone}
        className="w-full sm:mt-4 text-white bg-black rounded-lg"
      />
    </div>
  );
};

export default Verification;
