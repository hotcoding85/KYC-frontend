import { useState } from "react";
import AuthInput from "@/components/Elements/Input/AuthInput";
import { AuthButton } from "@/components/Elements/Button/Button";

export function PasswordComponent({ onBack, onConfirm }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="flex flex-col justify-between h-full mx-auto gap-4 w-full md:w-[500px]">
      <div className="mb-4 md:mb-6">
        <h2 className="mb-2 text-base font-semibold text-textBlack">
          Create Password
        </h2>
        <p className="text-xs font-normal text-textSecondary">
          Create a strong password to keep your account secure.
        </p>
      </div>

      {/* Password Input */}
      <AuthInput
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <AuthInput
        type="password"
        value={confirmPassword}
        label="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <p className="mb-6 text-xs font-normal text-textBlack">
        Password should have at least{" "}
        <span className="font-semibold">
          8 characters, 1 special character & 1 capital letter
        </span>
      </p>

      <AuthButton
        title="Continue"
        onClick={onConfirm}
        className="rounded-lg bg-primary"
      />
    </div>
  );
}
