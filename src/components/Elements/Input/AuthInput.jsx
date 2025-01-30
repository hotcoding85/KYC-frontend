import React, { useState } from 'react';
import VisibilityOn from "@/Icons/VisibilityOn"
import VisibilityOff from "@/Icons/VisibilityOff"

const AuthInput = ({ label, type, name, value, onChange, placeholder, className, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {type === "password" ? (
        <div className="relative">
          {label && (
            <label className="block mb-1 text-xs font-normal text-textBlack">
              {label}
            </label>
          )}
          <input
            value={value}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            type={showPassword ? "text" : "password"}
            className={`w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack ${className}`}
          />
          <button
            type="button"
            className="absolute right-3 top-[26px]"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <VisibilityOn /> : <VisibilityOff />}
          </button>
        </div>
      ) : (
        <div>
          {label && (
            <label className="block mb-1 text-xs font-normal text-textBlack">
              {label}
            </label>
          )}
          <input
            value={value}
            name={name}
            onChange={onChange}
            type={type || "text"}
            placeholder={placeholder}
            className={`w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack ${className}`}
          />
          {error && <p className="mt-1 text-sm text-alert">{error}</p>}
        </div>
      )}
    </>
  );
};

export default AuthInput;
