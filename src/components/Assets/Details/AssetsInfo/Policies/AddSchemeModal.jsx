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
  handleAddSchemeFormValidation,
} from "@/utils/helper";
import CustomDatePicker from "@/components/Assets/Details/AssetsInfo/Policies/DatePicker";
import {
  FEE_SCHEME_FEE_TYPE,
  FEE_SCHEME_GAS_PRICE_TYPE,
  FEE_SCHEME_ACTIVITY,
} from "@/utils/constants";
import DynamicFeeCriteria from "@/components/Assets/Details/AssetsInfo/Policies/DynamicFeeCriteria";
import { useParams } from "next/navigation";
import Loadingdark from "@/Icons/Loadingdark";
import { Toast } from "primereact/toast";

const AddSchemeModal = ({
  isEdit,
  network,
  assetData,
  closeModal,
  initialData,
  isModalOpen,
  setSingleScheme,
  handleFetchAllScheme,
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

  const assetSchema = z
    .object({
      feeType: feeTypeEnum,
      gasPriceType: gasPriceTypeEnum,
      fee: z.number().positive({ message: "Fee is required" }),
      activity: z.string().min(1, { message: "Transaction is required" }),
      rules: z.string().min(1, { message: "Rules is required" }),
      gasPrice: z.number().positive({ message: "Gas amount is required" }),
      startTime: z.date({ required_error: "Start Time is required" }),
      endTime: z.date({ required_error: "End Time is required" }),
      criteria: z.array(z.any()),
    })
    .refine(
      (data) => {
        if (data.feeType === FEE_SCHEME_FEE_TYPE.PERCENT) {
          return data.fee <= 100;
        }
        return true;
      },
      {
        message: "Fee percentage must be between 0 and 100",
        path: ["fee"],
      }
    )
    .refine(
      (data) => {
        if (data.gasPriceType === FEE_SCHEME_GAS_PRICE_TYPE.PERCENT) {
          return data.gasPrice <= 100;
        }
        return true;
      },
      {
        message: "Gas price percentage must be between 0 and 100",
        path: ["gasPrice"],
      }
    )
    .refine(
      (data) => {
        return data.startTime < data.endTime;
      },
      {
        message: "End Time must be after Start Time",
        path: ["endTime"],
      }
    );

  const [validation, setValidation] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    networkId: network["network_id"],
    fee: 0,
    gasPrice: 0,
    rules: "",
    endTime: new Date(),
    startTime: new Date(),
    criteria: [
      {
        criteria: "",
        comparasion: "",
        value: "",
      },
    ],
    activity: FEE_SCHEME_ACTIVITY["BUY"],
    feeType: FEE_SCHEME_FEE_TYPE["PERCENT"],
    gasPriceType: FEE_SCHEME_GAS_PRICE_TYPE["PERCENT"],
  });

  const handleSubmit = async () => {
    const validationResult = handleAddSchemeFormValidation(
      formData,
      assetSchema
    );
    setValidation(validationResult);
    if (validationResult.success) {
      setLoading(true);
      const { result, error } =
        isEdit && initialData && initialData["fee_scheme_id"]
          ? await fetchData(
              `/asset-fee-scheme/${initialData["fee_scheme_id"]}`,
              {
                method: "PATCH",
                body: formData,
              }
            )
          : await fetchData(`/asset-fee-scheme`, {
              method: "POST",
              body: formData,
            });
      if (result) {
        handleFetchAllScheme(network["network_id"]);
        setSingleScheme && setSingleScheme({});
        closeModal();
        setLoading(false);
        toast.current.show({
          severity: "success",
          summary: "Saved",
          detail: "New Fee Scheme had successfully been saved!",
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
          ...(initialData.fee && { fee: Number(initialData.fee) }),
          ...(initialData.rules && { rules: initialData.rules }),
          ...(initialData.feeType && { feeType: initialData.feeType }),
          ...(initialData.criteria && { criteria: initialData.criteria }),
          ...(initialData.gasPrice && {
            gasPrice: Number(initialData.gasPrice),
          }),
          ...(initialData.activity && { activity: initialData.activity }),
          ...(initialData.endTime && {
            endTime: new Date(initialData.endTime),
          }),
          ...(initialData.gasPriceType && {
            gasPriceType: initialData.gasPriceType,
          }),
          ...(initialData.startTime && {
            startTime: new Date(initialData.startTime),
          }),
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
        title="Add Fee Scheme"
        customWidth="w-16/24 md:w-10/12 xl:w-10/12"
        contentClassName="p-0"
      >
        {/* Modal Body */}
        <div className="w-full p-4 mx-auto gap-4">
          <div className="flex flex-col items-center w-full gap-2 md:flex-row">
            <div className="w-full">
              <p className="pb-2 text-[12px] font-normal leading-[16px] text-left text-textBlack">
                Network
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
                  formData && formData.networkId
                    ? {
                        value: formData.networkId,
                        label: capitalizeFirstLetter(
                          network.name || ''
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
                Activity
              </p>
              <DropDown
                title="Activity"
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
                  formData && formData.activity
                    ? {
                        value: formData.activity,
                        label: capitalizeFirstLetter(
                          formData.activity.toLowerCase()
                        ),
                      }
                    : undefined
                }
                items={[
                  {
                    value: FEE_SCHEME_ACTIVITY["Transaction"],
                    label: "Transaction",
                  },
                  { value: FEE_SCHEME_ACTIVITY["SELL"], label: "Sell" },
                  { value: FEE_SCHEME_ACTIVITY["SEND"], label: "Send" },
                  { value: FEE_SCHEME_ACTIVITY["RECEIVE"], label: "Receive" },
                  { value: FEE_SCHEME_ACTIVITY["EXCHANGE"], label: "Exchange" },
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
                  <span className="text-xs text-red-500">
                    {
                      validation.error.issues.find(
                        (issue) => issue.path[0] === "transaction"
                      )?.message
                    }
                  </span>
                )}
              </div>
            </div>

            <div className="w-full">
              <p className="pb-2 text-[12px] font-normal leading-[16px] text-left text-textBlack">
                Fee
              </p>
              <input
                name="fee"
                type="text"
                value={formData.fee > 0 ? formData.fee : ""}
                className={`border border-gray-300 p-3 rounded-[10px] h-8 text-xs w-full text-textBlack ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "fee"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                }`}
                onChange={(e) => {
                  setFormData((prev) => {
                    return {
                      ...prev,
                      fee: parseInt(e.target.value),
                    };
                  });
                }}
              />
              <div className="h-5">
                {validation?.error?.issues.some(
                  (issue) => issue.path[0] === "transaction"
                ) && (
                  <span className="text-xs text-red-500">
                    {
                      validation.error.issues.find(
                        (issue) => issue.path[0] === "transaction"
                      )?.message
                    }
                  </span>
                )}
              </div>
            </div>

            <div className="w-full">
              <p className="pb-2 text-[12px] font-normal leading-[16px] text-left text-textBlack">
                Fee Type
              </p>
              <DropDown
                className="w-full h-8 text-xs"
                labelClasses={'text-textBlack'}
                items={[
                  {
                    value: FEE_SCHEME_FEE_TYPE["PERCENT"],
                    label: "Percent",
                  },
                  { value: FEE_SCHEME_FEE_TYPE["AMOUNT"], label: "Amount" },
                ]}
                defaultValue={
                  formData.feeType
                    ? {
                        value: formData.feeType,
                        label: capitalizeFirstLetter(
                          formData.feeType.toLowerCase()
                        ),
                      }
                    : undefined
                }
                onSelect={(e) => {
                  setFormData((prev) => {
                    return {
                      ...prev,
                      feeType: e.value,
                    };
                  });
                }}
              />
              <div className="h-5">
                {validation?.error?.issues.some(
                  (issue) => issue.path[0] === "feeType"
                ) && (
                  <span className="text-xs text-red-500">
                    {
                      validation.error.issues.find(
                        (issue) => issue.path[0] === "feeType"
                      )?.message
                    }
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center w-full space-x-2 md:flex-row">
            <div className="w-full">
              <p className="pb-2 text-[12px] font-normal leading-[16px] text-left text-textBlack">
                Start Time
              </p>
              <CustomDatePicker
                name="startTime"
                height={true}
                selectedDate={formData.startTime}
                onSelect={(date) => {
                  setFormData((prev) => {
                    return {
                      ...prev,
                      startTime: date,
                    };
                  });
                }}
              />
              <div className="h-5">
                {validation?.error?.issues.some(
                  (issue) => issue.path[0] === "startTime"
                ) && (
                  <span className="text-xs text-red-500">
                    {
                      validation.error.issues.find(
                        (issue) => issue.path[0] === "startTime"
                      )?.message
                    }
                  </span>
                )}
              </div>
            </div>

            <div className="w-full">
              <p className="pb-2 text-[12px] font-normal leading-[16px] text-left text-textBlack">
                End Time
              </p>
              <CustomDatePicker
                name="endTime"
                height={true}
                selectedDate={formData.endTime}
                onSelect={(date) => {
                  setFormData((prev) => {
                    return {
                      ...prev,
                      endTime: date,
                    };
                  });
                }}
              />
              <div className="h-5">
                {validation?.error?.issues.some(
                  (issue) => issue.path[0] === "endTime"
                ) && (
                  <span className="text-xs text-red-500">
                    {
                      validation.error.issues.find(
                        (issue) => issue.path[0] === "endTime"
                      )?.message
                    }
                  </span>
                )}
              </div>
            </div>

            <div className="w-full">
              <p className="pb-2 text-[12px] font-normal leading-[16px] text-left text-textBlack">
                Gas Price
              </p>
              <div>
                <div className="w-full">
                  <input
                    type="text"
                    name="gasPrice"
                    value={formData.gasPrice > 0 ? formData.gasPrice : ""}
                    onChange={(event) => {
                      setFormData((prev) => {
                        return {
                          ...prev,
                          gasPrice: parseInt(event.target.value),
                        };
                      });
                    }}
                    className={`border border-gray-300 p-3 rounded-[10px] h-8 text-xs w-full text-textBlack ${
                      validation?.error?.issues.some(
                        (issue) => issue.path[0] === "gasPrice"
                      )
                        ? "border-red-500"
                        : "border-primary50"
                    }`}
                  />
                  <div className="h-5">
                    {validation?.error?.issues.some(
                      (issue) => issue.path[0] === "gasPrice"
                    ) && (
                      <span className="text-xs text-red-500">
                        {
                          validation.error.issues.find(
                            (issue) => issue.path[0] === "gasPrice"
                          )?.message
                        }
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full">
              <p className="pb-2 text-[12px] font-normal leading-[16px] text-left text-textBlack">
                Gas Price Type
              </p>
              <DropDown
                className="w-full h-8 text-xs"
                labelClasses={'text-textBlack'}
                items={[
                  {
                    value: FEE_SCHEME_FEE_TYPE["PERCENT"],
                    label: "Percent",
                  },
                  { value: FEE_SCHEME_FEE_TYPE["AMOUNT"], label: "Amount" },
                ]}
                defaultValue={
                  formData.gasPriceType
                    ? {
                        value: formData.gasPriceType,
                        label: capitalizeFirstLetter(
                          formData.gasPriceType.toLowerCase()
                        ),
                      }
                    : undefined
                }
                onSelect={(e) => {
                  setFormData((prev) => {
                    return {
                      ...prev,
                      gasPriceType: e.value,
                    };
                  });
                }}
              />
              <div className="h-5">
                {validation?.error?.issues.some(
                  (issue) => issue.path[0] === "gasPriceType"
                ) && (
                  <span className="text-xs text-red-500">
                    {
                      validation.error.issues.find(
                        (issue) => issue.path[0] === "gasPriceType"
                      )?.message
                    }
                  </span>
                )}
              </div>
            </div>
          </div>

          <DynamicFeeCriteria
            formData={formData}
            setFormData={setFormData}
            validation={validation}
            setValidation={setValidation}
          />
          <div className="flex flex-row items-end w-full gap-2">
            <div className="w-full">
              <p className="pb-2 text-[12px] font-normal leading-[16px] text-left text-textBlack">
                Rule
              </p>
              <p className="pb-2 text-[12px] font-normal leading-[16px] text-left text-textBlack">
                {/* Rule #1 */}
              </p>
              {/* <DropDown
                title="Select Criteria"
                labelClasses={'text-textBlack'}
                onSelect={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    rules: e.value,
                  }));
                }}
                defaultValue={
                  formData && formData.rules
                    ? {
                        value: formData.rules,
                        label: formData.rules,
                      }
                    : undefined
                }
                items={[
                  { value: "(A1 and A2) or A3)", label: "(A1 and A2) or A3)" },
                  { value: "A3", label: "A3" },
                ]}
                className={`border ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "rules"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                } rounded-xl w-full`}
              /> */}
              <input
                type="text"
                name="rules"
                value={formData.rules}
                onChange={(event) => {
                  setFormData((prev) => {
                    return {
                      ...prev,
                      rules: (event.target.value),
                    };
                  });
                }}
                className={`border border-gray-300 p-3 rounded-[10px] h-8 text-xs w-full text-textBlack ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "rules"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                }`}
              />
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "rules"
              ) && (
                <span className="text-red-500 text-xs">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "rules"
                    )?.message
                  }
                </span>
              )}
            </div>

            {/* <button
              // onClick={() => handleRemoveCriteria(criteriaItem.id)}
              className="bg-red-500 text-white rounded-lg w-5 h-5 mb-2"
            >
              <MinusRed />
            </button>

            <button
              // onClick={handleAddCriteria}
              className="bg-black text-white rounded-lg w-5 h-5 mb-2"
            >
              <AddBlack />
            </button> */}
          </div>
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
            title={isEdit ? "Update" : "Add fee scheme"}
            icon={isLoading ? <Loadingdark className="w-5 h-5" /> : undefined}
          />
        </div>
      </Modal>
      <Toast ref={toast} baseZIndex={9999} />
    </>
  );
};

export default AddSchemeModal;
