import { useState } from "react"
import Button from "@/components/Elements/Button/Button"

export function PasscodeComponent({ title, subtitle, onBack, onConfirm }) {
  const [passcode, setPasscode] = useState(Array(6).fill(""));

  const handlePasscodeChange = (value, idx) => {
    const newPasscode = [...passcode];
    newPasscode[idx] = value.slice(-1);
    setPasscode(newPasscode);
  };

  return (
    <div className="flex flex-col justify-between h-full mx-auto gap-4 w-full md:w-[500px]">
      <div className="mb-4 md:mb-6">
        <h2 className="text-base font-semibold text-textBlack mb-2">{title}</h2>
        <p className="font-normal text-xs text-textSecondary">{subtitle}</p>
      </div>

      <div className="flex justify-center gap-6 mb-12">
        {passcode.map((value, idx) => (
          <input
            key={idx}
            type="password"
            maxLength="1"
            value={value}
            onChange={(e) => handlePasscodeChange(e.target.value, idx)}
            className="w-6 h-6 text-center border-[1.5px] border-primary50  rounded-full"
          />
        ))}
      </div>
      <Button
        title="Continue"
        onClick={() => onConfirm(passcode)}
        className="w-full bg-primary border-none rounded-2xl text-white"
      />
    </div>
  );
}
