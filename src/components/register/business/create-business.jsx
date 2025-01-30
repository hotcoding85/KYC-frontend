'use client'
import CustomDatePicker from "@/components/Assets/Details/AssetsInfo/Policies/DatePicker";
import Country from "@/components/Elements/Country/Country";
import DropDown from "@/components/Elements/DropDown/DropDown";
import React, { useState } from "react"
import { country as Countries } from "@/data/Country/Country";
import { TextButton } from "@/components/Elements/Button/Button"
import CountriesPhone from "@/components/Elements/Country/CountriesNumber"

const dropdownItems = [
  { label: "Entity 1", value: "entity 1" },
  { label: "Entity 2", value: "entity 2" }
];
const checkItems = [
  'I confirm that I am personally up to date and compliant with IRS tax filing requirements.',
  'I also confirm that I am in full compliance with the Foreign Account Tax Compliance Act (FATCA).',
  'I also confirm that I agree to our Terms & Conditions and Privacy Policy'
]
const BusinessCreateAccount = ({ onNext, onPrev }) => {
  const [items, setItems] = useState([false, false, false])

  const onCreateAccount = () => {
    // Check if all items are true
    if (items.every(item => item === true)) {
      onNext(); // Call onNext if all items are true
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <p className="font-normal text-xs text-textSecondary">
        Opening a Business Account with us will allow you to control your business and personal finances separately.
      </p>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 items-center">
        <div className="col-span-2 sm:col-span-1">
          <SingleInput label="Legal Name*" />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <SingleInput label="Role in company*" />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <SingleInput label="Email Address*" />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <SingleInput label="Phone number*" isPhone />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <SingleInput label="Country" isCountry />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <SingleInput label="Tax Id Number*" />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <SingleInput
            isDropdown
            label="Entity Type*"
            dropdownItems={dropdownItems}
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <SingleInput label="State / Province*" />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <SingleInput label="City*" />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <SingleInput label="Street Name*" />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <SingleInput label="Street Address 2" />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <SingleInput label="Postal / ZIP Code*" />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <SingleInput label="Registration Date*" />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <SingleInput label="Registration Number*" />
        </div>
        <div className="col-span-2 w-full">
          <SingleInput label="Business Website" />
        </div>
      </div>

      <div className="flex flex-col w-full gap-2">
        {checkItems.map((each, idx) => (
          <CheckboxItems key={idx} text={each} checked={items[idx]} setItems={setItems} idx={idx} />
        ))}
      </div>

      <TextButton
        title="Create Account"
        textColor="text-white"
        backgroundColor="bg-primary"
        className="py-1 px-4 w-full"
        onClick={onCreateAccount}
      />
    </div>
  );
};

export default BusinessCreateAccount

export const SingleInput = ({ label, isPhone, isCountry, type, isDropdown, dropdownItems, isDatePicker }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isCountryOpen, setCountryOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(() => Countries.filter(each => each.value === "AE")[0])
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
  };

  return (
    <div>
      <label className="font-normal text-xs text-textBlack mb-1">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea className={`w-full h-32 rounded-[10px] border-[1px] border-primary50 py-1 px-2 text-xs resize-none focus-visible:outline-none`} />
      ) : isCountry ? (
        <Country
          open={isCountryOpen}
          onChange={handleCountryChange}
          onToggle={() => setCountryOpen(prev => !prev)}
          selectedValue={Countries.find((option) => option.value === selectedCountry)}
          className="h-8"
        />
      ) : isDropdown ? (
        <DropDown items={dropdownItems} className={"w-full h-8"} />
      ) : isDatePicker ? (
        <CustomDatePicker
          // name="startTime"
          height={true}
          selectedDate={selectedDate}
          onSelect={date => {
            setSelectedDate(date);
          }}
        />
      ) : (
        <div className="flex items-center gap-1">
          {isPhone && (
            <CountriesPhone
              id={"country-selector"}
              open={isOpen}
              onChange={(value) => setSelectedValue(value)}
              onToggle={() => setIsOpen(prev => !prev)}
              selectedValue={Countries.find(
                (option) => option.areaCode === selectedValue.areaCode
              )}
              width="w-16"
              className={`border border-primary50 py-1 px-2`}
            />
          )}
          <input
            type={type || "text"}
            className={`w-full h-8 rounded-[10px] border-[1px] border-primary50 py-1 px-2 text-xs focus-visible:outline-none text-textBlack`}
          />
        </div>
      )}
    </div>
  )
}

export const CheckboxItems = ({ text, children, customClasses, idx, checked, setItems }) => {
  const onCheckboxChange = (e) => {
    setItems && setItems(prev => {
      // Toggle the checked status at the specified index
      const updatedItems = [...prev]; // Create a copy of the previous state
      updatedItems[idx] = !updatedItems[idx]; // Toggle the boolean value at the index
      return updatedItems; // Return the updated array
    });
  };
  return (
    <div className={customClasses || `flex items-start gap-2`}>
      <input
        type="checkbox"
        className="w-4 h-4 flex-shrink-0 appearance-none rounded border-[1px] border-gray-300 checked:bg-black cursor-pointer transition-colors focus:ring-0 focus:outline-none checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22%23fff%22%3E%3Cpath%20d%3D%22M12.207%204.793a1%201%200%20010%201.414l-5%205a1%201%200%2001-1.414%200l-2-2a1%201%200%20011.414-1.414L6.5%209.086l4.293-4.293a1%201%200%20011.414%200z%22%2F%3E%3C%2Fsvg%3E')] checked:bg-no-repeat checked:bg-center"
        value={checked}
        onChange={onCheckboxChange}
      />
      {text && (
        <p className="font-normal text-xs text-textLight">
          {text}
        </p>
      )}
      {children && children}
    </div>
  )
}
