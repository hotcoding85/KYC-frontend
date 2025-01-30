import React from 'react'
import { CheckboxItems, SingleInput } from "@/components/register/business/create-business"

const activityData = [
  "Trade in food products and household goods",
  "Trade in means of transport",
  "Trade in/rent real estate",
  "Services (construction, repair works, beauty treatment services, etc)",
  "Legal services, attorney-at-law, notary public activities",
  "Artistic/intellectual activities (photographers, translators, event organizations, etc)",
  "Agriculture activities",
  "Activity related to ferrous, non-ferrous or precious metals, precious stones, pieces of art",
  "Other"
]
const MainActivity = () => {
  return (
    <div className="flex justify-center max-h-[60vh] overflow-y-auto mt-4">
      <div className="flex flex-col items-start w-[500px] gap-4">
        <h2 className="font-semibold text-base text-textBlack">Main Activity</h2>

        {activityData.map((each, idx) => (
          <CheckboxItems key={idx} customClasses="flex items-center gap-4">
            <p className="font-normal text-xs text-textBlack">{each}</p>
          </CheckboxItems>
        ))}

        <div className="w-full">
          <SingleInput label="Description of Business/Industry" type="textarea" />
        </div>

        <div className="w-full">
          <label className="font-normal text-xs text-textBlack">
            Countries from which funds will be received*
          </label>
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center gap-2 rounded-[10px] border-[1px] border-primary50 py-1 px-2 w-full h-8 cursor-pointer">
              <input type="radio" className="w-4 h-4 border-[1px] border-textBlack accent-black" />
              <p className="font-normal text-xs text-textBlack">US</p>
            </div>
            <div className="flex items-center gap-2 rounded-[10px] border-[1px] border-primary50 py-1 px-2 w-full h-8 cursor-pointer">
              <input type="radio" className="w-4 h-4 border-[1px] border-textBlack accent-black" />
              <p className="font-normal text-xs text-textBlack">Other</p>
            </div>
          </div>
        </div>

        <div className="w-full">
          <label className="font-normal text-xs text-textBlack">
            Countries from which funds will be sent*
          </label>
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center gap-2 rounded-[10px] border-[1px] border-primary50 py-1 px-2 w-full h-8 cursor-pointer">
              <input type="radio" className="w-4 h-4 border-[1px] border-textBlack accent-black" />
              <p className="font-normal text-xs text-textBlack">US</p>
            </div>
            <div className="flex items-center gap-2 rounded-[10px] border-[1px] border-primary50 py-1 px-2 w-full h-8 cursor-pointer">
              <input type="radio" className="w-4 h-4 border-[1px] border-textBlack accent-black" />
              <p className="font-normal text-xs text-textBlack">Other</p>
            </div>
          </div>
        </div>

        <div className="w-full">
          <label className="font-normal text-xs text-textBlack">
            Does the passive income of the entity (dividends, interest, etc. except for the cases when such income is
            earned from main activities) or assets generating or kept to generate the above mentioned income exceed 50%
            of the entity’s annual gross income per calendar year or its total assets?*
          </label>
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center gap-2 rounded-[10px] border-[1px] border-primary50 py-1 px-2 w-full h-8 cursor-pointer">
              <input type="radio" className="w-4 h-4 border-[1px] border-textBlack accent-black" />
              <p className="font-normal text-xs text-textBlack">US</p>
            </div>
            <div className="flex items-center gap-2 rounded-[10px] border-[1px] border-primary50 py-1 px-2 w-full h-8 cursor-pointer">
              <input type="radio" className="w-4 h-4 border-[1px] border-textBlack accent-black" />
              <p className="font-normal text-xs text-textBlack">Other</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainActivity
