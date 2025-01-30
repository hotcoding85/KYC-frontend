"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import useApi from "@/hooks/useApi";
import Country from "@/components/Elements/Country/Country";
import { country as Countries } from "@/data/Country/Country";
import { Toast } from "primereact/toast";
import Mainlogo from "@/Icons/imageicon/Mainlogo";
import { AuthButton } from "@/components/Elements/Button/Button";
import Auth from "@/components/Auth/Auth";

const formDefaultValues = {
  name: "",
  business_email: "",
  business_name: "",
  phone_number: "",
  business_website: "",
  year_of_incorporation: "",
  trading_name: "",
  address_line_one: "",
  address_line_two: "",
  country_of_incorporation: "",
  state: "",
  city: "",
  postal_code: "",
};

const RegisterCompany = () => {
  const router = useRouter();
  const { fetchData, loading, error } = useApi();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useRef(null);

  const [formData, setFormData] = useState({
    ...formDefaultValues,
  });

  const [validations, setValidations] = useState({
    name: null,
    business_email: null,
    business_name: null,
    phone_number: null,
    business_website: null,
    year_of_incorporation: null,
    trading_name: null,
    address_line_one: null,
    country_of_incorporation: null,
    state: null,
    city: null,
    postal_code: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (value) => {
    setFormData((prev) => ({ ...prev, country_of_incorporation: value }));
    setValidations((prev) => ({ ...prev, country_of_incorporation: true }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
      case "business_name":
      case "trading_name":
      case "address_line_one":
      case "country_of_incorporation":
      case "state":
      case "city":
        return value.trim() !== "";
      case "business_email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case "phone_number":
        return /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/.test(value);
      case "business_website":
        return /^https?:\/\/\S+$/.test(value);
      case "year_of_incorporation":
        return (
          /^\d{4}$/.test(value) && parseInt(value) <= new Date().getFullYear()
        );
      case "postal_code":
        return /^\d{5}(-\d{4})?$/.test(value);
      default:
        return true;
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setValidations((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allValid = Object.keys(validations).every((key) =>
      validateField(key, formData[key])
    );

    if (allValid) {
      setIsSubmitting(true);
      try {
        const { result, error } = await fetchData("/company", {
          method: "POST",
          body: formData,
        });

        if (error) {
          //   alert(error);
          toast.current.show({
            severity: "error",
            summary: "Something went wrong ",
            detail: error.message,
          });
        } else {
          //   router.push("/auth/login");
          setFormData({ ...formDefaultValues });
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Company succcessfully created",
          });
        }
      } catch (err) {
        console.error("Error during company registration:", err);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      const newValidations = {};
      Object.keys(formData).forEach((key) => {
        newValidations[key] = validateField(key, formData[key]);
      });
      setValidations(newValidations);
    }
  };

  return (
    <>
      <Auth company="">
        <div className="flex flex-col  md:w-[500px]">
          <h2 className="mb-2 text-base font-semibold text-textBlack">
            Company Registration
          </h2>
          <form
            onSubmit={handleSubmit}
            className="w-full h-[700px] overflow-scroll"
          >
            {Object.keys(formData).map((key) => (
              <div key={key} className="flex flex-col w-full md:w-[500px] mt-4">
                <label htmlFor={key} className="block mb-1 text-xs">
                  {key
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </label>
                {key === "country_of_incorporation" ? (
                  <Country
                    id="country-selector"
                    open={isOpen}
                    onToggle={() => setIsOpen(!isOpen)}
                    onChange={handleCountryChange}
                    selectedValue={Countries.find(
                      (option) =>
                        option.value === formData.country_of_incorporation
                    )}
                    className={`border  p-3 rounded-2xl w-full ${
                      validations.country_of_incorporation === false
                        ? "border-red-500"
                        : "border-primary50"
                    }`}
                  />
                ) : (
                  <input
                    type={key === "year_of_incorporation" ? "number" : "text"}
                    id={key}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border p-1 rounded-xl w-full ${
                      validations[key] === false
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    required={key !== "address_line_two"}
                  />
                )}
                {validations[key] === false && (
                  <span className="text-alert text-xs">
                    {`Please enter a valid ${key.split("_").join(" ")}`}
                  </span>
                )}
              </div>
            ))}
            <AuthButton
              isLoading={isSubmitting}
              disabled={isSubmitting}
              title="Register Company"
              className="rounded-lg bg-primary mt-4"
            />
          </form>
        </div>
      </Auth>
      <Toast ref={toast} />
    </>
  );
};

export default RegisterCompany;
