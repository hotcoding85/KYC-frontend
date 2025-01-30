"use client"
import React, { useState, useEffect } from "react";
import Container from "@/components/Container/Container";
import ExchangeStepOne from '@/components/Exchange/ExchangeStepOne';
import ExchangeStepThree from '@/components/Exchange/ExchangeStepThree';
import ExchangeStepTwo from '@/components/Exchange/ExchangeStepTwo';

const ExchangePage = () => {
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
    const handleOk = () => {
    };

    const handleBack = () => {
        setStep(step === 2 ? 1 : 2); // Back to previous step
    };

    return (
        <Container pageName={"Accounts"}>
            {step === 1 && (
                <ExchangeStepOne onAmountEntered={handleAmountEntered} />
            )}
            {step === 2 && (
                <ExchangeStepTwo
                    fromCurrency={fromCurrency}
                    toCurrency={toCurrency}
                    amount={amount}
                    convertedAmount={convertedAmount}
                    onBack={handleBack}
                    onConfirm={handleConfirmExchange}
                />
            )}
            {step === 3 && (
                <ExchangeStepThree onBack={handleBack} onOk={handleOk} />
            )}
        </Container>
    );
};

export default ExchangePage;
