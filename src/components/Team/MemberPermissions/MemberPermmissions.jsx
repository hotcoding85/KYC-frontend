"use client";
import React from "react";
import UserCardsInfo from "../UserInfo/UserInfo";
import Cross from "@/Icons/Cross";
import Check from "@/Icons/Check";

import { PERMISSIONS } from "@/utils/constants";

const MemberPermissions = ({ userData }) => {
  const permissions = userData?.permission || {};
  console.log(permissions)
  // Individual Permission Item
  const PermissionItem = ({ label, isAllowed }) => (
    <li className="flex text-sm flex-row gap-2">
      {isAllowed ? <Check className="w-[24px] h-[24px]" /> : <Cross />}
      <p>{label}</p>
    </li>
  );

  // Permission Section
  const PermissionSection = ({ title, isAllowed, items }) => (
    <div>
      <h4 className="font-medium text-sm mb-2 flex flex-row gap-4 text-textBlack">
        {isAllowed ? <Check className="w-[24px] h-[24px]" /> : <Cross />}
        <p>{title}</p>
      </h4>
      <ul className="space-y-2 text-textBlack pl-4 text-[12px] font-normal leading-4">
        {items.map((item, index) => (
          <PermissionItem
            key={index}
            label={item.label}
            isAllowed={permissions[item.key]}
          />
        ))}
      </ul>
    </div>
  );

  // Render Permissions Dynamically
  const renderPermissionSections = (permissionGroup) => (
    <div className="bg-white p-4 rounded-2xl">
      <h3 className="mb-4 text-sm font-semibold text-textBlack leading-[20px] tracking-[-0.005em] text-left">
        {permissionGroup.title}
      </h3>
      <div className="grid grid-cols-2 gap-6">
        {permissionGroup.sections.map((section, index) => (
          <PermissionSection
            key={index}
            title={section.title}
            isAllowed={permissions[section.key]}
            items={section.items}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="mx-auto grid grid-cols-3 gap-6 mb-8">
      <div className="col-span-3 md:col-span-2 space-y-6">
        {Object.values(PERMISSIONS).map((group, index) =>
          renderPermissionSections(group)
        )}
      </div>

      <div className="col-span-3 md:col-span-1">
        <UserCardsInfo userData={userData} />
      </div>
    </div>
  );
};

export default MemberPermissions;
