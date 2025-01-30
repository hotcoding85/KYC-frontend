import { useState } from "react";
import AuthInput from "@/components/Elements/Input/AuthInput";
import Button from "@/components/Elements/Button/Button";

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
        <h2 className="text-base font-semibold text-textBlack mb-2">
          Create @username
        </h2>
        <p className="font-normal text-xs text-textSecondary">
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

      <Button
        title="Create Username"
        disabled={!isAvailable}
        onClick={onCreate}
        className="w-full bg-primary border-none rounded-2xl text-white"
      />
    </div>
  );
}
