import React, { useState } from "react";
import AuthInput from "@/components/Elements/Input/AuthInput";
import { country as Countries } from "@/data/Country/Country";
import Button from "@/components/Elements/Button/Button"
import CountriesPhone from "@/components/Elements/Country/CountriesNumber";

export function MobileNumberComponent({ onBack, onContinue }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(() => Countries.filter(each => each.value === "AE")[0])

  return (
    <div className="flex flex-col justify-center mx-auto w-full md:w-[500px]">
      <div className="mb-4 md:mb-10">
        <h2 className="text-base font-semibold text-textBlack mb-2">
          Enter Mobile Number
        </h2>
        <p className="font-normal text-xs text-textSecondary">
          To verify your identity and protect your account from fraudsters.
        </p>
      </div>

      <p className="mb-1 text-xs font-normal text-textBlack">Phone Number</p>
      <div className="flex items-center gap-2 mb-10 w-full">
        <CountriesPhone
          id={"country-selector"}
          open={isOpen}
          onChange={(value) => setSelectedValue(value)}
          onToggle={() => setIsOpen((prev) => !prev)}
          selectedValue={Countries.find(
            (option) => option.areaCode === selectedValue.areaCode
          )}
          className={`border border-primary50`}
        />

        <AuthInput
          onChange={({ target }) => {
            console.log(target.value);
          }}
        />
      </div>
      <Button
        title="Continue"
        onClick={onContinue}
        className="w-full bg-primary border-none rounded-2xl text-white"
      />
    </div>
  );
}
