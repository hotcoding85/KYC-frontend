"use client";
import React, { useEffect, useState } from "react";
import MemberPermissions from "../MemberPermissions/MemberPermmissions";
import AllAccounts from "@/components/Home/AllAccounts/AllAccounts";
import AllCards from "@/components/Home/AllCards/AllCards";
import UserCardsInfo from "../UserInfo/UserInfo";
import UserInformation from "../UserInformation/UserInformation";
import ActivityTable from "../ActivityTable/ActivityTable";
import PrivacyAndSecurity from "../PrivacyAndSecurity/PrivacyAndSecurity";
import TabNavigationBar from "@/components/Elements/TabNavigationBar/TabNavigationBar";

const MemberDetails = ({ userData }) => {
  // State to manage selected tab
  const [selectedTab, setSelectedTab] = useState(0);

  // Function to render content based on selected tab
  const renderContent = () => {
    switch (selectedTab) {
      case 0:
        return <UserInformations userData={userData} />;
      case 1:
        return <Permissions userData={userData} />;
      case 2:
        return <WalletsAndCards userData={userData} />;
      case 3:
        return <ActivityLog userData={userData} />;
      case 4:
        return <AccountActions userData={userData} />;
      default:
        return null;
    }
  };

  const tabs = [
    { name: "User Information" },
    { name: "Permissions" },
    { name: "Wallets & Cards" },
    { name: "Activity Log" },
    { name: "Account Actions" },
  ];

  return (
    <div className="w-full">
      {/* Tabs */}
      <TabNavigationBar
        tabs={tabs}
        activeTab={selectedTab}
        setActiveTab={setSelectedTab}
      />

      {/* Content based on tab selection */}
      <div className="mt-2">{renderContent()}</div>
    </div>
  );
};

// User Information Section
const UserInformations = ({ userData }) => (
  <UserInformation userData={userData} />
);

// Placeholder components for other tabs
const Permissions = ({ userData }) => <MemberPermissions userData={userData} />;

const WalletsAndCards = () => (
  <>
    <AllAccounts />
    <div className="h-6"></div>
    <AllCards />
  </>
);

const ActivityLog = ({ userData }) => (
  <div className="grid grid-cols-12 space-x-4">
    <div className="col-span-12  md:col-span-8">
      <ActivityTable userData={userData} />
    </div>

    <div className="col-span-12  md:col-span-4">
      <UserCardsInfo userData={userData} />
    </div>
  </div>
);

const AccountActions = ({userData}) => (
  <div className="grid grid-cols-12 gap-4">
    <div className="col-span-12  md:col-span-8">
      <PrivacyAndSecurity userData={userData} />
    </div>

    <div className="col-span-12  md:col-span-4">
      <UserCardsInfo userData={userData} />
    </div>
  </div>
);

export default MemberDetails;
