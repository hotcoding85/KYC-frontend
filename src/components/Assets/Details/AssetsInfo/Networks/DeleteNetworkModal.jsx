import { TextButton } from "@/components/Elements/Button/Button";
import Modal from "@/components/Modal/Modal";
import Image from "next/image";
import React, { useState } from "react";
import useApi from "@/hooks/useApi";
import Loadingdark from "@/Icons/Loadingdark";

const NetworkDeleteModal = ({
  toast,
  isModalOpen,
  closeModal,
  selectedNetwork,
  handleFetchNetwork,
}) => {
  const { fetchData } = useApi();
  const [isLoading, setLoading] = useState(false);

  const handleDeleteNetwork = async () => {
    if (selectedNetwork["network_id"]) {
      setLoading(true);
      fetchData(`/networks/${selectedNetwork["network_id"]}`, {
        method: "DELETE",
      })
        .then(() => {
          handleFetchNetwork();
          closeModal();
          setLoading(false);
        })
        .catch((err) => {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: err.message,
            life: 3000,
          });
          setLoading(false);
        });
    }
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Delete Network"
        size="2xl"
        contentClassName="p-0"
      >
        {/** Modal Body */}
        <div className="flex flex-col gap-6 w-full mx-auto p-4 space-y-4">
          <p>
            are you sure you want to Delete this Network: {selectedNetwork.name}
          </p>
        </div>
        {/** Modal Footer */}
        <div className="flex justify-end p-4 border-t space-x-4">
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
            onClick={handleDeleteNetwork}
            backgroundColor="bg-alert"
            className="border brder-alert !w-[114px] !min-w-[114px]"
            icon={isLoading ? <Loadingdark className="w-5 h-5" /> : undefined}
          />
        </div>
      </Modal>
    </>
  );
};
export default NetworkDeleteModal;
