"use client"
import React, { useState, useEffect } from "react";
import Container from "@/components/Container/Container";
import ChooseBeneficiary from "@/components/WithdrawFiat/ChooseBeneficiary";
import ConfirmExchange from "@/components/WithdrawFiat/ConfirmExchange";
import PaymentProcessing from "@/components/WithdrawFiat/PaymentProcessing";
import AddBeneficiary from "@/components/AddBeneficiary/AddBeneficiary";
import PaymentSent from "@/components/WithdrawFiat/PaymentSent";
import WithdrawFiat from "@/components/WithdrawFiat/WithdrawFiat";

export default function BeneficiaryPage() {
  const [step, setStep] = useState(1);
  const goToAddBeneficiary = () => setStep(2);
  return (
    <>
      <Container pageName={"Beneficiary"}>
        {step === 1 && (
          <ChooseBeneficiary
            onNext={() => {
            }}
            onAdd={goToAddBeneficiary} />
        )}
        {step === 2 && (
          <AddBeneficiary
            onNext={() => setStep(1)}
            onBack={() => setStep(1)}
            onAdd={() => setStep(1)}
          />
        )}
      </Container>
    </>
  )
}