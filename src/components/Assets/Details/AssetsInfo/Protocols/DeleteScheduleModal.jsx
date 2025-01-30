import Image from "next/image";
import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";

import useApi from "@/hooks/useApi";
import Modal from "@/components/Modal/Modal";
import { TextButton } from "@/components/Elements/Button/Button";
import Loadingdark from "@/Icons/Loadingdark";

const ScheduleDeleteModal = ({
  closeModal,
  isModalOpen,
  selectedSchedule,
  setSingleSchedule,
  handleFetchAllSchedule,
}) => {
  const { fetchData } = useApi();
  const toast = useRef(null);
  const [isLoading, setLoading] = useState(false);

  const handleDeleteNode = async () => {
    console.log(selectedSchedule['sweep_schedule_id'])
    if (selectedSchedule["sweep_schedule_id"]) {
      setLoading(true);
      fetchData(`/sweep-schedules/${selectedSchedule["sweep_schedule_id"]}`, {
        method: "DELETE",
      })
        .then(() => {
          handleFetchAllSchedule();
          setLoading(false);
          closeModal();
          setSingleSchedule && setSingleSchedule({});
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Sweep Schedule deleted successfully",
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
        title="Sweep Schedule details"
        size="2xl"
      >
        {/** Modal Body */}
        <div className="flex flex-col gap-6 w-full mx-auto p-6 space-y-4">
          <p className="text-textBlack">
            Are you sure you want to Delete this Sweep Schedule:{" "}
            {selectedSchedule["activity"]} with id {selectedSchedule["id"]}
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
            textColor="text-textBlack"
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
export default ScheduleDeleteModal;
