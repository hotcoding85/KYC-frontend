"use client";
import React, { useState } from "react";
import SubTabNavigation from "../Elements/TabNavigationBar/SubTabsNavigation";
import PrivacyPolicy from "@/components/Settings/PrivacyPolicy";

export default function LegalTab() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: "Terms of use", content: <PrivacyPolicy /> },
    {
      name: "Privacy Policy",
      content: <PrivacyPolicy />,
    },
    {
      name: "Cookie Policy",
      content: <PrivacyPolicy />,
    },
  ];
  return (
    <div className="mx-auto">
      {/* Tabs Navigation */}
      <SubTabNavigation
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectIndex={true}
      />

      {/* Tab Content */}
      <div className="py-2 md:py-0">
        <div>{tabs[activeTab].content}</div>
      </div>
    </div>
  );
}
