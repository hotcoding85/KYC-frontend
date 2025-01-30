import React, { useState } from "react";
import "./CheckBox.css";
import { Checkbox } from 'primereact/checkbox';

const CheckBox = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center cursor-pointer select-none w-4 h-4 text-textBlack">
      <Checkbox
        inputId="label"
        checked={checked}
        onChange={onChange}
        className="custom-checkbox"
      />
      {label && <span className="ml-2 text-lg text-textBlack">{label}</span>}
    </label>
  );
};

export default CheckBox;
