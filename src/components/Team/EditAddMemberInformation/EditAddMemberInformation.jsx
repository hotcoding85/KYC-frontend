/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

import LogoPlaceholder from "@/Icons/LogoPlaceholder";
import DropDown from "@/components/Elements/DropDown/DropDown";
import { country as Countries } from "@/data/Country/Country";
import Country from "@/components/Elements/Country/Country";
import CountriesPhone from "../../Elements/Country/CountriesNumber";

const EditAddMemberInformation = ({
  isEdit,
  formData,
  setFormData,
  validation,
  roleValue
}) => {
  const [profileImage, setProfileImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedFormData)
  };

  const handleCountryCodeChange = (value) => {
    const updatedFormData = {
      ...formData,
      phoneCountryCode: Countries.find(ct => ct.value === value.value) ? Countries.find(ct => ct.value === value.value).areaCode : '+971',
    };
    setFormData(updatedFormData)
    setIsOpen(false)
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setProfileImage(file);
        setFormData((prevState) => ({
          ...prevState,
          image: base64String,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const gender = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  return (
    <div className="container mx-auto space-y-5 mb-10">
      {/* Profile Picture Section */}
      <div className="p-4 bg-white rounded-2xl text-sm">
        <h2 className="mb-2 text-sm   text-textBlack">Photo</h2>
        <div className="flex flex-col items-center justify-center p-4 space-y-4 border-2 border-gray-300 border-dashed rounded-2xl bg-gray-50">
          {profileImage ? (
            <img
              src={URL.createObjectURL(profileImage)}
              alt="Profile"
              className="object-cover w-24 h-24 rounded-full"
            />
          ) : (
            <>
              {formData?.image ? (
                <img
                  src={formData?.image}
                  alt="Profile"
                  className="object-cover w-24 h-24 rounded-full"
                />
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <LogoPlaceholder className="w-16 h-16" />
                  <p className="mt-4  text-xs font-normal leading-4 text-left text-textBlack">
                    Drag and drop image here, or click add image
                  </p>
                </div>
              )}
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="profile-image-upload"
            onChange={handleImageChange}
          />
          <label
            htmlFor="profile-image-upload"
            className="px-4 py-2 text-xs text-gray-700 bg-white border border-gray-100 rounded-[10px] cursor-pointer text-center"
          >
            {isEdit ? "Replace image" : "Add image"}
          </label>
        </div>
      </div>

      {/* Basic Information Section */}
      <div className="p-4 bg-white rounded-2xl text-sm">
        <h2 className="mb-4 text-sm  font-semibold text-textBlack">
          Basic Information
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className=" text-xs font-normal leading-4 text-left text-textBlack ">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              className="w-full p-2 h-8 mt-1  border border-gray-300 rounded-[10px] text-xs font-normal leading-4 text-textBlack"
              value={formData.fullName}
              onChange={handleInputChange}
            />
            {!validation.success &&
              validation.error?.issues.find(
                (issue) => issue.path[0] === "fullName"
              ) && (
                <p className="mt-1 text-sm text-alert">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "fullName"
                    ).message
                  }
                </p>
              )}
          </div>
          <div>
            <label className=" text-xs font-normal leading-4 text-left text-textBlack">
              Date Registered
            </label>
            <input
              type="date"
              name="dateRegistered"
              className="w-full p-2 h-8 mt-1  border border-gray-300 rounded-[10px] text-xs font-normal leading-4 text-textBlack"
              value={formData.dateRegistered}
              onChange={handleInputChange}
            />
            {!validation.success &&
              validation.error?.issues.find(
                (issue) => issue.path[0] === "dateRegistered"
              ) && (
                <p className="mt-1 text-sm text-alert">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "dateRegistered"
                    ).message
                  }
                </p>
              )}
          </div>
          <div>
            <label className=" text-xs font-normal leading-4 text-left text-textBlack">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              className="w-full p-2 h-8 mt-1  border border-gray-300 rounded-[10px] text-xs font-normal leading-4 text-textBlack"
              value={formData.dob}
              onChange={handleInputChange}
            />
            {!validation.success &&
              validation.error?.issues.find(
                (issue) => issue.path[0] === "dob"
              ) && (
                <p className="mt-1 text-sm text-alert">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "dob"
                    ).message
                  }
                </p>
              )}
          </div>
          <div>
            <label className="pb-3  text-xs font-normal leading-4 text-left text-textBlack">
              Gender
            </label>
            <DropDown
              items={gender}
              className="w-full p-2 h-8 mt-1  border border-gray-300 rounded-[10px] text-xs font-normal leading-4 text-textBlack"
              value={formData.gender === 'M' ? gender[0] : gender[1]}
              onSelect={(value) => {
                const updatedFormData = { ...formData, gender: value.value === "Male" ? 'M' : 'F' };
                setFormData(updatedFormData);
              }}
              title={formData.gender === 'M' ? 'Male' : 'Female'}
            />
            {!validation.success &&
              validation.error?.issues.find(
                (issue) => issue.path[0] === "gender"
              ) && (
                <p className="mt-1 text-sm text-alert">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "gender"
                    ).message
                  }
                </p>
              )}
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="p-4 bg-white rounded-2xl text-sm ">
        <h2 className="mb-4 text-sm  font-semibold text-textBlack">
          Contact Information
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className=" text-xs font-normal leading-4 text-left text-textBlack">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full p-2 h-8 mt-1  border border-gray-300 rounded-[10px] text-xs font-normal leading-4 text-textBlack"
              value={formData.email}
              onChange={handleInputChange}
            />
            {!validation.success &&
              validation.error?.issues.find(
                (issue) => issue.path[0] === "email"
              ) && (
                <p className="mt-1 text-sm text-alert">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "email"
                    ).message
                  }
                </p>
              )}
          </div>
          <div>
            <label className=" text-xs font-normal leading-4 text-left text-textBlack">
              Phone Number
            </label>
            <div className="flex gap-8 space-x-3">
              <CountriesPhone
                open={isOpen}
                onToggle={() => setIsOpen(!isOpen)}
                onChange={(value) => handleCountryCodeChange(value)}
                selectedValue={Countries.find(
                  (option) => option.areaCode === formData?.phoneCountryCode
                )}
                className="w-[110px] h-8 text-xs mt-1"
                options={Countries.map((countryOption) => ({
                  value: countryOption.label, // Use label as value
                  label: `${countryOption.flag} ${countryOption.label}`,
                }))}
              />
              <input
                type="text"
                name="phone"
                className="w-full p-2 h-8 mt-1 border border-gray-300 rounded-[10px] text-xs font-normal leading-4 text-textBlack"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            {!validation.success &&
              validation.error?.issues.find(
                (issue) => issue.path[0] === "phone" || issue.path[0] === 'phoneCountryCode'
              ) && (
                <p className="mt-1 text-sm text-alert">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "phone" || issue.path[0] === 'phoneCountryCode'
                    ).message
                  }
                </p>
              )}
          </div>

          <div className="col-span-2">
            <label className=" text-xs font-normal leading-4 text-left text-textBlack">
              Street Address
            </label>
            <input
              type="text"
              name="address"
              className="w-full p-3 h-8 mt-1 border border-gray-300 rounded-[10px] text-textBlack"
              value={formData.address}
              onChange={handleInputChange}
            />
            {!validation.success &&
              validation.error?.issues.find(
                (issue) => issue.path[0] === "address"
              ) && (
                <p className="mt-1 text-sm text-alert">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "address"
                    ).message
                  }
                </p>
              )}
          </div>

          <div>
            <label className=" text-xs font-normal leading-4 text-left text-textBlack">
              City
            </label>
            <input
              type="text"
              name="city"
              className="w-full p-3 h-8 mt-1 border border-gray-300 rounded-[10px] text-textBlack"
              value={formData.city}
              onChange={handleInputChange}
            />
            {!validation.success &&
              validation.error?.issues.find(
                (issue) => issue.path[0] === "city"
              ) && (
                <p className="mt-1 text-sm text-alert">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "city"
                    ).message
                  }
                </p>
              )}
          </div>
          <div>
            <label className=" text-xs font-normal leading-4 text-left text-textBlack">
              State
            </label>
            <input
              type="text"
              name="state"
              className="w-full p-3 h-8 mt-1 border border-gray-300 rounded-[10px] text-textBlack"
              value={formData.state}
              onChange={handleInputChange}
            />
            {!validation.success &&
              validation.error?.issues.find(
                (issue) => issue.path[0] === "state"
              ) && (
                <p className="mt-1 text-sm text-alert">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "state"
                    ).message
                  }
                </p>
              )}
          </div>

          <div>
            <label className=" text-xs font-normal leading-4 text-left text-textBlack">
              ZIP Code
            </label>
            <input
              type="text"
              name="zip"
              className="w-full p-3 h-8 mt-1 border border-gray-300 rounded-[10px] text-textBlack"
              value={formData.zip}
              onChange={handleInputChange}
            />
            {!validation.success &&
              validation.error?.issues.find(
                (issue) => issue.path[0] === "zip"
              ) && (
                <p className="mt-1 text-sm text-alert">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "zip"
                    ).message
                  }
                </p>
              )}
          </div>

          <div>
            <label className=" text-xs font-normal leading-4 text-left text-textBlack ">
              Country / Region
            </label>
            <Country
              id={"country-selector"}
              open={isOpen}
              onToggle={() => setIsOpen(!isOpen)}
              onChange={(value) => {
                const updatedFormData = { ...formData, country: value.title };
                setFormData(updatedFormData);
              }}
              selectedValue={Countries.find(
                (option) => option.title === formData.country
              )}
              className={`w-full p-2 h-8  mt-1 border border-gray-300 rounded-[10px] text-xs font-normal leading-4 text-center `}
            />
            {!validation.success &&
              validation.error?.issues.find(
                (issue) => issue.path[0] === "country"
              ) && (
                <p className=" text-sm text-alert text-center">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "country"
                    ).message
                  }
                </p>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAddMemberInformation;
