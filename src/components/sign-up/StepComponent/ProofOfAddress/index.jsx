import React, { useState } from "react";
import Image from "next/image";
import { AuthButton } from "@/components/Elements/Button/Button";
import { UploadDocument } from "../IDVerification/UploadDocument";
import VerificationComplete from "./VerificationComplete";

const ProofOfAddress = ({ onNext, onBack }) => {
  const [isComplete, setIsComplete] = useState(false);

  const handleContinue = () => {
    setIsComplete(true);
  };

  return (
    <div className="w-full">
      {!isComplete ? (
        <>
          <h2 className="mb-2 text-base font-semibold">Proof of Address</h2>
          <p className="mb-6 text-xs text-textSecondary">
            Upload one of the supported documents.
          </p>
          <UploadDocument />

          {/* Supported Documents Section */}
          <div className="mt-6">
            <h3 className="text-xs font-semibold">Supported Documents:</h3>
            <ul className="mt-2 space-y-1 text-xs text-textSecondary list-disc pl-3">
              <li>
                Government issued address proof (identity card, social
                security number, etc.).
              </li>
              <li>Driver’s license.</li>
              <li>Bank statement or credit card bill.</li>
              <li>Utility bill (electricity, gas, water, phone, or internet).</li>
              <li>Rental agreement or mortgage contract.</li>
              <li>Tax bill or receipt.</li>
              <li>Employment letter.</li>
              <li>Health care or NHS card.</li>
              <li>Notarized sale agreement.</li>
            </ul>
          </div>

          <AuthButton
            title="Continue"
            onClick={handleContinue}
            className="w-full mt-6 text-white bg-black rounded-lg"
          />
        </>
      ) : (
        <VerificationComplete onNext={onNext} />
      )}
    </div>
  );
};

export default ProofOfAddress;
