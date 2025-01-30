"use client";
import React, { useState } from "react";
import Button, { TextButton } from "@/components/Elements/Button/Button";
import Modal from "@/components/Elements/Modal/Modal";
import Search from "@/Icons/Search";
import AllCash from "@/Icons/CrytpoAssets/AllCash";
import Dollar from "@/Icons/CrytpoAssets/Dollar";
import AusDollar from "@/Icons/CrytpoAssets/AusDollar";
import GreenCheck from "@/Icons/GreenCheck";
import useIsMobile from "@/hooks/useIsMobile";
import Success from "@/Icons/imageicon/Success";

const TerminateCardSuccessModal = ({ isModalOpen, closeModal }) => {
  const isMobile = useIsMobile(); // Using the custom hook to detect mobile screen
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Terminate your card"
        size={isMobile ? "md" : "2xl"}
      >
        {/* Modal Body */}
        <div className="flex flex-col p-4 space-y-2">
          <Success className="w-16 h-16 mx-auto"  />
          <label className="text-sm font-semibold text-center">All Done!</label>
          <label className="text-xs text-center text-textLight">
            Your card was terminated and <br /> permanently removed.
          </label>
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end p-4 space-x-4 border-t">
          <TextButton
            title="Got it"
            className={"bg-black text-white"}
            onClick={closeModal}
          />
        </div>
      </Modal>
    </>
  );
};

export default TerminateCardSuccessModal;
