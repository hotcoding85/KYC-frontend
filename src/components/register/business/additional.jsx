import { TextButton } from "@/components/Elements/Button/Button";
import Image from "next/image";
import React, { useState } from "react";
import { SingleInput } from "@/components/register/business/create-business";
import Chevdown from "@/Icons/Chevdown";

const Addtional = () => {
  const [selectedValue, setSelectedValues] = useState({
    operating: false,
    main: false,
    other: false,
  });
  return (
    <div className="flex justify-center max-h-[60vh] overflow-y-auto mt-4">
      <div className="flex flex-col items-start w-[500px] gap-4">
        <h2 className="font-semibold text-base text-textBlack">Additional</h2>

        <h3 className="font-semibold text-sm text-textBlack">
          Operating Address
        </h3>
        <div className="w-full">
          <label className="font-normal text-xs text-textBlack mb-1">
            Is the company&apos;s operating address the same as its registered
            address?
          </label>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-[10px] border-[1px] border-primary50 py-1 px-2 w-full h-8 cursor-pointer">
              <input
                type="radio"
                checked={selectedValue.operating}
                className="w-4 h-4 border-[1px] border-textBlack accent-black"
                onClick={() => {
                  setSelectedValues((prev) => {
                    return {
                      ...prev,
                      operating: true,
                    };
                  });
                }}
              />
              <p className="font-normal text-xs text-textBlack">Yes</p>
            </div>
            <div className="flex items-center gap-2 rounded-[10px] border-[1px] border-primary50 py-1 px-2 w-full h-8 cursor-pointer">
              <input
                type="radio"
                checked={!selectedValue.operating}
                className="w-4 h-4 border-[1px] border-textBlack accent-black"
                onClick={() => {
                  setSelectedValues((prev) => {
                    return {
                      ...prev,
                      operating: false,
                    };
                  });
                }}
              />
              <p className="font-normal text-xs text-textBlack">No</p>
            </div>
          </div>
        </div>

        {selectedValue.operating && (
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="col-span-2 w-full">
              <SingleInput label="Street Name*" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <SingleInput label="ZIP / Postal code*" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <SingleInput label="State / Province*" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <SingleInput label="City*" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <SingleInput label="Country*" isCountry />
            </div>
          </div>
        )}

        <h3 className="font-semibold text-sm text-textBlack">
          Main Business Partners
        </h3>
        <div className="w-full">
          <label className="font-normal text-xs text-textBlack mb-1">
            Is your company partnered with any other businesses?
          </label>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-[10px] border-[1px] border-primary50 py-1 px-2 w-full h-8 cursor-pointer">
              <input
                type="radio"
                checked={selectedValue.main}
                className="w-4 h-4 border-[1px] border-textBlack accent-black"
                onClick={() => {
                  setSelectedValues((prev) => {
                    return {
                      ...prev,
                      main: true,
                    };
                  });
                }}
              />
              <p className="font-normal text-xs text-textBlack">Yes</p>
            </div>
            <div className="flex items-center gap-2 rounded-[10px] border-[1px] border-primary50 py-1 px-2 w-full h-8 cursor-pointer">
              <input
                type="radio"
                checked={!selectedValue.main}
                className="w-4 h-4 border-[1px] border-textBlack accent-black"
                onClick={() => {
                  setSelectedValues((prev) => {
                    return {
                      ...prev,
                      main: false,
                    };
                  });
                }}
              />
              <p className="font-normal text-xs text-textBlack">No</p>
            </div>
          </div>
        </div>

        {selectedValue.main && (
          <>
            <Accordion title="Business Partner 1">
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="col-span-2 sm:col-span-1">
                  <SingleInput label="Business Partner Name*" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <SingleInput label="Company Registration Number*" />
                </div>
                <div className="col-span-2 w-full">
                  <SingleInput label="Business Partner Website" />
                </div>
              </div>
            </Accordion>

            <TextButton
              width="w-full"
              backgroundColor="bg-white"
              textColor="text-textBlack"
              title="Add Business Partner"
              borderColor="border border-primary50"
              className="py-1 px-4 text-xs font-normal"
            />
          </>
        )}

        <h3 className="font-semibold text-sm text-textBlack">
          Other Bank Accounts
        </h3>

        <div className="w-full">
          <label className="font-normal text-xs text-textBlack mb-1">
            Does your company have any accounts with other banks?
          </label>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-[10px] border-[1px] border-primary50 py-1 px-2 w-full h-8 cursor-pointer">
              <input
                type="radio"
                checked={selectedValue.other}
                className="w-4 h-4 border-[1px] border-textBlack accent-black"
                onClick={() => {
                  setSelectedValues((prev) => {
                    return {
                      ...prev,
                      other: true,
                    };
                  });
                }}
              />
              <p className="font-normal text-xs text-textBlack">Yes</p>
            </div>
            <div className="flex items-center gap-2 rounded-[10px] border-[1px] border-primary50 py-1 px-2 w-full h-8 cursor-pointer">
              <input
                type="radio"
                checked={!selectedValue.other}
                className="w-4 h-4 border-[1px] border-textBlack accent-black"
                onClick={() => {
                  setSelectedValues((prev) => {
                    return {
                      ...prev,
                      other: false,
                    };
                  });
                }}
              />
              <p className="font-normal text-xs text-textBlack">No</p>
            </div>
          </div>
        </div>
        {selectedValue.other && (
          <>
            <div className="grid grid-cols-1 w-full">
              <SingleInput label="Bank Account Name*" />
            </div>

            <TextButton
              width="w-full"
              title="Add Bank Account"
              backgroundColor="bg-white"
              textColor="text-textBlack"
              borderColor="border border-primary50"
              className="py-1 px-4 text-xs font-normal"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Addtional;

const Accordion = ({ title, children }) => {
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
        <Chevdown
          className={`${isOpen && "rotate-180"} transition-all h-4 w-4`}
        />
      </div>

      {isOpen && children}

      {isOpen && (
        <TextButton
          width="w-full"
          title="Remove Business Partner"
          className="py-1 px-4 text-xs font-normal mt-4"
        />
      )}
    </div>
  );
};
