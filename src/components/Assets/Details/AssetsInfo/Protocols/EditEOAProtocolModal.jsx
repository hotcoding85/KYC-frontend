import { z } from "zod";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import useApi from "@/hooks/useApi";
import Modal from "@/components/Modal/Modal";
import CheckBox from "@/components/Elements/Checkbox/CheckBox";
import { handleEditProtocolFormValidation } from "@/utils/helper";
import { TextButton } from "@/components/Elements/Button/Button";
import Loadingdark from "@/Icons/Loadingdark";
import DropDown from "@/components/Elements/DropDown/DropDown";
import {
    capitalizeFirstLetter,
    handleAddSchemeFormValidation,
} from "@/utils/helper";

const EditEOAProtocolModal = ({
  network,
  assetData,
  closeModal,
  isModalOpen,
  initialData,
  handleFetchProtocol,
}) => {
  const { fetchData } = useApi();

  const assetSchema = z.object({
    minimumSweepAmount: z
      .number()
      .min(0, { message: "Minimum Sweep Amount is required" }),
    maximumSweepAmount: z
      .number()
      .min(1, { message: "Maximum Sweep Amount is required" }),
    maximumEOALimit: z
      .number()
      .min(1, { message: "Maximum EOA Limit is required" }),
  });

  const [validation, setValidation] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    minimumSweepAmount: 10.5,
    maximumSweepAmount: 10000,
    maximumEOALimit: 10000,
    sweepEOASchedule: 'GasPrice',
    useEOAAdress: false,
    internalEOATransaction: false,
    newAddressForEveryTransaction: false,
    sweepEOA: false,
  });

  const handleSubmit = async () => {
    const validationResult = handleEditProtocolFormValidation(
      formData,
      assetSchema
    );
    setValidation(validationResult);
    if (validationResult.success) {
      setLoading(true);
      const { result, error } = await fetchData(
        `/asset/asset-protocol/${assetData["asset_id"]}/${network["network_id"]}`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      if (result) {
        handleFetchProtocol(network["network_id"]);
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
          ...(initialData.minimumSweepAmount && {
            minimumSweepAmount: Number(initialData.minimumSweepAmount),
          }),
          ...(initialData.maximumSweepAmount && {
            maximumSweepAmount: Number(initialData.maximumSweepAmount),
          }),
          ...(initialData.maximumEOALimit && {
            maximumEOALimit: Number(initialData.maximumEOALimit),
          }),
          ...(initialData.sweepEOA && {
            sweepEOA:
              initialData.sweepEOA,
          }),
          ...(initialData.useEOAAdress && {
            useEOAAdress:
              initialData.useEOAAdress,
          }),
          ...(initialData.internalEOATransaction && {
            internalEOATransaction:
              initialData.internalEOATransaction,
          }),
          ...(initialData.newAddressForEveryTransaction && {
            newAddressForEveryTransaction:
              initialData.newAddressForEveryTransaction,
          }),
          ...(initialData.sweepEOASchedule && {
            sweepEOASchedule:
              initialData.sweepEOASchedule,
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
        title="Update Asset Protocol"
        customWidth="w-11/12 md:w-3/4 xl:w-5/12"
        contentClassName="p-0"
      >
        {/* Modal Body */}
        <div className="w-full mx-auto  space-y-4 p-4">
          <div className="flex flex-row w-full items-center space-x-2">
            <div className="w-1/2">
              <p className="text-[12px] font-normal leading-[16px] text-left mb-1 text-textBlack">
                Minimum Sweep Amount
              </p>
              <input
                name="minimumSweepAmount"
                type="number"
                value={formData.minimumSweepAmount}
                onChange={(event) => {
                  setFormData((prev) => ({
                    ...prev,
                    minimumSweepAmount: parseInt(event.target.value),
                  }));
                }}
                className={`border ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "minimumSweepAmount"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                } p-3 rounded-[10px] w-full text-textBlack h-[32px]`}
              />
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "minimumSweepAmount"
              ) && (
                <span className="text-alert text-xs">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "minimumSweepAmount"
                    )?.message
                  }
                </span>
              )}
            </div>
            <div className="w-1/2">
              <p className="text-[12px] font-normal leading-[16px] text-left mb-1 text-textBlack">
                Maximum Sweep Amount
              </p>
              <input
                name="maximumSweepAmount"
                type="number"
                value={formData.maximumSweepAmount}
                onChange={(event) => {
                  setFormData((prev) => ({
                    ...prev,
                    maximumSweepAmount: parseInt(event.target.value),
                  }));
                }}
                className={`border ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "maximumSweepAmount"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                } p-3 rounded-[10px] w-full text-textBlack h-[32px]`}
              />
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "maximumSweepAmount"
              ) && (
                <span className="text-alert text-xs">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "maximumSweepAmount"
                    )?.message
                  }
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-row w-full items-center space-x-2">
            <div className="w-1/2">
              <p className="text-[12px] font-normal leading-[16px] text-left mb-1 text-textBlack">
                Maximum EOA Limit
              </p>
              <input
                name="maximumEOALimit"
                type="number"
                value={formData.maximumEOALimit}
                onChange={(event) => {
                  setFormData((prev) => ({
                    ...prev,
                    maximumEOALimit: parseInt(event.target.value),
                  }));
                }}
                className={`border ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "maximumEOALimit"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                } p-3 rounded-[10px] w-full text-textBlack h-[32px]`}
              />
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "maximumEOALimit"
              ) && (
                <span className="text-alert text-xs">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "maximumEOALimit"
                    )?.message
                  }
                </span>
              )}
            </div>
            <div className="w-1/2">
              <p className="text-[12px] font-normal leading-[16px] text-left mb-1 text-textBlack">
              Sweep EOA Schedule
              </p>
              <DropDown
                title="Sweep EOA Schedule"
                labelClasses={'text-textBlack'}
                onSelect={(e) => {
                  setFormData((prev) => {
                    return {
                      ...prev,
                      sweepEOASchedule: e.value,
                    };
                  });
                }}
                defaultValue={
                  formData && formData.sweepEOASchedule
                    ? {
                        value: formData.sweepEOASchedule,
                        label: formData.sweepEOASchedule && formData.sweepEOASchedule === 'Daily' ? 'Daily' : 'Gas Price',
                      }
                    : undefined
                }
                items={[
                    {value: 'Daily', label: 'Daily'},
                    {value: 'GasPrice', label: 'Gas Price'}
                ]}
                className={`border ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "networkId"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                }`}
              />
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "sweepEOASchedule"
              ) && (
                <span className="text-alert text-xs">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "sweepEOASchedule"
                    )?.message
                  }
                </span>
              )}
            </div>
          </div>

          {/* randon coment */}
          <div className="flex flex-row w-full items-center space-x-2">
            <div className="w-full">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[12px] font-normal mb-[6px] leading-[16px] text-left text-textBlack">
                Sweep EOA
                </p>
                <CheckBox
                  className="mt-2"
                  checked={formData.sweepEOA}
                  onChange={(e) => {
                    console.log("e", e);
                    setFormData((prev) => {
                      return {
                        ...prev,
                        sweepEOA: e.target.checked,
                      };
                    });
                  }}
                />
              </div>
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "sweepEOA"
              ) && (
                <span className="text-alert text-xs">
                  {
                    validation.error.issues.find(
                      (issue) =>
                        issue.path[0] === "sweepEOA"
                    )?.message
                  }
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-row w-full items-center space-x-2">
            <div className="w-full">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[12px] font-normal mb-[6px] leading-[16px] text-left text-textBlack">
                Use EOA Address for Transfers
                </p>
                <CheckBox
                  className="mt-2"
                  checked={formData.useEOAAdress}
                  onChange={(e) => {
                    console.log("e", e);
                    setFormData((prev) => {
                      return {
                        ...prev,
                        useEOAAdress: e.target.checked,
                      };
                    });
                  }}
                />
              </div>
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "useEOAAdress"
              ) && (
                <span className="text-alert text-xs">
                  {
                    validation.error.issues.find(
                      (issue) =>
                        issue.path[0] === "useEOAAdress"
                    )?.message
                  }
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-row w-full items-center space-x-2">
            <div className="w-full">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[12px] font-normal mb-[6px] leading-[16px] text-left text-textBlack">
                Internal EOA Transaction
                </p>
                <CheckBox
                  className="mt-2"
                  checked={formData.internalEOATransaction}
                  onChange={(e) => {
                    console.log("e", e);
                    setFormData((prev) => {
                      return {
                        ...prev,
                        internalEOATransaction: e.target.checked,
                      };
                    });
                  }}
                />
              </div>
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "internalEOATransaction"
              ) && (
                <span className="text-alert text-xs">
                  {
                    validation.error.issues.find(
                      (issue) =>
                        issue.path[0] === "internalEOATransaction"
                    )?.message
                  }
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-row w-full items-center space-x-2">
            <div className="w-full">
              <div className="flex items-center justify-between gap-4">
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

export default EditEOAProtocolModal;
