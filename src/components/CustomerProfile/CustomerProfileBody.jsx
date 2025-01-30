import React, { useState } from "react";
import KYCSubmissionsTab from "./KYCSubmissions/KYCSubmissionsTab";
import LoginInformationTab from "./LoginInformation/LoginInformationTab";
import AccountsTab from "./Accounts/AccountsTab";
import TabNavigationBar from "@/components/Elements/TabNavigationBar/TabNavigationBar";
import ProfileOverviewTab from "./ProfileOverviewTab";
import OverviewTab from "./Overview/ProfileOverview";
import TransactionsTab from "./Transactions/TransactionsTab";

const CustomerProfileBody = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabsParent = [
    { name: "Overview", content: <OverviewTab /> },
    { name: "KYC Submissions", content: <KYCSubmissionsTab /> },
    { name: "Login Information", content: <LoginInformationTab /> },
    { name: "Accounts", content: <AccountsTab /> },
    { name: "Transactions", content: <TransactionsTab /> },
  ];

  return (
    <div className="max-w-full px-2 mx-auto mt-0 md:px-4">
      <TabNavigationBar
        tabs={tabsParent}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="mt-3 rounded-lg">
        <div>{tabsParent[activeTab].content}</div>
      </div>
    </div>
  );
};

export default CustomerProfileBody;
