import React from 'react';
import Country from "@/components/Elements/Country/Country";
import { country as Countries } from "@/data/Country/Country";
import DropDown from "@/components/Elements/DropDown/DropDown";
import { capitalizeFirstLetter } from "@/utils/helper";
import CustomDatePicker from "@/components/Assets/Details/AssetsInfo/Policies/DatePicker";
import { FEE_SCHEME_CRITERIA_TYPE, FEE_SCHEME_CRITERIA_COMPARASION, } from "@/utils/constants";

const DynamicFeeCriteria = ({ formData, setFormData, validation, setValidation }) => {
  const handleAddCriteria = () => {
    setFormData(prev => ({
      ...prev,
      criteria: [...prev.criteria, {
        id: Date.now(),
        criteria: "",
        comparasion: "",
        value: ""
      }]
    }));
  };

  const handleRemoveCriteria = (id) => {
    setFormData(prev => {
      if (prev.criteria.length === 1) {
        return {
          ...prev
        }
      }
      const updatedCriteria = prev.criteria.filter(item => item.id !== id);
      return {
        ...prev,
        criteria: updatedCriteria
      };
    });
  };

  const updateCriteria = (id, field, value) => {
    setFormData(prev => {
      const updatedCriteria = prev.criteria.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      );

      return {
        ...prev,
        criteria: updatedCriteria,
      };
    });
  };

  const updateCountryCriteria = (id, field, value) => {
    setFormData(prev => {
      const updatedCriteria = prev.criteria.map(item =>
        item.id === id ? { ...item, [field]: value.value } : item
      );

      return {
        ...prev,
        criteria: updatedCriteria,
      };
    });
  };

  return (
    <div className="space-y-4">
      {formData.criteria.map((criteriaItem, index) => (
        <div key={criteriaItem.id} className="flex flex-row w-full items-end space-x-4">
          <div className="w-full">
            <p className="pb-2 text-textBlack">A{index + 1}</p>
            <div className="flex flex-row items-center space-x-4">
              <DropDown
                title="Criteria"
                className="w-full"
                labelClasses={'text-textBlack'}
                defaultValue={criteriaItem.criteria ? {
                  value: criteriaItem.criteria,
                  label: capitalizeFirstLetter(criteriaItem.criteria.toLowerCase())
                } : undefined}
                items={[
                  { value: FEE_SCHEME_CRITERIA_TYPE['AMOUNT'], label: "Amount" },
                  { value: FEE_SCHEME_CRITERIA_TYPE['DATE'], label: "Date" },
                  { value: FEE_SCHEME_CRITERIA_TYPE['DAY'], label: "Day" },
                  { value: FEE_SCHEME_CRITERIA_TYPE['COUNTRY'], label: "Country" },
                ]}
                onSelect={e => updateCriteria(criteriaItem.id, 'criteria', e.value)}
              />
              <DropDown
                className="w-full"
                labelClasses={'text-textBlack'}
                items={[
                  { value: FEE_SCHEME_CRITERIA_COMPARASION.EQUALS, label: "Equals" },
                  { value: FEE_SCHEME_CRITERIA_COMPARASION.LESS_THAN, label: "Less Than" },
                  { value: FEE_SCHEME_CRITERIA_COMPARASION.GREATER_THAN, label: "Greater Than" },
                ]}
                defaultValue={criteriaItem.comparasion ? {
                  value: criteriaItem.comparasion,
                  label: capitalizeFirstLetter(criteriaItem.comparasion.toLowerCase())
                } : undefined}
                onSelect={e => updateCriteria(criteriaItem.id, 'comparasion', e.value)}
              />

              {(criteriaItem.criteria === FEE_SCHEME_CRITERIA_TYPE['DATE'] || criteriaItem.criteria === FEE_SCHEME_CRITERIA_TYPE['DAY']) && (
                <div className='w-full'>
                  <CustomDatePicker
                    selectedDate={criteriaItem.value}
                    onSelect={date => updateCriteria(criteriaItem.id, 'value', String(date))}
                  />
                </div>
              )}
              {criteriaItem.criteria === FEE_SCHEME_CRITERIA_TYPE['AMOUNT'] && (
                <div className='w-full'>
                  <input
                    type="text"
                    name="amount"
                    value={criteriaItem.value}
                    className={`border border-gray-300 p-3 rounded-2xl h-8 text-xs w-full text-textBlack`}
                    onChange={e => updateCriteria(criteriaItem.id, 'value', e.target.value)}
                  />
                </div>
              )}
              {criteriaItem.criteria === FEE_SCHEME_CRITERIA_TYPE['COUNTRY'] && (
                <div className='w-full'>
                  <Country
                    open={false}
                    id={`country-selector-${criteriaItem.id}`}
                    className={`border border-primary50`}
                    onToggle={() => {
                    }}
                    selectedValue={criteriaItem.value ? Countries.find((option) => option.value === criteriaItem.value) : Countries[0]}
                    onChange={(value) => updateCountryCriteria(criteriaItem.id, 'value', value)}
                  />
                </div>
              )}
              <button
                onClick={() => handleRemoveCriteria(criteriaItem.id)}
                className="bg-red-500 text-white rounded-lg w-[60px] h-5 flex items-center justify-center"
              >
                &minus;
              </button>
              <button
                onClick={handleAddCriteria}
                className="bg-black text-white rounded-lg w-[60px] h-5 flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DynamicFeeCriteria;