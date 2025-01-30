import Ukflag from "@/Icons/Ukflag";
import Image from "next/image";
import React from "react";
import { country as Countries } from "@/data/Country/Country";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
const BasicInformationCard = ({beneficiary}) => {
  const profileDat_1 = [
    {
      label: "Full Name",
      value: beneficiary?.full_name || "N/A",
    },
    {
      label: "Email Address",
      value: beneficiary?.email || "N/A",
      copyable: !!beneficiary?.email, // Only make copyable if email exists
      isEmail: !!beneficiary?.email, // Only set as email if a valid email exists
    },
  ];

  const profileDat_2 = [
    {
      label: "Beneficiary Type",
      value: beneficiary?.type || "N/A",
    },
    {
      label: "Phone Number",
      value: beneficiary?.phoneCountryCode && beneficiary?.phone ? beneficiary?.phoneCountryCode + ' ' + beneficiary?.phone : "N/A",
      copyable: !!beneficiary?.phone, // Only make copyable if phone exists
    },
  ];

  const convertToDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const profileData_3 = [
    {
      label: "Date Registered",
      value: beneficiary?.created_at
        ? convertToDate(beneficiary?.created_at)
        : "N/A",
    },
    {
      label: "Citizenship",
      value: Countries.find(ct => ct.value === beneficiary.nationality) || null,
      flagSrc: Ukflag,
      flag: !!beneficiary?.nationality,
    },
  ];
  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // You can add a toast notification here if needed
      toast("Copied!");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  

  return (
    <div className="w-full p-4 mx-auto bg-white rounded-2xl border border-primary50">
      <h2 className="mb-4 text-[14px] font-semibold leading-5 tracking-tighter text-left text-textSecondary">
        Basic Information
      </h2>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-3">
        {/* First Column */}
        <div className="flex flex-col gap-2 md:gap-3">
          {profileDat_1.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <p className="text-xs text-textSecondary">{item.label}</p>
              <div className="flex items-center gap-2">
                <p
                  className={`text-xs font-semibold ${
                    item.copyable ? "text-blue-600" : " text-textSecondary"
                  }`}
                >
                  {item.value}
                </p>
                {item.copyable && (
                  <button
                    onClick={() => handleCopy(item.value)}
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Second Column */}
        <div className="flex flex-col gap-2 md:gap-3">
          {profileDat_2.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <p className="text-xs text-textSecondary">{item.label}</p>
              <div className="flex items-center gap-2">
                <p
                  className={`text-xs font-semibold ${
                    item.copyable ? "text-blue-600" : " text-textSecondary"
                  }`}
                >
                  {item.value}
                </p>
                {item.copyable && (
                  <button
                    onClick={() => handleCopy(item.value)}
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Third Column */}
        <div className="flex flex-col gap-2 md:gap-3">
          {profileData_3.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <p className="text-xs text-textSecondary">{item.label}</p>
              <div className="flex items-center gap-2">
                {item.flagSrc ? (
                  // <div className="flex items-center gap-1 mb-2">
                  //   <item.flagSrc />
                  //   <p className="text-xs font-semibold leading-4 text-left font-inter mb-2 text-textSecondary">{item.value}</p>
                  // </div>
                  item.value && item.value.value !== '' ? 
                  <div className="flex items-center mb-1">
                    <img
                      alt={`${item.value.value}`}
                      src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${item.value.value}.svg`}
                      className="inline mr-1 w-4 h-4"
                    />
                    <p className="text-xs font-semibold leading-4 text-left font-inter text-textSecondary">{item.value.title}</p>
                  </div> : 
                  <p className="text-xs font-semibold leading-4 text-left font-inter mb-1 text-textSecondary">N/A</p>
                ) : (
                  <p className="text-xs font-semibold leading-4 text-left font-inter mb-1 text-textSecondary">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" // Sets dark theme
        toastStyle={{
          backgroundColor: '#333',
          color: '#fff',
        }}
      />
    </div>
  );
};

export default BasicInformationCard;
