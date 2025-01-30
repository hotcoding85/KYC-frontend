"use client";
import React, { useState, useEffect } from "react";
import TopHeader from "./TopHeader";
import BasicInformationCard from "./BasicInformationCard";
import AllAccountsCard from "./AllAccountsCard";
import FinancialsTable from "@/components/Companies/FinancialsTab/FinancialsTable";
import EditBeneficiary from "../EditBeneficiary/EditBeneficiary";
import useApi from "@/hooks/useApi";
import { useParams } from "next/navigation";
const BeneficiaryDetailsBody = ({ setIsEditOpen, isEditOpen, beneficiary, removeBeneficiary, onSave, formData, setFormData, beneficiaryAccounts, addAccount={addAccount}, beneficiaries, assets, getBeneficiaries }) => {
  const [dummyData, setDummyData] = useState([
  ]);

  const {fetchData} = useApi()
  const params = useParams();
  const id = params?.id;
  async function fetchTransactions() {
    const { result, error } = await fetchData(`/transaction/all`, {
      method: "POST",
    });
    if (error) {
      setDummyData([]);
    } else {
      setDummyData(result);
    }
  }
  useEffect(() => {
    fetchTransactions()
  }, [])
  return (
    <div className="flex flex-col gap-2 w-full h-max pt-4">
      <TopHeader beneficiary={beneficiary || {}} setIsEditOpen={setIsEditOpen} isEditOpen={isEditOpen} removeBeneficiary={removeBeneficiary} onSave={onSave} />
      {!isEditOpen ? (
        <>
          <BasicInformationCard beneficiary={beneficiary || {}} />
          <AllAccountsCard beneficiaryAccounts={beneficiaryAccounts} addAccount={addAccount} beneficiaries={beneficiaries} assets={assets} getBeneficiaries={getBeneficiaries} />
          <FinancialsTable
            transactions={dummyData}
            isFromFinancialsTable={true}
          />
        </>
      ) : (
        <>
          <EditBeneficiary formData={formData} setFormData={setFormData} />
        </>
      )}
    </div>
  );
};

export default BeneficiaryDetailsBody;
