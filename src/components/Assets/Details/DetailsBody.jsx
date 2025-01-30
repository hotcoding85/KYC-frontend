"use client";
import Image from "next/image";
import { Toast } from "primereact/toast";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import Back from "@/Icons/Back";
import useApi from "@/hooks/useApi";
import Extras from "./Extras/Extras";
import Wallets from "./Wallets/Wallets";
import Liquidity from "./Liquidity/Liquidity";
import AssetsInfo from "./AssetsInfo/AssetsInfo";
import EditAsset from "@/components/Assets/EditAsset";
import S3Image from "@/components/Elements/S3Image/S3Image";
import DetailsTransactions from "./Transactions/Transactions";
import { TextButton } from "@/components/Elements/Button/Button";
import TabNavigationBar from "@/components/Elements/TabNavigationBar/TabNavigationBar";
import TabNavigationBarMobile from "@/components/Elements/TabNavigationBar/TabNavigationBarMobile";
import Loadingdark from "@/Icons/Loadingdark";
import Btc from "@/Icons/imageicon/Btc";

const AssetsDetailsBody = () => {
  const { back } = useRouter();
  const params = useParams();
  const asset_id = params.id;

  const { fetchData } = useApi();

  const toast = useRef(null);

  const [activeTab, setActiveTab] = useState(0);
  const [assetData, setAssetData] = useState();
  const [assetStatus, setAssetStatus] = useState("");
  const [isSuspendLoading, setSuspendLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  const tabs = [
    {
      name: "Asset Information",
      content: <AssetsInfo assetData={assetData} toast={toast} />,
    },
    { name: "Liquidity", content: <Liquidity /> },
    { name: "Wallets", content: <Wallets /> },
    { name: "Transactions", content: <DetailsTransactions /> },
    { name: "Extras", content: <Extras /> },
  ];

  const handleFetchAsset = async () => {
    if (asset_id) {
      const { result, error } = await fetchData(`/asset/${asset_id}`);
      if (result) {
        setAssetData(result);
        const status = result.status
          ? result.active
            ? "success"
            : "danger"
          : "warning";
        setAssetStatus(
          status === "success"
            ? "Trading"
            : status === "danger"
            ? "Suspended"
            : "Inactive"
        );
      } else {
        console.log(error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: error.message,
          life: 3000,
        });
      }
    }
  };

  const handleSuspendAsset = async () => {
    if (assetData?.asset_id) {
      setSuspendLoading(true);
      const { result, error } = await fetchData(
        `/asset/${assetData.asset_id}`,
        {
          method: "PUT",
          body: {
            active: !assetData?.active,
          },
        }
      );
      if (result) {
        handleFetchAsset();
        setSuspendLoading(false);
      } else {
        setSuspendLoading(false);
        // Error Message
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (asset_id) handleFetchAsset();
  }, [asset_id]);

  return (
    <>
      <div className="flex flex-col justify-between md:flex-row">
        <div className="flex items-center justify-between md:justify-start gap-2 md:gap-4">
          <div className="flex items-center gap-2 md:gap-4">
            <span onClick={back} className="md:mr-auto cursor-pointer md:ml-0">
              <Back />
            </span>
            {assetData?.icon ? (
              <S3Image
                className="w-[32px] h-[32px] rounded-full"
                s3Url={assetData?.icon}
              />
            ) : (
                <Btc className="rounded-full" />
            )}
            <div>
              <h1 className="font-[450]  text-sm text-textBlack">
                {assetData?.name || "Bitcoin"} ({assetData?.ticker || "BTC"})
              </h1>
              <p className="text-sm font-medium text-textBlack">
                {assetData?.usd_value || "28,549"}${" "}
                <span className="ml-2 text-success">↑3%</span>
              </p>
            </div>
          </div>
          <button
            className={`${
              assetStatus.toLowerCase() === "suspended"
                ? "bg-alertLight text-red-600 "
                : assetStatus.toLowerCase() === "inactive"
                ? "bg-orange-100 text-warning"
                : "bg-successLight text-success"
            } px-4 py-1 rounded-full md:my-0 my-2 text-sm`}
            disabled
          >
            {assetStatus || "Trading"}
          </button>
        </div>

        <div className="md:flex justify-center gap-2 hidden">
          <TextButton
            isLoading={isSuspendLoading}
            backgroundColor={"bg-white"}
            onClick={handleSuspendAsset}
            title={assetData?.active ? "Suspend" : "Activate"}
            textColor={assetData?.active ? "text-alert" : "text-success"}
            className={`min-w-[90px] border-[1px] h-10 ${
              assetData?.active ? "border-alert" : "border-success"
            }`}
            icon={
              isSuspendLoading ? <Loadingdark className="w-5 h-5" /> : undefined
            }
          />
          <TextButton
            title="Edit"
            onClick={openEditModal}
            textColor="text-textBlack"
            backgroundColor="bg-white"
            className="min-w-[90px] border h-10 border-primary50"
          />
        </div>
      </div>

      <div className="mx-auto mt-2 max-w">
        {/* Tabs Navigation */}
        <div className="md:hidden">
          <TabNavigationBarMobile
            tabs={tabs}
            className="px-2"
            activeTab={activeTab}
            width="w-full min-w-[120px]"
            setActiveTab={setActiveTab}
          />
        </div>
        <div className="hidden md:block">
          <TabNavigationBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={tabs}
          />
        </div>

        {/* Tab Content */}
        <div className="mt-[5px] rounded-lg">
          <div className='"text-sm'>{tabs[activeTab].content}</div>
        </div>
      </div>

      {assetData && (
        <EditAsset
          isModalOpen={isEditModalOpen}
          closeModal={closeEditModal}
          fetchListAssets={handleFetchAsset}
          initialData={{
            asset_id: assetData.asset_id,
            name: assetData.name,
            ticker: assetData.ticker,
            usd_value: parseInt(assetData.usd_value),
            daily_volume: parseInt(assetData.daily_volume),
            type: assetData.type,
            status: assetData.status,
            liquidity: assetData?.liquidity?.map((each) => {
              return {
                value: each.vendor_id,
                label: each.name,
              };
            }),
            country: assetData.country,
            icon: assetData.icon,
          }}
        />
      )}
      <Toast ref={toast} />
    </>
  );
};

export default AssetsDetailsBody;
