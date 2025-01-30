"use client";
import CountriesPhone from "@/components/Elements/Country/CountriesNumber";
import React, { useState } from "react";

import AuthInput from "../Elements/Input/AuthInput";
import Country from "../Elements/Country/Country";
import { country as Countries } from "@/data/Country/Country";
import { AuthButton } from "@/components/Elements/Button/Button";
import FileUpload from "../Elements/FileUpload/FileUpload";
import Upload from "@/Icons/Upload";
import { PROOF_OF_ADDRESS_DOCUMENT } from "@/shared/enums";
import { z } from "zod";

const formSchema = z.object({
  country: z.object({
    value: z.string().min(1, { message: "Country is required" }),
  }),
  nationality: z.object({
    value: z.string().min(1, { message: "Nationality is required" }),
  }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State/Province is required" }),
  street: z.string().min(1, { message: "Street name is required" }),
  address: z.string().min(1, { message: "Street address is required" }),
  zip: z.string().min(1, { message: "Postal/ZIP code is required" }),
  tax: z.string().min(1, { message: "Tax ID number is required" }),
  poa: z.string().min(1, { message: "Proof of Address type is required" }),
  proofOfAddressDocument: z
    .string({ message: "File is required" })
    .min(1, { message: "File is required" })
    .regex(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,(.*)$/, {
      message: "Invalid file format",
    }),
});


export function Address({ onContinue }) {
  const defaultCountry = {
    value: "AE",
    title: "United Arab Emirates",
    areaCode: "+971",
    isoCode: "ARE",
  };

  const [validation, setValidation] = useState();

  const [formData, setFormData] = useState({
    country: defaultCountry,
    nationality: defaultCountry,
    city: "",
    state: "",
    street: "",
    address: "",
    zip: "",
    tax: "",
    poa: "",
    proofOfAddressDocument: null    
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
        <div div className="grid gap-4 grid-cols-2">
          <div className="mt-4">
            <label className="mb-1 text-xs font-normal text-textBlack">
              Country*
            </label>
            <Country
              id={"country-selector"}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  country: value,
                }))
              }
              selectedValue={formData.country}
              width="w-16"
              className={`border border-primary50 py-1 px-2`}
            />
            {validation?.issues?.some(
              (issue) => issue.path[0] === "country"
            ) && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find((issue) => issue.path[0] === "country")
                    ?.message
                }
              </span>
            )}
          </div>
          <div className="mt-4">
            <label className="mb-1 text-xs font-normal text-textBlack">
              Nationality*
            </label>
            <Country
              id={"nationality-selector"}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  nationality: value,
                }))
              }
              selectedValue={formData.nationality}
              width="w-16"
              className={`border border-primary50 py-1 px-2`}
            />
            {validation?.issues?.some(
              (issue) => issue.path[0] === "nationality"
            ) && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find(
                    (issue) => issue.path[0] === "nationality"
                  )?.message
                }
              </span>
            )}
          </div>
        </div>
        <div div className="grid gap-4 grid-cols-2">
          <div className="mt-4">
            <label className="mb-1 text-xs font-normal text-textBlack">
              City*
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
            {validation?.issues?.some((issue) => issue.path[0] === "city") && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find((issue) => issue.path[0] === "city")
                    ?.message
                }
              </span>
            )}
          </div>
          <div className="mt-4">
            <label className="mb-1 text-xs font-normal text-textBlack">
              State / Province*
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
            {validation?.issues?.some((issue) => issue.path[0] === "state") && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find((issue) => issue.path[0] === "state")
                    ?.message
                }
              </span>
            )}
          </div>
        </div>
        <div div className="grid gap-4 grid-cols-2">
          <div className="mt-4">
            <label className="mb-1 text-xs font-normal text-textBlack">
              Street Name*
            </label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
            {validation?.issues?.some(
              (issue) => issue.path[0] === "street"
            ) && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find((issue) => issue.path[0] === "street")
                    ?.message
                }
              </span>
            )}
          </div>
          <div className="mt-4">
            <label className="mb-1 text-xs font-normal text-textBlack">
              Street Address*
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
            {validation?.issues?.some(
              (issue) => issue.path[0] === "address"
            ) && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find((issue) => issue.path[0] === "address")
                    ?.message
                }
              </span>
            )}
          </div>
        </div>
        <div div className="grid gap-4 grid-cols-2">
          <div className="mt-4">
            <label className="mb-1 text-xs font-normal text-textBlack">
              Postal / ZIP Code*
            </label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              className="w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
            {validation?.issues?.some((issue) => issue.path[0] === "zip") && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find((issue) => issue.path[0] === "zip")
                    ?.message
                }
              </span>
            )}
          </div>
          <div className="mt-4">
            <label className="mb-1 text-xs font-normal text-textBlack">
              Tax Id Number*
            </label>
            <input
              type="text"
              name="tax"
              value={formData.tax}
              onChange={handleChange}
              className="w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
            {validation?.issues?.some((issue) => issue.path[0] === "tax") && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find((issue) => issue.path[0] === "tax")
                    ?.message
                }
              </span>
            )}
          </div>
        </div>
        <div className="relative mt-4">
          <label className="mb-1 text-xs font-normal text-textBlack">
            Select Proof of Address Type
          </label>
          <select
            className="w-full h-8 py-1 px-2 border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack text-xs"
            name="poa"
            value={formData.poa}
            onChange={handleChange}
          >
            <option value="">Select Proof of Address Type</option>
            {Object.entries(PROOF_OF_ADDRESS_DOCUMENT).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
          {validation?.issues?.some((issue) => issue.path[0] === "poa") && (
            <span className="text-alert text-xs">
              {
                validation.issues.find((issue) => issue.path[0] === "poa")
                  ?.message
              }
            </span>
          )}
        </div>
        <div className="relative mt-4">
          <label className="mb-1 text-xs font-normal text-textBlack">
            Proof of Address document
          </label>
          <FileUpload
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                proofOfAddressDocument: value,
              }))
            }
          >
            <div className="flex flex-col text-sm p-4 text-center items-center text-gray-500">
              <Upload></Upload>
              <p>Drag and drop here or click to upload</p>
              <p className="text-xs">Drag and drop here or click to upload</p>
            </div>
          </FileUpload>
          {validation?.issues?.some(
            (issue) => issue.path[0] === "proofOfAddressDocument"
          ) && (
            <span className="text-alert text-xs">
              {
                validation.issues.find(
                  (issue) => issue.path[0] === "proofOfAddressDocument"
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
