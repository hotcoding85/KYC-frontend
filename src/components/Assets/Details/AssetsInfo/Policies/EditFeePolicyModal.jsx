import { z } from "zod";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import useApi from "@/hooks/useApi";
import Modal from "@/components/Modal/Modal";
import { handleEditPolicyFeeFormValidation } from "@/utils/helper";
import { TextButton } from "@/components/Elements/Button/Button";
import Loadingdark from "@/Icons/Loadingdark";

const EditFeePolicyModal = ({
  network,
  assetData,
  closeModal,
  isModalOpen,
  initialData,
  handleFetchPolicy,
}) => {
  const { fetchData } = useApi();

  const assetSchema = z.object({
    ReceiveFee: z.number().min(1, { message: "Receive Fee is required" }),
    purchaseFee: z.number().min(1, { message: "Purchase Fee is required" }),
    internalTransferFee: z
      .number()
      .min(1, { message: "Internal TransferFee Amount is required" }),
    externalTransferFee: z
      .number()
      .min(1, { message: "External TransferFee Amount is required" }),
  });

  const [validation, setValidation] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    ReceiveFee: 0,
    purchaseFee: 0,
    internalTransferFee: 0,
    externalTransferFee: 0,
  });

  const handleSubmit = async () => {
    const validationResult = handleEditPolicyFeeFormValidation(
      formData,
      assetSchema
    );
    setValidation(validationResult);
    if (validationResult.success) {
      setLoading(true);
      const { result, error } = await fetchData(
        `/asset/asset-policy/${initialData["asset_fee_policy_id"]}`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      if (result) {
        handleFetchPolicy(network["network_id"]);
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
          ...(initialData.ReceiveFee && {
            ReceiveFee: Number(initialData.ReceiveFee),
          }),
          ...(initialData.purchaseFee && {
            purchaseFee: Number(initialData.purchaseFee),
          }),
          ...(initialData.internalTransferFee && {
            internalTransferFee: Number(initialData.internalTransferFee),
          }),
          ...(initialData.externalTransferFee && {
            externalTransferFee: Number(initialData.externalTransferFee),
          }),
        };
      });
    }
  }, [initialData]);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Update Asset Policy"
        size="8xl"
        contentClassName="p-0"
      >
        {/* Modal Body */}
        <div className="w-full mx-auto p-5 space-y-4">
          <div className="flex flex-row w-full items-center space-x-4">
            <div className="w-1/2">
              <p className="pb-1 text-[12px] font-normal leading-[16px] text-left text-textBlack">
                Internal Transfer Fee
              </p>
              <input
                type="number"
                name="internalTransferFee"
                value={formData.internalTransferFee}
                onChange={(event) => {
                  setFormData((prev) => ({
                    ...prev,
                    internalTransferFee: parseInt(event.target.value),
                  }));
                }}
                className={`border ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "internalTransferFee"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                } p-3 rounded-[10px] w-full text-textBlack h-[32px]`}
              />
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "internalTransferFee"
              ) && (
                <span className="text-alert text-xs">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "internalTransferFee"
                    )?.message
                  }
                </span>
              )}
            </div>
            <div className="w-1/2">
              <p className="pb-1 text-[12px] font-normal leading-[16px] text-left text-textBlack">
                External Transfer Fee
              </p>
              <input
                type="number"
                name="externalTransferFee"
                value={formData.externalTransferFee}
                onChange={(event) => {
                  setFormData((prev) => ({
                    ...prev,
                    externalTransferFee: parseInt(event.target.value),
                  }));
                }}
                className={`border ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "externalTransferFee"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                } p-3 rounded-[10px] w-full text-textBlack h-[32px]`}
              />
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "externalTransferFee"
              ) && (
                <span className="text-alert text-xs">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "externalTransferFee"
                    )?.message
                  }
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-row w-full items-center space-x-4">
            <div className="w-1/2">
              <p className="pb-1 text-[12px] font-normal leading-[16px] text-left text-textBlack">
                Purchase Fee
              </p>
              <input
                type="number"
                name="purchaseFee"
                value={formData.purchaseFee}
                onChange={(event) => {
                  setFormData((prev) => ({
                    ...prev,
                    purchaseFee: parseInt(event.target.value),
                  }));
                }}
                className={`border ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "purchaseFee"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                } p-3 rounded-[10px] w-full text-textBlack h-[32px]`}
              />
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "purchaseFee"
              ) && (
                <span className="text-alert text-xs">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "purchaseFee"
                    )?.message
                  }
                </span>
              )}
            </div>
            <div className="w-1/2">
              <p className="pb-1 text-[12px] font-normal leading-[16px] text-left text-textBlack">
                Receive Fee
              </p>
              <input
                type="number"
                name="ReceiveFee"
                value={formData.ReceiveFee}
                onChange={(event) => {
                  setFormData((prev) => ({
                    ...prev,
                    ReceiveFee: parseInt(event.target.value),
                  }));
                }}
                className={`border ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "ReceiveFee"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                } p-3 rounded-[10px] w-full text-textBlack h-[32px]`}
              />
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "ReceiveFee"
              ) && (
                <span className="text-alert text-xs">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "ReceiveFee"
                    )?.message
                  }
                </span>
              )}
            </div>
          </div>
        </div>
        {/* Modal Footer */}
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
            title={"Update"}
            isLoading={isLoading}
            onClick={handleSubmit}
            className="!w-[114px] !min-w-[114px]"
            icon={isLoading ? <Loadingdark className="w-5 h-5" /> : undefined}
          />
        </div>
      </Modal>
    </>
  );
};

export default EditFeePolicyModal;
