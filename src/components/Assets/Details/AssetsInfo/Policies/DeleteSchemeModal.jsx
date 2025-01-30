import Image from "next/image";
import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";

import useApi from "@/hooks/useApi";
import Modal from "@/components/Modal/Modal";
import { TextButton } from "@/components/Elements/Button/Button";
import Loadingdark from "@/Icons/Loadingdark";

const SchemeDeleteModal = ({
  closeModal,
  isModalOpen,
  selectedScheme,
  setSingleScheme,
  handleFetchAllScheme,
}) => {
  const { fetchData } = useApi();
  const toast = useRef(null);
  const [isLoading, setLoading] = useState(false);

  const handleDeleteNode = async () => {
    if (selectedScheme["fee_scheme_id"]) {
      setLoading(true);
      fetchData(`/fee-scheme/${selectedScheme["fee_scheme_id"]}`, {
        method: "DELETE",
      })
        .then(() => {
          handleFetchAllScheme();
          setLoading(false);
          closeModal();
          setSingleScheme && setSingleScheme({});
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Scheme deleted successfully",
            life: 3000,
          });
        })
        .catch((e) => {
          setLoading(false);
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: e.message,
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
        title="Fee Scheme details"
        size="2xl"
      >
        {/** Modal Body */}
        <div className="flex flex-col gap-6 w-full mx-auto p-6 space-y-4">
          <p>
            are you sure you want to Delete this Fee Scheme:{" "}
            {selectedScheme["activity"]} with id {selectedScheme["id"]}
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
            className="border brder-primary50"
            icon={isLoading ? <Loadingdark className="w-5 h-5" /> : undefined}
          />
          <TextButton
            title="Delete"
            isLoading={isLoading}
            textColor="text-white"
            onClick={handleDeleteNode}
            backgroundColor="bg-alert"
            className="border brder-alert"
            icon={isLoading ? <Loadingdark className="w-5 h-5" /> : undefined}
          />
        </div>
      </Modal>
      <Toast ref={toast} />
    </>
  );
};
export default SchemeDeleteModal;
