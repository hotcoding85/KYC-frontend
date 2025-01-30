"use client";
import { useState } from "react";
import SubTabNavigation from "../Elements/TabNavigationBar/SubTabsNavigation";
import Overview from "./Compliance/Overview";
import DocumentCard from "./Documents/Documents";
import QuestionnaireCard from "./Questionnaire/Questionnaire";
import OwnershipTable from "./Ownership/Ownership";

export default function ComplianceTab() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      name: "Overview",
      content: <Overview />,
    },
    {
      name: "Ownership",
      content: <OwnershipTable />,
    },
    {
      name: "Documents",
      content: <DocumentCard />,
    },
    {
      name: "Questionnaire",
      content: <QuestionnaireCard />,
    },
  ];

  return (
    <div>
      <SubTabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} selectIndex={true} />
        {tabs[activeTab].content}
    </div>
  );
}
