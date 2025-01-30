"use client";
import { AuthButton } from "@/components/Elements/Button/Button";
import { useState, useEffect } from "react";

export function VerifyEmailComponent({ onNext, onBack }) {
  const [code, setCode] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(59);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleCodeChange = (value, index) => {
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
  };

  return (
    <div className="flex flex-col justify-start h-full mx-auto gap-6 lg:gap-4 w-full md:w-[500px]">
      <div className="mb-4 md:mb-6">
        <h2 className="mb-2 text-base font-semibold text-textBlack">
          Two-Factor Authentication
        </h2>
        <p className="text-xs font-normal text-textSecondary">
          Enter the code from your authentication app
        </p>
      </div>

      <div className="flex gap-2 md:gap-4 my-10 justify-between h-[73px] py-2">
        {Array(6)
          .fill("")
          .map((_, idx) => (
            <input
              key={idx}
              type="text"
              name={`code-${idx}`}
              maxLength="1"
              onChange={(e) => handleCodeChange(e.target.value, idx)}
              className="w-full h-auto text-sm font-semibold text-center border sm:w-16 sm:h-14 border-primary50 rounded-xl focus:outline-gray-400"
            />
          ))}
      </div>

      <AuthButton
        title="Continue"
        className="rounded-lg bg-primary"
        onClick={onNext}
      />
    </div>
  );
}
