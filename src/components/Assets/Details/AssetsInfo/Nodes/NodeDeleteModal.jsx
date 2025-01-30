import { TextButton } from "@/components/Elements/Button/Button";
import Modal from "@/components/Modal/Modal";
import Image from "next/image";
import React, { useState } from "react";
import useApi from "@/hooks/useApi";
import Loadingdark from "@/Icons/Loadingdark";

const NodeDeleteModal = ({
  toast,
  closeModal,
  isModalOpen,
  selectedNode,
  handleFetchNodes,
}) => {
  const { fetchData } = useApi();
  const [isLoading, setLoading] = useState(false);

  const handleDeleteNode = async () => {
    if (selectedNode["node_id"]) {
      setLoading(true);
      fetchData(`/node/${selectedNode["node_id"]}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.result) {
          closeModal();
          handleFetchNodes();
          setLoading(false);
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Node deleted successfully",
            life: 3000,
          });
        }
        if (res.error) {
          closeModal();
          setLoading(false);
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: res.error.message,
            life: 3000,
          });
        }
      });
    }
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Node details"
        size="2xl"
        contentClassName="p-0"
      >
        {/** Modal Body */}
        <div className="flex flex-col gap-6 w-full mx-auto p-4 space-y-4">
          <p>are you sure you want to Delete this Node: {selectedNode.name}</p>
        </div>
        {/** Modal Footer */}
        <div className="flex justify-end p-4 border-t gap-2">
          <TextButton
            title="Cancel"
            onClick={closeModal}
            isLoading={isLoading}
            backgroundColor="bg-white"
            textColor="text-textBlack"
            className="border brder-primary50 !w-[114px] !min-w-[114px]"
            icon={isLoading ? <Loadingdark className="w-5 h-5" /> : undefined}
          />
          <TextButton
            title="Delete"
            isLoading={isLoading}
            textColor="text-white"
            onClick={handleDeleteNode}
            backgroundColor="bg-alert"
            className="border brder-alert !w-[114px] !min-w-[114px]"
            icon={isLoading ? <Loadingdark className="w-5 h-5" /> : undefined}
          />
        </div>
      </Modal>
    </>
  );
};
export default NodeDeleteModal;
