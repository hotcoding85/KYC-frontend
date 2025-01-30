'use client'
import Image from 'next/image'
import React, { useEffect, useState } from "react";
import { TextButton } from "@/components/Elements/Button/Button";
import AddNewNodeModal from "./Nodes/AddNewNodeModal";
import NodesDetailsModal from "./Nodes/NodesDetailsModal";
import useApi from "@/hooks/useApi";
import { useParams } from "next/navigation";
import Action from "@/components/Elements/Action/Action";
import NodeDeleteModal from "@/components/Assets/Details/AssetsInfo/Nodes/NodeDeleteModal";
import useIsMobile from "@/hooks/useIsMobile";
import Search from "@/Icons/Search";
import AssetsNetworkDataTableComponent from "@/components/Elements/DataTable/Assets/networks";

export default function AssetsInfoNodes({ toast, networks }) {
  const params = useParams()
  const asset_id = params.id

  const { fetchData } = useApi();
  const isMobile = useIsMobile()

  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [state, setState] = useState([]);
  const [selectedNode, setSelectedNode] = useState({});
  const [initialData, setInitialData] = useState({});

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);
  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);
  const openDetailsModal = () => setDetailsModalOpen(true);
  const closeDetailsModal = () => setDetailsModalOpen(false);

  const handleFetchNodes = async () => {
    if (asset_id) {
      const { result, error } = await fetchData(`/node/asset/${asset_id}`);
      if (result) {
        setState(result)
      } else {
        console.log(error)
        toast.current.show({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
      }
    }
  }

  useEffect(() => {
    if (asset_id) handleFetchNodes()
  }, [asset_id])

  return (
    <>
      <AssetsNetworkDataTableComponent
        data={state}
        title={'Nodes'}
        isSortable={false}
        btnText='Add new node'
        handleClick={openModal}
        isStatementVisible={false}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
        openDetailsModal={openDetailsModal}
        setSelectedNetwork={setSelectedNode}
      />
      {networks?.length > 0 && (
        <AddNewNodeModal
          toast={toast}
          networks={networks}
          closeModal={closeModal}
          isModalOpen={isModalOpen}
          handleFetchNodes={handleFetchNodes}
        />
      )}
      {networks?.length > 0 && (
        <AddNewNodeModal
          isEdit
          toast={toast}
          networks={networks}
          initialData={initialData}
          handleFetchNodes={handleFetchNodes}
          isModalOpen={isEditModalOpen}
          closeModal={closeEditModal}
        />
      )}
      <NodesDetailsModal
        toast={toast}
        selectedNode={selectedNode}
        closeModal={closeDetailsModal}
        isModalOpen={isDetailsModalOpen}
      />
      <NodeDeleteModal
        toast={toast}
        selectedNode={selectedNode}
        closeModal={closeDeleteModal}
        isModalOpen={isDeleteModalOpen}
        handleFetchNodes={handleFetchNodes}
      />
    </>
  );
}
