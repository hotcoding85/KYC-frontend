"use client";
import React, { useState, useEffect } from "react";
import ChooseBeneficiary from "@/components/WithdrawFiat/ChooseBeneficiary";
import ConfirmExchange from "@/components/WithdrawFiat/ConfirmExchange";
import PaymentProcessing from "@/components/WithdrawFiat/PaymentProcessing";
import AddBeneficiary from "@/components/AddBeneficiary/AddBeneficiary";
import PaymentSent from "@/components/WithdrawFiat/PaymentSent";
import WithdrawFiat from "@/components/WithdrawFiat/WithdrawFiat";
import WithdrawCrypto from "@/components/WithdrawCrypto/WithdrawCrypto";
import { ASSET_TYPE } from "@/shared/enums";
import useApi from "@/hooks/useApi";

export default function Withdraw({ user, account, type, navPrev }) {
    const { fetchData, loading, error } = useApi();
    const [beneficiary, setBeneficiary] = useState();
    const [beneficiaryAccount, setBeneficiaryAccount] = useState();
    const [amount, setAmount] = useState();
    const [note, setNote] = useState();
    const [step, setStep] = useState(1);
  
    const goToWithdraw = (selectedBeneficiary) => {
      setBeneficiary(selectedBeneficiary);
      setStep(2);
    };
    const goToConfirmExchange = (
      selectedBeneficiary,
      selectedBeneficiaryAccount,
      amount,
      note
    ) => {
      setBeneficiaryAccount(selectedBeneficiaryAccount);
      setBeneficiary(selectedBeneficiary);
      setAmount(amount);
      setNote(note);
      setStep(3);
    };

    const goToProcessing = async () => {
      const { result, error } = await fetchData(`/transaction/outgoing`, {
        method: "POST",
        body: {
          account: account,
          beneficiary: beneficiary,
          beneficiaryAccount: beneficiaryAccount,
          amount: amount,
          note: note,
        }
      });
      if (error) {
        console.log(error);
      } else {
        setStep(4);
      }
      
    }
    const goToSent = () => setStep(5);
    const goToAddBeneficiary = () => setStep(6);
    const goBack = () => setStep(step - 1);

  return (
    <>
      {account.assetType == ASSET_TYPE.CRYPTOCURRENCY ||
      account.assetType == ASSET_TYPE.CRYPTOCURRENCY ||
      type == "crypto" ? (
        <>
          {step === 1 && (
            <ChooseBeneficiary
              onNext={goToWithdraw}
              onAdd={goToAddBeneficiary}
            />
          )}
          {step === 2 && (
            <WithdrawCrypto
              onNext={goToConfirmExchange}
              onBack={goBack}
              account={account}
              beneficiary={beneficiary}
            />
          )}
          {step === 3 && (
            <ConfirmExchange
              onNext={goToProcessing}
              onBack={goBack}
              account={senderAccount}
              beneficiary={beneficiary}
              amount={amount}
              note={note}
            />
          )}
          {step === 4 && (
            <PaymentProcessing onNext={goToSent} onBack={goBack} />
          )}
          {step === 5 && <PaymentSent onBack={goBack} />}
          {step === 6 && (
            <AddBeneficiary
              onNext={goToAddBeneficiary}
              onBack={() => setStep(1)}
              onAdd={goToProcessing}
            />
          )}
        </>
      ) : (
        <>
          {step === 1 && (
            <ChooseBeneficiary
              onNext={goToWithdraw}
              onAdd={goToAddBeneficiary}
            />
          )}
          {step === 2 && (
            <WithdrawFiat
              onNext={goToConfirmExchange}
              onBack={goBack}
              account={account}
              beneficiary={beneficiary}
            />
          )}
          {step === 3 && (
            <ConfirmExchange
              onNext={goToProcessing}
              onBack={goBack}
              account={account}
              beneficiary={beneficiary}
              beneficiaryAccount={beneficiaryAccount}
              amount={amount}
              note={note}
            />
          )}
          {step === 4 && (
            <PaymentProcessing onNext={goToSent} onBack={goBack} />
          )}
          {step === 5 && <PaymentSent onBack={goBack} />}
          {step === 6 && (
            <AddBeneficiary
              onNext={goToAddBeneficiary}
              onBack={() => setStep(1)}
              onAdd={goToProcessing}
            />
          )}
        </>
      )}
    </>
  );
}
