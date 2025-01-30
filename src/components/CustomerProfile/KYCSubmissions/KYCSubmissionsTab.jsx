import SubTabNavigation from "@/components/Elements/TabNavigationBar/SubTabsNavigation";
import React, { useState } from "react";
import Overview from "./Overview";
import Documents from "./Documents";
import PersonWatchlist from "./PersonWatchlist";
import WebSnapshot from "./WebSnapshot";
import KYCOnboarding from "./onboarding/index";
import KYCDocuments from "@/components/CustomerProfile/KYCSubmissions/KYCDocuments";

const KYCSubmissionsTab = () => {
  const [activeSubTab, setActiveSubTab] = useState(0);

  const subTabs = [
    { name: "Overview", content: <Overview /> },
    { name: "KYC Checks", content: <Documents /> },
    { name: "Onboarding", content: <KYCOnboarding /> },
    { name: "Web Snapshot", content: <WebSnapshot /> },
    { name: "Person Watchlist", content: <PersonWatchlist /> },
    { name: "Documents", content: <KYCDocuments /> },
  ];

  return (
    <>
      <SubTabNavigation
        tabs={subTabs}
        activeTab={activeSubTab}
        setActiveTab={setActiveSubTab}
        selectIndex={true}
      />
      <div className="mt-3 rounded-lg">
        <div>{subTabs[activeSubTab].content}</div>
      </div>
    </>
  );
};

export default KYCSubmissionsTab;
