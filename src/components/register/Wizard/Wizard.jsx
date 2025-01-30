import { useState } from "react";
import { ChooseService } from "@/components/Register/ChooseService";
import { CreateUsernameComponent } from "@/components/Register/CreateUsername";
import { EmailInputComponent } from "@/components/Register/EmailInputs";
import { MobileNumberComponent } from "@/components/Register/MobileNumber";
import { PasscodeComponent } from "@/components/Register/Passcode";
import { PasswordComponent } from "@/components/Register/Password";
import { VerificationComponent } from "@/components/Register/Verification";
import { AllDone } from "@/components/Register/AllDone";

const Wizard = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNextStep = () => setStep((prevStep) => prevStep + 1);
  const handleBackStep = () => setStep((prevStep) => Math.max(prevStep - 1, 0));

  // Step components configuration
  const steps = [
    { component: ChooseService, props: { onNext: handleNextStep } },
    {
      component: EmailInputComponent,
      props: {
        onBack: handleBackStep,
        setFormData,
        onContinue: handleNextStep,
      },
    },
    {
      component: VerificationComponent,
      props: {
        type: "Email",
        onBack: handleBackStep,
        setFormData,
        onContinue: handleNextStep,
        contactInfo: "johndoe@gmail.com",
        changeInfoText: "Change Email Address",
      },
    },
    {
      component: MobileNumberComponent,
      props: {
        onBack: handleBackStep,
        setFormData,
        onContinue: handleNextStep,
      },
    },
    {
      component: VerificationComponent,
      props: {
        type: "Mobile",
        onBack: handleBackStep,
        setFormData,
        onContinue: handleNextStep,
        contactInfo: "500067867837",
        changeInfoText: "Change Mobile Number",
      },
    },
    {
      component: PasswordComponent,
      props: { onBack: handleBackStep, setFormData, onConfirm: handleNextStep },
    },
    {
      component: PasscodeComponent,
      props: {
        title: "Create Passcode",
        onBack: handleBackStep,
        setFormData,
        onConfirm: handleNextStep,
        subtitle:
          "Set up your passcode for quick and secure access to all app features.",
      },
    },
    {
      component: PasscodeComponent,
      props: {
        title: "Repeat Passcode",
        onBack: handleBackStep,
        setFormData,
        onConfirm: handleNextStep,
        subtitle:
          "Set up your passcode for quick and secure access to all app features.",
      },
    },
    {
      component: CreateUsernameComponent,
      props: { onBack: handleBackStep, onCreate: handleNextStep, setFormData },
    },
    { component: AllDone, props: {} },
  ];

  const StepComponent = steps[step]?.component || null;
  const stepProps = steps[step]?.props || {};

  return StepComponent ? <StepComponent {...stepProps} /> : null;
};

export default Wizard;
