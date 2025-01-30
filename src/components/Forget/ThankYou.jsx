"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AuthButton } from "@/components/Elements/Button/Button";
import DoneImg from "@/Icons/DoneImg";

export function PasswordResetThankYouComponent() {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-start h-full mx-auto gap-6 lg:gap-4 w-full md:w-[500px]">
      <h2 className="mb-2 text-base font-semibold text-primary">Thank you</h2>
      <p className="text-xs font-normal text-textSecondary">
        Your password has been reset.
      </p>

      {/* Password Input */}
      <div className="flex flex-col items-center mt-6 lg:mt-10 mb-6 lg:mb-4">
        <DoneImg className="w-[500px] h-[220px]" />
      </div>

      <AuthButton
        title="Go to Sign in"
        className="rounded-lg bg-primary"
        onClick={() => router.push("/auth/login")}
      />
    </div>
  );
}
