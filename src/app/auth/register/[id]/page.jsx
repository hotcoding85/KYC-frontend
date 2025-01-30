"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import useApi from "@/hooks/useApi";
import Overlay from "@/components/Elements/Overlay/Overlay";
import { AllDone } from "@/components/sign-up/AllDone";
import AuthHeader from "@/components/sign-up/AuthHeader";
import { ChooseService } from "@/components/sign-up/ChooseService";
import { ChooseWallet } from "@/components/sign-up/ChooseWallet";
import { CreateUsernameComponent } from "@/components/sign-up/CreateUsername";
import { GetStarted } from "@/components/sign-up/GetStarted";
import { Onboarding } from "@/components/sign-up/Onboarding";
import { KYC } from "@/components/sign-up/KYC";
import { PasscodeComponent } from "@/components/sign-up/Passcode";
import { PasswordComponent } from "@/components/sign-up/Password";
import MainVerificationSteps from "@/components/sign-up/StepComponent/MainVerificationSteps";
import { VerificationComponent } from "@/components/sign-up/Verification";
import { EmailInputs } from "@/components/sign-up/EmailInputs";
import { Authenticator } from "@/components/sign-up/Authenticator";
import { COMPANY_ACCOUNT_TYPE } from "@/shared/enums";
import Cookies from "js-cookie";
import BackArrow from "@/Icons/BackArrow";
import { Address } from "@/components/sign-up/Address";
import Auth from "@/components/Auth/Auth";

export default function RegistrationPage() {
  const params = useParams();
  const companyId = params?.id;
  const router = useRouter();
  const { fetchData, loading, error } = useApi();
  const [registrationData, setRegistrationData] = useState();
  const [registrationSteps, setRegistrationSteps] = useState([]);
  const [company, setCompany] = useState(null);
  const [user, setUser] = useState();
  const [qrCode, setQrCode] = useState("");
  const [authenticatorCode, setAuthenticatorCode] = useState("");
  const [verificationLink, setVerificationLink] = useState("");


  useEffect(() => {
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
      }
    }

    if (companyId) {
      companyId.trim() != "" && checkCompany();
    }
  }, [companyId]);

  useEffect(() => {
    if (!company) return;

    if (COMPANY_ACCOUNT_TYPE.HOLDING === company.company_account_type) {
      // Add steps if needed
    }

    if (COMPANY_ACCOUNT_TYPE.BANKING === company.company_account_type) {
      setRegistrationSteps([
        "select_banking_type",
        "create_account",
        "create_address",
        "create_onboarding",
        "authenticator",
        "kyc",
        "completed",
      ]);
    }

    if (COMPANY_ACCOUNT_TYPE.WEB3 === company.company_account_type) {
      setRegistrationSteps([
        //"select_web3_type",
        "create_account",
        //"create_email",
        //"password",
        "authenticator",
        "completed",
      ]);
    }
  }, [company]);

  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [validation, setValidation] = useState(false);
  

  const handleRegistration = async (data) => {
    try {
      const { result, error } = await fetchData(`/auth/start-register`, {
        method: "POST",
        body: { ...data, company_id: companyId },
      });

      if (error) {
        if (error.statusCode == 409) {
          setValidation("This email address already has an account.");
        }
      } else {
        setValidation(false);
        setStepIndex(stepIndex + 1);
      }
    } catch (err) {}
  }


  const handleAuthenticator = async (data) => {
      const registerData = {
        user_id: user,
        company_id: companyId,
        authenticator_code: data.code,
      };

      const { result, error } = await fetchData(`/auth/verify_2fa`, {
        method: "POST",
        body: registerData,
      });

      if (error) {
        setValidation("This Google authenticator code is not correct");
      } else {
        setValidation(false);
       //router.push(`/auth/login/${companyId}`);
       setStepIndex(stepIndex + 1);
      }
  };

  const handleIntroductionRegistration = async (data) => {
      try {
        const { result, error } = await fetchData(`/auth/register`, {
          method: "POST",
          body: {
            user: { ...data, company_id: companyId }
          },
        });

        if (error) {
          if (error.statusCode == 409) {
            setEmailValidation(false);
            setEmailValidationText(
              "This email address already has an account."
            );
          }
        } else {
          setValidation(false);
          setUser(result.user_id);
          setQrCode(result?.qrCode);
          setAuthenticatorCode(result?.secret);
          setStepIndex(stepIndex + 1);
          
        }
      } catch (err) {}
    
  };

  const handleOnboardingRegistration = async (data) => {
    try {
      const { result, error } = await fetchData(`/auth/register`, {
        method: "POST",
        body: {
          user: {
            first_name: registrationData?.first_name,
            middle_name: registrationData?.middle_name,
            last_name: registrationData?.last_name,
            email: registrationData?.email,
            password: registrationData?.password,
            company_id: companyId,
          },
          profile: {
            dob: registrationData?.dob.split('/').reverse().join('-') || null,
            phone: `${registrationData?.phoneCountryCode?.areaCode} ${registrationData?.phone}`,
            country: registrationData?.country?.isoCode,
            nationality: registrationData?.nationality?.isoCode,
            occupation: registrationData?.occupation,
            tax: registrationData?.tax,
            zip: registrationData?.zip,
            city: registrationData?.city,
            address: registrationData?.address,
            street: registrationData?.street,
            poa: registrationData?.poa,
            proofOfAddressDocument: registrationData?.proofOfAddressDocument,
          },
          onboarding: {
            netWorth: parseInt(data?.netWorth),
            annualIncome: parseInt(data?.annualIncome),
            bankName: data?.bankName,
            purposeOfAccountOpening: data?.purposeOfAccountOpening,
            sourceOfFunds: data?.sourceOfFunds,
            employed: data?.employed,
            employerName: data?.employerName,
            jobTitle: data?.jobTitle,
            monthlyTurnover: parseInt(data?.monthlyTurnover),
            transactionActivity: parseInt(data?.transactionActivity),
            purchaseMonthlyCrypto: parseInt(data?.purchaseMonthlyCrypto),
            purchaseAverageCrypto: parseInt(data?.purchaseAverageCrypto),
            purchaseTotalCrypto: parseInt(data?.purchaseTotalCrypto),
            sellMonthlyCrypto: parseInt(data?.sellMonthlyCrypto),
            sellAverageCrypto: parseInt(data?.sellAverageCrypto),
            sellTotalCrypto: parseInt(data?.sellTotalCrypto),
            bitcoinTrading: parseInt(data?.bitcoinTrading),
            ethereumTrading: parseInt(data?.ethereumTrading),
            tetherTrading: parseInt(data?.tetherTrading),
            otherTrading: parseInt(data?.otherTrading),
            irsConfirm: data?.irsConfirm,
            factaConfirm: data?.factaConfirm,
            criminalConfirm: data?.criminalConfirm,
            accurateConfirm: data?.accurateConfirm,
          },
        },
      });

      if (error) {
        if (error.statusCode == 409) {
          setValidation("Unable to register your account. Please contact support.");
        }
      } else {
        setValidation(false);
        setUser(result.user_id);
        setQrCode(result?.qrCode);
        setAuthenticatorCode(result?.secret);
        setVerificationLink(result?.profile?.verificationLink)
        setStepIndex(stepIndex + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleNextStep = async (data) => {
    
    await setRegistrationData((prevFormData) => ({
      ...prevFormData,
      ...data,
    }));
    
    if (COMPANY_ACCOUNT_TYPE.BANKING === company.company_account_type){
      if (registrationSteps[stepIndex] == "create_account") {
        handleRegistration(data);
      } else if (registrationSteps[stepIndex] == "create_onboarding") {
        handleOnboardingRegistration(data);
      } else if (registrationSteps[stepIndex] == "authenticator") {
        handleAuthenticator(data);
      } else {
        setStepIndex(stepIndex + 1);
      }
    }
    else{
      if (registrationSteps[stepIndex] == "create_account") {
        handleIntroductionRegistration(data);
      } else if (registrationSteps[stepIndex] == "authenticator") {
        handleAuthenticator(data);
      } else {
        setStepIndex(stepIndex + 1);
      }
    }
  };
  const handleBackStep = () => {
    setStepIndex(stepIndex - 1);
  };

  return (
    <>
      {company && (
        <>
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
              {validation && (
                <span className="text-alert text-xs text-center py-2 rounded-xl bg-alertLight my-4">
                  {validation}
                </span>
              )}
              {registrationSteps[stepIndex] === "select_banking_type" && (
                <ChooseService onNext={handleNextStep} />
              )}
              {registrationSteps[stepIndex] === "select_web3_type" && (
                <ChooseWallet onNext={handleNextStep} />
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
              {registrationSteps[stepIndex] === "create_onboarding" && (
                <Onboarding
                  onBack={handleBackStep}
                  setFormData={setFormData}
                  onContinue={handleNextStep}
                />
              )}
              {registrationSteps[stepIndex] === "kyc" && (
                <KYC
                  verification={verificationLink}
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

              {registrationSteps[stepIndex] === "create_email" && (
                <EmailInputs
                  onBack={handleBackStep}
                  setFormData={setFormData}
                  onConfirm={handleNextStep}
                />
              )}

              {registrationSteps[stepIndex] === "authenticator" && (
                <Authenticator
                  qrCode={qrCode}
                  authenticator={authenticatorCode}
                  onContinue={handleNextStep}
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
                className="font-semibold cursor-pointer  text-primary"
              >
                Sign in
              </button>
            </div>
          </Auth>
          {companyId && !company && (
            <Overlay message="You are trying to register under a company that does not exist"></Overlay>
          )}
        </>
      )}
    </>
  );
}
