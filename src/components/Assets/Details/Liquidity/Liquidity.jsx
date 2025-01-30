import React, { useEffect, useRef, useState } from "react";
import useApi from "@/hooks/useApi";
import LiquidityOverview from "./LiquidityOverview";
import LiquidityDetails from "./LiquidityDetails";
import { TextButton } from "@/components/Elements/Button/Button";
import AddNewLiquidityModal from "@/components/Assets/Details/Liquidity/AddNewLiquidity";
import { useParams } from "next/navigation";
import LiquidityDeleteModal from "@/components/Assets/Details/Liquidity/DeleteLiquidityModal";
import { Toast } from "primereact/toast";

export default function Liquidity() {
  const params = useParams();
  const asset_id = params.id;
  const { fetchData } = useApi();

  const toast = useRef(null);

  const [activeTab, setActiveTab] = useState(0);
  const [liquidityState, setLiquidityState] = useState();
  const [isDetailOpen, setDetailOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [singleLiquidityState, setSingleLiquidityState] = useState();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedLiquidity, setSelectedLiquidity] = useState();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);
  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  const handleSetSelectedLiquidity = (liquidity) => {
    setSelectedLiquidity(liquidity);
    setDetailOpen(true)
  };

  const handleFetchLiquidity = async () => {
    if (asset_id) {
      const { result, error } = await fetchData(`/vendor/asset/${asset_id}`);
      if (result) {
        setLiquidityState(result.filter((each) => !each["deleted"]));
      } else {
        console.log(error);
      }
    }
  };

  const handleFetchAndGoToOverviewTab = () => {
    setDetailOpen(false)
    handleFetchLiquidity();
  };

  const tabs = [
    {
      name: "Overview",
      content: (
        <LiquidityOverview
          openEditModal={openEditModal}
          liquidityState={liquidityState}
          openDeleteModal={openDeleteModal}
          setSingleLiquidityState={setSingleLiquidityState}
          handleSetSelectedLiquidity={handleSetSelectedLiquidity}
        />
      ),
    },
    {
      name: "Details",
      content: (
        <LiquidityDetails
          selectedLiquidity={selectedLiquidity}
          handleFetchAndGoToOverviewTab={handleFetchAndGoToOverviewTab}
        />
      ),
    },
  ];

  useEffect(() => {
    handleFetchLiquidity();
  }, []);

  useEffect(() => {
    if (activeTab === 0) {
      setSelectedLiquidity(undefined);
    }
  }, [activeTab]);

  return (
    <>
      {!isDetailOpen && (
        <div className="flex flex-wrap gap-2 items-center justify-between w-full py-2">
          <p className="text-[14px] font-semibold leading-[20px] tracking-[-0.005em] text-left text-textBlack">
            Liquidity Providers
          </p>
          <TextButton
            title="Add new provider"
            onClick={openModal}
            width={"150"}
            className="h-10 text-[12px] font-normal leading-[16px] text-center"
          />
        </div>
      )}

      {isDetailOpen ? (
        <LiquidityDetails
          selectedLiquidity={selectedLiquidity}
          handleFetchAndGoToOverviewTab={handleFetchAndGoToOverviewTab}
        />
      ) : (
        <LiquidityOverview
          openEditModal={openEditModal}
          liquidityState={liquidityState}
          openDeleteModal={openDeleteModal}
          setSingleLiquidityState={setSingleLiquidityState}
          handleSetSelectedLiquidity={handleSetSelectedLiquidity}
        />
      )}

      <AddNewLiquidityModal
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        handleFetchLiquidity={handleFetchLiquidity}
        setSingleLiquidityState={setSingleLiquidityState}
      />
      {singleLiquidityState && (
        <AddNewLiquidityModal
          isEdit
          closeModal={closeEditModal}
          isModalOpen={isEditModalOpen}
          initialData={singleLiquidityState}
          handleFetchLiquidity={handleFetchLiquidity}
          setSingleLiquidityState={setSingleLiquidityState}
        />
      )}
      {singleLiquidityState && (
        <LiquidityDeleteModal
          toast={toast}
          closeModal={closeDeleteModal}
          isModalOpen={isDeleteModalOpen}
          selectedLiquidity={singleLiquidityState}
          setSelectedLiquidity={setSingleLiquidityState}
          handleFetchLiquidity={handleFetchLiquidity}
        />
      )}
      <Toast ref={toast} />
    </>
  );
}
