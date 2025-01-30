import React, { useState } from "react";
import Image from "next/image";
import Button, { TextButton } from "../Elements/Button/Button";
import Modal from "../Modal/Modal";
import useApi from "@/hooks/useApi";
import { z } from "zod";
import AssetForm from "./AssetForm";
import { handleAssetFormValidation } from "@/utils/helper";
import Loading from "@/Icons/Loading";

const formInitialState = {
  name: "",
  ticker: "",
  usd_value: "",
  daily_volume: "",
  type: "",
  status: false,
  liquidity: [],
  country: "US",
  icon: "",
};

const AddAsset = ({ isModalOpen, closeModal, fetchListAssets }) => {
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
    //country: z.string().min(1, { message: "Country is required" }),
    icon: z.string().min(1, { message: "Icon is required" }),
  });

  const { fetchData } = useApi();
  const [formData, setFormData] = useState({ ...formInitialState });
  const [validation, setValidation] = useState({});
  const [isLoading, setLoading] = useState(false);

  const handleSaveAsset = async () => {
    const validationResult = handleAssetFormValidation(formData, assetSchema);
    setValidation(validationResult);
    if (validationResult.success) {
      setLoading(true);
      const { result, error } = await fetchData(`/asset/create`, {
        method: "POST",
        body: formData,
      });
      if (result) {
        closeModal();
        fetchListAssets();
        setFormData({ ...formInitialState });
        setLoading(false);
      } else {
        // Error Message
        setLoading(false);
        console.log("error: ", error);
      }
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      title="Add new asset"
      customWidth="w-11/12 md:w-3/4 xl:w-1/2"
      contentClassName="p-0"
    >
      <div className="w-full h-max p-4">
        <AssetForm
          isAssetPage
          formData={formData}
          setFormData={setFormData}
          validation={validation}
          assetSchema={assetSchema}
        />
      </div>
      <div className="flex justify-end p-4 border-t gap-4">
        <TextButton
          isAssetPage
          title="Cancel"
          onClick={closeModal}
          isLoading={isLoading}
          textColor="text-textBlack"
          backgroundColor="border border-primary50"
          className="min-w-[114px] h-[32px] px-4 py-1 gap-1 rounded-lg"
        />
        <TextButton
          title="Add"
          isLoading={isLoading}
          onClick={handleSaveAsset}
          className="min-w-[114px] h-[32px] px-4 py-1 gap-1 rounded-lg"
          icon={isLoading ? <Loading className="w-5 h-5" /> : undefined}
        />
      </div>
    </Modal>
  );
};

export default AddAsset;
