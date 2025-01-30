"use client";
import React, { useState, useEffect } from "react";
import Container from "@/components/Container/Container";
import useApi from "@/hooks/useApi";
import Back from "@/Icons/Back";
import Button from "@/components/Elements/Button/Button";
import WhiteCheck from "@/Icons/WhiteCheck";
import { Link } from "react-router-dom";
import ChevronRight from "@/Icons/ChevronRight";
import SpendingCurrenciesModal from "@/components/Accounts/Modals/SpendingCurrenciesModal";
import ChangePinModal from "@/components/Accounts/Modals/ChangePinModal";
import LabelCardModal from "@/components/Accounts/Modals/LabelCardModal";
import TerminateCardModal from "@/components/Accounts/Modals/TerminateCard";
import TerminateCardSuccessModal from "@/components/Accounts/Modals/TerminateCardSuccess";
import SpendingLimitModal from "@/components/Accounts/Modals/SpendingLimitModal";
import { useRouter } from "next/navigation";

export default function AccountDetailsSettingsPage() {
  const router = useRouter();
  const [companies, setCompanies] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const [isPinModalOpen, setPinModalOpen] = useState(false);
  const openPinModal = () => setPinModalOpen(true);
  const closePinModal = () => setPinModalOpen(false);
  const [isLabelModalOpen, setLabelModalOpen] = useState(false);
  const openLabelModal = () => setLabelModalOpen(true);
  const closeLabelModal = () => setLabelModalOpen(false);
  const [isTerminateModalOpen, setTerminateModalOpen] = useState(false);
  const openTerminateModal = () => setTerminateModalOpen(true);
  const closeTerminateModal = () => setTerminateModalOpen(false);
  const [isTerminateCardModalOpen, setTerminateCardModalOpen] = useState(false);
  const openTerminateCardModal = () => setTerminateCardModalOpen(true);
  const closeTerminateCardModal = () => setTerminateCardModalOpen(false);
  const [isLimitCardModalOpen, setLimitCardModalOpen] = useState(false);
  const openLimitCardModal = () => setLimitCardModalOpen(true);
  const closeLimitCardModal = () => setLimitCardModalOpen(false);

  const menuItems = [
    { name: "Spending Currencies", action: () => openModal },
    { name: "Spending Limit", action: () => openLimitCardModal },
    { name: "Change PIN", action: () => openPinModal },
    { name: "Label Card", action: () => openLabelModal },
    { name: "Terminate Card", action: () => openTerminateModal },
  ];

  return (
    <>
      <Container pageName={"Accounts"}>
        <div className="flex flex-col items-center justify-between h-screen">
          <div className="items-center justify-center w-full bg-white border md:w-3/6 rounded-2xl">
            <div className="flex-col p-4 ">
              <div className="flex items-center mb-4 space-x-2">
                <button onClick={() => router.back()}>
                  <Back />
                </button>
                <p className="text-sm font-semibold">Settings</p>
              </div>
              <div className="max-w">
                {menuItems.map((item, index) => (
                  <div
                    key={index}
                    onClick={item.action()}
                    className={`flex justify-between text-xs font-medium items-center py-4 cursor-pointer ${
                      item.danger ? "text-alert" : "text-primary"
                    } hover:bg-gray-100`}
                  >
                    <span>{item.name}</span>
                    <ChevronRight />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <SpendingCurrenciesModal isModalOpen={isModalOpen} closeModal={closeModal} />
      <ChangePinModal isModalOpen={isPinModalOpen} closeModal={closePinModal} />
      <LabelCardModal isModalOpen={isLabelModalOpen} closeModal={closeLabelModal} />
      <TerminateCardModal isModalOpen={isTerminateModalOpen} closeModal={closeTerminateModal} openTerminateSuccess={openTerminateCardModal} />
      <TerminateCardSuccessModal isModalOpen={isTerminateCardModalOpen} closeModal={closeTerminateCardModal} />
      <SpendingLimitModal isModalOpen={isLimitCardModalOpen} closeModal={closeLimitCardModal} />
    </>
  );
}
