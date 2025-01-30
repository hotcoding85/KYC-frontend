'use client'
import Country from "@/components/Elements/Country/Country";
import DropDown from "@/components/Elements/DropDown/DropDown";
import React, { useState } from "react"
import { country as Countries } from "@/data/Country/Country";
import { TextButton } from "@/components/Elements/Button/Button"
import CountriesPhone from "@/components/Elements/Country/CountriesNumber"

const content = [
  "In accordance with U.S. legislation on tax administration and the prevention of money laundering and terrorist financing, we are required to collect customer information before establishing a business relationship to fulfill the 'Know Your Customer' requirement.",
  "We reserve the right to request additional documents and/or information at any time. All information provided will be treated as confidential and protected in accordance with U.S. law on the legal protection of personal data and GDPR requirements. For further details, please refer to our Privacy Policy."
]

const checkItemsContent = [
  "I confirm that I am personally up to date and compliant with IRS tax filing requirements.",
  "I also confirm that I am in full compliance with the Foreign Account Tax Compliance Act (FATCA)."
]
const EntityVerification = ({ onNext }) => {

  const [items, setItems] = useState([false, false])
  const onStartVerification = () => {
    if (items.every(item => item === true)) {
      onNext(); // Call onNext if all items are true
    }
  }
  return (
    <div className="flex flex-col gap-4">
      {content.map((each, idx) => (
        <p
          key={idx}
          className="font-normal text-xs text-textSecondary"
        >
          {each}
        </p>
      ))}

      {checkItemsContent.map((each, idx) => (
        <CheckboxItems key={idx} idx={idx} text={each} checked={items[idx]} setItems={setItems} />
      ))}

      <TextButton
        title="Start Verification"
        textColor="text-white"
        backgroundColor="bg-primary"
        className="py-1 px-4 w-full"
        onClick={onStartVerification}
      />
    </div>
  );
};

export default EntityVerification

export const CheckboxItems = ({ idx, text, children, setItems, checked }) => {
  const onCheckboxChange = (e) => {
    setItems(prev => {
      // Toggle the checked status at the specified index
      const updatedItems = [...prev]; // Create a copy of the previous state
      updatedItems[idx] = !updatedItems[idx]; // Toggle the boolean value at the index
      return updatedItems; // Return the updated array
    });
  };
  return (
    <div className="flex items-start gap-2">
      <input
        type="checkbox"
        className="w-4 h-4 rounded border-[0.8px] border-primary50 shadow-checkbox"
        checked={checked}
        onChange={onCheckboxChange}
      />
      {text && (
        <p className="font-semibold text-xs text-textBlack">
          {text}
        </p>
      )}
      {children && children}
    </div>
  )
}
