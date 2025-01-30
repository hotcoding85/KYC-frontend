"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import useApi from "@/hooks/useApi";
import AuthHeader from "@/components/sign-up/AuthHeader";
import Auth from "@/components/Auth/Auth";
import SignIn from "@/components/sign-in/SignIn";
import EnterCode from "@/components/sign-in/EnterCode";
import { useUser } from "@/app/context/UserContext";
import { useAuth } from "@/app/context/AuthContext";
import BackArrow from "@/Icons/BackArrow";
import { Toast } from "primereact/toast";

export default function SignInPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const { fetchData, loading, error } = useApi();
  const [companyId, setCompanyId] = useState(id);
  const loginData = useRef();
  const [otpData, setOTPData] = useState();
  const [company, setCompany] = useState(null);
  const [otpVerification, setOtpVerification] = useState(false);
  const { login } = useAuth();
  const { fetchUser } = useUser(); 
  const toast = useRef(null);
  const handleLogin = async (sentData) => {
    loginData.current = sentData;
    if (sentData.active) {
      if (sentData.user) {
        setOtpVerification(true);
      }
      else{
        handleOTP(sentData)
      }
    }
    else {
      toast.current.show({
        severity: "error",
        summary: "Warning",
        detail: "Your account has been disabled.",
        life: 3000,
      });
    }
  };

  const handleOTP = async (sentData) => {
    const { result, error } = await fetchData("/auth/login", {
      method: "POST",
      body: { ...loginData.current, token: sentData?.code },
    });

    if (error) {
      setCodeValidation(false);
    } else {
      handleSuccess();
    }
    setOTPData(sentData);
  };

  const handlePrevious = () => {
    setOtpVerification(false);
  };

  const handleSuccess = async () => {
    login();
    await fetchUser();
    await router.push(`/dashboard/home`);
  };

  return (
    <>
      <Auth company={company}>
          <div className="flex flex-col pt-12">
            {otpVerification && (
              <div
                className="flex items-center gap-2 mb-4"
                onClick={handlePrevious}
              >
                <BackArrow></BackArrow>
                <span className="text-xs font-normal cursor-pointer text-primary">
                  Back
                </span>
              </div>
            )}
            {!otpVerification && (
              <SignIn onSubmit={handleLogin} companyId={companyId} />
            )}
            {otpVerification && <EnterCode onSubmit={handleOTP} />}
          </div>
          <div className="mt-6 lg:mt-12 text-xs font-normal text-center text-textSecondary">
            {"Don't have an account? "}
            <button
              onClick={() => router.push(`/auth/register/${companyId || ""}`)}
              className="font-semibold cursor-pointer text-primary"
            >
              Sign up
            </button>
          </div>
        </Auth>
      <Toast ref={toast} baseZIndex={9999} />
    </>
  );
}
