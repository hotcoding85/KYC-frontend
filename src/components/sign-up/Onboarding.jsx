"use client";

import React, { useState, useEffect } from "react";
import { AuthButton } from "@/components/Elements/Button/Button";
import { SOURCE_OF_FUNDS, PURPOSE_OF_ACCOUNT_OPENING } from "@/shared/enums";
import { z } from "zod";

const formSchema = z.object({
  netWorth: z.string().min(1, { message: "Net worth is required" }),
  annualIncome: z.string().min(1, { message: "Annual income is required" }),
  purposeOfAccountOpening: z
    .string()
    .min(1, { message: "Purpose of account opening is required" }),
  sourceOfFunds: z
    .string()
    .min(1, { message: "Source of funds is required" }),
  employed: z.boolean(),
  employerName: z.string().optional(),
  bankName: z
  .string()
  .min(1, { message: "Bank name is required" }),
  jobTitle: z.string().optional(),
  monthlyTurnover: z.string().min(1, { message: "Monthly turnover is required" }),
  transactionActivity: z
    .string()
    .min(1, { message: "Anticipated transaction activity is required" }),
  purchaseMonthlyCrypto: z
    .string()
    .min(1, { message: "Monthly purchase volume is required" }),
  purchaseAverageCrypto: z
    .string()
    .min(1, { message: "Average purchase amount is required" }),
  purchaseTotalCrypto: z
    .string()
    .min(1, { message: "Total purchase amount is required" }),
  sellMonthlyCrypto: z
    .string()
    .min(1, { message: "Monthly sell volume is required" }),
  sellAverageCrypto: z
    .string()
    .min(1, { message: "Average sell amount is required" }),
  sellTotalCrypto: z.string().min(1, { message: "Total sell amount is required" }),
  bitcoinTrading: z
    .string()
    .min(1, { message: "Bitcoin trading percentage is required" }),
  ethereumTrading: z
    .string()
    .min(1, { message: "Ethereum trading percentage is required" }),
  tetherTrading: z
    .string()
    .min(1, { message: "Tether trading percentage is required" }),
  otherTrading: z
    .string()
    .min(1, { message: "Other trading percentage is required" }),
  irsConfirm: z.boolean().refine((val) => val === true, {
    message: "IRS compliance confirmation is required",
  }),
  factaConfirm: z.boolean().refine((val) => val === true, {
    message: "FACTA compliance confirmation is required",
  }),
  criminalConfirm: z.boolean().refine((val) => val === true, {
    message: "Criminal conduct declaration is required",
  }),
  accurateConfirm: z.boolean().refine((val) => val === true, {
    message: "Accuracy confirmation is required",
  }),
});

export function Onboarding({ onContinue }) {
  const [validation, setValidation] = useState();

  const [formData, setFormData] = useState({
    netWorth: "",
    annualIncome: "",
    purposeOfAccountOpening: "",
    sourceOfFunds: "",
    employed: false,
    employerName: "",
    bankName: "",
    jobTitle: "",
    monthlyTurnover: "",
    transactionActivity: "",
    purchaseMonthlyCrypto: "",
    purchaseAverageCrypto: "",
    purchaseTotalCrypto: "",
    sellMonthlyCrypto: "",
    sellAverageCrypto: "",
    sellTotalCrypto: "",
    bitcoinTrading: "",
    ethereumTrading: "",
    tetherTrading: "",
    otherTrading: "",
    irsConfirm: false,
    factaConfirm: false,
    criminalConfirm: false,
    accurateConfirm: false,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      employerName: formData.employed ? "" : "N/A",
      jobTitle: formData.employed ? "" : "N/A",
    }));
  }, [formData.employed]);

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
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="flex flex-col justify-center mx-auto w-full md:w-[500px] py-5">
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
              Estimated Net Worth*
            </label>
            <input
              type="text"
              name="netWorth"
              value={formData.netWorth}
              onChange={handleChange}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
              className="w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
            {validation?.issues?.some(
              (issue) => issue.path[0] === "netWorth"
            ) && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find(
                    (issue) => issue.path[0] === "netWorth"
                  )?.message
                }
              </span>
            )}
          </div>
          <div className="mt-4">
            <label className="mb-1 text-xs font-normal text-textBlack">
              Estimated Gross Annual Income*
            </label>
            <input
              type="text"
              name="annualIncome"
              value={formData.annualIncome}
              onChange={handleChange}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
              className="w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
            {validation?.issues?.some(
              (issue) => issue.path[0] === "annualIncome"
            ) && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find(
                    (issue) => issue.path[0] === "annualIncome"
                  )?.message
                }
              </span>
            )}
          </div>
        </div>
        <div div className="grid gap-4 grid-cols-1">
          <div className="mt-4">
            <label className="mb-1 text-xs font-normal text-textBlack">
              Specify Bank Name You Have Account with*
            </label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              className="w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
            {validation?.issues?.some(
              (issue) => issue.path[0] === "bankName"
            ) && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find(
                    (issue) => issue.path[0] === "bankName"
                  )?.message
                }
              </span>
            )}
          </div>
        </div>
        <div className="grid gap-4 grid-cols-2">
          <div className="relative mt-4">
            <label className="mb-1 text-xs font-normal text-textBlack">
              Purpose of Opening Account
            </label>
            <select
              className="w-full h-8 py-1 px-2 border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack text-xs"
              name="purposeOfAccountOpening"
              value={formData.purposeOfAccountOpening}
              onChange={handleChange}
            >
              <option value="">Select Purpose of Opening Account</option>
              {Object.entries(PURPOSE_OF_ACCOUNT_OPENING).map(
                ([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                )
              )}
            </select>
            {validation?.issues?.some(
              (issue) => issue.path[0] === "purposeOfAccountOpening"
            ) && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find(
                    (issue) => issue.path[0] === "purposeOfAccountOpening"
                  )?.message
                }
              </span>
            )}
          </div>
          <div className="relative mt-4">
            <label className="mb-1 text-xs font-normal text-textBlack">
              Source of Funds
            </label>
            <select
              className="w-full h-8 py-1 px-2 border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack text-xs"
              name="sourceOfFunds"
              value={formData.sourceOfFunds}
              onChange={handleChange}
            >
              <option value="">Select Source of Funds</option>
              {Object.entries(SOURCE_OF_FUNDS).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
            {validation?.issues?.some(
              (issue) => issue.path[0] === "sourceOfFunds"
            ) && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find(
                    (issue) => issue.path[0] === "sourceOfFunds"
                  )?.message
                }
              </span>
            )}
          </div>
        </div>
        <div className="grid gap-4 grid-cols-2">
          <div className="mt-4">
            <input
              type="checkbox"
              name="employed"
              value={formData.employed}
              onChange={handleChange}
              className="py-1 px-2 mr-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
            <label className="mb-1 text-xs font-normal text-textBlack">
              I am currently employed*
            </label>
            {validation?.issues?.some(
              (issue) => issue.path[0] === "employed"
            ) && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find(
                    (issue) => issue.path[0] === "employed"
                  )?.message
                }
              </span>
            )}
          </div>
        </div>
        {formData.employed && (
          <div className="grid gap-4 grid-cols-2">
            <div className="mt-4">
              <label className="mb-1 text-xs font-normal text-textBlack">
                Employer Company Name*
              </label>
              <input
                type="text"
                name="employerName"
                value={formData.employerName}
                onChange={handleChange}
                className="w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
              />
              {validation?.issues?.some(
                (issue) => issue.path[0] === "employerName"
              ) && (
                <span className="text-alert text-xs">
                  {
                    validation.issues.find(
                      (issue) => issue.path[0] === "employerName"
                    )?.message
                  }
                </span>
              )}
            </div>
            <div className="mt-4">
              <label className="mb-1 text-xs font-normal text-textBlack">
                Job Title*
              </label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
              />
              {validation?.issues?.some(
                (issue) => issue.path[0] === "jobTitle"
              ) && (
                <span className="text-alert text-xs">
                  {
                    validation.issues.find(
                      (issue) => issue.path[0] === "jobTitle"
                    )?.message
                  }
                </span>
              )}
            </div>
          </div>
        )}

        <div div className="grid gap-4 grid-cols-2">
          <div className="mt-4">
            <label className="mb-1 text-xs font-normal text-textBlack">
              Monthly Turnover*
            </label>
            <input
              type="text"
              name="monthlyTurnover"
              value={formData.monthlyTurnover}
              onChange={handleChange}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
              className="w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
            {validation?.issues?.some(
              (issue) => issue.path[0] === "monthlyTurnover"
            ) && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find(
                    (issue) => issue.path[0] === "monthlyTurnover"
                  )?.message
                }
              </span>
            )}
          </div>
          <div className="mt-4">
            <label className="mb-1 text-xs font-normal text-textBlack">
              Anticipated Transaction Activity*
            </label>
            <input
              type="text"
              name="transactionActivity"
              value={formData.transactionActivity}
              onChange={handleChange}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
              className="w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
            {validation?.issues?.some(
              (issue) => issue.path[0] === "transactionActivity"
            ) && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find(
                    (issue) => issue.path[0] === "transactionActivity"
                  )?.message
                }
              </span>
            )}
          </div>
        </div>
        <div div className="grid gap-4 grid-cols-1">
          <div className="mt-4">
            <label className="mb-1 text-xs font-normal text-textBlack">
              I Plan to Purchase Crypto Monthly with*
            </label>
          </div>
        </div>
        <div div className="grid gap-4 grid-cols-3">
          <div className="mt-4">
            <label className="mb-1 text-xs font-normal text-textBlack">
              Monthly Volume*
            </label>
            <input
              type="text"
              name="purchaseMonthlyCrypto"
              value={formData.purchaseMonthlyCrypto}
              onChange={handleChange}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
              className="w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
            {validation?.issues?.some(
              (issue) => issue.path[0] === "purchaseMonthlyCrypto"
            ) && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find(
                    (issue) => issue.path[0] === "purchaseMonthlyCrypto"
                  )?.message
                }
              </span>
            )}
          </div>
          <div className="mt-4">
            <label className="mb-1 text-xs font-normal text-textBlack">
              Average Amount*
            </label>
            <input
              type="text"
              name="purchaseAverageCrypto"
              value={formData.purchaseAverageCrypto}
              onChange={handleChange}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
              className="w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
            {validation?.issues?.some(
              (issue) => issue.path[0] === "purchaseAverageCrypto"
            ) && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find(
                    (issue) => issue.path[0] === "purchaseAverageCrypto"
                  )?.message
                }
              </span>
            )}
          </div>
          <div className="mt-4">
            <label className="mb-1 text-xs font-normal text-textBlack">
              Total Amount*
            </label>
            <input
              type="text"
              name="purchaseTotalCrypto"
              value={formData.purchaseTotalCrypto}
              onChange={handleChange}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
              className="w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
            {validation?.issues?.some(
              (issue) => issue.path[0] === "purchaseTotalCrypto"
            ) && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find(
                    (issue) => issue.path[0] === "purchaseTotalCrypto"
                  )?.message
                }
              </span>
            )}
          </div>
        </div>
        <div div className="grid gap-4 grid-cols-1">
          <div className="mt-4">
            <label className="mb-1 text-xs font-normal text-textBlack">
              I Plan to Sell Crypto Monthly with*
            </label>
          </div>
        </div>
        <div div className="grid gap-4 grid-cols-3">
          <div className="mt-4">
            <label className="mb-1 text-xs font-normal text-textBlack">
              Monthly Volume*
            </label>
            <input
              type="text"
              name="sellMonthlyCrypto"
              value={formData.sellMonthlyCrypto}
              onChange={handleChange}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
              className="w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
            {validation?.issues?.some(
              (issue) => issue.path[0] === "sellMonthlyCrypto"
            ) && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find(
                    (issue) => issue.path[0] === "sellMonthlyCrypto"
                  )?.message
                }
              </span>
            )}
          </div>
          <div className="mt-4">
            <label className="mb-1 text-xs font-normal text-textBlack">
              Average Amount*
            </label>
            <input
              type="text"
              name="sellAverageCrypto"
              value={formData.sellAverageCrypto}
              onChange={handleChange}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
              className="w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
            {validation?.issues?.some(
              (issue) => issue.path[0] === "sellAverageCrypto"
            ) && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find(
                    (issue) => issue.path[0] === "sellAverageCrypto"
                  )?.message
                }
              </span>
            )}
          </div>
          <div className="mt-4">
            <label className="mb-1 text-xs font-normal text-textBlack">
              Total Amount*
            </label>
            <input
              type="text"
              name="sellTotalCrypto"
              value={formData.sellTotalCrypto}
              onChange={handleChange}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
              className="w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
            {validation?.issues?.some(
              (issue) => issue.path[0] === "sellTotalCrypto"
            ) && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find(
                    (issue) => issue.path[0] === "sellTotalCrypto"
                  )?.message
                }
              </span>
            )}
          </div>
        </div>
        <div div className="grid gap-4 grid-cols-1">
          <div className="mt-4">
            <label className="mb-1 text-xs font-normal text-textBlack">
              Specify Percentage of Transactions per Cryptocurrency*
            </label>
          </div>
        </div>
        <div div className="grid gap-4 grid-cols-4">
          <div className="mt-4">
            <label className="mb-1 text-xs font-normal text-textBlack">
              Bitcoin*
            </label>
            <input
              type="text"
              name="bitcoinTrading"
              value={formData.bitcoinTrading}
              onChange={handleChange}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
              className="w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
            {validation?.issues?.some(
              (issue) => issue.path[0] === "bitcoinTrading"
            ) && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find(
                    (issue) => issue.path[0] === "bitcoinTrading"
                  )?.message
                }
              </span>
            )}
          </div>
          <div className="mt-4">
            <label className="mb-1 text-xs font-normal text-textBlack">
              Ethereum*
            </label>
            <input
              type="text"
              name="ethereumTrading"
              value={formData.ethereumTrading}
              onChange={handleChange}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
              className="w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
            {validation?.issues?.some(
              (issue) => issue.path[0] === "ethereumTrading"
            ) && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find(
                    (issue) => issue.path[0] === "ethereumTrading"
                  )?.message
                }
              </span>
            )}
          </div>
          <div className="mt-4">
            <label className="mb-1 text-xs font-normal text-textBlack">
              Tether*
            </label>
            <input
              type="text"
              name="tetherTrading"
              value={formData.tetherTrading}
              onChange={handleChange}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
              className="w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
            {validation?.issues?.some(
              (issue) => issue.path[0] === "tetherTrading"
            ) && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find(
                    (issue) => issue.path[0] === "tetherTrading"
                  )?.message
                }
              </span>
            )}
          </div>
          <div className="mt-4">
            <label className="mb-1 text-xs font-normal text-textBlack">
              Other*
            </label>
            <input
              type="text"
              name="otherTrading"
              value={formData.otherTrading}
              onChange={handleChange}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
              className="w-full h-8 py-1 px-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
            {validation?.issues?.some(
              (issue) => issue.path[0] === "otherTrading"
            ) && (
              <span className="text-alert text-xs">
                {
                  validation.issues.find(
                    (issue) => issue.path[0] === "otherTrading"
                  )?.message
                }
              </span>
            )}
          </div>
        </div>
        <div div className="grid gap-4 grid-cols-1">
          <div className="mt-4">
            <input
              type="checkbox"
              name="irsConfirm"
              value={formData.irsConfirm}
              onChange={handleChange}
              className="py-1 px-2 mr-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
            <label className="mb-1 text-xs font-normal text-textBlack w-full">
              I confirm that I am personally up to date and compliant with IRS
              tax filing requirements *
            </label>
            {validation?.issues?.some(
              (issue) => issue.path[0] === "irsConfirm"
            ) && (
              <span className="text-alert text-xs block">
                {
                  validation.issues.find(
                    (issue) => issue.path[0] === "irsConfirm"
                  )?.message
                }
              </span>
            )}
          </div>
        </div>
        <div div className="grid gap-4 grid-cols-1">
          <div className="mt-4">
            <input
              type="checkbox"
              name="factaConfirm"
              value={formData.factaConfirm}
              onChange={handleChange}
              className="py-1 px-2 mr-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
            <label className="mb-1 text-xs font-normal text-textBlack w-100">
              I confirm that I am in full compliance with Foreign Account Tax
              Compliance Act (FACTA)
            </label>
            {validation?.issues?.some(
              (issue) => issue.path[0] === "factaConfirm"
            ) && (
              <span className="text-alert text-xs block">
                {
                  validation.issues.find(
                    (issue) => issue.path[0] === "factaConfirm"
                  )?.message
                }
              </span>
            )}
          </div>
        </div>
        <div div className="grid gap-4 grid-cols-1">
          <div className="mt-4">
            <input
              type="checkbox"
              name="criminalConfirm"
              value={formData.criminalConfirm}
              onChange={handleChange}
              className="py-1 px-2 mr-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
            <label className="mb-1 text-xs font-normal text-textBlack w-100">
              I declare I have not been engaged in or have benefited from
              criminal conduct in any part of the world and funds which are
              subject to the proposed arrangement do not wholly or in part
              directly represent the proceeds of criminal conduct
            </label>
            {validation?.issues?.some(
              (issue) => issue.path[0] === "criminalConfirm"
            ) && (
              <span className="text-alert text-xs block">
                {
                  validation.issues.find(
                    (issue) => issue.path[0] === "criminalConfirm"
                  )?.message
                }
              </span>
            )}
          </div>
        </div>
        <div div className="grid gap-4 grid-cols-1">
          <div className="mt-4">
            <input
              type="checkbox"
              name="accurateConfirm"
              value={formData.accurateConfirm}
              onChange={handleChange}
              className="py-1 px-2 mr-2 text-sm border border-primary50 rounded-[10px] focus-visible:outline-textBlack text-textBlack"
            />
            <label className="mb-1 text-xs font-normal text-textBlack">
              I declare that the information given hereunder and in the
              documents requested hereby is to the best of your knowledge true
              and accurate as at the date hereof,and should there be any changes
              in the information so provided you undertake to promptly advise
              our law firm of the same in writing
            </label>
            {validation?.issues?.some(
              (issue) => issue.path[0] === "accurateConfirm"
            ) && (
              <span className="text-alert text-xs block">
                {
                  validation.issues.find(
                    (issue) => issue.path[0] === "accurateConfirm"
                  )?.message
                }
              </span>
            )}
          </div>
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
