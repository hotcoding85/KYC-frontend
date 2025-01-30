import React, { useState, useEffect } from "react";
import { AuthButton } from "@/components/Elements/Button/Button";
import { DocumentSelection } from "./DocumentSelection";
import { UploadDocument } from "./UploadDocument";
import { CameraFrame } from "./CameraFrame";
import IDDocumentReview from "./IDDocumentReview";
import DocumentUploadSuccess from "./DocumentUploadSuccess";
import Pasport from "@/Icons/Pasport";
import Idcard from "@/Icons/Idcard";
import License from "@/Icons/License";
import BlackIdCard from "@/Icons/BlackIdCard";
// import LicenseImageFront from "@/Icons/LicenseImageFront";

const idVerificationSteps = [
  {
    id: "1",
    title: "Choose document verification",
    description: "Choose one of the verification documents.",
    options: [
      {
        text: "Passport",
        icon: <Pasport className="w-[14px] h-[14px] mr-3" />,
      },
      { text: "ID Card", icon: <Idcard className="w-[14px] h-[14px] mr-3" /> },
      {
        text: "Driver's License",
        icon: <License className="w-[14px] h-[14px] mr-3" />,
      },
    ],
  },
  {
    id: "2",
    title: "Upload your ID Card for verification",
    description:
      "Please provide a clear photo by uploading or taking a new picture.",
    upload: true,
  },
  {
    id: "3",
    title: "Take a photo of the Front side of ID Card",
    description: "Make sure to place it inside the frame",
    cameraFrame: true,
  },
  {
    id: "4",
    title: "",
    documentReview: true,
  },
  {
    id: "5",
    title: "Document uploaded successfully",
    uploadSuccess: true,
  },
];

export default function IDVerification({ onNext, onBack, onComplete }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    if (idVerificationSteps[currentStepIndex].uploadSuccess) {
      onComplete(); // Notify parent component when this step is reached
    }
  }, [currentStepIndex, onComplete]);

  const handleNextStep = () => {
    if (currentStepIndex < idVerificationSteps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      onNext(); // Reset or move to the next main step
    }
  };

  const handleBackStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    } else {
      onBack();
    }
  };

  const currentStep = idVerificationSteps[currentStepIndex];

  return (
    <div className="w-full">
      {currentStep.title && (
        <h2 className="mb-2 text-base font-semibold text-textBlack">
          {currentStep.title}
        </h2>
      )}
      {currentStep.description && (
        <p className="mb-6 text-xs text-textSecondary">
          {currentStep.description}
        </p>
      )}

      {currentStep.options && (
        <DocumentSelection
          options={currentStep.options}
          selectedOption={selectedOption}
          onSelectOption={(option) => {
            setSelectedOption(option);
          }}
        />
      )}

      {currentStep.upload && <UploadDocument />}
      {currentStep.cameraFrame && <CameraFrame />}
      {currentStep.documentReview && (
        <IDDocumentReview
          documentSrc={<BlackIdCard className="w-[400px] h-[250px]" />}
          status="success"
          message="Everything looks good!"
          onNext={handleNextStep}
        />
      )}
      {currentStep.uploadSuccess && (
        <DocumentUploadSuccess onNext={handleNextStep} />
      )}

      <AuthButton
        title={"Continue"}
        onClick={handleNextStep}
        className={`w-full mt-6 text-white bg-black rounded-lg ${
          currentStep.options && !selectedOption
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
        disabled={currentStep.options && !selectedOption}
      />
    </div>
  );
}
