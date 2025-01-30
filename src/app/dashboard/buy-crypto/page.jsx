"use client"
import React, { useState, useEffect } from "react";
import Container from "@/components/Container/Container";
import BuyCryptoStepOne from '@/components/BuyCrypto/BuyCryptoStepOne';
import BuyCryptoStepTwo from '@/components/BuyCrypto/BuyCryptoStepTwo';
import BuyCryptoStepThree from '@/components/BuyCrypto/BuyCryptoStepThree';
import BuyCryptoStepFour from '@/components/BuyCrypto/BuyCryptoStepFour';
import BuyCryptoStepFive from '@/components/BuyCrypto/BuyCryptoStepFive';

const BuyCryptoPage = () => {
  const [step, setStep] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('AUD');
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);

  const handleAmountEntered = (amount, convertedAmount) => {
    setAmount(amount);
    setConvertedAmount(convertedAmount);
    setStep(2); // Move to confirmation screen
  };

  const handleConfirmExchange = () => {
    setStep(3); // Move to final confirmation screen
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
    else if (step === 4) setStep(3);
    else if (step === 5) setStep(4);
  };

  const handleNextStep = () => {
    if (step === 3) setStep(4);
    else if (step === 4) setStep(5);
  };

  return (
    <Container pageName={"Buy Crypto"}>
      {/*{step === 1 && (*/}
      {/*  <BuyCryptoStepOne onAmountEntered={handleAmountEntered} />*/}
      {/*)}*/}
      {/*{step === 2 && (*/}
      {/*  <BuyCryptoStepTwo onBack={handleBack} onNext={handleConfirmExchange} />*/}
      {/*)}*/}
      {/*{step === 3 && (*/}
      {/*  <BuyCryptoStepThree*/}
      {/*    fromCurrency={fromCurrency}*/}
      {/*    toCurrency={toCurrency}*/}
      {/*    amount={amount}*/}
      {/*    convertedAmount={convertedAmount}*/}
      {/*    onBack={handleBack}*/}
      {/*    onConfirm={handleConfirmExchange}*/}
      {/*    onNext={handleNextStep}*/}
      {/*  />*/}
      {/*)}*/}
      {/*{step === 4 && (*/}
      {/*  <BuyCryptoStepFour onBack={handleBack} onNext={handleNextStep} />*/}
      {/*)}*/}
      {/*{step === 5 && (*/}
        <BuyCryptoStepFive onBack={handleBack} />
      {/*)}*/}
    </Container>
  );
};

export default BuyCryptoPage;
