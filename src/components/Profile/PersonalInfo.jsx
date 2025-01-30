import React from 'react';
import Copy from "@/Icons/Copy";

const PersonalInfo = ({ customerDetails, profile, copyToClipboard }) => {
  const fullAddress = `${profile?.address}, ${profile?.city}, ${profile?.state} ${profile?.zip} ${profile?.country}`;

  return (
    <div className="w-full p-4 bg-white shadow-sm rounded-2xl">
      <h2 className="mb-[10px] text-[14px] font-semibold leading-5 text-left text-textBlack">Contact Information</h2>

      <div className="flex flex-col justify-between w-full gap-3 md:flex-row">
        <div className="flex flex-col gap-1 w-full">
          <p className="text-[12px] font-medium leading-4 text-left text-textBlack mb-2 ">Email Address</p>
          <p className="flex items-center gap-2 text-[12px] font-semibold leading-4 text-blue-600 text-left">
            {customerDetails?.email || "alexajohn@gmail.com"} 
            <button onClick={() => copyToClipboard(customerDetails?.email || "alexajohn@gmail.com", 'Email')}>
              <Copy />
            </button>
          </p>
        </div>
        <div className="w-full text-[12px] flex flex-col gap-1">
          <p className="text-[12px] font-medium leading-4 text-left text-textBlack mb-2">Phone Number</p>
          <p className="flex items-center gap-2 text-[12px] font-semibold leading-4 text-blue-600 text-left mb-3">
            {profile?.phoneCountryCode + ' ' + profile?.phone || "+971 786 7966"}
            <button onClick={() => copyToClipboard(profile?.phoneCountryCode + ' ' + profile?.phone || "+971 786 7966", 'PhoneNumber')}>
              <Copy />
            </button>
          </p>
        </div>
      </div>

      <div className="w-full mt-3 flex flex-col gap-2">
        <p className="text-[12px] font-medium leading-4 text-left text-textBlack">Address</p>
        <p className="font-inter text-[12px] font-semibold leading-[16px] text-left text-textSecondary">
          {fullAddress}
        </p>
      </div>
    </div>
  );
};

export default PersonalInfo;
