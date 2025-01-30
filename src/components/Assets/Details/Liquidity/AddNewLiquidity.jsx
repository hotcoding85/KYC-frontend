"use client";
import { z } from "zod";
import Image from "next/image";
import useApi from "@/hooks/useApi";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import Modal from "@/components/Modal/Modal";
import { handleAddLiquidityFormValidation } from "@/utils/helper";
import { TextButton } from "@/components/Elements/Button/Button";
import FileUpload from "@/components/Elements/FileUpload/FileUpload";
import Loadingdark from "@/Icons/Loadingdark";
import Loading from "@/Icons/Loading";

const AddNewLiquidityModal = ({
  isEdit,
  closeModal,
  isModalOpen,
  initialData,
  handleFetchLiquidity,
  setSingleLiquidityState,
}) => {
  const params = useParams();
  const asset_id = params.id;

  const assetSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    website: z.string().url({ message: "Invalid URL format" }),
    logo: z.string().refine(
      (value) => {
        const isUrl = z.string().url().safeParse(value).success;
        const isBase64Image = /^data:image\/[a-z]+;base64,/.test(value);
        return value.length > 0 && (isUrl || isBase64Image);
      },
      {
        message: "Logo must be a non-empty URL or base64 image string",
      }
    ),
  });

  const { fetchData } = useApi();
  const toast = useRef(null);
  
  const [isLoading, setLoading] = useState(false);
  const [validation, setValidation] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    website: "",
    status: true,
    active: true,
    type: "liquidity",
    ...(!isEdit && { assetIds: [asset_id] }),
  });

  const handleSubmit = async () => {
    const validationResult = handleAddLiquidityFormValidation(
      formData,
      assetSchema
    );
    setValidation(validationResult);
    if (validationResult.success) {
      setLoading(true);
      const { result, error } =
        isEdit && initialData && initialData["vendor_id"]
          ? await fetchData(`/vendor/${initialData["vendor_id"]}`, {
              method: "PATCH",
              body: formData,
            })
          : await fetchData(`/vendor`, {
              method: "POST",
              body: formData,
            });
      if (result) {
        handleFetchLiquidity();
        closeModal();
        setLoading(false);
        setSingleLiquidityState(undefined);
        setFormData({
          name: "",
          logo: "",
          website: "",
          status: true,
          active: true,
          type: "liquidity",
          ...(!isEdit && { assetIds: [asset_id] }),
        });
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: isEdit
            ? "Liquidity edited successfully"
            : "Liquidity created successfully",
          life: 3000,
        });
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
          ...(initialData.name && { name: initialData.name }),
          ...(initialData.website && { website: initialData.website }),
          ...(initialData.logo && { logo: initialData.logo }),
        };
      });
    }
  }, [initialData]);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          isEdit ? "Update liquidity provider" : "Add new liquidity provider"
        }
        customWidth="w-11/12 md:w-3/4 xl:w-1/2"
        contentClassName="p-0"
      >
        {/* Modal Body */}
        <div className="w-full mx-auto p-4 space-y-2 ">
          <div className="flex flex-wrap sm:flex-nowrap w-full items-center gap-2">
            <div className="w-full sm:w-1/2">
              <p className="font-normal text-xs text-textBlack pb-2">Name</p>
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
                className={`border border-gray-300 pt-1 pb-1 pl-2 pr-2 h-[32px] rounded-[10px] w-full text-textBlack text-xs  ${
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
                <span className="text-alert text-xs">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "name"
                    )?.message
                  }
                </span>
              )}
            </div>
            <div className="w-full sm:w-1/2">
              <p className="font-normal text-xs text-textBlack pb-2">Website</p>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={({ target }) =>
                  setFormData((prev) => {
                    return {
                      ...prev,
                      website: target.value,
                    };
                  })
                }
                className={`border border-gray-300 pt-1 pb-1 pl-2 pr-2  h-[32px] rounded-[10px] w-full text-textBlack text-xs ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "website"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                }`}
              />
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "website"
              ) && (
                <span className="text-alert text-xs">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "website"
                    )?.message
                  }
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-row w-full items-center space-x-4">
            <div className="w-full">
              <label
                htmlFor="icon"
                className="font-normal text-xs text-textBlack pb-2 "
              >
                Icon
              </label>
              <FileUpload
                isAssetPage
                selectedFileUrl={formData.logo}
                onChange={(value) => {
                  setFormData((prev) => {
                    return {
                      ...prev,
                      logo: value,
                    };
                  });
                }}
                className={`border ${
                  validation?.error?.issues.some(
                    (issue) => issue.path[0] === "logo"
                  )
                    ? "border-red-500"
                    : "border-primary50"
                }`}
              />
              {validation?.error?.issues.some(
                (issue) => issue.path[0] === "logo"
              ) && (
                <span className="text-alert text-xs">
                  {
                    validation.error.issues.find(
                      (issue) => issue.path[0] === "logo"
                    )?.message
                  }
                </span>
              )}
            </div>
          </div>
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end p-4 border-t space-x-4 p-4">
          <TextButton
            title="Cancel"
            onClick={closeModal}
            isLoading={isLoading}
            backgroundColor="bg-white"
            textColor="text-textBlack"
            className="border brder-primary50 w-28 text-xs font-normal !min-w-[114px] text-nowrap"
            icon={isLoading ? <Loadingdark className="w-5 h-5" /> : undefined}
          />
          <TextButton
            title={isEdit ? "Update provider" : "Add new provider"}
            isLoading={isLoading}
            onClick={handleSubmit}
            className="text-xs font-normal text-white w-28 !min-w-[114px] text-nowrap"
            icon={isLoading ? <Loading className="w-5 h-5" /> : undefined}
          />
        </div>
      </Modal>
      <Toast ref={toast} />
    </>
  );
};
export default AddNewLiquidityModal;
