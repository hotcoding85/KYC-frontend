import React, { useState } from "react";
import { TextButton } from "@/components/Elements/Button/Button";
import AddNewNetworkModal from "./Networks/AddNewNetworkModal";
import NetworksDetailsModal from "./Networks/NetworksDetailsModal";
import Action from "@/components/Elements/Action/Action";
import NetworkDeleteModal from "@/components/Assets/Details/AssetsInfo/Networks/DeleteNetworkModal";
import Search from "@/Icons/Search";
import Image from "next/image";
import useIsMobile from "@/hooks/useIsMobile";
import AssetsNetworkDataTableComponent from "@/components/Elements/DataTable/Assets/networks";

export default function AssetsInfoNetworks({
  networks,
  nodes,
  handleFetchNetworks,
  assetData,
}) {
  const isMobile = useIsMobile()
  const [selectedNetwork, setSelectedNetwork] = useState([]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);
  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);
  const openDetailsModal = () => setDetailsModalOpen(true);
  const closeDetailsModal = () => setDetailsModalOpen(false);

  return (
    <>
      <AssetsNetworkDataTableComponent
        data={networks}
        title={'Networks'}
        isSortable={false}
        handleClick={openModal}
        btnText='Add new network'
        isStatementVisible={false}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
        openDetailsModal={openDetailsModal}
        setSelectedNetwork={setSelectedNetwork}
      />
      <AddNewNetworkModal
        nodesData={nodes}
        assetData={assetData}
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        handleFetchNetworks={handleFetchNetworks}
      />
      <AddNewNetworkModal
        isEdit
        nodesData={nodes}
        assetData={assetData}
        closeModal={closeEditModal}
        initialData={selectedNetwork}
        isModalOpen={isEditModalOpen}
        handleFetchNetworks={handleFetchNetworks}
      />
      <NetworkDeleteModal
        closeModal={closeDeleteModal}
        isModalOpen={isDeleteModalOpen}
        selectedNetwork={selectedNetwork}
        handleFetchNetwork={handleFetchNetworks}
      />
      {selectedNetwork && (
        <NetworksDetailsModal
          isModalOpen={isDetailsModalOpen}
          closeModal={closeDetailsModal}
          selectedNetwork={selectedNetwork}
        />
      )}
    </>
  );
}
