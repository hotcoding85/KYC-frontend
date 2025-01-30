import React, { useState } from "react";
import Button, { TextButton } from "@/components/Elements/Button/Button";
import Modal from "@/components/Elements/Modal/Modal";
import Search from "@/Icons/Search";
import AllCash from "@/Icons/CrytpoAssets/AllCash";
import Dollar from "@/Icons/CrytpoAssets/Dollar";
import AusDollar from "@/Icons/CrytpoAssets/AusDollar";
import useIsMobile from "@/hooks/useIsMobile";

const TerminateCardModal = ({
  isModalOpen,
  closeModal,
  openTerminateSuccess,
}) => {
  const isMobile = useIsMobile(); // Using the custom hook to detect mobile screen
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Terminate your card?"
        size={isMobile ? "md" : "2xl"}
      >
        {/* Modal Body */}
        <div className="p-4">
          <div>
            <label className="text-xs text-gray-500">
              This action is irreversible. If you only want to temporarily
              disable this card, you can choose to freeze it instead.
            </label>
          </div>
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end p-4 space-x-4 border-t">
          <TextButton
            title="Cancel"
            className={"bg-white text-textBlack h-10"}
            onClick={closeModal}
          />
          <TextButton
            title="Terminate"
            className={"bg-red-500 text-white border-red-500 h-10"}
            onClick={() => {
              closeModal();
              openTerminateSuccess();
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default TerminateCardModal;
