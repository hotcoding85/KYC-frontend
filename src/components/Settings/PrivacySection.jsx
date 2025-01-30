import React, { useEffect, useRef, useState } from "react";
import Modal from "../Modal/Modal";
import Button from "../Elements/Button/Button";
import VisibilityOn from "@/Icons/VisibilityOn";
import VisibilityOff from "@/Icons/VisibilityOff";
import OTP from "../Elements/OTP/OTP";
import ForwardArrow from "@/Icons/ForwardArrow";

export default function PrivacySection() {
    const [code, setCode] = useState("");
    const [codeValidation, setCodeValidation] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalPOpen, setModalPOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const openPModal = () => setModalPOpen(true);
    const closePModal = () => setModalPOpen(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };
    const toggleConfirmPasswordVisibility = () => {
        setConfirmShowPassword((prevState) => !prevState);
    };

    const [step, setStep] = useState(1);
   
    const inputs = useRef([]);

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const getCode = (code) => {
      setCode(code.join(""));
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
        <div>
          <p className="text-xl font-bold pt-4">Privacy & Security</p>
          <button className="bg-white p-6 rounded-2xl shadow-sm mt-2 w-full text-left flex flex-row justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold mb-1">2FA Withdrawal</h2>
              <h2 className="mb-4 text-textSecondary">
                Enable biometric or passcode authentication when withdrawing
                from your watwallet.
              </h2>
            </div>
            <ForwardArrow />
          </button>
          <button
            className="bg-white p-6 rounded-2xl shadow-sm mt-4 w-full text-left flex flex-row justify-between items-center"
            onClick={openPModal}
          >
            <div>
              <h2 className="text-lg font-semibold mb-1">Change Passcode</h2>
              <h2 className="mb-4 text-textSecondary">
                Change the passcode used to log in to the app.
              </h2>
            </div>
            <ForwardArrow />
          </button>
          <button
            className="bg-white p-6 rounded-2xl shadow-sm mt-4 w-full text-left flex flex-row justify-between items-center"
            onClick={openModal}
          >
            <div>
              <h2 className="text-lg font-semibold mb-1">Change Password</h2>
              <h2 className="mb-4 text-textSecondary">
                Change the password for your app account.
              </h2>
            </div>
            <ForwardArrow />
          </button>
        </div>

        {/* Change Passcode Modal Body */}
        <Modal
          isOpen={isModalPOpen}
          onClose={closePModal}
          title="Change Passcode"
        >
          {/* Modal Body */}
          <div className="p-4">
            <p>Enter Current Passcode</p>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <div className="flex justify-center space-x-2 mb-4">
            <OTP
              onChange={getCode}
              className={
                codeValidation === false && code.length == 6
                  ? "border-red-500"
                  : "border-gray-300"
              }
              validationMessage={
                codeValidation === false && code.length == 6
                  ? "Invalid authentication code"
                  : ""
              }
            ></OTP>
          </div>
          <br></br>
          <br></br>
          <br></br>
          {/* Modal Footer */}
          <div className="flex justify-end p-4 border-t space-x-4">
            <Button title="Cancel" type="secondary" onClick={closePModal} />
          </div>
        </Modal>

        {/* Change Password Modal Body */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Change Password"
        >
          {/* Modal Body */}
          <div className="p-4">
            <p>
              An OTP will be sent to your email address for verification
              purposes.
            </p>
          </div>
          <div className="px-4 pb-4">
            <p className="pt-4 pb-2">Current Password*</p>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Your new password"
                className="border border-gray-300 p-3 rounded-2xl w-full pr-10"
              />
              {/* Eye icon to toggle password visibility */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? (
                  <VisibilityOn /> // eye icon (open)
                ) : (
                  <VisibilityOff /> // eye-off icon (closed)
                )}
              </button>
            </div>
            <p className="pt-4 pb-2">New Password*</p>
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-type your password"
                className="border border-gray-300 p-3 rounded-2xl w-full pr-10"
              />
              {/* Eye icon to toggle password visibility */}
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showConfirmPassword ? (
                  <VisibilityOn /> // eye icon (open)
                ) : (
                  <VisibilityOff /> // eye-off icon (closed)
                )}
              </button>
            </div>
            <p className="pt-4 pb-2">Confirm new password*</p>
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-type your password"
                className="border border-gray-300 p-3 rounded-2xl w-full pr-10"
              />
              {/* Eye icon to toggle password visibility */}
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showConfirmPassword ? (
                  <VisibilityOn /> // eye icon (open)
                ) : (
                  <VisibilityOff /> // eye-off icon (closed)
                )}
              </button>
            </div>
          </div>
          {/* Modal Footer */}
          <div className="flex justify-end p-4 border-t space-x-4">
            <Button title="Cancel" type="secondary" onClick={closeModal} />
            <Button title="Apply" type="primary" onClick={closeModal} />
          </div>
        </Modal>
      </>
    );
}