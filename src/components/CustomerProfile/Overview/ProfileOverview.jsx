import React, { useState } from "react";
import SubTabNavigation from "@/components/Elements/TabNavigationBar/SubTabsNavigation";
import ProfileOverviewTab from "../ProfileOverviewTab";
import AccountActionsTab from "../AccountActionsTab";
import RelatedAccountsTab from "../RelatedAccountsTab";
import ActivityLogsTab from "../ActivityLogsTab";

const OverviewTab = () => {
  const [activeSubTab, setActiveSubTab] = useState(0);

  const subTabs = [
    { name: "Information", content: <ProfileOverviewTab /> },
    { name: "Financial Summary", content: <AccountActionsTab /> },
    { name: "Related Accounts", content: <RelatedAccountsTab /> },
    { name: "Activity Log", content: <ActivityLogsTab /> },
  ];

  return (
    <div>
      <SubTabNavigation
        tabs={subTabs}
        activeTab={activeSubTab}
        setActiveTab={setActiveSubTab}
        selectIndex={true}
      />
      <div className="mt-3 rounded-lg">
        <div>{subTabs[activeSubTab].content}</div>
      </div>
    </div>
  );
};
export default OverviewTab;
