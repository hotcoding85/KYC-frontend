import { TextButton } from "@/components/Elements/Button/Button";
import Solaruploadlinear from "@/Icons/Solaruploadlinear";
import Image from "next/image";
import React from 'react'
import { CheckboxItems, SingleInput } from "@/components/register/business/create-business"

const activityData = [
  "Revenue",
  "Financial support from state/international bodies",
  "Investments",
  "Dividends from branches",
  "Loans/Credits Donations",
  "Other"
]
const Funding = () => {
  return (
    <div className="flex justify-center max-h-[60vh] overflow-y-auto mt-4">
      <div className="flex flex-col items-start w-[500px] gap-4">
        <h2 className="font-semibold text-base text-textBlack">Funding</h2>
        <h3 className="font-semibold text-sm text-textBlack">Authorized Capital</h3>

        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="col-span-2 sm:col-span-1">
            <SingleInput label="Authorized Capital*" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <SingleInput label="Source of Authorized Capital*" />
          </div>
        </div>

        <div className="w-full">
          <label className="font-normal text-xs text-textBlack mb-1">Proof of Authorized Capital*</label>
          <div className="flex flex-col items-center justify-center w-full py-[30px] px-2 border-[1px] border-dashed rounded-2xl cursor-pointer">
            <Solaruploadlinear className="w-6 h-6"/>
            <p className="font-semibold text-xs text-textBlack mt-2">PDF File</p>
            <p className="font-normal text-[11px] text-textSecondary mt-1">Click or drag to upload</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          <label className="col-span-2 font-semibold text-sm text-textBlack">Turnover</label>
          <div className="col-span-2 sm:col-span-1">
            <SingleInput label="Previous Year*" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <SingleInput label="Planned for Coming Year*" />
          </div>
          <div className="col-span-2 w-full">
            <SingleInput label="Bank Account Signatures (include full names)*" />
          </div>
        </div>

        <p className="font-semibold text-sm text-textBlack">
          Source Funds Information
        </p>
        {activityData.map((each, idx) => (
          <CheckboxItems key={idx} customClasses="flex items-center gap-4">
            <p className="font-normal text-xs text-textBlack">{each}</p>
          </CheckboxItems>
        ))}

        <p className="font-semibold text-sm text-textBlack">External Investment</p>
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="col-span-2">
            <SingleInput label="Investment Company Name" />
          </div>
          <div className="col-span-2">
            <SingleInput label="Investment Company Address" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <SingleInput label="Amount Invested" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <SingleInput label="Date of Investment" isDatePicker />
          </div>
        </div>

        <p className="font-semibold text-sm text-textBlack">
          Internal Investment
        </p>
        <div className="w-full">
          <p className="mb-2 font-normal font-xs text-textBlack">
            Internal Investor 1
          </p>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="col-span-2 sm:col-span-1">
              <SingleInput label="Employee Name" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <SingleInput label="Position Held" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <SingleInput label="Amount Invested" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <SingleInput label="Date of Investment" isDatePicker />
            </div>
            <div className="col-span-2 w-full">
              <SingleInput label="Source of Wealth" />
            </div>
            <div className="col-span-2 w-full">
              <TextButton
                width="w-full"
                className="py-1 px-4"
                backgroundColor="bg-white"
                textColor="text-textBlack"
                title="Add Internal Investor"
                borderColor="border border-primary50"
              />
            </div>
          </div>
        </div>

        <p className="font-semibold text-sm text-textBlack">
          Company Sale
        </p>
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="col-span-2 sm:col-span-1">
            <SingleInput label="Name of Company" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <SingleInput label="Country of Incorporation*" />
          </div>
          <div className="col-span-2 w-full">
            <SingleInput label="Company Address" />
          </div>
          <div className="col-span-2 w-full">
            <SingleInput label="Nature of Business" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <SingleInput label="Amount of Sale" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <SingleInput label="Date of Sale" isDatePicker />
          </div>
        </div>

        <p className="font-semibold text-sm text-textBlack">
          Inheritance
        </p>
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="col-span-2 w-full">
            <SingleInput label="Name and Relationship to Donor" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <SingleInput label="Amount Received" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <SingleInput label="Date Received" isDatePicker />
          </div>
        </div>

        <p className="font-semibold text-sm text-textBlack">
          Property Sale
        </p>
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="col-span-2 w-full">
            <SingleInput label="Address of Property" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <SingleInput label="Amount of Sale" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <SingleInput label="Date of Sale" isDatePicker />
          </div>
        </div>

        <p className="font-semibold text-sm text-textBlack">
          Loan
        </p>
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="col-span-2 w-full">
            <SingleInput label="Name / Address of Lender" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <SingleInput label="Amount of Loan" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <SingleInput label="Date of Loan" isDatePicker />
          </div>
          <div className="col-span-2 w-full">
            <SingleInput label="Purpose of Loan" />
          </div>
        </div>

        <p className="font-semibold text-sm text-textBlack">
          Other
        </p>
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="col-span-2 w-full">
            <SingleInput label="Nature of income" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <SingleInput label="Payee" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <SingleInput label="Date Received" isDatePicker />
          </div>
          <div className="col-span-2 w-full">
            <SingleInput label="Amount Received" />
          </div>
        </div>

        <p className="font-semibold text-sm text-textBlack">
          Supporting Documents
        </p>
        <div className="col-span-2 w-full">
          <label className="font-normal text-xs text-textBlack mb-1">Supporting Documents</label>
          <div className="flex flex-col items-center justify-center w-full py-[30px] px-2 border-[1px] border-dashed rounded-2xl cursor-pointer">
            <Solaruploadlinear className="w-6 h-6"/>
            <p className="font-semibold text-xs text-textBlack mt-2">PDF File</p>
            <p className="font-normal text-[11px] text-textSecondary mt-1">Click or drag to upload</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Funding
