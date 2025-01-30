import { useState } from "react";
import TabNavigationBar from "../Elements/TabNavigationBar/TabNavigationBar";
import APIKeys from "./APIKeys";
import Logs from "./Logs";
import Overview from "./Overview";
import Webhooks from "./Webhooks";

const DevelopersComponent = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: "Overview", content: <Overview /> },
    { name: "API Keys", content: <APIKeys /> },
    { name: "Webhooks", content: <Webhooks /> },
    { name: "Logs", content: <Logs /> },
  ];

  return (
    <>
      <div className="mx-auto max-w">
        <TabNavigationBar
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div className="mt-4 rounded-lg">
          <div>{tabs[activeTab].content}</div>
        </div>
      </div>
    </>
  );
};

export default DevelopersComponent;
