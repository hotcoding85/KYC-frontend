import React, { useState } from "react";
import Button, { TextButton } from "@/components/Elements/Button/Button";
import Modal from "@/components/Elements/Modal/Modal";
import Search from "@/Icons/Search";
import AllCash from "@/Icons/CrytpoAssets/AllCash";
import Dollar from "@/Icons/CrytpoAssets/Dollar";
import AusDollar from "@/Icons/CrytpoAssets/AusDollar";
import useIsMobile from "@/hooks/useIsMobile";

const LabelCardModal = ({ isModalOpen, closeModal }) => {
  const isMobile = useIsMobile(); // Using the custom hook to detect mobile screen
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Label Card"
        size={isMobile ? "md" : "2xl"}
      >
        {/* Modal Body */}
        <div className="p-4">
          <div>
            <label className="text-xs text-gray-500">Card Name</label>
            <input
              type="text"
              className="w-full h-10 px-3 mt-2 border border-gray-300 rounded-2xl"
            />
          </div>
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end p-4 space-x-4 border-t">
          <TextButton
            title="Cancel"
            className={"bg-white text-textBlack h-10 "}
            onClick={closeModal}
          />
          <TextButton title="Save" className={"bg-black text-white h-10 "} />
        </div>
      </Modal>
    </>
  );
};

export default LabelCardModal;
