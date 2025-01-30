import { useState, useEffect } from "react";
import Button from "@/components/Elements/Button/Button";
import OTP from "@/components/Elements/OTP/OTP";

export function VerificationComponent({
  onBack,
  onContinue,
  type,
  contactInfo,
  changeInfoText
}) {
  const [timer, setTimer] = useState(59);
  const [codeValidation, setCodeValidation] = useState(null);
  const [code, setCode] = useState("");

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

   const getCode = (code) => {
     setCode(code.join(""));
   };

  return (
    <div className="flex flex-col justify-between h-full mx-auto gap-4 w-full md:w-[500px]">
      <div className="mb-4 md:mb-6">
        <h2 className="text-base font-semibold text-textBlack mb-2">
          {`${type} Verification`}
        </h2>
        <p className="font-normal text-xs text-textSecondary mb-2">
          {`You're almost there! Just enter the 6-digit code that we sent to ${contactInfo}.`}
        </p>
        <p className="mt-3 text-xs text-primary font-normal cursor-pointer border-b border-primary inline">
          {changeInfoText}
        </p>
      </div>

      <div className="flex gap-2 md:gap-4 mt-10 justify-between h-[73px] py-2 mx-auto">
        <OTP
          onChange={getCode}
          className={
            codeValidation === false && code.length == 6
              ? "border-red-500"
              : "border-gray-300"
          }
          validationMessage={
            codeValidation === false && code.length == 6
              ? "Invalid authentication code"
              : ""
          }
        ></OTP>
      </div>

      <p className="font-normal text-xs text-primary text-center mt-4 mb-10">
        Resend code in {timer < 10 ? `0:0${timer}` : `0:${timer}`}
      </p>

      <Button
        title="Continue"
        onClick={onContinue}
        className="w-full bg-primary border-none rounded-2xl text-white"
      />
    </div>
  );
}
