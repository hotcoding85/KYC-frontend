import { z } from "zod";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AuthInput from "@/components/Elements/Input/AuthInput";
import { AuthButton } from "@/components/Elements/Button/Button";
import OTP from "@/components/Elements/OTP/OTP";

const formSchema = z.object({
  otp: z
    .string()
    .length(6, { message: "OTP must be exactly 6 digits" })
    .regex(/^\d{6}$/, { message: "OTP must contain only numbers" }),
});


export function Authenticator({ qrCode,authenticator, onContinue }) {
  const [validation, setValidation] = useState();
  const [code, setCode] = useState("");
  const [data, setData] = useState({
    otp: "",
  });


  const getCode = (c) => {
    setCode(c.join(""));
    setData({
      otp:code
    }) 
  };

  const onSubmit = () => {
      onContinue(data);
  };

  return (
    <div className="flex flex-col justify-between h-full mx-auto gap-4 w-full md:w-[500px]">
      <div>
        <div className="items-center">
          <div className="text-base font-semibold text-textBlack mb-2">
            Authentication App
          </div>
          <div className="flex flex-row justify-start">
            <h2 className="text-xs text-base text-textSecondary">
              Using an authenticator app like Google Authenticator, Microsoft
              Authenticator, Authy or iPassword, scan this QR code. It will
              generate a 6 digit code for you to enter below.
            </h2>
          </div>
        </div>
        <img src={qrCode} className="w-48 h-48 m-auto my-2" />
        <p className="text-xs text-base text-textSecondary">
          If scanning does not work please copy the below code to add it
          manually to your authenticator app
        </p>
        <div className="bg-gray-200 rounded-xl text-center w-full p-4 my-4 text-textBlack">
          {authenticator}
        </div>
        <div className="flex flex-col justify-between gap-1 text-xs">
          <p>Enter Authenticator Code</p>
          <OTP onChange={getCode} className="border-gray-300 m-auto"></OTP>
        </div>
        {validation?.issues?.some((issue) => issue.path[0] === "otp") && (
          <span className="text-alert text-xs">
            {
              validation.issues.find((issue) => issue.path[0] === "otp")
                ?.message
            }
          </span>
        )}
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
