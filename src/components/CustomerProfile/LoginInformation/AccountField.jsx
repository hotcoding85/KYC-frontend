import Toggle from "@/Icons/Toggle";
import React from "react";
import Button from "@/components/Elements/Button/Button";
import VisibilityOn from "@/Icons/VisibilityOn";
import VisibilityOff from "@/Icons/VisibilityOff";
import Image from "next/image";

const AccountField = ({
  title,
  description,
  value,
  actionLabel,
  secondaryActionLabel,
  onActionClick,
  onSecondaryActionClick,
  isPasswordField,
  isToggleField,
  isToggled,
  showPassword,
}) => {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-xl ">
      <h3 className="mb-1 text-lg font-semibold">{title}</h3>
      <p className="mb-3 text-sm text-gray-500">{description}</p>

      <div className="flex flex-col items-start justify-between p-2 mt-2 space-y-4 border rounded-lg md:flex-row md:space-y-0">
        <div>
          {isPasswordField ? (
            <div className="flex items-center space-x-2">
              <p className="pt-1 my-auto mt-1 text-base font-semibold">
                **********
              </p>
              {showPassword ? <VisibilityOn /> : <VisibilityOff />}
            </div>
          ) : isToggleField ? (
            <div className="flex items-center my-auto space-x-2">
              <p className="my-auto mt-1 text-base font-semibold">{value}</p>
            </div>
          ) : (
            <p className="my-auto mt-2 text-sm font-semibold">{value}</p>
          )}
        </div>

        {/* Buttons and Toggle */}
        <div className="flex flex-col items-start w-full space-y-2 md:flex-row md:space-x-2 md:space-y-0 md:w-auto">
          {secondaryActionLabel && (
            <Button
              title={secondaryActionLabel}
              onClick={onSecondaryActionClick}
              className="w-full text-gray-700 bg-white md:w-auto"
              textClassName="text-sm font-medium"
            />
          )}
          {isToggled && (
            <div className="flex items-center justify-center my-auto">
              <Toggle className="w-[50px] h-10"/>
            </div>
          )}
          {actionLabel && (
            <Button
              title={actionLabel}
              onClick={onActionClick}
              className="w-full bg-primary text-white md:w-auto"
              textClassName="text-sm font-medium"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountField;
