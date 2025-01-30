import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import useApi from "@/hooks/useApi";

import DropDown from "@/components/Elements/DropDown/DropDown";
import { TextButton } from "@/components/Elements/Button/Button";
import Action from "@/components/Elements/Action/Action";
import ScheduleDeleteModal from "@/components/Assets/Details/AssetsInfo/Protocols/DeleteScheduleModal";
import useIsMobile from "@/hooks/useIsMobile";
import AssetsSweepScheduleDataTableComponent from "@/components/Elements/DataTable/Assets/sweepSchedule";
import { isBoolean, isNull } from "util";
import EditEOAProtocolModal from  "@/components/Assets/Details/AssetsInfo/Protocols/EditEOAProtocolModal";
import AddScheduleModal from "./Protocols/AddScheduleModal";

export default function AssetsProtocols({ assetData, toast, networks }) {
  const { fetchData } = useApi()
  const params = useParams()
  const asset_id = params.id
  const isMobile = useIsMobile()
  const [feeProtocol, setFeeProtocol] = useState();
  const [feeProtocolData, setFeeProtocolData] = useState([]);
  const [assetProtocol, setAssetProtocol] = useState();
  const [protocolData, setProtocolData] = useState([]);
  const [allSchedule, setAllSchedule] = useState([]);
  const [singleSchedule, setSingleSchedule] = useState({});
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditProtocolModalOpen, setEditProtocolModalOpen] = useState(false);
  const [isEditFeeProtocolModalOpen, setEditFeeProtocolModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);
  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);
  const openEditProtocolModal = () => setEditProtocolModalOpen(true);
  const closeEditProtocolModal = () => setEditProtocolModalOpen(false);
  const openEditFeeProtocolModal = () => setEditFeeProtocolModalOpen(true);
  const closeEditFeeProtocolModal = () => setEditFeeProtocolModalOpen(false);

  const handleFetchAllSchedule = async (_asset_id) => {
      const { result, error } = await fetchData(`/sweep-schedules/asset/${asset_id}`);
      if (result) {
        setAllSchedule(result)
      } else {
        console.log(error)
        toast.current.show({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
      }
  }

  const handleFetchProtocolById = async (networkId) => {
    if (networkId) {
      const { result, error } = await fetchData(`/asset/asset-protocol/${networkId}`);
      if (result) {
        setFeeProtocol(result)
      } else {
        console.log(error)
        toast.current.show({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
      }
    }
  }

  const handleFetchProtocolAssetById = async (networkId) => {
    if (networkId && asset_id) {
      const { result, error } = await fetchData(`/asset/asset-protocol/${asset_id}/${networkId}`);
      if (result) {
        setAssetProtocol(result)
      } else {
        console.log(error)
        toast.current.show({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
      }
    }
  }

  useEffect(() => {
    if (selectedNetwork) {
      handleFetchProtocolAssetById(selectedNetwork['network_id'])
    }
  }, [selectedNetwork]);

  useEffect(() => {
    if (!assetData || !assetData['asset_id']) return
    handleFetchAllSchedule(assetData['asset_id'])
  }, [assetData])

  useEffect(() => {
    if (assetProtocol) {
      setProtocolData([
        { label: "Sweep EOA", value: assetProtocol?.sweepEOA },
        { label: "Sweep EOA Schedule", value: assetProtocol?.sweepEOASchedule === 'Daily' ? "Daily Based" : 'Gas Price Based' },
        { label: "Minimum Sweep Amount", value: assetProtocol?.minimumSweepAmount },
        { label: "Maximum Sweep Amount", value: assetProtocol?.maximumSweepAmount },
        { label: "Maximum EOA Limit", value: assetProtocol?.maximumEOALimit },
        { label: "Transaction Protocols", value: null, isSpecial: true },
        { label: "Use EOA Address for Transfers", value: assetProtocol?.useEOAAdress },
        { label: "Internal EOA Transaction", value: assetProtocol?.internalEOATransaction },
        { label: "New Address for Every Transaction", value: assetProtocol?.newAddressForEveryTransaction },
      ])
    }
  }, [assetProtocol]);

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
                EOA Protocols
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
                    labelClasses="truncate"
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
                    labelClasses="truncate"
                  />
                </div>
                <div className="w-10 h-8 flex items-center justify-center border border-primary50 rounded-[10px] mb-3">
                  <Image
                    src="/assets/icons/pencil.svg"
                    alt="pencil"
                    width={14}
                    height={14}
                    className="cursor-pointer"
                    onClick={openEditProtocolModal}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Section: Protocol Details */}
            <div className="flex flex-col gap-3">
              {protocolData.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-wrap items-center justify-between text-xs text-textBlack gap-1"
                >
                  <p
                    className={`${
                      item.isSpecial ? "text-sm text-textBlack" : "text-xs text-textSecondary "
                    } text-[12px] font-medium leading-[16px] mb-2`}
                  >
                    {item.label}
                  </p>
                  {
                    !isNull(item.value) && 
                    <p
                      className={`w-full sm:w-auto ${
                        item.isSpecial ? "text-xs" : "text-xs "
                      } text-[12px] font-semibold leading-[16px] text-textBlack text-right mb-2`}
                    >
                      {isBoolean(item.value) ? item.value ? 'Yes' : 'No' : item.value}
                    </p>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col w-full h-full gap-2 mt-3 lg:w-2/3 lg:mt-0">
          <AssetsSweepScheduleDataTableComponent
            title='Sweep Schedules'
            data={allSchedule}
            handleClick={openModal}
            btnText='Add Sweep Schedule'
            isStatementVisible={false}
            openEditModal={openEditModal}
            setSingleSchedule={setSingleSchedule}
            openDeleteModal={openDeleteModal}
          />
        </div>
      </div>

      {/* Add Fee Schedule Modal */}
      {selectedNetwork && (
        <AddScheduleModal
          assetData={assetData}
          closeModal={closeModal}
          network={selectedNetwork}
          isModalOpen={isModalOpen}
          handleFetchAllSchedule={handleFetchAllSchedule}
        />
      )}

      {/* Edit Fee Schedule Modal */}
      {singleSchedule && selectedNetwork && (
        <AddScheduleModal
          isEdit
          assetData={assetData}
          network={selectedNetwork}
          initialData={singleSchedule}
          closeModal={closeEditModal}
          isModalOpen={isEditModalOpen}
          setSingleSchedule={setSingleSchedule}
          handleFetchAllSchedule={handleFetchAllSchedule}
        />
      )}

      {singleSchedule && (
        <ScheduleDeleteModal
          assetData={assetData}
          selectedSchedule={singleSchedule}
          closeModal={closeDeleteModal}
          isModalOpen={isDeleteModalOpen}
          setSingleSchedule={setSingleSchedule}
          handleFetchAllSchedule={handleFetchAllSchedule}
        />
      )}

      {selectedNetwork && assetProtocol && (
        <EditEOAProtocolModal
          assetData={assetData}
          initialData={assetProtocol}
          network={selectedNetwork}
          closeModal={closeEditProtocolModal}
          isModalOpen={isEditProtocolModalOpen}
          handleFetchProtocol={handleFetchProtocolAssetById}
        />
      )}

      {/* {selectedNetwork && feeProtocol && (
        <EditFeeProtocolModal
          assetData={assetData}
          initialData={feeProtocol}
          network={selectedNetwork}
          closeModal={closeEditFeeProtocolModal}
          isModalOpen={isEditFeeProtocolModalOpen}
          handleFetchProtocol={handleFetchProtocolById}
        />
      )} */}
    </>
  );
}
