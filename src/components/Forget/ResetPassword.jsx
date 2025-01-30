"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthInput from "@/components/Elements/Input/AuthInput";
import { AuthButton } from "@/components/Elements/Button/Button";

export function ResetPasswordComponent({ onNext }) {
  const router = useRouter();
  const [email, setEmail] = useState("");

  return (
    <div className="flex flex-col justify-start h-full mx-auto gap-6 lg:gap-4 w-full md:w-[500px]">
      <div className="lg:mb-6">
        <h2 className="mb-2 text-base font-semibold text-textBlack">
          Forgot your password
        </h2>
        <p className="text-xs font-normal text-textSecondary">
          Enter your email and we&apos;ll send you a 6-digit One-Time Password
          (OTP) for verification.
        </p>
      </div>

      <AuthInput
        label="Email*"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="w-full lg:mt-10">
        <AuthButton
          title="Reset password"
          onClick={onNext}
          className="rounded-lg bg-primary"
        />

        <p className="mt-6 lg:mt-10 text-xs font-normal text-center text-textSecondary">
          {"Retry to "}
          <button
            onClick={() => {
              router.push("/auth/login");
            }}
            className="font-semibold cursor-pointer text-primary"
          >
            Sign in?
          </button>
        </p>
      </div>
    </div>
  );
}
