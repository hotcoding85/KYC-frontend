import React from "react";

const InfoSection = ({ title, fields }) => {
  return title && fields ? (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold leading-4 text-left text-customBlack">{title}</h4>
      {fields && fields.length > 0 ? (
        <ul className="space-y-3">
          {fields.map((field, index) => (
            <li key={index} className="flex flex-col sm:flex-row gap-1 sm:justify-between">
              <p className="font-medium text-xs text-textSecondary">{field.label}</p>
              <p className="font-inter text-sm font-semibold leading-4 text-left">{field.value}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-gray-500">No information available.</p>
      )}
    </div>
  ) : null;
};

export default InfoSection;
