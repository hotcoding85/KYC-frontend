import React from "react";
import Image from "next/image";
import CrossBtn from "@/Icons/CrossBtn";

const Modal = ({ isOpen, onClose, title, modalContent, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="relative md:w-[523px] w-5/6 rounded-2xl shadow-xl bg-white">
        <div className="flex items-center justify-between py-2 px-4 bg-lightGrey rounded-t-2xl">
          <h2 className="text-sm font-semibold">{title}</h2>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <CrossBtn className="w-[30px] h-[30px]" />
          </button>
        </div>
        <div className="text-xs bg-white rounded-b-2xl">
          <div className="p-4">{modalContent}</div>
          <div className="border-t bg-White rounded-b-2xl px-4 py-3">
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
