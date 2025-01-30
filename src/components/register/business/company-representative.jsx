import React from 'react'
import { CheckboxItems, SingleInput } from "@/components/register/business/create-business"

const MinistryData = [
  "Head of the State, Head of the Government, Minister, Vice Minister or Deputy Minister, Secretary of State, Chancellor of the Parliament, the Governemnt or any Ministry",
  "Member of the Parliament",
  "Head of the State, Head of the Government, Minister, Vice Minister or Deputy Minister, Secretary of State, Chancellor of the Parliament, the Governemnt or any Ministry",
  "Mayor of the municipality, municipality administration director",
  "Head of the State, Head of the Government, Minister, Vice Minister or Deputy Minister, Secretary of State, Chancellor of the Parliament, the Governemnt or any Ministry",
  "Head of the State, Head of the Government, Minister, Vice Minister or Deputy Minister, Secretary of State, Chancellor of the Parliament, the Governemnt or any Ministry",
  "Head of the State, Head of the Government, Minister, Vice Minister or Deputy Minister, Secretary of State, Chancellor of the Parliament, the Governemnt or any Ministry",
  "Head of the State, Head of the Government, Minister, Vice Minister or Deputy Minister, Secretary of State, Chancellor of the Parliament, the Governemnt or any Ministry",
  "Head, deputy head, or member of the management body of political party"
]
const CompanyRepresentative = () => {
  return (
    <div className="flex justify-center max-h-[60vh] overflow-y-auto mt-4">
      <div className="flex flex-col items-start w-full sm:w-[500px] gap-4">
        <h2 className="font-semibold text-base text-textBlack">Company Representative</h2>

        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="col-span-2 sm:col-span-1 w-full">
            <SingleInput label="First Name*" />
          </div>
          <div className="col-span-2 sm:col-span-1 w-full">
            <SingleInput label="Last Name*" />
          </div>
          <div className="col-span-2 sm:col-span-1 w-full">
            <SingleInput label="Tax ID*" />
          </div>
          <div className="col-span-2 sm:col-span-1 w-full">
            <SingleInput label="Date of Birth*" isDatePicker />
          </div>
          <div className="col-span-2">
            <SingleInput label="Street Address*" />
          </div>
          <div className="col-span-2 sm:col-span-1 w-full">
            <SingleInput label="ZIP / Postal code*" />
          </div>
          <div className="col-span-2 sm:col-span-1 w-full">
            <SingleInput label="City*" />
          </div>
          <div className="col-span-2 sm:col-span-1 w-full">
            <SingleInput label="State / Province*" />
          </div>
          <div className="col-span-2 sm:col-span-1 w-full">
            <SingleInput label="Country*" isCountry />
          </div>
          <div className="col-span-2 sm:col-span-1 w-full">
            <SingleInput label="Phone number*" isPhone />
          </div>
          <div className="col-span-2 sm:col-span-1 w-full">
            <SingleInput label="Email*" />
          </div>
          <div className="col-span-2">
            <SingleInput label="Position at Company*" />
          </div>
        </div>

        <h3 className="font-semibold text-sm text-textBlack">Roles & Responsibilities</h3>

        <div className="flex flex-col gap-2 w-full">
          <CheckboxItems text="Passport" />
          <CheckboxItems text="Drivers License or State ID" />
          <CheckboxItems text="Temporary or permanent residence permission in the United States" />
          <CheckboxItems text="Other" />
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          <SingleInput label="Passport / ID Number*" />
          <SingleInput label="Date of Issue*" isDatePicker />
          <SingleInput label="Place of Issue*" />
          <SingleInput label="Date of Expiry*" isDatePicker />
          <div className="col-span-2 w-full">
            <label className="font-semibold text-sm text-textBlack">
              Representative is politically exposed person
            </label>
            <div className="flex items-center gap-4 my-4">
              <div className="flex items-center gap-2 rounded-[10px] border-[1px] border-primary50 py-1 px-2 w-full h-8 cursor-pointer">
                <input type="radio" className="w-4 h-4 border-[1px] border-textBlack" />
                <p className="font-normal text-xs text-textBlack">Yes</p>
              </div>
              <div className="flex items-center gap-2 rounded-[10px] border-[1px] border-primary50 py-1 px-2 w-full h-8 cursor-pointer">
                <input type="radio" className="w-4 h-4 border-[1px] border-textBlack" />
                <p className="font-normal text-xs text-textBlack">No</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              {MinistryData.map((each, idx) => (
                <CheckboxItems key={idx} customClasses="flex items-center gap-4">
                  <p className="font-normal text-xs text-textBlack">{each}</p>
                </CheckboxItems>
              ))}
            </div>
          </div>
          <label className="col-span-2 font-semibold text-sm text-textBlack">
            Specify the politically exposed person
          </label>
          <SingleInput label="First Name*" />
          <SingleInput label="Last Name*" />
          <SingleInput label="State / Institution*" />
          <SingleInput label="Position*" />
        </div>
      </div>
    </div>
  );
};

export default CompanyRepresentative;
