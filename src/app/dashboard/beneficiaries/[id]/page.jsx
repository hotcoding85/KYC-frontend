"use client";
import BeneficiaryDetailsBody from "@/components/Beneficiary/BenificiaryDetails/BeneficiaryDetailsBody";
import Container from "@/components/Container/Container";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import useApi from "@/hooks/useApi";
import { Toast } from "primereact/toast";
import Loadingdark from "@/Icons/Loadingdark";
import Modal from "@/components/Modal/Modal";
import { TextButton } from "@/components/Elements/Button/Button";

const BenificiaryDetails = () => {
  const params = useParams();
  const { fetchData } = useApi();
  const id = params?.id;
  const router = useRouter();
  const [beneficiary, setBeneficiaty] = useState(null)
  const toast = useRef(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const closeDeleteModal = () => setDeleteModalOpen(false);
  const openDeleteModal = () => setDeleteModalOpen(true);
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({})
  const [accountData, setAccountData] = useState({})
  const [beneficiaryAccounts, setAccounts] = useState([])
  const [beneficiaries, setBeneficiaries] = useState([]);

  const getBeneficiaries = async (id) => {
    const { result, error } = await fetchData(`/beneficiary/${id}`, {
      method: "GET",
    });

    if (result) {
      setBeneficiaty(result);
    } else {
      console.error(error);
    }
  };

  useEffect(() => {
    getBeneficiaries(id)
    getAllBeneficiaries()
    fetchListAssets()
  }, [])

  const [isEditOpen, setIsEditOpen] = useState(false);
  const removeBeneficiary = async () => {
    openDeleteModal()
  }

  const handleDeleteNode = async () => {
    setLoading(true)
    // remove current beneficiary
    const { result, error } = await fetchData(`/beneficiary/${id}/delete`, {
      method: "DELETE",
    });
    if (!error) {
      toast.current.show({
        severity: "success",
        summary: "Deleted",
        detail: "Current beneficiary had successfully been deleted.",
        life: 3000,
      });
      setLoading(false)
      closeDeleteModal()
      router.push('/dashboard/beneficiaries')
    }
    else{
      toast.current.show({
        severity: "error",
        summary: "Warning",
        detail: "Something went wrong!",
        life: 3000,
      });
      setLoading(false)
    }
  }

  const onSave = useCallback(async () => {
    const payload = formData
    payload.full_name = payload.first_name + ' ' + payload.last_name
    const { result, error } = await fetchData(`/beneficiary/update-beneficiary/${id}`, {
      method: "PATCH",
      body: formData
    });

    if (!error) {
      toast.current.show({
        severity: "success",
        summary: "Updated",
        detail: "Current beneficiary had successfully been updated.",
        life: 3000,
      });
      getBeneficiaries(id)
      setIsEditOpen(false)
    }
    else{
      toast.current.show({
        severity: "error",
        summary: "Warning",
        detail: Array.isArray(error.message) ? error.message[0] : error.message,
        life: 3000,
      });
    }
  }, [formData])

  const addAccount = async () => {
    const { result, error } = await fetchData(`/beneficiary/add-account/${id}`, {
      method: "PATCH",
      body: formData
    });

    if (!error) {
      toast.current.show({
        severity: "success",
        summary: "Updated",
        detail: "New beneficiary account had successfully been created.",
        life: 3000,
      });
    }
    else{
      toast.current.show({
        severity: "error",
        summary: "Warning",
        detail: Array.isArray(error.message) ? error.message[0] : error.message,
        life: 3000,
      });
    }
  }

  useEffect(() => {
    if (beneficiary) {
      const { full_name, beneficiary_accounts, ...rest } = beneficiary;
      beneficiary_accounts && beneficiary_accounts.length > 0 && setAccounts(beneficiary_accounts)
      // Split the full name into first and last names
      const [first_name = "", ...lastNameParts] = full_name?.split(" ") || [];
      const last_name = lastNameParts.join(" ");
  
      // Update formData with the split names and other properties
      setFormData({
        first_name,
        last_name,
        ...rest,
      });
    } else {
      setFormData({});
    }
  }, [beneficiary]);

  const getAllBeneficiaries = async () => {
    const { result, error } = await fetchData(`/beneficiary/all`, {
      method: "POST",
    });

    if (result) {
      setBeneficiaries(result);
    } else {
      console.error(error);
    }
  };

  const [assets, setAssets] = useState([])
  async function fetchListAssets() {
    const { result, error } = await fetchData(`/asset/all`, {
      method: "GET",
    });
    if (error) {
      setAssets([]);
    } else {
      setAssets(result);
    }
  }

  return (
    <Container pageName={"Beneficiary Details"}>
      <div className="w-full h-max sm:pl-2">
        <BeneficiaryDetailsBody setIsEditOpen={setIsEditOpen} isEditOpen={isEditOpen} beneficiary={beneficiary} removeBeneficiary={removeBeneficiary} onSave={onSave} formData={formData} setFormData={setFormData} beneficiaryAccounts={beneficiaryAccounts} getBeneficiaries={getBeneficiaries} addAccount={addAccount} beneficiaries={beneficiaries} assets={assets} />
      </div>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        title="Delete"
        size="2xl"
      >
        {/** Modal Body */}
        <div className="flex flex-col gap-6 w-full mx-auto p-6 space-y-4">
          <p className="text-textBlack">
            Are you sure to remove this beneficiary?
          </p>
        </div>
        {/** Modal Footer */}
        <div className="flex justify-end p-4 border-t space-x-4">
          <TextButton
            title="Cancel"
            onClick={closeDeleteModal}
            isLoading={isLoading}
            backgroundColor="bg-white"
            textColor="text-textBlack"
            className="border brder-primary50"
            icon={isLoading ? <Loadingdark className="w-5 h-5" /> : undefined}
          />
          <TextButton
            title="Delete"
            isLoading={isLoading}
            textColor="text-white"
            onClick={handleDeleteNode}
            backgroundColor="bg-alert"
            className="border brder-alert"
            icon={isLoading ? <Loadingdark className="w-5 h-5" /> : undefined}
          />
        </div>
      </Modal>
      <Toast ref={toast} baseZIndex={9999} />
    </Container>
  );
};

export default BenificiaryDetails;
