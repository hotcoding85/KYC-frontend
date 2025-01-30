import React from "react";
import UserCardsInfo from "../UserInfo/UserInfo";

const UserInformation = ({ userData }) => {
  // Function to format date strings
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Function to calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return "N/A";
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Left Side */}
      <div className="col-span-3 md:col-span-2 space-y-6">
        {/* Basic Information */}
        <div className="p-4 bg-white rounded-2xl text-sm">
          <h3 className="mb-4 text-sm font-semibold text-textBlack leading-[20px] tracking-[-0.005em] text-left">
            Basic Information
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-gray-500  mb-2 text-sm  font-medium leading-4 text-left">
                User Name
              </p>
              <p className="font-medium text-textBlack text-sm leading-4 text-left mb-2">{`${
                userData?.first_name || "N/A"
              } ${userData?.last_name || ""}`}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-2 text-sm  font-medium leading-4 text-left">
                Company Name
              </p>
              <p className="text-blue-500 text-sm font-medium  text-sm leading-4 text-left">
                {userData?.company?.business_name ?? ""}
              </p>
            </div>
            <div>
              <p className=" text-gray-500 mb-2 text-sm font-medium leading-4 text-left ">
                Age
              </p>
              <p className="font-medium text-textBlack">
                {calculateAge(userData?.userProfile?.dob)}
              </p>
            </div>
            <div>
              <p className=" text-gray-500 mb-2 text-sm font-medium leading-4 text-left ">
                Gender
              </p>
              <p className="font-medium text-textBlack text-sm leading-4 text-left mb-2">
                {(userData?.userProfile?.gender === "M" ? "Male" : "Female") || "N/A"}
              </p>
            </div>
            <div>
              <p className=" text-gray-500 mb-2 text-sm font-medium leading-4 text-left ">
                Date Registered
              </p>
              <p className="font-medium text-textBlack text-sm leading-4 text-left mb-2">
                {formatDate(userData?.userProfile?.dateRegistered)}
              </p>
            </div>
            <div>
              <p className=" text-gray-500 mb-2 text-sm font-medium leading-4 text-left ">
                Last Login
              </p>
              <p className="font-medium text-textBlack text-sm leading-4 text-left mb-2">
                {formatDate(userData?.updated_at)}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="p-4 bg-white rounded-2xl text-sm">
          <h3 className="mb-4 text-sm font-medium text-textBlack text-sm leading-4 text-left mb-2">
            Contact Information
          </h3>
          <div className="flex flex-row items-center justify-between">
            <div>
              <p className=" text-gray-500 mb-2 text-sm font-medium leading-4 text-left mb-2 ">
                Email Address
              </p>
              <p className="text-blue-500 text-sm font-medium  text-sm leading-4 text-left mb-2">
                {userData?.email || "N/A"}
              </p>
            </div>
            <div>
              <p className=" text-gray-500 mb-2 text-sm font-medium leading-4 text-left mb-2 ">
                Phone Number
              </p>
              <p className="text-blue-500 text-sm font-medium  text-sm leading-4 text-left mb-2">
                {(userData?.userProfile?.phoneCountryCode + ' ' + userData?.userProfile?.phone) || "N/A"}
              </p>
            </div>
          </div>
          <p className="mt-2 text-gray-500 mb-2 text-sm font-medium leading-4 text-left mb-2">
            Address
          </p>
          <p className="font-medium text-textBlack text-sm leading-4 text-left mb-2">
            {`${userData?.userProfile?.address || "N/A"}, ${
              userData?.userProfile?.city || ""
            } ${userData?.userProfile?.state || ""} ${
              userData?.userProfile?.zipCode || ""
            }, ${userData?.userProfile?.country || "N/A"}`}
          </p>
        </div>
      </div>

      <div className="col-span-3 md:col-span-1">
        <UserCardsInfo userData={userData} />
      </div>
    </div>
  );
};

export default UserInformation;
