"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ResetPasswordComponent } from "@/components/Forget/ResetPassword";
import { PasswordResetThankYouComponent } from "@/components/Forget/ThankYou";
import { CreateNewPasswordComponent } from "@/components/Forget/CreateNewPassword";
import BackArrow from "@/Icons/BackArrow";
import Auth from "@/components/Auth/Auth";


export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState(2);
  const [company, setCompany] = useState(null);

  const handleNextStep = () => setStep(step + 1);
  const handleBackStep = () => setStep(step - 1);

  return (
    <Auth>
      <div className="flex flex-col pt-12">
        {step !== 2 && (
          <div className="flex items-center gap-2 mb-4">
            <BackArrow className="w-14 h-14" />
            <span
              onClick={handleBackStep}
              className="text-xs font-normal cursor-pointer text-textBlack"
            >
              Back
            </span>
          </div>
        )}
        {step === 1 && <ResetPasswordComponent onNext={handleNextStep} />}
        {step === 2 && <CreateNewPasswordComponent onNext={handleNextStep} />}
        {step === 3 && <PasswordResetThankYouComponent />}
      </div>
    </Auth>
  );
}
