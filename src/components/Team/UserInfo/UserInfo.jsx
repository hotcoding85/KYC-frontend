"use client";
import DropDown from "@/components/Elements/DropDown/DropDown";
import React from "react";

const UserCardsInfo = ({ userData, formData, setFormData, isEdit = true, roleValue = [
  { value: "SUPER_ADMINISTRATOR", label: "Super Administrator" },
  { value: "SUPER_USER", label: "Super User" },
  { value: "COMPANY_ADMINISTRATOR", label: "Company Administrator" },
  { value: "COMPANY_USER", label: "Company User" },
  { value: "END_USER", label: "End User" },
]}) => {
  // const role = [
  //   { value: "1", label: "Standard user" },
  //   { value: "2", label: "Admin" },
  // ];

  const userRole = formData?.role || userData?.role || 'END_USER';

  return (
    <div className="space-y-6 ">
      {isEdit && (
        <div className="bg-white p-4 rounded-2xl text-sm">
          <h3 className="mb-4 text-sm  font-semibold text-textBlack">
            User Status
          </h3>
          <div className="flex flex-row items-center justify-between">
            <p className="text-textBlack text-sm">Status</p>
            <p
              className={`font-medium px-4 py-1 rounded-full ${
                userData?.status
                  ? "bg-successLight text-success"
                  : "bg-alertLight text-alert"
              }`}
            >
              {userData?.status ? "Active" : "Suspend"}
            </p>
          </div>
        </div>
      )}
      <div className="bg-white p-4 rounded-2xl">
        <div className="flex flex-row items-center justify-between mb-4">
          <h3 className="mb-4 text-sm  font-semibold text-textBlack">
            User Role
          </h3>
          <p
            className={`font-medium px-4 py-1 rounded-full ${
              userRole.search("ADMINISTRATOR") <= 0
                ? "bg-primary50 text-primary300"
                : "bg-blue-100 text-blue-500"
            } text-sm`}
          >
            {roleValue.find(r => r.value === userRole)?.label}
          </p>
        </div>
        <DropDown
          defaultValue={
            roleValue.find(r => r.value === formData?.role)
          }
          onSelect={(value) => {
            setFormData &&
              setFormData({
                ...formData,
                role: value.value,
              });
          }}
          items={roleValue}
          className="w-full"
          title={roleValue.find(r => r.value === userRole)?.label}
        />
      </div>
      {isEdit && (
        <>
          <div className="bg-white p-4 rounded-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-textBlack">
                Additional Information
              </h3>
              <button className="text-blue-500 text-[12px] font-medium leading-4">
                + Add Note
              </button>
            </div>
            <p className="text-gray-500 text-sm">
              {userData?.userProfile?.authenticator_secret
                ? "Two-factor authentication is enabled."
                : "No additional information available at this time."}
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl text-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-textBlack">
                Private Note
              </h3>
              <button className="text-blue-500 text-[12px] font-medium leading-4">
                + Add Note
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserCardsInfo;
