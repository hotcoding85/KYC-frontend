import Plus from "@/Icons/Plus";
import Solaruploadlinear from "@/Icons/Solaruploadlinear";
import Image from "next/image";
import React, { useState } from "react";
import { TextButton } from "@/components/Elements/Button/Button";
import {
  CheckboxItems,
  SingleInput,
} from "@/components/register/business/create-business";
import Chevdown from "@/Icons/Chevdown";

const SignificantParties = () => {
  const [isAdditionalOpen, setAdditionalOpen] = useState(false);
  return (
    <div className="flex justify-center max-h-[60vh] overflow-y-auto">
      <div className="flex flex-col items-start w-[500px] gap-4">
        <h2 className="font-semibold text-base text-textBlack">
          Significant Parties
        </h2>
        <p className="font-normal text-xs text-textSecondary">
          Please provide details for all significant parties of the entity,
          including beneficial owners and/or control persons.
        </p>

        <SignificantPartyAccordion title="Significant Party 1">
          <div className="flex flex-col gap-4 pt-4">
            <h2 className="font-semibold text-sm text-textBlack">
              Primary Information
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <SingleInput label="First Name*" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <SingleInput label="Last Name*" />
              </div>
              <div className="col-span-2">
                <SingleInput label="Email*" />
                <p className="mt-2 font-normal text-[11px] text-textSecondary">
                  An invitation will be sent to this email for the person to
                  complete their profile.
                </p>
              </div>
            </div>

            <h3 className="font-semibold text-sm text-textBlack">
              Roles & Responsibilities
            </h3>
            <CheckboxItems>
              <p className="font-normal text-xs text-textBlack ml-2">
                Is this person a <span className="font-semibold">Director</span>
                ?
              </p>
            </CheckboxItems>
            <CheckboxItems>
              <p className="font-normal text-xs text-textBlack ml-2">
                Is this person also a{" "}
                <span className="font-semibold">Shareholder</span>?
              </p>
            </CheckboxItems>

            <div className="pl-8 w-full flex flex-col gap-1">
              <label className="font-normal text-xs text-textBlack">
                Percentage of Shares Owned (%)*
              </label>
              <input
                type="text"
                className="border-[1px] border-primary50 py-1 px-2 rounded-[10px]"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <p>Additional Details (optional)</p>
              <Plus className="w-5 h-5" />
            </div>
            <div
              className={`${
                !isAdditionalOpen ? "h-0 overflow-hidden" : "h-full"
              } transition-all`}
            >
              <AdditionalDetails />
            </div>
          </div>
        </SignificantPartyAccordion>

        <TextButton
          title="Add Significant Party"
          textColor="text-textBlack"
          backgroundColor="bg-white"
          borderColor="border-[1px] border-primary50"
          width="w-full"
          className="py-1 px-4 text-xs font-normal"
        />
      </div>
    </div>
  );
};

export default SignificantParties;

const SignificantPartyAccordion = ({ title, children }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div
      className={`rounded-2xl border-[1px] border-primary50 ${
        isOpen && "pb-4"
      } pt-4 px-4 w-full`}
    >
      <div
        className={`flex items-center justify-between ${
          isOpen && "border-b-[1px] border-b-primary50"
        } pb-4 cursor-pointer`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <h2 className="font-semibold text-sm text-textBlack">{title}</h2>
        <Chevdown className={`${isOpen && "rotate-180"} transition-all w-5 h-5`} />
      </div>

      {isOpen && children}

      {isOpen && (
        <TextButton
          width="w-full"
          title="Remove Significant Party"
          className="py-1 px-4 text-xs font-normal mt-4"
        />
      )}
    </div>
  );
};

const AdditionalDetails = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <SingleInput label="Title*" />
      <SingleInput label="Date of Birth*" isDatePicker />
      <SingleInput label="Nationality*" />
      <SingleInput label="Position at the Company*" />
      <SingleInput label="Phone number*" isPhone />
      <SingleInput label="Country*" isCountry />
      <SingleInput label="Tax ID number / SSN*" />
      <SingleInput label="State / Province*" />
      <SingleInput label="City*" />
      <SingleInput label="Street Address*" />
      <SingleInput label="Street Address 2" />
      <SingleInput label="Postal / ZIP Code*" />
      <div className="col-span-2 w-full">
        <label className="font-normal text-xs text-textBlack mb-1">
          Controlling Party*
        </label>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-[10px] border-[1px] border-primary50 py-1 px-2 w-full h-8 cursor-pointer">
            <input
              type="radio"
              className="w-4 h-4 border-[1px] border-textBlack"
            />
            <p className="font-normal text-xs text-textBlack">Yes</p>
          </div>
          <div className="flex items-center gap-2 rounded-[10px] border-[1px] border-primary50 py-1 px-2 w-full h-8 cursor-pointer">
            <input
              type="radio"
              className="w-4 h-4 border-[1px] border-textBlack"
            />
            <p className="font-normal text-xs text-textBlack">No</p>
          </div>
        </div>
      </div>
      <div className="col-span-2 w-full">
        <label className="font-normal text-xs text-textBlack mb-1">
          Proof of Address*
        </label>
        <div className="flex flex-col items-center justify-center w-full py-[30px] px-2 border-[1px] border-dashed rounded-2xl cursor-pointer">
          <Solaruploadlinear className="w-6 h-6"/>
          <p className="font-semibold text-xs text-textBlack mt-2">PDF File</p>
          <p className="font-normal text-[11px] text-textSecondary mt-1">
            Click or drag to upload
          </p>
        </div>
      </div>
    </div>
  );
};
