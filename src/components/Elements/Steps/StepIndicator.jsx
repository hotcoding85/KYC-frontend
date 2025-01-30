import Stepsymbol from "@/Icons/Stepsymbol";
import React from "react"
import Image from "next/image"

export const StepIndicator = ({ currentStep, isFirstStepCompleted, allSteps }) => {
  return (
    <div className="flex items-start justify-between gap-0.5 w-full mb-12 mt-3">
      {allSteps.map((each, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between w-full"
        >
          <div className={`relative flex flex-col ${allSteps.length === idx + 1 ? 'items-start' : 'items-center'} w-full gap-2`}>
            <div
              className={`flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 border-2 rounded-full ${
                idx < currentStep
                  ? "bg-black text-white border-black"
                  : "border-primary50 text-textBlack"
              }`}
            >
              {idx < currentStep ? (
                <Stepsymbol className="w-[14px] h-[16px]" />
              ) : (
                `0${idx + 1}`
              )}
            </div>
            <div
              className={`absolute top-10 sm:top-12 font-medium text-xs text-center text-textBlack ${
                idx < currentStep
                  ? "font-semibold"
                  : ""
              } ${idx !== currentStep && 'hidden md:block'}`}
            >
              <p>{each}</p>
            </div>
          </div>
          {allSteps.length !== idx + 1 && (
            <div className="flex items-center justify-center w-full">
              <div
                className={`h-0.5 w-full max-w-[66px] ${
                  isFirstStepCompleted || currentStep.id >= `0${idx + 2}`
                    ? "bg-black"
                    : "bg-gray-300"
                }`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator
