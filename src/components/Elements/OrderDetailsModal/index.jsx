import React, { useCallback, useState } from "react";
// import Modal from "@/components/Elements/Modal/Modal";
import { FaBitcoin } from "react-icons/fa";
import { TextButton } from "@/components/Elements/Button/Button";
import Modal from "@/components/Modal/Modal";

export default function OrderDetailsModal({ isOpen, onClose }) {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [notes, setNotes] = useState("");

  // Handle file selection
  const handleFileSelect = useCallback((selectedFiles) => {
    const newFiles = Array.from(selectedFiles);
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  // Handle drag events
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const droppedFiles = Array.from(e.dataTransfer.files);
      handleFileSelect(droppedFiles);
    },
    [handleFileSelect]
  );

  // Handle file input change
  const handleFileInputChange = useCallback(
    (e) => {
      handleFileSelect(e.target.files);
    },
    [handleFileSelect]
  );

  // Handle file removal
  const handleRemoveFile = useCallback((indexToRemove) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Order details" customWidth="max-w-lg" contentClassName="p-0">
      <div className="p-4">
        <div className="flex flex-col items-center justify-center space-y-1">
          <p className="text-xs text-gray-500">Sent Amount</p>
          <FaBitcoin className="text-3xl text-warning" />
          <p className="text-base font-semibold text-textBlack">
            151.00 <span className="text-gray-500">USD</span>
          </p>
          <p className="text-xs text-gray-500">≈ 0.00344 BTC</p>

          <div className="px-4 py-[6px] text-xs font-normal text-success bg-successLight rounded-full">Completed</div>
        </div>

        <div className="flex flex-col gap-3 mt-3">
          <div className="flex flex-col justify-between sm:flex-row">
            <p className="text-xs text-gray-500">Order #</p>
            <p className="text-xs font-semibold">12345</p>
          </div>
          <div className="flex flex-col justify-between sm:flex-row">
            <p className="text-xs text-gray-500">Order Detail</p>
            <p className="text-xs font-semibold">Aeropostale Chinos, Lacoste Shirt Order Ref #123123</p>
          </div>
          <div className="flex flex-col justify-between sm:flex-row">
            <p className="text-xs text-gray-500">Receive Amount</p>
            <p className="text-xs font-semibold">0.0034 BTC (150.00 USD)</p>
          </div>
          <div className="flex flex-col justify-between sm:flex-row">
            <p className="text-xs text-gray-500">Txid</p>
            <p className="text-xs font-semibold">02f9237ty6sdfgh23723798967923g9hsdfg692369g2</p>
          </div>
          <div className="flex flex-col justify-between sm:flex-row">
            <p className="text-xs text-gray-500">Date</p>
            <p className="text-xs font-semibold">29 Aug-2023 14:00:52</p>
          </div>
          <div className="flex flex-col justify-between sm:flex-row">
            <p className="text-xs text-gray-500">Network</p>
            <p className="text-xs font-semibold">1 USD</p>
          </div>
          <div className="flex flex-col justify-between sm:flex-row">
            <p className="text-xs text-gray-500">Source</p>
            <p className="text-xs font-semibold">www.farfetch.com</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 px-4 py-2 border-t ">
        <TextButton
          title="Print"
          onClick={onClose}
          className="px-10 py-2  h-8 !w-[114px] !min-w-[114px] text-sm text-white bg-black rounded-[10px]"
        />
      </div>
    </Modal>
  );
}
