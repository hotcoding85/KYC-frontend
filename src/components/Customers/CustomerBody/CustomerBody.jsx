import React, { useState } from "react";

import KYCSubmissionsTab from "@/components/CustomerProfile/KYCSubmissions/KYCSubmissionsTab";
import LoginInformationTab from "@/components/CustomerProfile/LoginInformation/LoginInformationTab";
import AccountsTab from "@/components/Companies/AccountsTab";
import TransactionsTab from "@/components/CustomerProfile/Transactions/TransactionsTab";
import TabNavigationBar from "@/components/Elements/TabNavigationBar/TabNavigationBar";
import CustomerOverviewTab from "../CustomerOverviewTab/CustomerOverviewTab";

const CustomerBody = ({
  customerDetails,
  formData,
  profile,
  setProfile,
  lastLogin,
  fetchCustomerDetails,
  setFormData,
  showSecondComponent,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabsParent = [
    {
      name: "Overview",
      content: (
        <CustomerOverviewTab
          customerDetails={customerDetails}
          formData={formData}
          profile={profile} 
          fetchCustomerDetails={fetchCustomerDetails}
          setProfile={setProfile}
          lastLogin={lastLogin}
          setFormData={setFormData}
          showSecondComponent={showSecondComponent}
        />
      ),
    },
    { name: "KYC Submissions", content: <KYCSubmissionsTab /> },
    { name: "Login Information", content: <LoginInformationTab user_id={customerDetails?.user_id} fetchCustomerDetails={fetchCustomerDetails} /> },
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

export default CustomerBody;
