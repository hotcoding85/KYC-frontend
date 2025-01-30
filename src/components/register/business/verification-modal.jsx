import { StepIndicator } from "@/components/Elements/Steps/StepIndicator";
import Addtional from "@/components/register/business/additional";
import AnticipatedActivity from "@/components/register/business/anticipated-activity";
import CompanyRepresentative from "@/components/register/business/company-representative";
import VerificationCompleted from "@/components/register/business/completed";
import Documents from "@/components/register/business/documents";
import Funding from "@/components/register/business/funding";
import MainActivity from "@/components/register/business/main-activity";
import SignificantParties from "@/components/register/business/significant-parties";
import VerificationSubmit from "@/components/register/business/submit";
import Image from "next/image";
import React, { useState } from "react";
import Modal from "@/components/Elements/Modal/Modal";
import { TextButton } from "@/components/Elements/Button/Button";

const AllSteps = [
  "Significant Parties",
  "Company Representative",
  "Main Activity",
  "Funding",
  "Anticipated Activity",
  "Additional",
  "Documents",
  "Submit"
]
const EntityVerificationModal = ({ isModalOpen, closeModal }) => {
  const [currentMainStepIndex, setCurrentMainStepIndex] = useState(0);
  const [isFirstStepCompleted, setIsFirstStepCompleted] = useState(false);

  const handleNextStep = () => {
    setCurrentMainStepIndex(prev => prev + 1)
  }

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Entity Verification"
        customWidth="max-w-[98%] lg:max-w-[1000px]"
      >
        {/* Modal Body */}
        <div className="w-full mx-auto p-4 sm:p-6">
          <StepIndicator
            allSteps={AllSteps}
            currentStep={currentMainStepIndex}
            isFirstStepCompleted={isFirstStepCompleted}
          />

          {currentMainStepIndex !== 0 && (
            <div className="flex justify-center">
              <div className="flex flex-col items-start w-[500px]">
                <div className="flex items-center gap-2">
                  <Image
                    width={14}
                    height={14}
                    alt="back arrow"
                    src="/assets/icons/backArrow.svg"
                    className="cursor-pointer"
                    onClick={() => setCurrentMainStepIndex(prev => prev - 1)}
                  />
                  <h2
                    className="font-normal text-xs text-textBlack cursor-pointer"
                    onClick={() => setCurrentMainStepIndex(prev => prev - 1)}
                  >
                    Back
                  </h2>
                </div>
              </div>
            </div>
          )}

          {currentMainStepIndex === 0 ? (
            <SignificantParties />
          ) : currentMainStepIndex === 1 ? (
            <CompanyRepresentative />
          ) : currentMainStepIndex === 2 ? (
            <MainActivity />
          ) : currentMainStepIndex === 3 ? (
            <Funding />
          ) : currentMainStepIndex === 4 ? (
            <AnticipatedActivity />
          ) : currentMainStepIndex === 5 ? (
            <Addtional />
          ) : currentMainStepIndex === 6 ? (
            <Documents />
          ) : currentMainStepIndex === 7 ? (
            <VerificationSubmit />
          ) : (
            <VerificationCompleted />
          )}
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end p-4 border-t space-x-4">
          {currentMainStepIndex < 8 && (
            <TextButton
              title="Save & Exit"
              textColor="text-textBlack"
              backgroundColor="bg-white"
              width="w-[150px]"
              borderColor="border-[1px] border-primary50"
              onClick={closeModal}
            />
          )}
          <TextButton
            width="w-[150px]"
            title={currentMainStepIndex < 8 ? "Save & Continue" : "Sign out"}
            onClick={() => currentMainStepIndex < 8 ? handleNextStep() : closeModal()}
          />
        </div>
      </Modal>
    </>
  )
}
export default EntityVerificationModal;
