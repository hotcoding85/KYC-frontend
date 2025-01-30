import { z } from 'zod'
import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import AuthInput from "@/components/Elements/Input/AuthInput";
import Button from '@/components/Elements/Button/Button'

export function EmailInputComponent({ onBack, onContinue, setFormData }) {
  const router = useRouter()
  const [validation, setValidation] = useState({});
  const [data, setData] = useState({
    email: '',
    referral: ''
  })

  const signupSchema = z.object({
    email: z.string().email().min(1, { message: "Email is required" })
  })

  const onSubmit = () => {
    const validation = signupSchema.safeParse(data)
    setValidation(validation)
    if (validation.success) {
      setFormData(prev => {
        return {
          ...prev,
          email: data.email,
          ...(data.referral && { referral: data.referral })
        }
      })
      onContinue()
    }
  }

  return (
    <div className="flex flex-col justify-between h-full mx-auto gap-4 w-full md:w-[500px]">
      <div className="mb-4 md:mb-6">
        <h2 className="text-base font-semibold text-textBlack mb-2">
          Enter Email Address
        </h2>
        <p className="font-normal text-xs text-textSecondary">
          We’ll use this to create your account and keep you updated.
        </p>
      </div>

      {/* Email Input */}
      <div className="mb-4">
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

      {/* Referral ID */}
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

      <div className="flex flex-col gap-10 mt-6">
        <Button
          title="Create new account"
          onClick={onSubmit}
          className="w-full bg-primary border-none rounded-2xl text-white"
        />
      </div>
    </div>
  );
}
