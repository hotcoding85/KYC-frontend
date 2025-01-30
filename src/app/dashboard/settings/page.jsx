"use client";
import TabNavigationBarMobile from "@/components/Elements/TabNavigationBar/TabNavigationBarMobile";
import React, { useState } from "react";
import GeneralTab from "@/components/Settings/GeneralTab";
import SecurityTab from "@/components/Settings/SecurityTab";
import SessionsTab from "@/components/Settings/SessionsTab";
import LegalTab from "@/components/Settings/LegalTab";
import Container from "@/components/Container/Container";
import TabNavigationBar from "@/components/Elements/TabNavigationBar/TabNavigationBar";

// Add debug logging
// console.log("Imported components:", {
//   GeneralTab,
//   SecurityTab,
//   SessionsTab,
//   LegalTab,
//   Container,
//   TabNavigationBar,
// });

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Check if any tab components are undefined
  if (!GeneralTab || !SecurityTab || !SessionsTab || !LegalTab) {
    console.error("One or more tab components are undefined");
    return null;
  }

  const tabs = [
    { name: "General", content: <GeneralTab /> },
    { name: "Security", content: <SecurityTab /> },
    { name: "Sessions", content: <SessionsTab /> },
    { name: "Legal", content: <LegalTab /> },
  ];

  // Check if Container or TabNavigationBar are undefined
  if (!Container) {
    console.error("Container or TabNavigationBar is undefined");
    return null;
  }

  return (
    <>
      <Container pageName={"Settings"}>
        <div>
          <div className="md:hidden">
            <TabNavigationBarMobile
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
          <div className="hidden md:block">
            <TabNavigationBar
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
          <div className="mt-3 rounded-lg">
            <div>{tabs[activeTab].content}</div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SettingsPage;
