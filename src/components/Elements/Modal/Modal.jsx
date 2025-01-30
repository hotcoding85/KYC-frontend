import React from "react";
import Close from "@/Icons/Close";

const Modal = ({
  title,
  isOpen,
  onClose,
  children,
  size = "md",
  bg,
  customWidth,
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
  };

  // Handle click on the overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle click on the modal content
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 w-full z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-50 text-textBlack"
      onClick={handleOverlayClick}
    >
      <div className="w-full z-10" onClick={handleOverlayClick}>
        <div
          className={`relative w-full max-h-[32rem] ${
            customWidth || sizeClasses[size]
          } mx-auto my-6`}
          onClick={handleModalClick}
        >
          <div
            className={`relative ${
              bg ?? "bg-white"
            } rounded-xl shadow-lg flex flex-col w-full`}
          >
            <div className="flex items-center justify-between px-4 py-2 border-b rounded-tr-xl rounded-tl-xl bg-lightGrey">
              <h2 className="text-sm font-semibold">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <Close />
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
