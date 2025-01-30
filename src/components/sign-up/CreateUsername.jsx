import { useState } from "react";
import AuthInput from "@/components/Elements/Input/AuthInput";
import { AuthButton } from "@/components/Elements/Button/Button";

export function CreateUsernameComponent({ onBack, onCreate }) {
  const [username, setUsername] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);

    if (value.length >= 9 && value.length <= 16) {
      setIsAvailable(true);
    } else {
      setIsAvailable(false);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full mx-auto gap-4 w-full md:w-[500px]">
      <div className="mb-4 md:mb-6">
        <h2 className="mb-2 text-base font-semibold text-textBlack">
          Create @username
        </h2>
        <p className="text-xs font-normal text-textSecondary">
          Your watwallet username enables seamless peer-to-peer payments.
        </p>
      </div>

      {/* Username Input */}
      <div className="mb-6">
        <AuthInput
          label="Username"
          value={username}
          onChange={handleUsernameChange}
        />

        {/* Username availability and character count */}
        <div className="flex items-center justify-between mt-2">
          <p
            className={`text-xs font-normal ${
              isAvailable ? "text-success" : "text-alert"
            }`}
          >
            Username {isAvailable ? "available" : "unavailable"}
          </p>
          <p className="text-sm text-gray-500">{username.length}/16</p>
        </div>
      </div>

      <AuthButton
        onClick={onCreate}
        title="Create Username"
        disabled={!isAvailable}
        className="rounded-lg bg-primary"
      />
    </div>
  );
}
