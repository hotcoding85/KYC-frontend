import { useState } from "react";
import AuthInput from "@/components/Elements/Input/AuthInput";
import Button from "@/components/Elements/Button/Button";

export function PasswordComponent({ onBack, onConfirm }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="flex flex-col justify-between h-full mx-auto gap-4 w-full md:w-[500px]">
      <div className="mb-4 md:mb-6">
        <h2 className="text-base font-semibold text-textBlack mb-2">
          Create Password
        </h2>
        <p className="font-normal text-xs text-textSecondary">
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

      <p className="font-normal text-xs text-textBlack mb-6">
        Password should have at least{" "}
        <span className="font-semibold">
          8 characters, 1 special character & 1 capital letter
        </span>
      </p>

      <Button
        title="Continue"
        onClick={onConfirm}
        className="w-full bg-primary border-none rounded-2xl text-white"
      />
    </div>
  );
}
