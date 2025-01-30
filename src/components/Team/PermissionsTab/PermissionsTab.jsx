import React from "react";
import CheckBox from "@/components/Elements/Checkbox/CheckBox";
import { PERMISSIONS } from "@/utils/constants";
// Define Permissions Enum


const PermissionsTab = ({ permissions, setPermissions }) => {
  const handleCheckboxChange = (section, group, name) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [section]: {
        ...prevPermissions[section],
        [group]: {
          ...prevPermissions[section][group],
          [name]: !prevPermissions[section][group][name],
        },
      },
    }));
  };

  // Render Permission Items
  const renderPermissionItems = (sectionKey, groupKey, items) => (
    <div className="space-y-2 pl-4">
      {items.map((item, index) => (
        <label key={index} className="flex items-center gap-2 text-sm text-textBlack">
          <CheckBox
            checked={permissions[sectionKey]?.[groupKey]?.[item.key]}
            onChange={() => handleCheckboxChange(sectionKey, groupKey, item.key)}
          />
          {item.label}
        </label>
      ))}
    </div>
  );

  // Render Permission Sections
  const renderPermissionSections = (sectionKey, sections) => (
    <div className="grid grid-cols-2 gap-6">
      {sections.map((section, index) => (
        <div key={index} className="col-span-2 md:col-span-1">
          <h3 className="font-medium text-sm sm:text-base text-textBlack mb-2">{section.title}</h3>
          {renderPermissionItems(sectionKey, section.key, section.items)}
        </div>
      ))}
    </div>
  );

  // Render Permission Groups
  const renderPermissionGroups = () =>
    Object.entries(PERMISSIONS).map(([sectionKey, group]) => (
      <div key={sectionKey} className="bg-white p-4 rounded-2xl">
        <h2 className="text-sm sm:text-base font-medium mb-4 text-textBlack">{group.title}</h2>
        {renderPermissionSections(sectionKey, group.sections)}
      </div>
    ));

  return <div className="container mx-auto space-y-5">{renderPermissionGroups()}</div>;
};

export default PermissionsTab;
