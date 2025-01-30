import React, { useState, useEffect } from "react";
import DropDown from "@/components/Elements/DropDown/DropDown";
import FileUpload from "../Elements/FileUpload/FileUpload";
import { assetType } from "@/data/Asset/Asset";
import { vendorType } from "@/data/Vendor/Vendor";

import Country from "../Elements/Country/Country";
import { country as Countries } from "@/data/Country/Country";
import useApi from "@/hooks/useApi";
import CustomDateTimePicker from "@/components/Elements/DateTime/DatePicker";

const AssetForm = ({ formData, setFormData, validation, isAssetPage }) => {
  const { fetchData } = useApi();
  const [assetLiquidityProviders, setAssetLiquidityProviders] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchLiquidityProviders() {
      const liquidityType = vendorType.find(
        (type) => type.value === "LIQUIDITY"
      );
      const { result, error } = await fetchData(
        `/vendor/type/${liquidityType.value}`,
        {
          method: "GET",
        }
      );
      if (!error) {
        const vendors = result.map((v) => ({
          value: v.vendor_id,
          label: v.name,
        }));
        setAssetLiquidityProviders(vendors);
      }
    }

    fetchLiquidityProviders();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value?.value || value }));
  };

  const handleCountryChange = (value) => {
    console.log(value)
    setFormData((prev) => ({
      ...prev,
      country: value.value,
    }))
  }
  console.log(formData)

  const renderInputField = ({ field, label, type, placeholder }) => (
    <div className="col-span-2 mb-4 md:col-span-1">
      <label
        htmlFor={field}
        className="mb-1 text-xs font-normal text-left text-textBlack"
      >
        {label}
      </label>
      <input
        type={type || "text"}
        id={field}
        autoComplete="off"
        value={formData[field]}
        onChange={(e) => {
          type === "number"
            ? handleInputChange(field, parseFloat(e.target.value))
            : handleInputChange(field, e.target.value);
        }}
        placeholder={placeholder || label}
        className={`h-[32px] p-3 rounded-[10px] w-full text-sm text-textSecondary placeholder:text-textSecondary border focus-visible:outline-black text-xs ${
          validation?.error?.issues.some((issue) => issue.path[0] === field)
            ? "border-red-500"
            : "border-primary50"
        }`}
      />
      {validation?.error?.issues.some((issue) => issue.path[0] === field) && (
        <span className="text-xs text-alert">
          {
            validation.error.issues.find((issue) => issue.path[0] === field)
              ?.message
          }
        </span>
      )}
    </div>
  );
  console.log(formData)
  return (
    <div className="grid grid-cols-2 gap-2 pb-4">
      {renderInputField({
        field: "name",
        label: "Name",
        placeholder: "Asset name",
      })}
      {renderInputField({ field: "ticker", label: "Ticker Symbol" })}
      {renderInputField({
        field: "usd_value",
        label: "USD Value",
        type: "number",
      })}
      {renderInputField({
        field: "daily_volume",
        label: "Volume (24h)",
        type: "number",
      })}

      <div className="col-span-2 mb-4 md:col-span-1">
        <label
          htmlFor="assetType"
          className="mb-1 text-xs font-normal text-left text-textBlack"
        >
          Asset type
        </label>
        <DropDown
          items={assetType}
          title="Select asset type"
          labelClasses={'text-textBlack'}
          defaultValue={formData.type || undefined}
          onSelect={(e) => handleInputChange("type", e?.value || null)}
          buttonassName={`border ${
            validation?.error?.issues.some((issue) => issue.path[0] === "type")
              ? "border-red-500"
              : "border-primary50"
          }`}
        />
        {validation?.error?.issues.some(
          (issue) => issue.path[0] === "type"
        ) && (
          <span className="text-xs text-alert">
            {
              validation.error.issues.find((issue) => issue.path[0] === "type")
                ?.message
            }
          </span>
        )}
      </div>

      <div className="col-span-2 mb-4 md:col-span-1">
        <label
          htmlFor="liquidity"
          className="mb-1 text-xs font-normal text-left text-textBlack"
        >
          Liquidity
        </label>
        <DropDown
          items={assetLiquidityProviders}
          title="Select liquidity"
          labelClasses={'text-textBlack'}
          defaultValue={formData.liquidity || undefined}
          multiselect={true}
          onSelect={(e) => {
            handleInputChange(
              "liquidity",
              e ? e.map((each) => each.value) : []
            );
          }}
          className={`border ${
            validation?.error?.issues.some(
              (issue) => issue.path[0] === "liquidity"
            )
              ? "border-red-500"
              : "border-primary50"
          }`}
        />
        {validation?.error?.issues.some(
          (issue) => issue.path[0] === "liquidity"
        ) && (
          <span className="text-xs text-alert">
            {
              validation.error.issues.find(
                (issue) => issue.path[0] === "liquidity"
              )?.message
            }
          </span>
        )}
      </div>

      <div className="col-span-2 mb-4 md:col-span-1">
        <label
          htmlFor="status"
          className="mb-1 text-xs font-normal text-left text-textBlack"
        >
          Status
        </label>
        <DropDown
          items={[
            { value: false, label: "Inactive" },
            { value: true, label: "Active" },
          ]}
          labelClasses={'text-textBlack'}
          title="Select asset status"
          defaultValue={
            typeof formData.status === "boolean" ? formData.status : undefined
          }
          onSelect={(e) => handleInputChange("status", e?.value || false)}
          className={`border ${
            validation?.error?.issues.some(
              (issue) => issue.path[0] === "status"
            )
              ? "border-red-500"
              : "border-primary50"
          }`}
        />
        {validation?.error?.issues.some(
          (issue) => issue.path[0] === "status"
        ) && (
          <span className="text-xs text-alert">
            {
              validation.error.issues.find(
                (issue) => issue.path[0] === "status"
              )?.message
            }
          </span>
        )}
      </div>

      <div className="col-span-2 mb-4 md:col-span-1">
        <label
          htmlFor="country"
          className="mb-1 text-xs font-normal text-left text-textBlack"
        >
          Country
        </label>
        <Country
          id={"country-selector"}
          open={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          onChange={(value) => handleCountryChange( value)}
          selectedValue={Countries.find(
            (option) => option.value === formData.country
          )}
          className={`border !h-8 mt-[1px] ${
            validation?.error?.issues.some(
              (issue) => issue.path[0] === "country"
            )
              ? "border-red-500"
              : "border-primary50"
          }`}
        />
        {validation?.error?.issues.some(
          (issue) => issue.path[0] === "country"
        ) && (
          <span className="text-xs text-alert">
            {
              validation.error.issues.find(
                (issue) => issue.path[0] === "country"
              )?.message
            }
          </span>
        )}
      </div>

      <div className="col-span-2">
        <label
          htmlFor="icon"
          className="mb-1 text-xs font-normal text-left text-textBlack"
        >
          Icon
        </label>
        <FileUpload
          isAssetPage={isAssetPage}
          selectedFileUrl={formData.icon}
          onChange={(value) => handleInputChange("icon", value)}
          className={`border text-textBlack ${
            validation?.error?.issues.some((issue) => issue.path[0] === "icon")
              ? "border-red-500"
              : "border-primary50"
          }`}
        />
        {validation?.error?.issues.some(
          (issue) => issue.path[0] === "icon"
        ) && (
          <span className="text-xs text-alert">
            {
              validation.error.issues.find((issue) => issue.path[0] === "icon")
                ?.message
            }
          </span>
        )}
      </div>
    </div>
  );
};

export default AssetForm;
