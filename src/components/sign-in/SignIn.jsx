"use client";
import AuthInput from "@/components/Elements/Input/AuthInput";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthButton } from "@/components/Elements/Button/Button";
import useApi from "@/hooks/useApi";
  
export default function SignIn({ companyId, onSubmit }) {
  const { fetchData, loading, error } = useApi();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [emailValidation, setEmailValidation] = useState(null);
  const [emailValidationText, setEmailValidationText] = useState("");
  const [passwordValidation, setPasswordValidation] = useState(null);

  const handleBlurEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValidation(email.trim() !== "" && emailRegex.test(email));
    setEmailValidationText("Email is not valid.");
  };

  const handleBlurPassword = () => {
    setPasswordValidation(password.length >= 8);
  };

  const handleSignIn = async () => {
    const loginData = {
      email: email,
      password: password,
      company_id: companyId,
    };

    const { result, error } = await fetchData("/auth/login_request", {
      method: "POST",
      body: loginData,
    });

    if (error) {
      setEmailValidation(false);
      setEmailValidationText("Invalid email or password");
    } else {
      loginData.user = result.user
      loginData.active = result.active
      onSubmit(loginData);
    }
  };

  return (
    <div className="flex flex-col justify-start h-full mx-auto gap-6 lg:gap-4 w-full md:w-[500px]">
      <div>
        <h2 className="mb-2 text-base font-semibold text-textBlack">
          Welcome Back
        </h2>
        <p className="text-xs font-normal text-textSecondary">
          {`We're glad to see you again. Please enter your email address and password to sign in.`}
        </p>
      </div>

      <div className="lg:mt-6 lg:mb-6">
        <div className="relative">
          <AuthInput
            type="email"
            value={email}
            onBlur={handleBlurEmail}
            label="Email*"
            onChange={(e) => setEmail(e.target.value)}
            className={`border  p-3 rounded-2xl w-full ${
              emailValidation === false ? "border-red-500" : "border-gray-300"
            }  `}
          />
          <span
            className={`text-alert text-sm ${
              emailValidation === false ? "flex" : "hidden"
            }`}
          >
            {emailValidationText}
          </span>
        </div>

        <div className="relative mt-4">
          <AuthInput
            type="password"
            label="Password*"
            onBlur={handleBlurPassword}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`border  p-3 rounded-2xl w-full ${
              passwordValidation === false
                ? "border-red-500"
                : "border-gray-300"
            }  `}
          />
          <span
            className={`text-alert text-sm ${
              passwordValidation === false ? "flex" : "hidden"
            }`}
          >
            Password should be min. 8 character
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 mt-6 lg:mt-12">
          <p className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 border-[0.8px] border-primary50 rounded shadow-checkbox"
            />
            <span className="text-xs font-normal text-black">
              Remember me
            </span>
          </p>
          <p
            className="text-xs font-semibold cursor-pointer text-primary"
            onClick={() =>
              router.push(`/auth/forgot-password/${companyId || ""}`)
            }
          >
            Forgot password?
          </p>
        </div>
      </div>
      <div className="w-full">
        <AuthButton
          isLoading={loading}
          disabled={loading}
          title="Sign in"
          onClick={handleSignIn}
          className="rounded-lg bg-primary"
        />
      </div>
    </div>
  );
};
