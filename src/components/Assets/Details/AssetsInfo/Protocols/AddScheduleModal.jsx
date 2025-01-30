import { z } from "zod";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

import useApi from "@/hooks/useApi";
import MinusRed from "@/Icons/MinusRed";
import AddBlack from "@/Icons/Add-Black";
import Modal from "@/components/Modal/Modal";
import DropDown from "@/components/Elements/DropDown/DropDown";
import { TextButton } from "@/components/Elements/Button/Button";
import {
  capitalizeFirstLetter,
  handleAddScheduleFormValidation,
} from "@/utils/helper";
import CustomDatePicker from "@/components/Assets/Details/AssetsInfo/Policies/DatePicker";
import {
  FEE_SCHEME_FEE_TYPE,
  FEE_SCHEME_GAS_PRICE_TYPE,
  FEE_SCHEME_ACTIVITY,
} from "@/utils/constants";
import DynamicRuleCriteria from "@/components/Assets/Details/AssetsInfo/Protocols/DynamicRuleCriteria";
import { useParams } from "next/navigation";
import Loadingdark from "@/Icons/Loadingdark";
import { Toast } from "primereact/toast";

const AddScheduleModal = ({
  isEdit,
  network,
  assetData,
  closeModal,
  initialData,
  isModalOpen,
  setSingleSchedule,
  handleFetchAllSchedule,
}) => {
    const { fetchData } = useApi();
    const params = useParams();
    const toast = useRef(null);
    const asset_id = params.id;
    const feeTypeEnum = z.enum([
        FEE_SCHEME_FEE_TYPE["PERCENT"],
        FEE_SCHEME_FEE_TYPE["AMOUNT"],
    ]);
    const gasPriceTypeEnum = z.enum([
        FEE_SCHEME_GAS_PRICE_TYPE["PERCENT"],
        FEE_SCHEME_GAS_PRICE_TYPE["AMOUNT"],
  ]);

    const operator = z.enum([
        { value: 'GREATER_THAN', label: "Greater Than" },
        { value: 'LESS_THAN', label: "Less Than" },
        { value: 'EQUAL', label: "Equal" },
        { value: 'NOT_EQUAL', label: "Not Equal" },
    ])

  const assetSchedule = z
    .object({
      rules: z.array(z.any()),
    });

  const [validation, setValidation] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    networkId: network["network_id"],
    asset: assetData,
    assetId: assetData['asset_id'],
    scheduleOn: 'DURATION',
    rules: [
      {
        comparasion: "",
        value: "",
      },
    ],
    repeat: undefined,
    duration: 0
  });

  const handleSubmit = async () => {
    const validationResult = handleAddScheduleFormValidation(
      formData,
      assetSchedule
    );
    setValidation(validationResult);
    if (validationResult.success) {
      setLoading(true);
      const requestBody = { ...formData };

      // Dynamically adjust the body based on scheduleOn
      if (requestBody.scheduleOn === 'DURATION') {
        requestBody.rules = [{
          comparasion: "",
          value: "",
        }]; // Clear rules when scheduleOn is DURATION
      } else if (requestBody.scheduleOn === 'GAS_PRICE') {
        requestBody.repeat = ''; // Remove repeat
        requestBody.duration = ''; // Remove duration
      }

      const { result, error } =
        isEdit && initialData && initialData["sweep_schedule_id"]
          ? await fetchData(
              `/sweep-schedules/${initialData["sweep_schedule_id"]}`,
              {
                method: "PATCH",
                body: (requestBody),
              }
            )
          : await fetchData(`/sweep-schedules`, {
              method: "POST",
              body: (requestBody),
            });
      if (result) {
        handleFetchAllSchedule(assetData["asset_id"]);
        setSingleSchedule && setSingleSchedule({});
        closeModal();
        setLoading(false);
        toast.current.show({
          severity: "success",
          summary: "Saved",
          detail: "New Sweep Schedule had successfully been saved!",
          life: 3000,
        });
      } else {
        setLoading(false);
        // Error Message
        console.log(error);
        toast.current.show({
          severity: "error",
          summary: "Warning",
          detail: Array.isArray(error.message) ? error.message[0] : error.message,
          life: 3000,
        });
      }
    }
  };

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => {
        return {
          ...prev,
          scheduleOn: initialData.scheduleOn,
          repeat: initialData.repeat,
          duration: initialData.duration,
          rules: initialData.rules
        };
      });
    }
  }, [initialData]);

  const handleRemoveCriteria = (id) => {
    // setFormData((prev) => {
    //   const updatedCriteria = prev.criteria.filter((item) => item.id !== id);
    //   return {
    //     ...prev,
    //     criteria: updatedCriteria,
    //   };
    // });
  };

  const handleAddCriteria = () => {
    // setFormData((prev) => ({
    //   ...prev,
    //   criteria: [
    //     ...prev.criteria,
    //     {
    //       id: Date.now(),
    //       criteria: "",
    //       comparasion: "",
    //       value: "",
    //     },
    //   ],
    // }));
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Sweep Schedule"
        customWidth="w-16/24 md:w-10/12 xl:w-8/12"
        contentClassName="p-0"
      >
        {/* Modal Body */}
        <div className="w-full p-4 mx-auto gap-4">
          <div className="flex flex-col items-center w-full gap-2 md:flex-row">
            <div className="w-full">
              <p className="pb-2 text-[12px] font-normal leading-[16px] text-left text-textBlack">
                Asset
              </p>
              <DropDown
                title="select Asset type"
                labelClasses={'text-textBlack'}
                onSelect={(e) => {
                  setFormData((prev) => {
                    return {
                      ...prev,
                      activity: e.value,
                    };
                  });
                }}
                defaultValue={
                  formData && formData.asset && formData.asset['asset_id']
                    ? {
                        value: formData.asset['asset_id'],
                        label: capitalizeFirstLetter(
                            assetData.name || ''
                        ),
                      }
                    : undefined
                }
                items={[]}
                className={`border ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "networkId"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                }`}
              />
              <div className="h-5"></div>
            </div>
            <div className="w-full">
              <p className="pb-2 text-[12px] font-normal leading-[16px] text-left text-textBlack">
                Schedule On
              </p>
              <DropDown
                title="ScheduleOn"
                labelClasses={'text-textBlack'}
                onSelect={(e) => {
                  setFormData((prev) => {
                    return {
                      ...prev,
                      scheduleOn: e.value,
                    };
                  });
                  console.log(formData)
                }}
                defaultValue={
                  formData && formData.scheduleOn
                    ? {
                        value: formData.scheduleOn,
                        label: formData.scheduleOn === 'DURATION' ? 'Duration' : 'Gas Price',
                      }
                    : undefined
                }
                items={[
                    { value: 'DURATION', label: "Duration" },
                    {
                        value: "GAS_PRICE",
                        label: "Gas Price",
                    },
                ]}
                className={`border ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "transaction"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                }`}
              />
              <div className="h-5">
                {validation?.error?.issues.some(
                  (issue) => issue.path[0] === "transaction"
                ) && (
                  <span className="text-xs text-alert">
                    {
                      validation.error.issues.find(
                        (issue) => issue.path[0] === "transaction"
                      )?.message
                    }
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="w-full">
            <p className="pb-2 text-[12px] font-normal leading-[16px] text-left text-textBlack">
                # Rules
            </p>
          </div>
          {/* Conditional Rendering for Rules */}
        {formData.scheduleOn === "DURATION" ? (
            <div className="flex flex-col items-center w-full gap-2 md:flex-row">
            <div className="w-full">
                <p className="pb-2 text-[12px] font-normal leading-[16px] text-left text-textBlack">
                Repeat
                </p>
                <DropDown
                title="Select repeat frequency"
                labelClasses={'text-textBlack'}
                onSelect={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      repeat: e.value,
                    }));
                }}
                defaultValue={
                    formData.repeat
                    ? {
                      value: formData.repeat, 
                      label: [
                        { value: 'HOURLY', label: "Hourly" },
                        { value: 'DAILY', label: "Daily" },
                        { value: 'WEEKLY', label: "Weekly" },
                        { value: 'MONTHLY', label: "Monthly" },
                      ].find(item => item.value === formData.repeat).label
                    }
                    : undefined
                }
                items={[
                    { value: 'HOURLY', label: "Hourly" },
                    { value: 'DAILY', label: "Daily" },
                    { value: 'WEEKLY', label: "Weekly" },
                    { value: 'MONTHLY', label: "Monthly" },
                ]}
                className="border border-primary50"
                />
                <div className="h-5"></div>

                {/* Input for Duration Value */}
            </div>
            <div className="w-full">
                <p className="pb-2 text-[12px] font-normal leading-[16px] text-left text-textBlack">
                Duration Value
                </p>
                <input
                type="number"
                className="border border-primary50 text-sm text-textSecondary rounded px-2 py-1 w-full"
                placeholder="Enter duration value"
                value={formData.duration || ""}
                onChange={(e) => {
                    setFormData((prev) => ({
                    ...prev,
                    duration: e.target.value
                    }));
                }}
                />
                <div className="h-5"></div>
            </div>
            </div>
        ) : formData.scheduleOn === "GAS_PRICE" ? (
            <div className="w-full">
              <DynamicRuleCriteria formData={formData} setFormData={setFormData} />
            </div>
        ) : null}
          
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end p-4 space-x-2 border-t">
          <TextButton
            title="Cancel"
            borderColor="border"
            onClick={closeModal}
            isLoading={isLoading}
            backgroundColor="bg-white"
            textColor="text-textBlack"
            width="w-full sm:w-auto sm:!min-w-[114px]"
          />

          <TextButton
            borderColor="border"
            isLoading={isLoading}
            onClick={handleSubmit}
            width="w-full sm:w-auto sm:!min-w-[114px]"
            title={isEdit ? "Update Sweep Schedule" : "Add Sweep Schedule"}
            icon={isLoading ? <Loadingdark className="w-5 h-5" /> : undefined}
          />
        </div>
      </Modal>
      <Toast ref={toast} baseZIndex={9999} />
    </>
  );
};

export default AddScheduleModal;
