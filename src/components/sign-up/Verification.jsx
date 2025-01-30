import { useState, useEffect } from "react";
import { AuthButton } from "@/components/Elements/Button/Button";

export function VerificationComponent({
  onBack,
  onContinue,
  type,
  contactInfo,
  changeInfoText
}) {
  const [timer, setTimer] = useState(59);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  return (
    <div className="flex flex-col justify-between h-full mx-auto gap-4 w-full md:w-[500px]">
      <div className="mb-4 md:mb-6">
        <h2 className="mb-2 text-base font-semibold text-textBlack">
          {`${type} Verification`}
        </h2>
        <p className="mb-2 text-xs font-normal text-textSecondary">
          {`You're almost there! Just enter the 6-digit code that we sent to ${contactInfo}.`}
        </p>
        <p className="inline mt-3 text-xs font-normal border-b cursor-pointer text-primary border-primary">
          {changeInfoText}
        </p>
      </div>

      <div className="flex gap-2 md:gap-4 mt-10 justify-between h-[73px] py-2">
        {Array(6)
          .fill("")
          .map((_, idx) => (
            <input
              key={idx}
              type="text"
              name={`code-${idx}`}
              maxLength="1"
              // value={digit}
              // onChange={(e) => handleCodeChange(e.target.value, idx)}
              className="w-16 text-sm font-semibold text-center border h-14 border-primary50 rounded-xl focus:outline-gray-400"
            />
          ))}
      </div>

      <p className="mt-4 mb-10 text-xs font-normal text-center text-primary">
        Resend code in {timer < 10 ? `0:0${timer}` : `0:${timer}`}
      </p>

      <AuthButton
        title="Continue"
        onClick={onContinue}
        className="rounded-lg bg-primary"
      />
    </div>
  );
}
