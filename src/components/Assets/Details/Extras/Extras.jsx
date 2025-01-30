import React, { useState } from "react";
import NftTab from "./NftTab";
import AirdropTab from "./Airdrop";
import Image from "next/image";
import { TextButton } from "@/components/Elements/Button/Button";
import SubTabNavigation from "@/components/Elements/TabNavigationBar/SubTabsNavigation";

export default function Extras() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: "NFTs", content: <NftTab /> },
    { name: "Airdrops", content: <AirdropTab /> }
  ];

  return (
    <>
      <div className="mx-auto">
        <div className="flex flex-nowrap items-center justify-between w-full">
          {/* Tabs Navigation */}
          <SubTabNavigation
            tabs={tabs}
            selectIndex={true}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TextButton
            width="w-auto"
            className="text-nowrap px-4 !py-0"
            title={activeTab === 0 ? "Add new NFT" : "Add new Airdrop"}
          />
        </div>

        {/* Tab Content */}
        <div className="py-4">
          <p>{tabs[activeTab].content}</p>
        </div>
      </div>
    </>
  )
}
