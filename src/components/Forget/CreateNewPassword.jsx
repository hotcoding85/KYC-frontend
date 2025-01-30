"use client";
import { useState } from "react";
import AuthInput from "@/components/Elements/Input/AuthInput";
import { AuthButton } from "@/components/Elements/Button/Button";

export function CreateNewPasswordComponent({ onNext }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="flex flex-col justify-start h-full mx-auto gap-6 lg:gap-4 w-full md:w-[500px]">
      <div className="lg:mb-6">
        <h2 className="mb-2 text-base font-semibold text-textBlack">
          Create New Password
        </h2>
        <p className="text-xs font-normal text-textSecondary">
          Create a strong password to keep your account secure.
        </p>
      </div>

      {/* Password Input */}
      <div className="mt-6 lg:mt-10 mb-4">
        <AuthInput
          type="password"
          value={password}
          label="New Password*"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mb-6 lg:mb-10">
        <AuthInput
          type="password"
          value={confirmPassword}
          label="Confirm new Password*"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className="w-full lg:mt-10">
        <AuthButton
          className="rounded-lg bg-primary"
          title="Set new password"
          onClick={onNext}
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
