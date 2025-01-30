import Ukflag from "@/Icons/Ukflag";
import Image from "next/image";
import { country as Countries } from "@/data/Country/Country";
const profileDataDummy = [
  { label: "Full Name", value: "Alexa John" },
  { label: "Account Type", value: "Individual" },
  { label: "Age", value: "30" },
  { label: "Date Registered", value: "Sep 10-2020" }
];

const profileData_twoDummy = [
  {
    label: "Citizenship",
    value: "United Kingdom",
    flagSrc: Ukflag
  },
  { label: "Account Plan", value: "Plus +" },
  { label: "Gender", value: "Female" },
  { label: "Last Login", value: "Aug 20-2024" }
];

export default function BasicInformation({
  customerDetails, profile, lastLogin
}) {

  const profileData = [
    { label: "Full Name", value: `${customerDetails?.first_name} ${customerDetails?.last_name}`.trim() },
    { label: "Age", value: profile?.dob },
    { label: "Date Registered", value: profile?.dateRegistered },
    { label: "Last Login", value: lastLogin }
  ];

  const profileData_two = [
    {
      label: "Citizenship",
      value: Countries.find(ct => ct.title === profile?.nationality) || Countries[1],
      flagSrc: Ukflag
    },
    { label: "Account Plan", value: customerDetails?.role },
    { label: "Gender", value: (profile?.gender === 'M' ? 'Male' : 'Female') || "Not specified" },
  ];

  return (
    <div className="w-full p-4 mx-auto bg-white rounded-2xl md:w-w-2/3">
      <h2 className="mb-[10px] text-[14px] font-semibold leading-[20px] tracking-[-0.005em] text-left text-textBlack">
        Basic Information
      </h2>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {/* Full Name and Account Type */}
        <div className="flex flex-col gap-3">
          {profileData.map((item, index) => (
            <div
              key={index}
              className="flex flex-row justify-between md:flex-col gap-2"
            >
              <p className="text-xs font-medium leading-4 text-left text-textBlack ">{item.label}</p>
              <p className="text-xs font-semibold leading-4 text-left font-inter text-textSecondary ">{item.value || "undefined"}</p>
            </div>
          ))}
        </div>

        {/* Citizenship and Account Plan */}
        <div className="flex flex-col gap-2">
          {profileData_two.map((item, index) => (
            <div
              key={index}
              className="flex flex-row justify-between md:flex-col gap-2"
            >
              <p className="text-xs font-medium leading-4 text-left text-textBlack ">{item.label}</p>
              {item.flagSrc ? (
                // <div className="flex items-center gap-1 mb-2">
                //   <item.flagSrc />
                //   <p className="text-xs font-semibold leading-4 text-left font-inter mb-2 text-textSecondary">{item.value}</p>
                // </div>
                <div className="flex items-center mb-1">
                  <img
                    alt={`${item.value.value}`}
                    src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${item.value.value}.svg`}
                    className="inline mr-1 w-4 h-4"
                  />
                  <p className="text-xs font-semibold leading-4 text-left font-inter text-textSecondary">{item.value.title}</p>
                </div>
              ) : (
                <p className="text-xs font-semibold leading-4 text-left font-inter mb-1 text-textSecondary">{item.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
