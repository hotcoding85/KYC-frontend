import React from "react";
import { AuthButton } from "@/components/Elements/Button/Button";

const VerificationComplete = ({ onComplete }) => {
  return (
    <div className="w-full text-center">
      <h2 className="mb-4 text-base font-semibold">Verification Complete</h2>
      <p className="mb-6 text-sm text-gray-500">
        Your document verification process is now complete.
      </p>
    </div>
  );
};

export default VerificationComplete;
