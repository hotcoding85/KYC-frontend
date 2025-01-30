import React, { useState } from "react";
import { StepIndicator } from "./StepIndicator";
import IDVerification from "./IDVerification/IDVerification";
import LivenessCheck from "./LivenessCheck";
import ProofOfAddress from "./ProofOfAddress";
import CreateUsername from "./CreateUsername/CreateUsername";
import Verification from "./CreateUsername/Verification";

const mainSteps = [
  { id: "01", title: "ID Verification" },
  { id: "02", title: "Liveness Check" },
  { id: "03", title: "Proof of Address" },
  { id: "04", title: "Create Username" },
  { id: "05", title: "Verification Completed" },
];

export default function MainVerificationSteps() {
  const [currentMainStepIndex, setCurrentMainStepIndex] = useState(0);
  const [isFirstStepCompleted, setIsFirstStepCompleted] = useState(false);

  const handleNextMainStep = () => {
    if (currentMainStepIndex < mainSteps.length - 1) {
      setCurrentMainStepIndex((prev) => prev + 1);
    }
  };

  const handleBackMainStep = () => {
    if (currentMainStepIndex > 0) {
      setCurrentMainStepIndex((prev) => prev - 1);
    }
  };

  const handleFirstStepCompletion = () => {
    setIsFirstStepCompleted(true);
  };

  const currentMainStep = mainSteps[currentMainStepIndex];

  return (
    <div className="flex flex-col items-center justify-center px-2 lg:px-4 w-full">
      {/* Conditionally render StepIndicator */}
      {currentMainStep.id !== "04" && currentMainStep.id !== "05" && (
        <div className="flex items-center justify-center w-full mx-auto">
          <StepIndicator
            currentStep={currentMainStep}
            isFirstStepCompleted={isFirstStepCompleted}
          />
        </div>
      )}

      <div className="w-full">
        {currentMainStep.id === "01" && (
          <IDVerification
            onNext={handleNextMainStep}
            onBack={handleBackMainStep}
            onComplete={handleFirstStepCompletion}
          />
        )}
        {currentMainStep.id === "02" && (
          <LivenessCheck
            onNext={handleNextMainStep}
            onBack={handleBackMainStep}
          />
        )}
        {currentMainStep.id === "03" && (
          <ProofOfAddress
            onNext={handleNextMainStep}
            onBack={handleBackMainStep}
          />
        )}
        {currentMainStep.id === "04" && (
          <CreateUsername
            fromProofOfAddress={true}
            onNext={handleNextMainStep}
          />
        )}
        {currentMainStep.id === "05" && (
          <Verification onDone={handleNextMainStep} />
        )}
      </div>
    </div>
  );
}
