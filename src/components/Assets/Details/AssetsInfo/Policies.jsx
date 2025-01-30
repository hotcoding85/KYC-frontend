import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import useApi from "@/hooks/useApi";

import DropDown from "@/components/Elements/DropDown/DropDown";
import { TextButton } from "@/components/Elements/Button/Button";
import Action from "@/components/Elements/Action/Action";
import AddSchemeModal from "@/components/Assets/Details/AssetsInfo/Policies/AddSchemeModal";
import EditPolicyModal from "@/components/Assets/Details/AssetsInfo/Policies/EditPolicyModal";
import SchemeDeleteModal from "@/components/Assets/Details/AssetsInfo/Policies/DeleteSchemeModal";
import EditFeePolicyModal from "@/components/Assets/Details/AssetsInfo/Policies/EditFeePolicyModal";
import useIsMobile from "@/hooks/useIsMobile";
import AssetsFeeScheduleDataTableComponent from "@/components/Elements/DataTable/Assets/feeSchedule";
import Tickgreen from "@/Icons/Tickgreen";

export default function AssetsInfoPolicies({ assetData, toast, networks }) {
  const { fetchData } = useApi()
  const params = useParams()
  const asset_id = params.id
  const isMobile = useIsMobile()
  const [feePolicy, setFeePolicy] = useState();
  const [feePolicyData, setFeePolicyData] = useState([]);
  const [assetPolicy, setAssetPolicy] = useState();
  const [policyData, setPolicyData] = useState([]);
  const [allScheme, setAllScheme] = useState([]);
  const [singleScheme, setSingleScheme] = useState({});
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditPolicyModalOpen, setEditPolicyModalOpen] = useState(false);
  const [isEditFeePolicyModalOpen, setEditFeePolicyModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);
  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);
  const openEditPolicyModal = () => setEditPolicyModalOpen(true);
  const closeEditPolicyModal = () => setEditPolicyModalOpen(false);
  const openEditFeePolicyModal = () => setEditFeePolicyModalOpen(true);
  const closeEditFeePolicyModal = () => setEditFeePolicyModalOpen(false);

  const handleFetchAllScheme = async (network_id) => {
    if (network_id) {
      const { result, error } = await fetchData(`/asset-fee-scheme/network/${network_id}`);
      if (result) {
        setAllScheme(result)
      } else {
        console.log(error)
        toast.current.show({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
      }
    }
  }

  const handleFetchPolicyById = async (networkId) => {
    if (networkId) {
      const { result, error } = await fetchData(`/asset/asset-policy/${networkId}`);
      if (result) {
        setFeePolicy(result)
      } else {
        console.log(error)
        toast.current.show({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
      }
    }
  }

  const handleFetchPolicyAssetById = async (networkId) => {
    if (networkId && asset_id) {
      const { result, error } = await fetchData(`/asset/asset-info/${asset_id}/${networkId}`);
      if (result) {
        setAssetPolicy(result)
      } else {
        console.log(error)
        toast.current.show({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
      }
    }
  }

  useEffect(() => {
    if (selectedNetwork) {
      handleFetchAllScheme(selectedNetwork['network_id'])
      handleFetchPolicyAssetById(selectedNetwork['network_id'])
      handleFetchPolicyById(selectedNetwork['network_id'])
    }
  }, [selectedNetwork]);

  useEffect(() => {
    if (assetPolicy) {
      setPolicyData([
        { label: "Minimum Balance", value: assetPolicy?.minimumBalance, isSpecial: true },
        { label: "Maximum Balance", value: assetPolicy?.maximumBalance },
        { label: "Minimum Transfer Amount", value: assetPolicy?.minimumTransferAmmount },
        { label: "Maximum Transfer Amount", value: assetPolicy?.maximumTransferAmount },
        { label: "Minimum Purchase Amount", value: assetPolicy?.minimumPurchaseAmount },
        { label: "Maximum Purchase Amount", value: assetPolicy?.maximumPurchaseAmount },
        { label: "Minimum Receive Amount", value: assetPolicy?.minimumReceiveAmount },
        { label: "Maximum Receive Amount", value: assetPolicy?.maximumReceiveAmount },
        { label: "New Address for Every Transaction", value: assetPolicy?.newAddressForEveryTransaction }
      ])
    }
    if (feePolicy) {
      setFeePolicyData([
        { label: "Internal Transfer Fee", value: feePolicy?.internalTransferFee, isSpecial: true },
        { label: "External Transfer Fee", value: feePolicy?.externalTransferFee },
        { label: "Purchase Fee", value: feePolicy?.purchaseFee },
        { label: "Receive Fee", value: feePolicy?.ReceiveFee }
      ])
    }
  }, [assetPolicy, feePolicy]);

  return (
    <>
      <div className="flex flex-col justify-between flex-grow space-x-0 lg:flex-row lg:space-x-2">
        {/* Left Section */}
        <div className="flex flex-col w-full lg:w-2/5">
          {/* Status Card */}
          <div className="flex flex-col p-4 bg-white shadow-sm rounded-2xl border-[1px] border-primary50">
            {/* Top Section: Dropdowns and Title */}
            <div className="flex flex-col items-center justify-between lg:flex-row">
              <p className="text-[14px] font-semibold leading-[20px] tracking-[-0.005em] mb-4 text-textBlack lg:text-[14px] ">
                Asset Policies
              </p>
              <div className="relative flex flex-wrap items-center gap-2 text-xs">
                <div className="w-[90px] h-12">
                  <DropDown
                    title="Segment"
                    items={[
                      {
                        label: "Segment 1",
                        value: "segment 1",
                      },
                      {
                        label: "Segment 2",
                        value: "segment 2",
                      },
                    ]}
                    className="border border-primary50"
                    labelClasses="text-textBlack"
                  />
                </div>
                <div className="w-[90px] h-12">
                  <DropDown
                    title="Networks"
                    updateOnValueChange={
                      selectedNetwork
                        ? {
                            value: selectedNetwork["network_id"],
                            label: selectedNetwork.name,
                          }
                        : undefined
                    }
                    onSelect={(e) => {
                      setSelectedNetwork(
                        networks.filter(
                          (each) => each["network_id"] === e.value
                        )[0]
                      );
                    }}
                    defaultValue={
                      selectedNetwork
                        ? {
                            value: selectedNetwork["network_id"],
                            label: selectedNetwork.name,
                          }
                        : undefined
                    }
                    items={networks?.map((each) => {
                      return {
                        label: each.name,
                        value: each["network_id"],
                      };
                    })}
                    className="border border-primary50"
                    labelClasses="text-textBlack"
                  />
                </div>
                <div className="w-10 h-8 flex items-center justify-center border border-primary50 rounded-[10px] mb-3">
                  <Image
                    src="/assets/icons/pencil.svg"
                    alt="pencil"
                    width={14}
                    height={14}
                    className="cursor-pointer"
                    onClick={openEditPolicyModal}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Section: Policy Details */}
            <div className="flex flex-col gap-3">
              {policyData.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-wrap items-center justify-between text-xs text-textBlack gap-1"
                >
                  <p
                    className={`${
                      item.isSpecial ? "text-xs " : "text-xs "
                    } text-[12px] font-medium leading-[16px] text-textSecondary mb-2`}
                  >
                    {item.label}
                  </p>
                  {
                    item.label !== 'New Address for Every Transaction' ?
                    <p
                      className={`w-full sm:w-auto ${
                        item.isSpecial ? "text-xs" : "text-xs "
                      } text-[12px] font-semibold leading-[16px] text-textBlack text-right mb-2`}
                    >
                      {item.value}
                      {item.isSpecial &&
                        assetData?.ticker &&
                        ` ${assetData.ticker}`}
                    </p>
                    :
                    item.value ? <Tickgreen className={'w-6 h-6'} /> : <></>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col w-full h-full gap-2 mt-3 lg:w-2/3 lg:mt-0">
          <div className="flex flex-col gap-2 h-full p-4 space-y-2 bg-white shadow-sm rounded-2xl border-[1px] border-primary50">
            <div className="flex flex-col items-center justify-between lg:flex-row">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[14px] font-semibold leading-[20px] tracking-[-0.005em] mb-2  text-textBlack lg:text-[14px]">
                  Fee Policies
                </p>
              </div>
              <div className="relative flex flex-wrap items-center gap-2 text-xs ">
                <div className="w-[90px] h-12">
                  <DropDown
                    title="Segment"
                    labelClasses="text-textBlack"
                    items={[
                      {
                        label: "Segment 1",
                        value: "segment 1",
                      },
                      {
                        label: "Segment 2",
                        value: "segment 2",
                      },
                    ]}
                    className="border border-primary50"
                  />
                </div>
                <div className="w-[90px] h-12">
                  <DropDown
                    title="Networks"
                    updateOnValueChange={
                      selectedNetwork
                        ? {
                          value: selectedNetwork["network_id"],
                          label: selectedNetwork.name,
                        }
                        : undefined
                    }
                    onSelect={(e) => {
                      setSelectedNetwork(
                        networks.filter(
                          (each) => each["network_id"] === e.value
                        )[0]
                      );
                    }}
                    defaultValue={
                      selectedNetwork
                        ? {
                          value: selectedNetwork["network_id"],
                          label: selectedNetwork.name,
                        }
                        : undefined
                    }
                    items={networks?.map((each) => {
                      return {
                        label: each.name,
                        value: each["network_id"],
                      };
                    })}
                    className="border border-primary50"
                    labelClasses="text-textBlack"
                  />
                </div>
                <div className="w-10 h-8 mb-4 flex items-center justify-center border border-primary50 rounded-[10px]">
                  <Image
                    src="/assets/icons/pencil.svg"
                    alt="pencil"
                    width={14}
                    height={14}
                    className="cursor-pointer"
                    onClick={openEditFeePolicyModal}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col h-full gap-3 mb-4">
              {feePolicyData?.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-wrap items-center justify-between gap-1 "
                >
                  <p className="text-[12px] font-medium leading-[16px] text-textSecondary ">{item.label}</p>
                  <p
                    className={`${
                      isMobile && "w-full"
                    }text-[12px] font-semibold leading-[16px] text-textBlack text-right `}
                  >
                    {item.value}
                    {item.isSpecial &&
                      assetData?.ticker &&
                      ` ${assetData.ticker}`}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <AssetsFeeScheduleDataTableComponent
            title='Fee Schedules'
            data={allScheme}
            handleClick={openModal}
            btnText='Add new scheme'
            isStatementVisible={false}
            openEditModal={openEditModal}
            setSingleScheme={setSingleScheme}
            openDeleteModal={openDeleteModal}
          />
        </div>
      </div>

      {/* Add Fee Scheme Modal */}
      {selectedNetwork && (
        <AddSchemeModal
          assetData={assetData}
          closeModal={closeModal}
          network={selectedNetwork}
          isModalOpen={isModalOpen}
          handleFetchAllScheme={handleFetchAllScheme}
        />
      )}

      {/* Edit Fee Scheme Modal */}
      {singleScheme && selectedNetwork && (
        <AddSchemeModal
          isEdit
          assetData={assetData}
          network={selectedNetwork}
          initialData={singleScheme}
          closeModal={closeEditModal}
          isModalOpen={isEditModalOpen}
          setSingleScheme={setSingleScheme}
          handleFetchAllScheme={handleFetchAllScheme}
        />
      )}

      {singleScheme && (
        <SchemeDeleteModal
          assetData={assetData}
          selectedScheme={singleScheme}
          closeModal={closeDeleteModal}
          isModalOpen={isDeleteModalOpen}
          setSingleScheme={setSingleScheme}
          handleFetchAllScheme={handleFetchAllScheme}
        />
      )}

      {selectedNetwork && assetPolicy && (
        <EditPolicyModal
          assetData={assetData}
          initialData={assetPolicy}
          network={selectedNetwork}
          closeModal={closeEditPolicyModal}
          isModalOpen={isEditPolicyModalOpen}
          handleFetchPolicy={handleFetchPolicyAssetById}
        />
      )}

      {selectedNetwork && feePolicy && (
        <EditFeePolicyModal
          assetData={assetData}
          initialData={feePolicy}
          network={selectedNetwork}
          closeModal={closeEditFeePolicyModal}
          isModalOpen={isEditFeePolicyModalOpen}
          handleFetchPolicy={handleFetchPolicyById}
        />
      )}
    </>
  );
}
