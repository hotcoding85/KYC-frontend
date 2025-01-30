import Close from "@/Icons/Close";
import React from "react";
import { createPortal } from "react-dom";

const Modal = ({
  isOpen,
  onClose,
  children,
  size,
  bg,
  title = "Log out",
  className,
  customWidth,
  headerClassName = "px-4 py-2",
  contentClassName = "p-4",
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
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    "8xl": "max-w-[1400px]",
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

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center w-full p-10 overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
      onClick={handleOverlayClick}
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50" />

      {/* Modal Container */}
      <div
        onClick={handleModalClick}
        className={`
          relative z-[10000]
          ${customWidth || sizeClasses[size]}
          w-[500px] h-auto p-0 gap-4
          bg-white rounded-xl
          ${className || ""}
        `}
      >
        {/* Modal Header */}
        <div
          className={`
            relative top-0 z-[10001]
            flex items-center justify-between
            border-b bg-lightGrey !h-[56px]
            rounded-t-2xl
            ${headerClassName}
          `}
        >
          <h2 className="pr-2 text-[14px] font-semibold leading-[20px] tracking-[-0.005em] text-textBlack text-left truncate">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="flex-shrink-0 hover:opacity-80 transition-opacity"
          >
            <Close color={"#1C1C1C"} />
          </button>
        </div>

        {/* Modal Content */}
        <div className={contentClassName}>{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;