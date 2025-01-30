import Stepsymbol from "@/Icons/Stepsymbol";
import Image from "next/image";
import React from "react";

export const StepIndicator = ({ currentStep, isFirstStepCompleted }) => {
  return (
    <div className="relative flex items-center justify-between w-full mb-6">
      {/* Step 1 */}
      <div className="flex items-center">
        <div className="flex flex-col items-center mt-3">
          <div
            className={`flex items-center justify-center w-10 h-10 border-2 rounded-full ${
              isFirstStepCompleted || currentStep.id > "01"
                ? "bg-black text-white border-black"
                : "border-gray-300 text-textBlack"
            }`}
          >
            {isFirstStepCompleted || currentStep.id > "01" ? (
              <Stepsymbol className="w-8 h-8" />
            ) : (
              "01"
            )}
          </div>
          <div
            className={`mt-2 text-xs text-center ${
              isFirstStepCompleted || currentStep.id >= "01"
                ? "text-textBlack font-medium"
                : "text-textSecondary"
            }`}
          >
            <p>ID</p>
            <p>Verification</p>
          </div>
        </div>
        <div className="flex items-center justify-center -mt-6">
          <div
            className={`h-[2px] w-20 sm:w-40 ${
              isFirstStepCompleted || currentStep.id >= "02"
                ? "bg-black"
                : "bg-gray-300"
            }`}
          />
        </div>
      </div>

      {/* Step 2 */}
      <div className="flex items-center">
        <div className="flex flex-col items-center mt-3">
          <div
            className={`flex items-center justify-center w-10 h-10 border-2 rounded-full ${
              currentStep.id > "02"
                ? "bg-black text-white border-black"
                : "border-gray-300 text-textBlack"
            }`}
          >
            {currentStep.id > "02" ? (
              <Stepsymbol className="w-8 h-8" />
            ) : (
              "02"
            )}
          </div>
          <div
            className={`mt-2 text-xs text-center ${
              currentStep.id >= "02"
                ? "text-textBlack font-medium"
                : "text-textSecondary"
            }`}
          >
            <p>Liveness</p>
            <p>Check</p>
          </div>
        </div>
        <div className="flex items-center justify-center -mt-6">
          <div
            className={`h-[2px] w-20 sm:w-40 ${
              currentStep.id >= "03" ? "bg-black" : "bg-gray-300"
            }`}
          />
        </div>
      </div>

      {/* Step 3 */}
      <div className="flex items-center mt-4">
        <div className="flex flex-col items-center">
          <div
            className={`flex items-center justify-center w-10 h-10 border-2 rounded-full ${
              currentStep.id > "03"
                ? "bg-black text-white border-black"
                : "border-gray-300 text-textBlack"
            }`}
          >
            {currentStep.id > "03" ? (
              <Stepsymbol className="w-8 h-8" />
            ) : (
              "03"
            )}
          </div>
          <p
            className={`mt-2 text-xs text-center ${
              currentStep.id >= "03"
                ? "text-textBlack font-medium"
                : "text-textSecondary"
            }`}
          >
            <p>Proof of</p>
            <p>Address</p>
          </p>
        </div>
      </div>
    </div>
  );
};
