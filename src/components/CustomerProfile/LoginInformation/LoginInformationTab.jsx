import React, { useState } from "react";
import SubTabNavigation from "@/components/Elements/TabNavigationBar/SubTabsNavigation";
import LoginCredentialsContent from "./LoginCredentialsContent";
import SessionsContent from "./SessionsContent";

const LoginInformationTab = ({user_id, fetchCustomerDetails}) => {
  const [activeSubTab, setActiveSubTab] = useState(0);

  const subTabs = [
    { name: "Login Credentials", content: <LoginCredentialsContent user_id={user_id} fetchCustomerDetails={fetchCustomerDetails} /> },
    { name: "Sessions", content: <SessionsContent user_id={user_id} fetchCustomerDetails={fetchCustomerDetails} /> },
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

export default LoginInformationTab;
