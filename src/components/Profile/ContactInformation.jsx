"use client";
import { RiSearchLine } from "react-icons/ri";
import DropDown from "@/components/Elements/DropDown/DropDown";
import Country from "../Elements/Country/Country";
import { country as Countries } from "@/data/Country/Country";
import { useState, useEffect } from "react";
import CountriesPhone from "../Elements/Country/CountriesNumber";

const ContactInformation = ({
  formData,
  profile,
  stateOptions,
  state,
  countryOptions,
  country,
  onInputChange,
  onStateChange,
  onCountryChange,
  onPhoneChange,
  onPhoneCountryCodeChange,
  onProfileInputChange
}) => {
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Update phone input
  const handlePhoneChange = (value) => {
    onPhoneChange(value);
  };

  // Update country code
  const handleCountryCodeChange = (value) => {
    onPhoneCountryCodeChange(Countries.find(ct => ct.value === value.value) ? Countries.find(ct => ct.value === value.value).areaCode : '+971');
    setIsOpen(false)
  };

  return (
    <div>
      <h2 className="mb-2.5 font-inter text-sm font-semibold text-textBlack leading-[20px] tracking-[-0.005em] text-left">
        Contact Information
      </h2>

      <div className="flex flex-col gap-1">
        {/* First Row: Email and Phone */}
        <div className="flex flex-col justify-between gap-2 md:flex-row ">
          {/* Email */}
          <div className="w-full md:w-1/2">
            <label className="block text-xs font-normal text-textBlack mb-1 leading-4 font-inter">Email</label>
            <input
              type="email"
              value={formData?.email || ''}
              onChange={(e) => onInputChange(e, "email")}
              placeholder="Email"
              className="w-full px-3 py-2.5  border rounded-[10px] h-8 border-primary50 text-xs text-textBlack"
            />
          </div>

          {/* Phone Number */}
          <div className="w-full md:w-1/2">
            <label className="block text-xs font-normal text-textBlack mb-1 leading-4 font-inter">Phone number</label>
            <div className="flex gap-8">
              {/* Country Code Dropdown */}
              <CountriesPhone
                open={isOpen}
                onToggle={() => setIsOpen(!isOpen)}
                onChange={(value) => handleCountryCodeChange(value)}
                selectedValue={Countries.find(
                  (option) => option.areaCode === formData?.phoneCountryCode
                )}
                className="w-[110px] h-8 text-xs"
                options={Countries.map((countryOption) => ({
                  value: countryOption.label, // Use label as value
                  label: `${countryOption.flag} ${countryOption.label}`,
                }))}
              />

              {/* Phone Input */}
              <input
                type="text"
                value={formData?.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="Phone number"
                className="w-full px-3 py-2.5 border rounded-[10px] h-8 border-primary50 text-xs text-textBlack"
              />
            </div>
          </div>
        </div>

        {/* Second Row: Address */}
        <div className="relative">
          <label className="block text-xs text-textBlack mb-1 leading-4 font-inter">Street Address</label>
          <div className="flex items-center">
            <RiSearchLine  className="absolute text-gray-400 left-3" />
            <input
              type="text"
              value={formData?.address}
              onChange={(e) => onInputChange(e, "address")}
              placeholder="123 Main Street, Suite 400"
              className="w-full px-3 py-2.5 text-xs pl-8 border rounded-[10px] h-8 border-primary50 text-textBlack"
            />
          </div>
        </div>

        {/* Third Row: City and State */}
        <div className="flex flex-col justify-between gap-2 md:flex-row">
          {/* City */}
          <div className="w-full md:w-1/2">
            <label className="block text-xs text-textBlack mb-1 leading-4 font-inter">City</label>
            <input
              type="text"
              value={formData?.city}
              onChange={(e) => onInputChange(e, "city")}
              placeholder="City"
              className="w-full px-3 py-2.5  border rounded-[10px] h-8 border-primary50  text-xs text-textBlack"
            />
          </div>

          {/* State */}
          <div className="w-full md:w-1/2">
            <label className="block text-xs text-textBlack mb-1 leading-4  font-inter">State</label>
            <input
              type="text"
              value={formData?.state}
              onChange={(e) => onStateChange(e.target.value)}
              placeholder="State"
              className="w-full px-3 py-2.5  border rounded-[10px] h-8 border-primary50  text-xs text-textBlack"
            />
          </div>
        </div>

        {/* Fourth Row: ZIP Code and Country */}
        <div className="flex flex-col justify-between gap-2 md:flex-row">
          {/* ZIP Code */}
          <div className="w-full md:w-1/2 md:mt-1">
            <label className="block text-xs text-textBlack mb-1 leading-4  font-inter">
              ZIP Code
            </label>
            <input
              type="text"
              value={formData?.zip}
              onChange={(e) => onInputChange(e, "zip")}
              placeholder="ZIP Code"
              className="w-full px-3 py-2.5  border rounded-[10px] h-8 border-primary50  text-xs text-textBlack"
            />
          </div>

          {/* Country */}
          <div className="w-full md:mt-1 md:w-1/2">
            <label className="block text-xs text-textBlack mb-1 leading-4  font-inter">
              Country/Region
            </label>
            <Country
              id="country-selector"
              open={isCountryOpen}
              onToggle={() => setIsCountryOpen(!isCountryOpen)}
              onChange={onCountryChange}
              selectedValue={Countries.find(
                (option) => option.title === formData?.country
              )}
              className={`w-full text-xs border rounded-[10px] h-8 border-primary50`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
