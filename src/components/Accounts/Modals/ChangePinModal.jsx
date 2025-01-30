import React, { useEffect, useRef, useState } from "react";
import Button, { TextButton } from "@/components/Elements/Button/Button";
import Modal from "@/components/Elements/Modal/Modal";
import Search from "@/Icons/Search";
import AllCash from "@/Icons/CrytpoAssets/AllCash";
import Dollar from "@/Icons/CrytpoAssets/Dollar";
import AusDollar from "@/Icons/CrytpoAssets/AusDollar";
import useIsMobile from "@/hooks/useIsMobile";

const ChangePinModal = ({ isModalOpen, closeModal }) => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputs = useRef([]);
  const isMobile = useIsMobile(); // Using the custom hook to detect mobile screen

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Focus on the next input if available
      if (value && index < 5) {
        inputs.current[index + 1].focus();
      } else {
        nextStep();
      }
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text");
    if (/^\d*$/.test(pasteData)) {
      const newOtp = pasteData.split("").slice(0, 6);
      setOtp(newOtp);
      // Focus on the next input if available
      newOtp.forEach((value, index) => {
        if (value && index < 5) {
          inputs.current[index + 1].focus();
        }
      });
    }
  };
  return (
    <>
      {/* Change Passcode Modal Body */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Current PIN Code"
        size={isMobile ? "md" : "2xl"}
      >
        {/* Modal Body */}
        <div className="flex justify-center my-16 space-x-2">
          {otp.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleChange(e, index)}
              onPaste={handlePaste}
              className="w-4 h-4 text-xl text-center border rounded-full border-primary"
            />
          ))}
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end p-4 space-x-4 border-t">
          <TextButton
            title="Cancel"
            onClick={closeModal}
            className="bg-transparent h-10 "
          />
          <TextButton
            title="Continue"
            onClick={closeModal}
            className={"bg-black text-white h-10 "}
          />
        </div>
      </Modal>
    </>
  );
};

export default ChangePinModal;
