"use client";

import React, { useState } from "react";
import AuthInput from "../Elements/Input/AuthInput";
import { AuthButton } from "@/components/Elements/Button/Button";
import CountriesPhone from "@/components/Elements/Country/CountriesNumber";
import { z } from "zod";

const formSchema = z
  .object({
    first_name: z.string().min(1, { message: "First name is required" }),
    middle_name: z.string().optional(),
    last_name: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    phoneCountryCode: z.object({
      value: z.string().min(1, { message: "Phone area code is required" }),
    }),
    occupation: z.string().min(1, { message: "Occupation is required" }),
    dob: z.string().min(1, { message: "Date of birth is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().min(8, {
      message: "Confirm Password must be at least 8 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPasswords"],
  });


export function GetStarted({ onContinue }) {
  const defaultCountry = {
    value: "AE",
    title: "United Arab Emirates",
    areaCode: "+971"
  };

  const [validation, setValidation] = useState();

  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone: "",
    phoneCountryCode: defaultCountry,
    occupation: "",
    dob: "",
    password: "",
    confirmPassword: "",
    // first_name: "Michael",
    // middle_name: "",
    // last_name: "Aberra",
    // email: "michael@gmail.com",
    // phone: "501084679",
    // phoneCountryCode: defaultCountry,
    // occupation: "Eng",
    // dob: "15/12/1987",
    // password: "12P@ssword",
    // confirmPassword: "12P@ssword",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = formSchema.safeParse(formData);
    if (!result.success) {
      setValidation(result.error); 
    } else {
      setValidation(null);
      onContinue(formData);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /* 
        "fullName": "text", - 
        "firstGivenName": "text", - 
        "lastSurname": "text", - 
        "fiatCurrencyCode": "text", - 
        "emailAddress": "name@gmail.com", -
        "phoneNumber": "text", - 

        "addressCountryISO": "text",
        "addressLine1": "text",
        "dateOfBirth": "2024-11-21T06:21:47.044Z",
        
        "manageesReference": "text",
        "nationalityISO": "text",
        "occupation": "text",
        
        "postcode": "text",
        "proofOfAddressFile": "text",
        "proofOfAddressType": 0,
        "stateProvince": "text",
        "taxNumber": "text",
        "townCity": "text"
  */

  return (
    <div className="flex flex-col justify-center mx-auto w-full md:w-[500px]">
      <div className="mb-6 md:mb-10">
        <h2 className="text-base font-semibold text-textBlack mb-2">Sign up</h2>
        <p className="text-xs font-normal text-textSecondary">
          Open your account today
        </p>
      </div>
      <div>
        <div className="grid gap-4 grid-cols-3">
          <div>
            <label className="mb-1 text-xs font-normal text-textBlack">
              First Name*
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
            {validation?.issues?.some(
              (issue) => issue.path[0] === "first_name"
            ) && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find(
                    (issue) => issue.path[0] === "first_name"
                  )?.message
                }
              </span>
            )}
          </div>
          <div>
            <label className="mb-1 text-xs font-normal text-textBlack">
              Middle Name
            </label>
            <input
              type="text"
              name="middleName"
              value={formData.middle_name}
              onChange={handleChange}
              className="w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
          </div>
          <div>
            <label className="mb-1 text-xs font-normal text-textBlack">
              Last Name*
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
            {validation?.issues?.some(
              (issue) => issue.path[0] === "last_name"
            ) && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find(
                    (issue) => issue.path[0] === "last_name"
                  )?.message
                }
              </span>
            )}
          </div>
        </div>
        <div className="grid gap-4 grid-cols-2">
          <div className="mt-4">
            <label className="mb-1 text-xs font-normal text-textBlack">
              Email*
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
            {validation?.issues?.some((issue) => issue.path[0] === "email") && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find((issue) => issue.path[0] === "email")
                    ?.message
                }
              </span>
            )}
          </div>

          <div className="mt-4">
            <label className="mb-1 text-xs font-normal text-textBlack">
              Phone
            </label>
            <div className="flex items-center gap-2">
              <CountriesPhone
                id={"areacode-selector"}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    phoneCountryCode: value,
                  }))
                }
                selectedValue={formData.phoneCountryCode}
                width="w-16"
                className={`border border-primary50 py-1 px-2`}
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
              />
            </div>
            {validation?.issues?.some(
              (issue) =>
                issue.path[0] === "phoneCountryCode" ||
                issue.path[0] === "phone"
            ) && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find(
                    (issue) =>
                      issue.path[0] === "phoneCountryCode" ||
                      issue.path[0] === "phone"
                  )?.message
                }
              </span>
            )}
          </div>
        </div>
        <div div className="grid gap-4 grid-cols-2">
          <div className="mt-4">
            <label className="mb-1 text-xs font-normal text-textBlack">
              Occupation*
            </label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
            {validation?.issues?.some(
              (issue) => issue.path[0] === "occupation"
            ) && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find(
                    (issue) => issue.path[0] === "occupation"
                  )?.message
                }
              </span>
            )}
          </div>
          <div className="mt-4">
            <label className="mb-1 text-xs font-normal text-textBlack">
              Date of Birth*
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
            {validation?.issues?.some((issue) => issue.path[0] === "dob") && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find((issue) => issue.path[0] === "dob")
                    ?.message
                }
              </span>
            )}
          </div>
        </div>

        <div className="relative mt-4">
          <AuthInput
            type="password"
            name="password"
            label="Password*"
            onChange={handleChange}
          />
          {validation?.issues?.some(
            (issue) => issue.path[0] === "password"
          ) && (
            <span className="text-alert text-xs">
              {
                validation.issues.find((issue) => issue.path[0] === "password")
                  ?.message
              }
            </span>
          )}
        </div>

        <div className="relative mt-4">
          <AuthInput
            type="password"
            name="confirmPassword"
            label="Confirm Password*"
            onChange={handleChange}
          />
          {validation?.issues?.some(
            (issue) => issue.path[0] === "confirmPassword"
          ) && (
            <span className="text-alert text-xs">
              {
                validation.issues.find(
                  (issue) => issue.path[0] === "confirmPassword"
                )?.message
              }
            </span>
          )}
        </div>

        <div className="w-full mt-8">
          <AuthButton
            title="Continue"
            onClick={handleSubmit}
            className="rounded-lg bg-primary"
          />
        </div>
      </div>
    </div>
  );
}
