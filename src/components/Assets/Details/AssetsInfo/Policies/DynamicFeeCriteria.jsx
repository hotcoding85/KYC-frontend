import React from "react";
import MinusRed from "@/Icons/MinusRed";
import AddBlack from "@/Icons/Add-Black";
import { capitalizeFirstLetter } from "@/utils/helper";
import Country from "@/components/Elements/Country/Country";
import { country as Countries } from "@/data/Country/Country";
import DropDown from "@/components/Elements/DropDown/DropDown";
import CustomDatePicker from "@/components/Assets/Details/AssetsInfo/Policies/DatePicker";
import { FEE_SCHEME_CRITERIA_TYPE, FEE_SCHEME_CRITERIA_COMPARASION } from "@/utils/constants";

const DynamicFeeCriteria = ({
  formData,
  setFormData,
  validation,
  setValidation
}) => {
  const handleAddCriteria = () => {
    setFormData((prev) => ({
      ...prev,
      criteria: [
        ...prev.criteria,
        {
          id: Date.now(),
          criteria: "",
          comparasion: "",
          value: ""
        }
      ]
    }));
  };

  const handleRemoveCriteria = (id) => {
    setFormData((prev) => {
      if (prev.criteria.length === 1) {
        return {
          ...prev
        }
      }
      const updatedCriteria = prev.criteria.filter((item) => item.id !== id);
      return {
        ...prev,
        criteria: updatedCriteria
      };
    });
  };

  const updateCriteria = (id, field, value) => {
    setFormData((prev) => {
      const updatedCriteria = prev.criteria.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      );

      return {
        ...prev,
        criteria: updatedCriteria
      };
    });
  };

  return (
    <div className="space-y-4">
      {formData.criteria.map((criteriaItem, index) => (
        <div
          key={criteriaItem.id}
          className="flex flex-wrap sm:flex-nowrap flex-row items-end w-full gap-2"
        >
          <div className="w-full">
            <p className="pb-2 text-[12px] font-normal leading-[16px] text-left text-textBlack">Criteria</p>

            <div className="flex flex-wrap sm:flex-nowrap flex-row items-center gap-2">
              <p className="text-textBlack">A{index + 1}</p>

              {/* Main Criteria Dropdown */}
              <DropDown
                title="Criteria"
                className="w-full h-8 text-xs"
                labelClasses={'text-textBlack'}
                items={[
                  { value: FEE_SCHEME_CRITERIA_TYPE["AMOUNT"], label: "Amount" },
                  { value: FEE_SCHEME_CRITERIA_TYPE["DATE"], label: "Date" },
                  { value: FEE_SCHEME_CRITERIA_TYPE["DAY"], label: "Day" },
                  { value: FEE_SCHEME_CRITERIA_TYPE["COUNTRY"], label: "Country" }
                ]}
                onSelect={(e) => updateCriteria(criteriaItem.id, "criteria", e.value)}
              />

              {/* Comparison Dropdown */}
              <DropDown
                className="w-full h-8 text-xs"
                labelClasses={'text-textBlack'}
                items={[
                  { value: FEE_SCHEME_CRITERIA_COMPARASION.EQUALS, label: "Equals" },
                  { value: FEE_SCHEME_CRITERIA_COMPARASION.LESS_THAN, label: "Less Than" },
                  { value: FEE_SCHEME_CRITERIA_COMPARASION.GREATER_THAN, label: "Greater Than" }
                ]}
                defaultValue={
                  criteriaItem.comparasion
                    ? {
                      value: criteriaItem.comparasion,
                      label: capitalizeFirstLetter(criteriaItem.comparasion.toLowerCase())
                    }
                    : undefined
                }
                onSelect={(e) => updateCriteria(criteriaItem.id, "comparasion", e.value)}
              />

              {/* Date Picker */}
              {(criteriaItem.criteria === FEE_SCHEME_CRITERIA_TYPE["DATE"] ||
                criteriaItem.criteria === FEE_SCHEME_CRITERIA_TYPE["DAY"]) && (
                <div className="w-full">
                  <CustomDatePicker
                    selectedDate={criteriaItem.value}
                    onSelect={(date) => updateCriteria(criteriaItem.id, "value", String(date))}
                  />
                </div>
              )}

              {/* Amount Input */}
              {criteriaItem.criteria === FEE_SCHEME_CRITERIA_TYPE["AMOUNT"] && (
                <div className="w-full">
                  <input
                    type="text"
                    name="amount"
                    value={criteriaItem.value}
                    className="border border-gray-300 p-3 rounded-[10px] h-8 text-xs w-full text-textBlack"
                    onChange={(e) => updateCriteria(criteriaItem.id, "value", e.target.value)}
                  />
                </div>
              )}

              {/* Country Selector */}
              {criteriaItem.criteria === FEE_SCHEME_CRITERIA_TYPE["COUNTRY"] && (
                <div className="w-full">
                  <Country
                    open={false}
                    id={`country-selector-${criteriaItem.id}`}
                    className="border border-primary50"
                    onToggle={() => {
                    }}
                    selectedValue={
                      criteriaItem.value
                        ? Countries.find((option) => option.value === criteriaItem.value)
                        : {}
                    }
                    onChange={(value) => updateCriteria(criteriaItem.id, "value", value)}
                  />
                </div>
              )}
              <button
                onClick={() => handleRemoveCriteria(criteriaItem.id)}
                className="bg-red-500 text-white rounded-lg w-5 h-5"
              >
                <MinusRed />
              </button>
              <button
                onClick={handleAddCriteria}
                className="bg-black text-white rounded-lg w-5 h-5"
              >
                <AddBlack />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DynamicFeeCriteria;
