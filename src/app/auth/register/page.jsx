"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import useApi from "@/hooks/useApi";
import Overlay from "@/components/Elements/Overlay/Overlay";
import { AllDone } from "@/components/sign-up/AllDone";
import AuthHeader from "@/components/sign-up/AuthHeader";
import { ChooseService } from "@/components/sign-up/ChooseService";
import { CreateUsernameComponent } from "@/components/sign-up/CreateUsername";
import { GetStarted } from "@/components/sign-up/GetStarted";
import { PasscodeComponent } from "@/components/sign-up/Passcode";
import { PasswordComponent } from "@/components/sign-up/Password";
import MainVerificationSteps from "@/components/sign-up/StepComponent/MainVerificationSteps";
import { VerificationComponent } from "@/components/sign-up/Verification";
import { EmailInputs } from "@/components/sign-up/EmailInputs";
import { Authenticator } from "@/components/sign-up/Authenticator";
import { COMPANY_ACCOUNT_TYPE } from "@/shared/enums";
import Image from "next/image";
import Cookies from "js-cookie";
import BackArrow from "@/Icons/BackArrow";
import { Address } from "@/components/sign-up/Address";
import Auth from "@/components/Auth/Auth";

export default function RegistrationPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const { fetchData, loading, error } = useApi();
  const [companyId, setCompanyId] = useState(id);
  const [registrationData, setRegistrationData] = useState();
  const [registrationSteps, setRegistrationSteps] = useState([]);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const setTheme = async (theme) => {
      document.documentElement.style.setProperty(
        "--primary-color",
        theme || "#000"
      );
    };

    async function checkCompany() {
      const { result, error } = await fetchData(`/company/check/${companyId}`, {
        method: "GET",
      });
      if (error) {
        Cookies.set("companyId", "", { expires: 7 });
        setCompany(null);
      } else {
        Cookies.set("companyId", companyId, { expires: 7 });
        setCompany(result);
        setTheme(result?.branding?.theme || "#000");
        buildRegistration();
      }
    }

    async function buildRegistration(){
      if (COMPANY_ACCOUNT_TYPE.HOLDING == company?.company_account_type) {
      }

      if (COMPANY_ACCOUNT_TYPE.BANKING == company?.company_account_type) {
        setRegistrationSteps([
          "select_banking_type",
          "create_account",
          "create_address",
          "authenticator",
          "completed",
        ]);
      }
      if (COMPANY_ACCOUNT_TYPE.WEB3 == company?.company_account_type) {
        setRegistrationSteps(
          "select_web3_type", //select decentralized or centralized
          "create_email", //email and referal code for web3
          "password", //password for web3
          "authenticator", //google authenticator for web3
          "completed" //done
        );
      }
    }
    
    if (companyId) {
      companyId.trim() != "" && checkCompany();
    }
  }, [companyId]);

  
  

  
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNextStep = () => {
    if (stepIndex > registrationSteps.length) {
      setStepIndex(0);
    } else {
      setStepIndex(stepIndex + 1);
    }
  };
  const handleBackStep = () => {
    setStepIndex(stepIndex - 1);
  };

  return (
    <Auth company={company}>
      <div className="flex flex-col pt-12 w-full sm:w-auto">
        {stepIndex !== 0 && (
          <div className="flex items-center gap-2 mb-4">
            <BackArrow></BackArrow>
            <span
              onClick={handleBackStep}
              className="text-xs font-normal cursor-pointer text-textBlack"
            >
              Back
            </span>
          </div>
        )}
        {registrationSteps[stepIndex] === "select_banking_type" && (
          <ChooseService onNext={handleNextStep} />
        )}
        {registrationSteps[stepIndex] === "create_account" && (
          <GetStarted
            onBack={handleBackStep}
            setFormData={setFormData}
            onContinue={handleNextStep}
          />
        )}
        {registrationSteps[stepIndex] === "create_address" && (
          <Address
            onBack={handleBackStep}
            setFormData={setFormData}
            onContinue={handleNextStep}
          />
        )}
        {registrationSteps[stepIndex] === "verify_account" && (
          <MainVerificationSteps />
        )}
        {registrationSteps[stepIndex] === "verify_email" && (
          <VerificationComponent
            type="Email"
            onBack={handleBackStep}
            setFormData={setFormData}
            onContinue={handleNextStep}
            contactInfo="johndoe@gmail.com"
            changeInfoText="Change Email Address"
          />
        )}
        {registrationSteps[stepIndex] === "verify_mobile" && (
          <VerificationComponent
            type="Mobile"
            onBack={handleBackStep}
            setFormData={setFormData}
            contactInfo="500067867837"
            onContinue={handleNextStep}
            changeInfoText="Change Mobile Number"
          />
        )}
        {registrationSteps[stepIndex] === "password" && (
          <PasswordComponent
            onBack={handleBackStep}
            setFormData={setFormData}
            onConfirm={handleNextStep}
          />
        )}
        {registrationSteps[stepIndex] === "passcode" && (
          <PasscodeComponent
            title="Create Passcode"
            onBack={handleBackStep}
            setFormData={setFormData}
            onConfirm={handleNextStep}
            subtitle="Set up your passcode for quick and secure access to all app features."
          />
        )}
        {registrationSteps[stepIndex] === "verify_passcode" && (
          <PasscodeComponent
            title="Repeat Passcode"
            onBack={handleBackStep}
            setFormData={setFormData}
            onConfirm={handleNextStep}
            subtitle="Set up your passcode for quick and secure access to all app features."
          />
        )}

        {registrationSteps[stepIndex] === "verify_passcode" && (
          <EmailInputs
            onBack={handleBackStep}
            setFormData={setFormData}
            onConfirm={handleNextStep}
          />
        )}

        {registrationSteps[stepIndex] === "verify_passcode" && (
          <Authenticator
            onBack={handleBackStep}
            setFormData={setFormData}
            onConfirm={handleNextStep}
          />
        )}

        {registrationSteps[stepIndex] === "create_username" && (
          <CreateUsernameComponent
            onBack={handleBackStep}
            onCreate={handleNextStep}
            setFormData={setFormData}
          />
        )}
        {registrationSteps[stepIndex] === "completed" && <AllDone />}
      </div>
      <div className="mt-6 lg:mt-12 text-xs font-normal text-center text-textSecondary">
        I already have an account?{" "}
        <button
          onClick={() => router.push(`/auth/login/${companyId || ""}`)}
          className="font-semibold cursor-pointer text-textBlack"
        >
          Sign in
        </button>
      </div>
    </Auth>
  );
}
