"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthButton } from "@/components/Elements/Button/Button";

export default function EnterCode({ onSubmit }) {
  const [code, setCode] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(59);
  const router = useRouter();

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

    if (value && index < 5) {
      const nextInput = document.querySelector(
        `input[name="code-${index + 1}"]`
      );
      if (nextInput) nextInput.focus();
    }
  };

  const handleContinue = async () => {
    setLoading(true);
    await onSubmit({
      code: code,
    });
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-between h-full mx-auto gap-4 w-full md:w-[500px]">
      <div className="mb-4 md:mb-6">
        <h2 className="text-base font-semibold text-textBlack mb-2">
          Two- Factor Authentication
        </h2>
        <p className="font-normal text-xs text-textSecondary">
          Enter the code from your authentication app
        </p>
      </div>

      <div className="flex gap-2 md:gap-4 lg:my-10 justify-between h-[73px] py-2">
        {Array(6)
          .fill("")
          .map((_, idx) => (
            <input
              key={idx}
              type="text"
              name={`code-${idx}`}
              maxLength="1"
              onChange={(e) => handleCodeChange(e.target.value, idx)}
              className="w-full sm:w-16 text-sm font-semibold text-center border h-14 border-primary50 rounded-xl focus:outline-gray-400 text-textBlack"
            />
          ))}
      </div>

      <AuthButton
        isLoading={loading}
        disabled={loading}
        title="Continue"
        onClick={handleContinue}
        className="rounded-lg bg-primary"
      />
    </div>
  );
};
