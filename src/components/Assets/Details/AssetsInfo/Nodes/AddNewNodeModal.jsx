"use client";
import { z } from "zod";
import Image from "next/image";
import useApi from "@/hooks/useApi";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Modal from "@/components/Modal/Modal";
import {
  capitalizeFirstLetter,
  handleAddNodeFormValidation,
} from "@/utils/helper";
import DropDown from "@/components/Elements/DropDown/DropDown";
import { TextButton } from "@/components/Elements/Button/Button";
import Loadingdark from "@/Icons/Loadingdark";

const ipv4Regex =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const wsUrlRegex = /^(ws|wss):\/\/[^\s$.?#].[^\s]*$/;

const AddNewNodeModal = ({
  isModalOpen,
  closeModal,
  handleFetchNodes,
  isEdit,
  initialData,
  toast,
  networks,
}) => {
  const assetSchema = z.object({
    networkId: z.string().min(1, { message: "Network ID is required" }),
    name: z.string().min(1, { message: "Name is required" }),
    ipAddress: z.string().regex(ipv4Regex, "Invalid IP address"),
    rpcPort: z
      .number()
      .int()
      .min(0)
      .max(65535)
      .or(z.string().regex(/^\d+$/, "RPC must be a number")),
    userName: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(1, { message: "Password is required" }),
    networkType: z
      .string()
      .min(1, { message: "Please Select the Network Type" })
      .default("MAIN_NET"),
    webSocketAddress: z.string().regex(wsUrlRegex, "Invalid WebSocket address"),
    webSocketPort: z
      .number()
      .int()
      .min(0)
      .max(65535)
      .or(z.string().regex(/^\d+$/, "WS Port must be a number")),
  });

  const { fetchData } = useApi();
  const [isLoading, setLoading] = useState(false);
  const [validation, setValidation] = useState({});
  const [formData, setFormData] = useState({
    networkId: networks[0].network_id,
    name: "",
    ipAddress: "",
    rpcPort: "",
    userName: "",
    password: "",
    networkType: "MAIN_NET",
    webSocketAddress: "",
    webSocketPort: "",
  });

  const handleSubmit = async () => {
    const validationResult = handleAddNodeFormValidation(formData, assetSchema);
    setValidation(validationResult);
    if (validationResult.success) {
      setLoading(true);
      const { result, error } =
        isEdit && initialData && initialData["node_id"]
          ? await fetchData(`/node/${initialData["node_id"]}`, {
              method: "PUT",
              body: formData,
            })
          : await fetchData(`/node`, {
              method: "POST",
              body: formData,
            });
      if (result) {
        closeModal();
        handleFetchNodes();
        setLoading(false);
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: isEdit
            ? "Node updated successfully"
            : "Node created successfully",
          life: 3000,
        });
      } else {
        setLoading(false);
        // Error Message
        console.log(error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: error.message,
          life: 3000,
        });
      }
    } else {
      console.log(validationResult);
    }
  };

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => {
        return {
          ...prev,
          ...(initialData.networkType && {
            networkType: initialData.networkType,
          }),
          ...(initialData.name && { name: initialData.name }),
          ...(initialData.password && { password: initialData.password }),
          ...(initialData.ipAddress && { ipAddress: initialData.ipAddress }),
          ...(initialData.rpcPort && { rpcPort: initialData.rpcPort }),
          ...(initialData.userName && { userName: initialData.userName }),
          ...(initialData.webSocketAddress && {
            webSocketAddress: initialData.webSocketAddress,
          }),
          ...(initialData.webSocketPort && {
            webSocketPort: initialData.webSocketPort,
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
        title={isEdit ? "Edit Node" : "Add new node"}
        customWidth="w-11/12 md:w-3/4 xl:w-5/12"
        contentClassName="p-0"
      >
        {/* Modal Body */}
        <div className="w-full pb-3 mx-auto space-y-4 p-4">
          <div className="flex flex-col items-center w-full md:space-x-2 md:flex-row">
            <div className="w-full md:w-1/2">
              <p className="font-normal text-[12px] text-textBlack pb-2 tracking-[-0.005em] leading-[16px]">
                Network
              </p>
              <DropDown
                title="Select Network"
                defaultValue={
                  networks?.length
                    ? {
                        value: networks[0]["network_id"],
                        label: networks[0].name,
                      }
                    : undefined
                }
                onSelect={(e) => {
                  setFormData((prev) => {
                    return {
                      ...prev,
                      networkId: e.value,
                    };
                  });
                }}
                items={networks?.map((each) => {
                  return {
                    label: each.name,
                    value: each["network_id"],
                  };
                })}
                className={`border ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "network"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                }`}
              />
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "network"
              ) && (
                <span className="text-xs text-alert">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "network"
                    )?.message
                  }
                </span>
              )}
            </div>
            <div className="w-full md:w-1/2  ">
              <p className="font-normal text-[12px] text-textBlack pb-2 tracking-[-0.005em] leading-[16px]">
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
                className={`border border-gray-300 p-3   rounded-[10px] w-full h-[32px] text-textBlack ${
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

              {/* <p className="font-normal text-sm text-textBlack md:pb-2 md:py-0 py-2 tracking-[-0.005em]">
                Network Type
              </p>
              <DropDown
                title="Select Network Type"
                defaultValue={
                  initialData && initialData.networkType
                    ? {
                        value: initialData.networkType,
                        label: capitalizeFirstLetter(
                          initialData?.networkType
                            ?.split("_")
                            .join("")
                            .toLowerCase()
                        ),
                      }
                    : undefined
                }
                onSelect={(e) => {
                  setFormData((prev) => {
                    return {
                      ...prev,
                      networkType: e.value,
                    };
                  });
                }}
                items={[
                  { value: "MAIN_NET", label: "Mainnet" },
                  { value: "TEST_NET", label: "Testnet" },
                ]}
                className={`border ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "networkType"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                }`}
              />
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "networkType"
              ) && (
                <span className="text-xs text-alert">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "networkType"
                    )?.message
                  }
                </span>
              )} */}
            </div>
          </div>
          <div className="flex flex-row items-center w-full md:space-x-4">
            <div className="w-full"></div>
          </div>
          <div className="flex flex-col items-center w-full md:space-x-2 md:flex-row">
            <div className="w-full md:w-1/2">
              <p className="font-normal text-[12px] text-textBlack pb-2 tracking-[-0.005em] leading-[16px]">
                IP Address
              </p>
              <input
                type="text"
                name="ipAddress"
                value={formData.ipAddress}
                onChange={({ target }) =>
                  setFormData((prev) => {
                    return {
                      ...prev,
                      ipAddress: target.value,
                    };
                  })
                }
                className={`border border-gray-300 p-3  rounded-[10px] w-full h-[32px] text-textBlack ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "ipAddress"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                }`}
              />
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "ipAddress"
              ) && (
                <span className="text-xs text-alert">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "ipAddress"
                    )?.message
                  }
                </span>
              )}
            </div>
            <div className="w-full md:w-1/2 md:pt-0 sm:pt-2">
              <p className="font-normal text-[12px] text-textBlack pb-2 tracking-[-0.005em] leading-[16px]">
                RPC Port
              </p>
              <input
                type="text"
                name="rpcPort"
                value={formData.rpcPort}
                onChange={({ target }) =>
                  setFormData((prev) => {
                    return {
                      ...prev,
                      rpcPort: target.value,
                    };
                  })
                }
                className={`border border-gray-300 p-3  rounded-[10px] w-full h-[32px] text-textBlack ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "rpcPort"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                }`}
              />
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "rpcPort"
              ) && (
                <span className="text-xs text-alert">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "rpcPort"
                    )?.message
                  }
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center w-full md:space-x-2 md:flex-row">
            <div className="w-full md:w-1/2">
              <p className="font-normal text-[12px] text-textBlack pb-2 tracking-[-0.005em] leading-[16px]">
                Username
              </p>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={({ target }) =>
                  setFormData((prev) => {
                    return {
                      ...prev,
                      userName: target.value,
                    };
                  })
                }
                className={`border border-gray-300 p-3  rounded-[10px] w-full h-[32px] text-textBlack ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "userName"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                }`}
              />
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "userName"
              ) && (
                <span className="text-xs text-alert">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "userName"
                    )?.message
                  }
                </span>
              )}
            </div>
            <div className="w-full pt-2 md:pt-0 md:w-1/2">
              <p className="font-normal text-[12px] text-textBlack pb-2 tracking-[-0.005em] leading-[16px]">
                Password
              </p>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={({ target }) =>
                  setFormData((prev) => {
                    return {
                      ...prev,
                      password: target.value,
                    };
                  })
                }
                className={`border border-gray-300 p-3  rounded-[10px] w-full h-[32px] text-textBlack ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "password"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                }`}
              />
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "password"
              ) && (
                <span className="text-xs text-alert">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "password"
                    )?.message
                  }
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center w-full md:space-x-2 md:flex-row">
            <div className="w-full md:w-1/2">
              <p className="font-normal text-[12px] text-textBlack pb-2 tracking-[-0.005em] leading-[16px]">
                WS Address
              </p>
              <input
                type="text"
                name="webSocketAddress"
                value={formData.webSocketAddress}
                onChange={({ target }) =>
                  setFormData((prev) => {
                    return {
                      ...prev,
                      webSocketAddress: target.value,
                    };
                  })
                }
                className={`border border-gray-300 p-3  rounded-[10px] w-full h-[32px] text-textBlack ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "webSocketAddress"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                }`}
              />
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "webSocketAddress"
              ) && (
                <span className="text-xs text-alert">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "webSocketAddress"
                    )?.message
                  }
                </span>
              )}
            </div>
            <div className="w-full pt-2 md:pt-0 md:w-1/2">
              <p className="font-normal text-[12px] text-textBlack pb-2 tracking-[-0.005em] leading-[16px]">
                WS Port
              </p>
              <input
                type="text"
                name="webSocketPort"
                value={formData.webSocketPort}
                onChange={({ target }) =>
                  setFormData((prev) => {
                    return {
                      ...prev,
                      webSocketPort: target.value,
                    };
                  })
                }
                className={`border border-gray-300 p-3  rounded-[10px] w-full h-[32px] text-textBlack ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "webSocketPort"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                }`}
              />
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "webSocketPort"
              ) && (
                <span className="text-xs text-alert">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "webSocketPort"
                    )?.message
                  }
                </span>
              )}
            </div>
          </div>
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end py-3 px-4 gap-3 border-t">
          <TextButton
            title="Cancel"
            onClick={closeModal}
            borderColor="border"
            isLoading={isLoading}
            backgroundColor="bg-white"
            textColor="text-textBlack"
            className="!min-w-[114px]"
          />
          <TextButton
            borderColor="border"
            isLoading={isLoading}
            onClick={handleSubmit}
            className="!min-w-[114px]"
            title={isEdit ? "Save changes" : "Add"}
            icon={isLoading ? <Loadingdark className="w-5 h-5" /> : undefined}
          />
        </div>
      </Modal>
    </>
  );
};
export default AddNewNodeModal;
