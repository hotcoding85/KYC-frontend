"use client";
import { z } from "zod";
import Image from "next/image";
import useApi from "@/hooks/useApi";
import React, { useEffect, useState } from "react";

import Modal from "@/components/Modal/Modal";
import { TextButton } from "@/components/Elements/Button/Button";
import { useParams } from "next/navigation";
import Loadingdark from "@/Icons/Loadingdark";

const AddNewNetworkModal = ({
  isModalOpen,
  closeModal,
  handleFetchNetworks,
  isEdit,
  initialData,
  assetData,
}) => {
  const params = useParams();
  const asset_id = params.id;

  const assetSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
  });

  const { fetchData } = useApi();

  const [isLoading, setLoading] = useState(false);
  const [validation, setValidation] = useState({});
  const [formData, setFormData] = useState({
    assetId: asset_id,
    name: "",
  });

  const handleSubmit = async () => {
    const validationResult = assetSchema.safeParse({
      name: formData.name,
    });
    setValidation(validationResult);
    if (validationResult.success) {
      setLoading(true);
      const { result, error } =
        isEdit && initialData && initialData["network_id"]
          ? await fetchData(`/networks/${initialData["network_id"]}`, {
              method: "PUT",
              body: formData,
            })
          : await fetchData(`/networks`, {
              method: "POST",
              body: formData,
            });
      if (result) {
        console.log(result);
        handleFetchNetworks && handleFetchNetworks();
        closeModal();
        setLoading(false);
      } else {
        setLoading(false);
        // Error Message
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => {
        return {
          ...prev,
          ...(initialData.nodeId && { nodeId: initialData.nodeId }),
          ...(initialData.name && { name: initialData.name }),
        };
      });
    }
  }, [initialData]);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={isEdit ? "Update network" : "Add new network"}
        customWidth="w-11/12 md:w-3/4 xl:w-5/12"
        contentClassName="p-0"
      >
        {/* Modal Body */}
        <div className="w-full mx-auto pb-4 space-y-4 p-4">
          <div className="flex flex-col items-center w-full space-x-4 md:flex-row">
            {/* <div className="w-full md:w-1/2">
              <p className="font-normal text-sm text-textBlack pb-2 tracking-[-0.005em]">
                Asset ID
              </p>
              <input
                disabled
                type="text"
                name="name"
                value={assetData?.ticker || ""}
                className={`border border-gray-300 p-3  rounded-[10px] w-full h-[32px] text-textBlack`}
              />
            </div> */}
            <div className="w-full">
              <p className="font-normal text-sm text-textBlack pb-2 tracking-[-0.005em]">
                Name
              </p>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={({ target }) =>
                  setFormData((prev) => {
                    return {
                      ...prev,
                      name: target.value,
                    };
                  })
                }
                className={`border border-gray-300 p-3  rounded-[10px] w-full h-[32px] text-textBlack ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "name"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                }`}
              />
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "name"
              ) && (
                <span className="text-xs text-alert">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "name"
                    )?.message
                  }
                </span>
              )}
            </div>
          </div>
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end p-4 gap-4 border-t">
          <TextButton
            title="Cancel"
            onClick={closeModal}
            isLoading={isLoading}
            backgroundColor="bg-white"
            textColor="text-textBlack"
            borderColor="border"
            className="!w-[114px] !min-w-[114px]"
            icon={isLoading ? <Loadingdark className="w-5 h-5" /> : undefined}
          />
          <TextButton
            title={isEdit ? "Update" : "Add"}
            isLoading={isLoading}
            onClick={handleSubmit}
            className="!min-w-[114px]"
            icon={isLoading ? <Loadingdark className="w-5 h-5" /> : undefined}
          />
        </div>
      </Modal>
    </>
  );
};
export default AddNewNetworkModal;
