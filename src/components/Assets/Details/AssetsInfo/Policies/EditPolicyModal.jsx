import { z } from "zod";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import useApi from "@/hooks/useApi";
import Modal from "@/components/Modal/Modal";
import CheckBox from "@/components/Elements/Checkbox/CheckBox";
import { handleEditPolicyFormValidation } from "@/utils/helper";
import { TextButton } from "@/components/Elements/Button/Button";
import Loadingdark from "@/Icons/Loadingdark";

const EditPolicyModal = ({
  network,
  assetData,
  closeModal,
  isModalOpen,
  initialData,
  handleFetchPolicy,
}) => {
  const { fetchData } = useApi();

  const assetSchema = z.object({
    minimumBalance: z
      .number()
      .min(0, { message: "Minimum Balance is required" }),
    maximumBalance: z
      .number()
      .min(1, { message: "Maximum Balance is required" }),
    minimumTransferAmmount: z
      .number()
      .min(1, { message: "Minimum Receive Amount is required" }),
    maximumTransferAmount: z
      .number()
      .min(1, { message: "Maximum Receive Amount is required" }),
    minimumPurchaseAmount: z
      .number()
      .min(1, { message: "Minimum Transfer Amount is required" }),
    maximumPurchaseAmount: z
      .number()
      .min(1, { message: "Maximum Transfer Amount is required" }),
    minimumReceiveAmount: z
      .number()
      .min(1, { message: "Minimum Purchase Amount is required" }),
    maximumReceiveAmount: z
      .number()
      .min(1, { message: "Maximum Purchase Amount is required" }),
  });

  const [validation, setValidation] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    minimumBalance: 10.5,
    maximumBalance: 10000,
    minimumTransferAmmount: 5,
    maximumTransferAmount: 10000,
    minimumPurchaseAmount: 10,
    maximumPurchaseAmount: 5000,
    minimumReceiveAmount: 1,
    maximumReceiveAmount: 20000,
    newAddressForEveryTransaction: false,
  });

  const handleSubmit = async () => {
    const validationResult = handleEditPolicyFormValidation(
      formData,
      assetSchema
    );
    setValidation(validationResult);
    if (validationResult.success) {
      setLoading(true);
      const { result, error } = await fetchData(
        `/asset/asset-info/${assetData["asset_id"]}/${network["network_id"]}`,
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
          ...(initialData.minimumBalance && {
            minimumBalance: Number(initialData.minimumBalance),
          }),
          ...(initialData.maximumBalance && {
            maximumBalance: Number(initialData.maximumBalance),
          }),
          ...(initialData.minimumTransferAmmount && {
            minimumTransferAmmount: Number(initialData.minimumTransferAmmount),
          }),
          ...(initialData.maximumTransferAmount && {
            maximumTransferAmount: Number(initialData.maximumTransferAmount),
          }),
          ...(initialData.minimumPurchaseAmount && {
            minimumPurchaseAmount: Number(initialData.minimumPurchaseAmount),
          }),
          ...(initialData.maximumPurchaseAmount && {
            maximumPurchaseAmount: Number(initialData.maximumPurchaseAmount),
          }),
          ...(initialData.minimumReceiveAmount && {
            minimumReceiveAmount: Number(initialData.minimumReceiveAmount),
          }),
          ...(initialData.maximumReceiveAmount && {
            maximumReceiveAmount: Number(initialData.maximumReceiveAmount),
          }),
          ...(initialData.newAddressForEveryTransaction && {
            newAddressForEveryTransaction:
              initialData.newAddressForEveryTransaction,
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
        customWidth="w-11/12 md:w-3/4 xl:w-5/12"
        contentClassName="p-0"
      >
        {/* Modal Body */}
        <div className="w-full mx-auto  space-y-4 p-4">
          <div className="flex flex-row w-full items-center space-x-2">
            <div className="w-1/2">
              <p className="text-[12px] font-normal leading-[16px] text-left mb-1 text-textBlack">
                Minimum Balance
              </p>
              <input
                name="minimumBalance"
                type="number"
                value={formData.minimumBalance}
                onChange={(event) => {
                  setFormData((prev) => ({
                    ...prev,
                    minimumBalance: parseInt(event.target.value),
                  }));
                }}
                className={`border ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "minimumBalance"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                } p-3 rounded-[10px] w-full text-textBlack h-[32px]`}
              />
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "minimumBalance"
              ) && (
                <span className="text-alert text-xs">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "minimumBalance"
                    )?.message
                  }
                </span>
              )}
            </div>
            <div className="w-1/2">
              <p className="text-[12px] font-normal leading-[16px] text-left mb-1 text-textBlack">
                Maximum Balance
              </p>
              <input
                name="maximumBalance"
                type="number"
                value={formData.maximumBalance}
                onChange={(event) => {
                  setFormData((prev) => ({
                    ...prev,
                    maximumBalance: parseInt(event.target.value),
                  }));
                }}
                className={`border ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "maximumBalance"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                } p-3 rounded-[10px] w-full text-textBlack h-[32px]`}
              />
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "maximumBalance"
              ) && (
                <span className="text-alert text-xs">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "maximumBalance"
                    )?.message
                  }
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-row w-full items-center space-x-2">
            <div className="w-1/2">
              <p className=" text-[12px] font-normal leading-[16px] text-left mb-1 text-textBlack">
                Minimum Transfer Amount
              </p>
              <input
                name="minimumTransferAmmount"
                type="number"
                value={formData.minimumTransferAmmount}
                onChange={(event) => {
                  setFormData((prev) => ({
                    ...prev,
                    minimumTransferAmmount: parseInt(event.target.value),
                  }));
                }}
                className={`border ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "minimumPurchaseAmount"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                } p-3 rounded-[10px] w-full text-textBlack h-[32px]`}
              />
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "minimumPurchaseAmount"
              ) && (
                <span className="text-alert text-xs">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "minimumPurchaseAmount"
                    )?.message
                  }
                </span>
              )}
            </div>
            <div className="w-1/2">
              <p className="text-[12px] font-normal leading-[16px] text-left mb-1 text-textBlack">
                Maximum Transfer Amount
              </p>
              <input
                name="maximumTransferAmount"
                type="number"
                value={formData.maximumTransferAmount}
                onChange={(event) => {
                  setFormData((prev) => ({
                    ...prev,
                    maximumTransferAmount: parseInt(event.target.value),
                  }));
                }}
                className={`border ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "maximumTransferAmount"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                } p-3 rounded-[10px] w-full text-textBlack h-[32px]`}
              />
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "maximumTransferAmount"
              ) && (
                <span className="text-alert text-xs">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "maximumTransferAmount"
                    )?.message
                  }
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-row w-full items-center space-x-2">
            <div className="w-1/2">
              <p className="text-[12px] font-normal leading-[16px] text-left mb-1 text-textBlack">
                Minimum Purchase Amount
              </p>
              <input
                name="minimumPurchaseAmount"
                type="number"
                value={formData.minimumPurchaseAmount}
                onChange={(event) => {
                  setFormData((prev) => ({
                    ...prev,
                    minimumPurchaseAmount: parseInt(event.target.value),
                  }));
                }}
                className={`border ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "minimumPurchaseAmount"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                } p-3 rounded-[10px] w-full text-textBlack h-[32px]`}
              />
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "minimumTransferAmmount"
              ) && (
                <span className="text-alert text-xs">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "minimumTransferAmmount"
                    )?.message
                  }
                </span>
              )}
            </div>
            <div className="w-1/2">
              <p className=" text-[12px] font-normal leading-[16px] text-left mb-1 text-textBlack">
                Maximum Purchase Amount
              </p>
              <input
                name="maximumPurchaseAmount"
                type="number"
                value={formData.maximumPurchaseAmount}
                onChange={(event) => {
                  setFormData((prev) => ({
                    ...prev,
                    maximumPurchaseAmount: parseInt(event.target.value),
                  }));
                }}
                className={`border ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "maximumPurchaseAmount"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                } p-3 rounded-[10px] w-full text-textBlack h-[32px]`}
              />
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "maximumPurchaseAmount"
              ) && (
                <span className="text-alert text-xs">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "maximumPurchaseAmount"
                    )?.message
                  }
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-row w-full items-center space-x-2">
            <div className="w-1/2">
              <p className=" text-[12px] font-normal leading-[16px] text-left mb-1 text-textBlack">
                Minimum Receive Amount
              </p>
              <input
                name="minimumReceiveAmount"
                type="number"
                value={formData.minimumReceiveAmount}
                onChange={(event) => {
                  setFormData((prev) => ({
                    ...prev,
                    minimumReceiveAmount: parseInt(event.target.value),
                  }));
                }}
                className={`border ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "minimumReceiveAmount"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                } p-3 rounded-[10px] w-full text-textBlack h-[32px]`}
              />
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "minimumReceiveAmount"
              ) && (
                <span className="text-alert text-xs">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "minimumReceiveAmount"
                    )?.message
                  }
                </span>
              )}
            </div>
            <div className="w-1/2">
              <p className=" text-[12px] font-normal leading-[16px] text-left mb-1 text-textBlack">
                Maximum Receive Amount
              </p>
              <input
                name="maximumReceiveAmount"
                type="number"
                value={formData.maximumReceiveAmount}
                onChange={(event) => {
                  setFormData((prev) => ({
                    ...prev,
                    maximumReceiveAmount: parseInt(event.target.value),
                  }));
                }}
                className={`border ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "maximumReceiveAmount"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                } p-3 rounded-[10px] w-full text-textBlack h-[32px]`}
              />
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "maximumReceiveAmount"
              ) && (
                <span className="text-alert text-xs">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "maximumReceiveAmount"
                    )?.message
                  }
                </span>
              )}
            </div>
          </div>

          {/* randon coment */}
          <div className="flex flex-row w-full items-center space-x-2">
            <div className="w-full">
              <div className="flex items-center gap-4">
                <p className="text-[12px] font-normal mb-[6px] leading-[16px] text-left text-textBlack">
                  New Address for Every Transaction
                </p>
                <CheckBox
                  className="mt-2"
                  checked={formData.newAddressForEveryTransaction}
                  onChange={(e) => {
                    console.log("e", e);
                    setFormData((prev) => {
                      return {
                        ...prev,
                        newAddressForEveryTransaction: e.target.checked,
                      };
                    });
                  }}
                />
              </div>
              {/*<input*/}
              {/*  name="newAddressForEveryTransaction"*/}
              {/*  type="text"*/}
              {/*  value={formData.newAddressForEveryTransaction}*/}
              {/*  onChange={event => {*/}
              {/*    setFormData(prev => ({*/}
              {/*      ...prev,*/}
              {/*      newAddressForEveryTransaction: event.target.value*/}
              {/*    }))*/}
              {/*  }}*/}
              {/*  className={`border ${*/}
              {/*    validation?.error?.issues.some((issue) => issue.path[0] === "newAddressForEveryTransaction") ? "border-red-500" : "border-primary50"*/}
              {/*  } p-3 rounded-[10px] w-full text-textBlack h-[32px]`}*/}
              {/*/>*/}
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "newAddressForEveryTransaction"
              ) && (
                <span className="text-alert text-xs">
                  {
                    validation.error.issues.find(
                      (issue) =>
                        issue.path[0] === "newAddressForEveryTransaction"
                    )?.message
                  }
                </span>
              )}
            </div>
          </div>
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end p-4 border-t space-x-2">
          <TextButton
            title="Cancel"
            onClick={closeModal}
            isLoading={isLoading}
            backgroundColor="bg-white"
            textColor="text-textBlack"
            className="border brder-primary50 !w-[114px] !min-w-[114px] "
            icon={isLoading ? <Loadingdark className="w-5 h-5" /> : undefined}
          />
          <TextButton
            title={"Update"}
            isLoading={isLoading}
            onClick={handleSubmit}
            className={"!w-[114px] !min-w-[114px]"}
            icon={isLoading ? <Loadingdark className="w-5 h-5" /> : undefined}
          />
        </div>
      </Modal>
    </>
  );
};

export default EditPolicyModal;
