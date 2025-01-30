import AddBlack from "@/Icons/Add-Black";
import MinusRed from "@/Icons/MinusRed";
import { z } from "zod";
import Image from "next/image";
import React, { useEffect, useState, useRef  } from "react";

import useApi from "@/hooks/useApi";
import Modal from "@/components/Modal/Modal";
import DropDown from "@/components/Elements/DropDown/DropDown";
import {
  capitalizeFirstLetter,
  handleAddSchemeFormValidation,
} from "@/utils/helper";
import { TextButton } from "@/components/Elements/Button/Button";
import CustomDatePicker from "@/components/Assets/Details/AssetsInfo/Policies/DatePicker";
import {
  FEE_SCHEME_TYPE,
  FEE_SCHEME_FEE_TYPE,
  FEE_SCHEME_GAS_PRICE_TYPE,
  FEE_SCHEME_ACTIVITY,
} from "@/utils/constants";
import DynamicFeeCriteria from "./DynamicFeeCriteria";
import Loadingdark from "@/Icons/Loadingdark";
import { Toast } from "primereact/toast";

const AddSchemeModal = ({
  isEdit,
  company_id,
  closeModal,
  initialData,
  isModalOpen,
  setSingleScheme,
  handleFetchAllScheme,
}) => {
  const { fetchData } = useApi();
  const feeTypeEnum = z.enum([
    FEE_SCHEME_FEE_TYPE["PERCENT"],
    FEE_SCHEME_FEE_TYPE["AMOUNT"],
  ]);
  const TypeEnum = useRef();
  const gasPriceTypeEnum = z.enum([
    FEE_SCHEME_GAS_PRICE_TYPE["PERCENT"],
    FEE_SCHEME_GAS_PRICE_TYPE["AMOUNT"],
  ]);

  const [assetTypes, setAssetTypes] = useState([])
  const assetSchema = useRef();

  const [validation, setValidation] = useState({});
  const [isLoading, setLoading] = useState(false);
  const toast = useRef(null);
  const [formData, setFormData] = useState({
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
    assetType: '',
    companyId: company_id,
  });

  const handleSubmit = async () => {
    const validationResult = handleAddSchemeFormValidation(
      formData,
      assetSchema.current
    );
    setValidation(validationResult);
    if (validationResult.success) {
      setLoading(true);
      const { result, error } = isEdit
        ? await fetchData(`/company-fee-scheme/${initialData?.fee_scheme_id}`, {
            method: "PATCH",
            body: formData,
          })
        : await fetchData(`/company-fee-scheme`, {
            method: "POST",
            body: formData,
          });
      if (result) {
        handleFetchAllScheme();
        setSingleScheme && setSingleScheme({});
        closeModal();
        setLoading(false);
        toast.current.show({
          severity: "success",
          summary: "Saved",
          detail: "Company Fee Scheme had been saved successfully!",
          life: 3000,
        });
      } else {
        setLoading(false);
        // Error Message
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
          ...(initialData.assetType && { assetType: initialData.assetType }),
          ...(initialData.criteria && { criteria: initialData.criteria }),
          ...(initialData.gasPrice && {
            gasPrice: Number(initialData.gasPrice),
          }),
          ...(initialData.activity && { activity: initialData.activity }),
          ...(initialData.companyId && { companyId: initialData.companyId }),
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

  useEffect(() => {
    fetchAssets()
  }, [])

  const fetchAssets = async () => {
    const { result, error } = await fetchData(`/asset/all`, {
      method: "GET",
    });
    if (error) {
      setAssetTypes([]);
    } else {
      const types = result.map(asset => {
        return {
          label: asset.name,
          value: asset.name
        }
      })
      setAssetTypes(types);

      TypeEnum.current = z.enum([...result.map(asset => {return asset.name})])
      console.log(TypeEnum.current)
      assetSchema.current = z.object({
        feeType: feeTypeEnum,
        assetType: TypeEnum.current,
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
      )
    }
  }

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        headerClassName="px-4 py-2"
        customWidth="w-16/24 md:w-10/12 xl:w-10/12"
        title={isEdit ? "Update Fee Scheme" : "Add Fee Scheme"}
      >
        {/* Modal Body */}
        <div className="w-full mx-auto space-y-4 mb-3 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-3 w-full items-center gap-3">
            <div className="col-span-3 lg:col-span-1">
              <p className="pb-2 font-normal text-xs text-textBlack">
                Asset Type
              </p>
              <DropDown
                title="Asset Type"
                labelClasses={'text-textBlack'}
                onSelect={(e) => {
                  setFormData((prev) => {
                    return {
                      ...prev,
                      assetType: e.value,
                    };
                  });
                }}
                defaultValue={
                  formData && formData.assetType
                    ? {
                        value: formData.assetType,
                        label: formData.assetType,
                      }
                    : undefined
                }
                items={assetTypes}
                className={`border h-8 text-xs ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "assetType"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                }`}
              />
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "transaction"
              ) && (
                <span className="text-red-500 text-xs">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "transaction"
                    )?.message
                  }
                </span>
              )}
            </div>
            <div className="col-span-3 lg:col-span-1">
              <p className="pb-2 font-normal text-xs text-textBlack">
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
                  { value: FEE_SCHEME_ACTIVITY["BUY"], label: "Buy" },
                  { value: FEE_SCHEME_ACTIVITY["SELL"], label: "Sell" },
                  { value: FEE_SCHEME_ACTIVITY["SEND"], label: "Send" },
                  { value: FEE_SCHEME_ACTIVITY["RECEIVE"], label: "Receive" },
                  { value: FEE_SCHEME_ACTIVITY["EXCHANGE"], label: "Exchange" },
                ]}
                className={`border h-8 text-xs ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "transaction"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                }`}
              />
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "transaction"
              ) && (
                <span className="text-red-500 text-xs">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "transaction"
                    )?.message
                  }
                </span>
              )}
            </div>
            <div className="col-span-3 lg:col-span-1">
              <p className="pb-2 font-normal text-xs text-textBlack">Fee</p>
              <div className="grid grid-cols-12 items-center gap-1 w-full">
                <div className="col-span-6 sm:col-span-6">
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
                  {validation?.error?.issues.some(
                    (issue) => issue.path[0] === "fee"
                  ) && (
                    <span className="text-red-500 text-xs">
                      {
                        validation.error.issues.find(
                          (issue) => issue.path[0] === "fee"
                        )?.message
                      }
                    </span>
                  )}
                </div>
                <div className="col-span-6 sm:col-span-6">
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
                  {validation?.error?.issues.some(
                    (issue) => issue.path[0] === "feeType"
                  ) && (
                    <span className="text-red-500 text-xs">
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
          </div>
          <div className="grid grid-cols-3 w-full items-center gap-3">
            <div className="col-span-3 lg:col-span-1">
              <p className="pb-2 font-normal text-xs text-textBlack">
                Start Time
              </p>
              <CustomDatePicker
                name="startTime"
                selectedDate={formData.startTime}
                onSelect={(date) => {
                  setFormData((prev) => {
                    return {
                      ...prev,
                      startTime: date,
                    };
                  });
                }}
                className="h-8 text-xs"
              />
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "startTime"
              ) && (
                <span className="text-red-500 text-xs">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "startTime"
                    )?.message
                  }
                </span>
              )}
            </div>
            <div className="col-span-3 lg:col-span-1">
              <p className="pb-2 font-normal text-xs text-textBlack">
                End Time
              </p>
              <CustomDatePicker
                name="endTime"
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
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "endTime"
              ) && (
                <span className="text-red-500 text-xs">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "endTime"
                    )?.message
                  }
                </span>
              )}
            </div>
            <div className="col-span-3 lg:col-span-1">
              <p className="pb-2 font-normal text-xs text-textBlack">
                Gas Price
              </p>
              <div className="grid grid-cols-12 items-center gap-1 w-full">
                <div className="col-span-6">
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
                  {validation?.error?.issues.some(
                    (issue) => issue.path[0] === "gasPrice"
                  ) && (
                    <span className="text-red-500 text-xs">
                      {
                        validation.error.issues.find(
                          (issue) => issue.path[0] === "gasPrice"
                        )?.message
                      }
                    </span>
                  )}
                </div>
                <div className="col-span-6">
                  <DropDown
                    className="w-full h-8 text-xs"
                    labelClasses={'text-textBlack'}
                    items={[
                      {
                        value: FEE_SCHEME_GAS_PRICE_TYPE["PERCENT"],
                        label: "Percent",
                      },
                      {
                        value: FEE_SCHEME_GAS_PRICE_TYPE["AMOUNT"],
                        label: "Amount",
                      },
                    ]}
                    defaultValue={{
                      value: FEE_SCHEME_GAS_PRICE_TYPE["PERCENT"],
                      label: "Percent",
                    }}
                    onSelect={(e) => {
                      setFormData((prev) => {
                        return {
                          ...prev,
                          gasPriceType: e.value,
                        };
                      });
                    }}
                  />
                  {validation?.error?.issues.some(
                    (issue) => issue.path[0] === "gasPriceType"
                  ) && (
                    <span className="text-red-500 text-xs">
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
        <div className="flex justify-end pt-3 border-t gap-3">
          <TextButton
            title="Cancel"
            onClick={closeModal}
            isLoading={isLoading}
            backgroundColor="bg-white"
            textColor="text-textBlack"
            width="w-auto sm:w-[114px]"
            className="border brder-primary50"
            icon={isLoading ? <Loadingdark className="w-5 h-5" /> : undefined}
          />
          <TextButton
            isLoading={isLoading}
            onClick={handleSubmit}
            width="w-auto sm:w-[114px]"
            title={isEdit ? "Update" : "Add"}
            icon={isLoading ? <Loadingdark className="w-5 h-5" /> : undefined}
          />
        </div>
        <Toast ref={toast} baseZIndex={9999} />
      </Modal>
    </>
  );
};

export default AddSchemeModal;
