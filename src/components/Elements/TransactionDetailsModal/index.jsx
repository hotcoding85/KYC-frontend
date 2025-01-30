import React, { useCallback, useState } from "react";
// import Modal from "@/components/Elements/Modal/Modal";
import { FaBitcoin } from "react-icons/fa";
import { TextButton } from "@/components/Elements/Button/Button";
import Modal from "@/components/Modal/Modal";
import Button from "@/components/Elements/Button/Button";
import S3Image from "@/components/Elements/S3Image/S3Image";
import DateTime from "@/components/Elements/DateTime/DateTime";
import Tag from "@/components/Elements/Tag/Tag";
import UploadFile from "@/Icons/imageicon/UploadFile";
import { useUser } from "@/app/context/UserContext";
import { COMPANY_ACCOUNT_TYPE, ROLE } from "@/shared/enums";

export default function TransactionDetailsModal({ isOpen, onClose, transaction }) {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [notes, setNotes] = useState("");
  const { user } = useUser() ?? {};
  
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      contentClassName="p-0"
      title="Transaction details"
      customWidth="max-w-full sm:max-w-lg"
    >
      <div className="p-4 max-h-[70vh] overflow-auto scrollbar-hide">
        <div className="flex flex-col items-center justify-center space-y-1">
          <p className="text-xs text-gray-500">
            {transaction.type == "credit" ? "Received" : "Sent"} Amount
          </p>
          <div className="flex relative w-6">
            <S3Image
              className="w-[24px] h-[24px] rounded-full"
              s3Url={transaction?.asset?.icon}
            />
            {transaction?.network?.name != transaction?.asset?.name && (
              <S3Image
                className="w-[12px] h-[12px] rounded-full bottom-0 right-0 absolute"
                s3Url={transaction?.network?.icon}
              />
            )}
          </div>
          <p className="text-base font-semibold text-textBlack">
            {(
              (parseFloat(transaction?.usd_rate) /
                parseFloat(transaction?.asset?.denomination || 1)) *
              parseFloat(transaction?.amount)
            ).toFixed(2)}{" "}
            <span className="text-gray-500">USD</span>
          </p>
          <p className="text-xs text-gray-500">
            ≈{" "}
            {(
              parseFloat(transaction?.amount) /
              parseFloat(transaction?.asset?.denomination || 1)
            ).toFixed(4)}{" "}
            {transaction?.asset?.name}
          </p>

          <div className="px-4 py-[6px] text-xs font-normal">
            <Tag
              status={
                transaction?.status == "Failed"
                  ? "danger"
                  : transaction?.status == "Pending"
                  ? "warning"
                  : "success"
              }
              text={transaction?.status}
              className="capitalize"
            ></Tag>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-3">
          <div className="flex flex-wrap justify-between flex-row">
            <p className="text-xs text-gray-500">
              {" "}
              {transaction?.type == "credit" ? "From" : "To"}:
            </p>
            <p className="text-xs font-semibold break-all">
              {" "}
              {transaction?.type == "credit"
                ? transaction?.from_address
                : transaction?.to_address}
            </p>
          </div>
          <div className="flex flex-wrap justify-between flex-row">
            <p className="text-xs text-gray-500">Network Fee</p>
            <p className="text-xs font-semibold break-all">
              {((parseFloat(transaction?.chain_fee) +
                parseFloat(transaction?.platform_fee) +
                parseFloat(transaction?.company_fee)) /
                parseFloat(transaction?.asset?.denomination || 1)) *
                parseFloat(transaction?.usd_rate).toFixed(4)}{" "}
              USD
            </p>
          </div>
          <div className="flex flex-wrap justify-between flex-row">
            <p className="text-xs text-gray-500">Transaction Type</p>
            <p className="text-xs font-semibold break-all">
              {transaction?.transactionType}
            </p>
          </div>
          <div className="flex flex-wrap justify-between flex-row">
            <p className="text-xs text-gray-500">Receive Amount</p>
            <p className="text-xs font-semibold break-all">
              {" "}
              ≈
              {(
                parseFloat(transaction?.amount) /
                parseFloat(transaction?.asset?.denomination || 1)
              ).toFixed(4)}{" "}
              {transaction?.asset?.name} (
              {(
                (parseFloat(transaction?.usd_rate) /
                  parseFloat(transaction?.asset?.denomination || 1)) *
                parseFloat(transaction?.amount)
              ).toFixed(2)}{" "}
              USD)
            </p>
          </div>
          <div className="flex flex-wrap justify-between flex-row">
            <p className="text-xs text-gray-500">Txid</p>
            <p className="text-xs font-semibold break-all">
              {transaction?.blockchain_tx_hash}
            </p>
          </div>
          <div className="flex flex-wrap justify-between flex-row">
            <p className="text-xs text-gray-500">Date</p>
            <p className="text-xs font-semibold break-all">
              <DateTime
                date={transaction?.created_at}
                time={transaction?.created_at}
              ></DateTime>
            </p>
          </div>
          <div className="flex flex-wrap justify-between flex-row">
            <p className="text-xs text-gray-500">Status</p>
            <p className="text-xs font-semibold break-all">
              {transaction.status}
            </p>
          </div>
        </div>

        {user &&
          user.role in
            [
              ROLE.COMPANY_ADMINISTRATOR,
              ROLE.COMPANY_USER,
              ROLE.SUPER_ADMINISTRATOR,
              ROLE.SUPER_USER,
            ] && (
            <>
              {/* Upload supporting document */}
              <div className="flex flex-col w-full gap-2 mt-4 h-max">
                <p className="text-xs text-gray-500">Supporting Documents</p>
                <div
                  className={`relative h-[105px] w-full border rounded-[10px] border-dotted flex flex-col items-center justify-center transition-colors ${
                    isDragging
                      ? "border-blue-500 bg-blue-50"
                      : "border-primary300"
                  }`}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    className="hidden"
                    id="fileInput"
                    multiple
                    onChange={handleFileInputChange}
                  />
                  <label
                    htmlFor="fileInput"
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <UploadFile className="w-[17px] h-[17px] mb-2" />
                    <p className="text-xs font-normal text-gray-500">
                      Drag and drop here or click to upload
                    </p>
                    <p className="text-[11px] text-textSecondary font-normal">
                      Supported formats: PDF, JPEG, PNG
                    </p>
                  </label>
                </div>

                {/* File list */}
                {files.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 text-xs rounded bg-gray-50"
                      >
                        <span className="truncate max-w-[200px]">
                          {file.name}
                        </span>
                        <button
                          onClick={() => handleRemoveFile(index)}
                          className="text-alert hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Notes */}
              <div className="flex flex-col w-full gap-2 mt-4 h-max">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">Notes</p>
                  <p className="text-[11px] text-gray-500">
                    Maximum text length is 1000 characters
                  </p>
                </div>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="border border-primary50 h-[105px] max-h-[105px] min-h-[105px] w-full rounded-[10px] p-3 text-xs resize-none focus:ring-1 focus:ring-gray-200 focus:border-gray-200 focus:outline-none"
                  placeholder="Type your notes here"
                  style={{ WebkitAppearance: "none" }}
                />
              </div>
            </>
          )}
      </div>

      <div className="flex items-center justify-end gap-2 px-4 py-2 border-t ">
        <TextButton
          title="Cancel"
          onClick={onClose}
          width="w-full sm:w-[114px] sm:min-w-[114px]"
          className="px-10 py-2  h-8 text-sm !text-textBlack bg-white border border-primary50 rounded-[10px]"
        />
        {user &&
          user.role in
            [
              ROLE.COMPANY_ADMINISTRATOR,
              ROLE.COMPANY_USER,
              ROLE.SUPER_ADMINISTRATOR,
              ROLE.SUPER_USER,
            ] && (
            <TextButton
              title="Save"
              onClick={onClose}
              width="w-full sm:w-[114px] sm:min-w-[114px]"
              className="px-10 py-2 h-8 text-sm text-white bg-black rounded-[10px]"
            />
          )}
      </div>
    </Modal>
  );
}
