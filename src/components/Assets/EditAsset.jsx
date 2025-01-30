import React, { useState, useEffect } from "react";
import Button, { TextButton } from "../Elements/Button/Button";
import Modal from "../Modal/Modal";
import useApi from "@/hooks/useApi";
import { z } from "zod";
import AssetForm from "./AssetForm";
import { handleAssetFormValidation } from "@/utils/helper";
import Image from "next/image";
import Loadingdark from "@/Icons/Loadingdark";
import Loading from "@/Icons/Loading";

const EditAsset = ({
  isModalOpen,
  closeModal,
  fetchListAssets,
  initialData,
}) => {
  const assetSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    ticker: z.string().min(1, { message: "Ticker Symbol is required" }),
    usd_value: z
      .number({ invalid_type_error: "USD value should be a number" })
      .positive("etc."),
    daily_volume: z
      .number({ invalid_type_error: "Daily volume should be a number" })
      .positive("etc."),
    type: z.string().min(1, { message: "Asset Type is required" }),
    liquidity: z.preprocess((val) => {
      if (typeof val === "string") {
        try {
          const parsed = JSON.parse(val);
          return Array.isArray(parsed) ? parsed : undefined;
        } catch {
          return undefined;
        }
      }
      return val;
    }, z.array(z.string()).min(1, { message: "At least one liquidity provider is required" })),
    status: z.boolean(),
    country: z.string().min(1, { message: "Country is required" }),
    icon: z.string().min(1, { message: "Icon is required" }),
  });
  const { fetchData } = useApi();
  const [formData, setFormData] = useState(initialData);
  const [validation, setValidation] = useState({});
  const [isLoading, setLoading] = useState(false);

  const handleUpdateAsset = async () => {
    const validationResult = handleAssetFormValidation(formData, assetSchema);
    setValidation(validationResult);
    if (validationResult.success) {
      setLoading(true);
      const { result, error } = await fetchData(`/asset/${formData.asset_id}`, {
        method: "PUT",
        body: formData,
      });
      if (result) {
        closeModal();
        fetchListAssets();
        setLoading(false);
      } else {
        setLoading(false);
        // Error Message
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      setFormData(initialData);
    }
  }, [isModalOpen]);

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      title="Edit Asset"
      customWidth="w-11/12 md:w-3/4 xl:w-1/2"
    >
      <AssetForm
        isAssetPage
        formData={formData}
        setFormData={setFormData}
        validation={validation}
        assetSchema={assetSchema}
      />
      <div className="flex justify-end p-4 border-t space-x-4">
        <TextButton
          title="Cancel"
          onClick={closeModal}
          isLoading={isLoading}
          textColor="text-textBlack"
          backgroundColor="border border-primary50"
          className="min-w-[100px]"
          icon={isLoading ? <Loadingdark className="w-5 h-5" /> : undefined}
        />
        <TextButton
          title="Update"
          isLoading={isLoading}
          onClick={handleUpdateAsset}
          className="min-w-[100px]"
          icon={
            isLoading ? (
              <Loading className="w-5 h-5" />
            ) : undefined
          }
        />
      </div>
    </Modal>
  );
};

export default EditAsset;
