import Tick from "@/Icons/Tick";
import Image from "next/image";
import React from "react";

const categories = [
  {
    title: "Phone Verification",
    items: ["Unexpired", "Address Check", "Acceptance Type"]
  },
  {
    title: "Email Verification",
    items: ["Unexpired", "Address Check", "Acceptance Type"]
  },
  {
    title: "Selfie Verification",
    items: ["Unexpired", "Face Match"]
  }
];

const categories2 = [
  {
    title: "Behavior of Risk",
    items: [
      "Digital Trust",
      "Forensic Labels",
      "Face",
      "Phone",
      "Email",
      "Device Crosscheck",
      "ID Doc Country vs IP Mismatch"
    ]
  },
  {
    title: " ",
    items: [
      "Location",
      "Cross Check",
      "Address vs IP Mismatch",
      "Applicant Data",
      "Digital Trust",
      "Duplicates",
      "Forensic Labels"
    ]
  },
  {
    title: "Summary",
    items: [
      "Face Match",
      "Face Liveliness",
      "Cross Validation",
      "Similar Search",
      "Watchlist",
      "Address Check"
    ]
  }
];

const Overview = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="p-4 bg-white border rounded-xl">
        <h3 className="caption-l mb-3.5 text-left font-semibold text-sm text-textBlack">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
          {/* First Column */}
          <div className="space-y-2">
            <div>
              <p className="font-inter text-xs font-medium leading-4 text-left text-textSecondary mb-2">
                First Name
              </p>
              <p className="text-xs font-semibold leading-4 text-left text-textBlack mb-4">
                xxxxxx
              </p>
            </div>
            <div>
              <p className="font-inter text-xs font-medium leading-4 text-left text-textSecondary mb-2 mt-4">
                Legal Name
              </p>
              <p className="text-xs font-semibold leading-4 text-left text-textBlack mb-4">
                xxxxxx
              </p>
            </div>
            <div>
              <p className="font-inter text-xs font-medium leading-4 text-left text-textSecondary mb-2 mt-4">
                Country
              </p>
              <p className="text-xs font-semibold leading-4 text-left text-textBlack mb-4">
                xxxxxx
              </p>
            </div>
            <div>
              <p className="font-inter text-xs font-medium leading-4 text-left text-textSecondary mb-2 mt-4">
                Nationality
              </p>
              <p className="text-xs font-semibold leading-4 text-left text-textBlack mb-4">
                xxxxxx
              </p>
            </div>
          </div>

          {/* Second Column */}
          <div className="space-y-3">
            <div>
              <p className="font-inter text-xs font-medium leading-4 text-left text-textSecondary mb-2">
                Middle Name
              </p>
              <p className="text-xs font-semibold leading-4 text-left text-textBlack mb-4">
                xxxxxx
              </p>
            </div>
            <div>
              <p className="font-inter text-xs font-medium leading-4 text-left text-textSecondary mb-2 mt-4">
                Date of Birth
              </p>
              <p className="text-xs font-semibold leading-4 text-left text-textBlack mb-4">
                xxxxxx
              </p>
            </div>
            <div>
              <p className="font-inter text-xs font-medium leading-4 text-left text-textSecondary mb-2 mt-4">
                Country of Birth
              </p>
              <p className="text-xs font-semibold leading-4 text-left text-textBlack mb-4">
                xxxxxx
              </p>
            </div>
            <div>
              <p className="font-inter text-xs font-medium leading-4 text-left text-textSecondary mb-2 mt-4">
                Phone
              </p>
              <p className="text-xs font-semibold leading-4 text-left text-textBlack mb-4">
                xxxxxx
              </p>
            </div>
          </div>

          {/* Third Column */}
          <div className="space-y-3">
            <div>
              <p className="font-inter text-xs font-medium leading-4 text-left text-textSecondary mb-2">
                Last Name
              </p>
              <p className="text-xs font-semibold leading-4 text-left text-textBlack mb-4">
                xxxxxx
              </p>
            </div>
            <div>
              <p className="font-inter text-xs font-medium leading-4 text-left text-textSecondary mb-2 mt-4">
                Gender
              </p>
              <p className="text-xs font-semibold leading-4 text-left text-textBlack mb-4">
                xxxxxx
              </p>
            </div>
            <div>
              <p className="font-inter text-xs font-medium leading-4 text-left text-textSecondary mb-2 mt-4">
                State of Birth
              </p>
              <p className="text-xs font-semibold leading-4 text-left text-textBlack mb-4">
                xxxxxx
              </p>
            </div>
            <div>
              <p className="font-inter text-xs font-medium leading-4 text-left text-textSecondary mb-2 mt-4">
                Place of Birth
              </p>
              <p className="text-xs font-semibold leading-4 text-left text-textBlack mb-4">
                xxxxxx
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border rounded-xl">
        <h3 className="caption-l mb-3.5 text-left font-semibold text-sm text-textBlack">
          Additional Information
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
          {/* First Column */}
          <div className="space-y-3">
            <div>
              <p className="font-inter text-xs font-medium leading-4 text-left text-textSecondary mb-2">
                Street
              </p>
              <p className="text-[12px] font-semibold leading-4 text-left text-textBlack mt-2">
                xxxxxx
              </p>
            </div>
            <div>
              <p className="font-inter text-xs font-medium leading-4 text-left text-textSecondary mb-2 mt-4">
                Postal/ZIP Code
              </p>
              <p className="text-[12px] font-semibold leading-4 text-left text-textBlack   mt-2">
                xxxxxx
              </p>
            </div>
          </div>

          {/* Second Column */}
          <div className="space-y-3">
            <div>
              <p className="font-inter text-xs font-medium leading-4 text-left text-textSecondary mb-2">
                Street (line2)
              </p>
              <p className="text-[12px] font-semibold leading-4 text-left text-textBlack   mt-2">
                xxxxxx
              </p>
            </div>
            <div>
              <p className="font-inter text-xs font-medium leading-4 text-left text-textSecondary mb-2 mt-4">
                Country
              </p>
              <p className="text-[12px] font-semibold leading-4 text-left text-textBlack   mt-2">
                xxxxxx
              </p>
            </div>
          </div>

          {/* Third Column */}
          <div className="space-y-3">
            <div>
              <p className="font-inter text-xs font-medium leading-4 text-left text-textSecondary mb-2">
                State
              </p>
              <p className="text-[12px] font-semibold leading-4 text-left text-textBlack   mt-2">
                xxxxxx
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border rounded-xl">
        <h3 className="caption-l mb-3.5 text-left font-semibold text-sm text-textBlack">
          Behavior of Risk
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {categories.map((category, index) => (
            <div key={index} className="space-y-2">
              <p className="text-xs font-semibold leading-4 text-left text-textBlack mb-2">
                {category.title}
              </p>
              <ul className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className={`flex items-center gap-2`}>
                    <Tick className="w-[18px] h-[18px]" />
                    <span className="font-inter text-xs font-normal leading-4 text-left text-textBlack tracking-normal">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
          {categories2.map((category, index) => (
            <div key={index} className="space-y-2">
              <p className="text-xs font-semibold leading-4 text-left text-textBlack mb-2">
                {category.title}
              </p>
              <ul className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className={`flex items-center gap-2 ${
                      item === "Location" ? "mt-6" : ""
                    }`}
                  >
                    <Tick className="w-[18px] h-[18px]" />
                    <span className="font-inter text-xs font-normal leading-4 text-left text-textBlack tracking-normal">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
