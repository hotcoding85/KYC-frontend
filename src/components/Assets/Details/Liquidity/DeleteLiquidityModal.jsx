import { TextButton } from "@/components/Elements/Button/Button";
import Modal from "@/components/Modal/Modal";
import Image from "next/image";
import React, { useState } from "react";
import useApi from "@/hooks/useApi";
import Loadingdark from "@/Icons/Loadingdark";

const LiquidityDeleteModal = ({
  toast,
  closeModal,
  isModalOpen,
  selectedLiquidity,
  handleFetchLiquidity,
  setSelectedLiquidity,
}) => {
  const { fetchData } = useApi();
  const [isLoading, setLoading] = useState(false);

  const handleDeleteLiquidity = (vendor_id) => {
    if (selectedLiquidity["vendor_id"]) {
      setLoading(true);
      fetchData(`/vendor/${selectedLiquidity["vendor_id"]}`, {
        method: "DELETE",
      })
        .then(() => {
          closeModal();
          handleFetchLiquidity();
          setSelectedLiquidity(undefined);
          setLoading(false);
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Liquidity deleted successfully",
            life: 3000,
          });
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: err.message,
            life: 3000,
          });
        });
    }
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Liquidity details"
        size="2xl"
      >
        {/** Modal Body */}
        <div className="flex flex-col gap-6 w-full mx-auto p-6 space-y-4">
          {selectedLiquidity["name"] && (
            <p>
              are you sure you want to Delete this Liquidity:{" "}
              {selectedLiquidity["name"]}
            </p>
          )}
        </div>
        {/** Modal Footer */}
        <div className="flex justify-end p-4 border-t space-x-4">
          <TextButton
            title="Cancel"
            onClick={closeModal}
            isLoading={isLoading}
            backgroundColor="bg-white"
            textColor="text-textBlack"
            className="border brder-primary50"
            icon={isLoading ? <Loadingdark className="w-5 h-5" /> : undefined}
          />
          <TextButton
            title="Delete"
            isLoading={isLoading}
            textColor="text-white"
            onClick={handleDeleteLiquidity}
            backgroundColor="bg-alert"
            className="border brder-alert"
            icon={isLoading ? <Loadingdark className="w-5 h-5" /> : undefined}
          />
        </div>
      </Modal>
    </>
  );
};
export default LiquidityDeleteModal;
