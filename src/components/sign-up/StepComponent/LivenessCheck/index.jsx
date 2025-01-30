import Photo from "@/Icons/Photo";
import React, { useState } from "react";
import { AuthButton } from "@/components/Elements/Button/Button";
import Image from "next/image";
import VerificationComplete from "./VerificationComplete"; // Import the component
import Faceicon from "@/Icons/Faceicon";

const LivenessCheck = ({ onNext, onBack }) => {
  const [status, setStatus] = useState("prompt");
  const [isComplete, setIsComplete] = useState(false); // State to track if the liveness check is complete

  const handleStartCheck = () => {
    setStatus("scanning");
    setTimeout(() => {
      setStatus("complete");
    }, 2000); // Simulate a delay for scanning
  };

  const handleContinue = () => {
    if (status === "prompt") {
      handleStartCheck();
    } else if (status === "complete") {
      setIsComplete(true); // Transition to `VerificationComplete`
    }
  };

  return (
    <div className="w-full">
      {!isComplete ? (
        <>
          <h2 className="mb-2 text-base font-semibold">Liveness Check</h2>
          <p className="mb-6 text-xs text-textSecondary">
            Liveness check ensures your identity is genuine and protects against
            fraud.
          </p>

          {status === "prompt" && (
            <div className="flex flex-col items-center mb-4">
              <div className="flex items-center justify-center w-32 h-32 mb-4 rounded-full">
                <Faceicon className="w-[140px] h-[121px]" />
              </div>
              <ul className="list-disc pl-2">
                <li className="mb-2 font-normal text-xs text-textSecondary">
                  Remove any headwear, glasses or anything that covers your face
                </li>
                <li className="font-normal text-xs text-textSecondary">
                  Position your face in the oval and follow the instructions.
                </li>
              </ul>
              <AuthButton
                title="Continue"
                onClick={handleContinue}
                className="w-full mt-6 text-white bg-black rounded-lg"
              />
            </div>
          )}

          {status === "scanning" && (
            <div className="flex flex-col items-center mb-4">
              <div className="flex items-center justify-center w-[274px] h-[343px] mb-4 bg-lightGrey rounded-[50%] animate-pulse"></div>
              <p className="text-sm text-textBlack">Blink Twice</p>

              <AuthButton
                title="Continue"
                onClick={handleContinue}
                className="w-full mt-6 text-white bg-black rounded-lg"
              />
            </div>
          )}

          {status === "complete" && (
            <div className="flex flex-col items-center mb-4">
              <div className="flex items-center justify-center mb-4 rounded-full">
                <Photo className="w-[274px] h-[343px]" />
              </div>
              <p className="mt-[29px] text-sm text-gray-500">
                Liveness check complete!
              </p>
              <AuthButton
                title="Continue"
                onClick={handleContinue}
                className="w-full mt-6 text-white bg-black rounded-lg"
              />
            </div>
          )}
        </>
      ) : (
        <VerificationComplete onNext={onNext} />
      )}
    </div>
  );
};

export default LivenessCheck;
