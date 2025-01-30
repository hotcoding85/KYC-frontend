import React from "react";
import MinusRed from "@/Icons/MinusRed";
import AddBlack from "@/Icons/Add-Black";
import { capitalizeFirstLetter } from "@/utils/helper";
import Country from "@/components/Elements/Country/Country";
import { country as Countries } from "@/data/Country/Country";
import DropDown from "@/components/Elements/DropDown/DropDown";
import CustomDatePicker from "@/components/Assets/Details/AssetsInfo/Policies/DatePicker";
import { FEE_SCHEME_CRITERIA_TYPE, FEE_SCHEME_CRITERIA_COMPARASION } from "@/utils/constants";

const DynamicRuleCriteria = ({
  formData,
  setFormData,
  validation,
  setValidation
}) => {
  const handleAddCriteria = () => {
    setFormData((prev) => ({
      ...prev,
      rules: [
        ...prev.rules,
        {
          id: Date.now(),
          comparasion: "",
          value: ""
        }
      ]
    }));
  };

  const handleRemoveCriteria = (id) => {
    setFormData((prev) => {
        if (prev.rules.length == 1) 
            return {
                ...prev
            }
        const updatedCriteria = prev.rules.filter((item) => item.id !== id);
        return {
            ...prev,
            rules: updatedCriteria
        };
    });
  };

  const updateCriteria = (id, field, value) => {
    setFormData((prev) => {
      const updatedCriteria = prev.rules.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      );

      return {
        ...prev,
        rules: updatedCriteria
      };
    });
  };

  return (
    <div className="space-y-4">
      {formData.rules.map((criteriaItem, index) => (
        <div
          key={criteriaItem.id}
          className="flex flex-wrap sm:flex-nowrap flex-row items-end w-full gap-2"
        >
          <div className="w-full">
            <p className="pb-2 text-[12px] font-normal leading-[16px] text-left text-textBlack">Operator</p>

            <div className="flex flex-wrap sm:flex-nowrap flex-row items-center gap-2">
              {/* Comparison Dropdown */}
              <DropDown
                className="w-full h-8 text-xs"
                labelClasses={'text-textBlack'}
                items={[
                  { value: FEE_SCHEME_CRITERIA_COMPARASION.EQUALS, label: "Equals" },
                  { value: FEE_SCHEME_CRITERIA_COMPARASION.LESS_THAN, label: "Less Than" },
                  { value: FEE_SCHEME_CRITERIA_COMPARASION.GREATER_THAN, label: "Greater Than" },
                  { value: FEE_SCHEME_CRITERIA_COMPARASION.GREATER_THAN_EQUAL, label: "Greater Than Equal" },
                  { value: FEE_SCHEME_CRITERIA_COMPARASION.GREATER_THAN_EQUAL, label: "Greater Than Equal" }
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

              {/* Amount Input */}
              {
                <div className="w-full">
                  <input
                    type="text"
                    name="amount"
                    value={criteriaItem.value}
                    className="border border-gray-300 p-3 rounded-[10px] h-8 text-xs w-full text-textBlack"
                    onChange={(e) => updateCriteria(criteriaItem.id, "value", e.target.value)}
                  />
                </div>
              }

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

export default DynamicRuleCriteria;
