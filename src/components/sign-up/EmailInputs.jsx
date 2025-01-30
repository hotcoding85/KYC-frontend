import { z } from 'zod'
import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import AuthInput from "@/components/Elements/Input/AuthInput";
import { AuthButton } from '@/components/Elements/Button/Button'

export function EmailInputs({ onBack, onConfirm, setFormData }) {
  const router = useRouter();
  const [validation, setValidation] = useState({});
  const [data, setData] = useState({
    email: "",
    referral: "",
  });

  const signupSchema = z.object({
    email: z.string().email().min(1, { message: "Email is required" }),
  });

  const onSubmit = () => {
    const validation = signupSchema.safeParse(data);
    
    setValidation(validation);
    if (validation.success) {
      setFormData((prev) => {
        return {
          ...prev,
          email: data.email,
          ...(data.referral && { referral: data.referral }),
        };
      });
      onConfirm();
    }
  };

  return (
    <div className="flex flex-col justify-between h-full mx-auto gap-4 w-full md:w-[500px]">
      <div className="mb-4 md:mb-6">
        <h2 className="mb-2 text-base font-semibold text-textBlack">
          Enter Email Address
        </h2>
        <p className="text-xs font-normal text-textSecondary">
          We’ll use this to create your account and keep you updated.
        </p>
      </div>

      {/* Email Input */}
      <div className="relative">
        <AuthInput
          label="Email Address*"
          type="email"
          value={data.email}
          onChange={({ target }) => {
            setData((prev) => {
              return {
                ...prev,
                email: target.value,
              };
            });
          }}
          error={
            !validation?.success &&
            validation.error?.issues?.find((issue) => issue.path[0] === "email")
              ?.message
          }
        />
      </div>

      <div className="relative">
        <AuthInput
          label="Referral ID (optional)"
          value={data.referral}
          onChange={({ target }) => {
            setData((prev) => {
              return {
                ...prev,
                referral: target.value,
              };
            });
          }}
        />
      </div>
      <div className="flex flex-col gap-10 mt-6">
        <AuthButton
          title="Continue"
          onClick={onSubmit}
          className="rounded-lg bg-primary"
        />
      </div>
    </div>
  );
}
