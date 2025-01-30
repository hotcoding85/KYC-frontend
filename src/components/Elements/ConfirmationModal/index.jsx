import React, { useState, useEffect } from "react";
import Image from "next/image";
import BaseModal from "@/components/Elements/BaseModal/BaseModal";
import Modal from "@/components/Elements/Modal/Modal";
import Checkbox from "@/Icons/Checkbox";
import CheckboxActive from "@/Icons/CheckboxActive";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  confirmColor,
  additionalInformation,
  showForm = false,
}) => {
  const [checkedOptions, setCheckedOptions] = useState({
    proofOfAddress: false,
    financialStatement: false,
    businessLicense: false,
    other: false,
    otherDescription: "",
    requestedInformationDetail: "",
  });

  useEffect(() => {
    if (additionalInformation) {
      setCheckedOptions({
        proofOfAddress: additionalInformation.proofOfAddress || false,
        financialStatement: additionalInformation.financialStatement || false,
        businessLicense: additionalInformation.businessLicense || false,
        other: additionalInformation.other || false,
        otherDescription: additionalInformation.otherDescription || "",
        requestedInformationDetail:
          additionalInformation.requestedInformationDetail || "",
      });
    }
  }, [additionalInformation]);

  const handleCheckboxChange = (option) => {
    setCheckedOptions((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  const handleInfo = (e) => {
    setCheckedOptions((prev) => ({
      ...prev,
      requestedInformationDetail: e.target.value,
    }));
  };

  const handleOtherTextChange = (e) => {
    setCheckedOptions((prev) => ({
      ...prev,
      otherDescription: e.target.value,
    }));
  };

  const handleSubmit = () => {
    console.log("setAdditionalInformation===>", checkedOptions);
    onConfirm(checkedOptions);
  };

  useEffect(() => {
    console.log("additionalInformation===>", additionalInformation);
  }, [additionalInformation]);

  const modalContent = (
    <>
      {showForm ? (
        <>
          <p className="mb-2 text-xs font-normal">Information Requested</p>
          <textarea
            value={checkedOptions.requestedInformationDetail}
            rows={4}
            onChange={handleInfo}
            className="w-full p-2 mb-2 border text-textSecondary border-gray-300 rounded-[10px] text-xs"
            placeholder="Please specify the details you need from the company to proceed with the approval process."
          />

          <p className="mb-2 text-xs font-semibold">Requested Documents</p>
          <div className="flex flex-col text-sm gap-y-2">
            {["proofOfAddress", "financialStatement", "businessLicense"].map(
              (option) => (
                <label
                  key={option}
                  className="flex items-center cursor-pointer"
                >
                  <div onClick={() => handleCheckboxChange(option)}>
                    {checkedOptions[option] ? (
                      <Checkbox className="w-5 h-5" />
                    ) : (
                      <CheckboxActive className="w-5 h-5" />
                    )}
                  </div>
                  <span className="ml-2 text-xs font-normal">
                    {option === "proofOfAddress"
                      ? "Proof of Address"
                      : option === "financialStatement"
                      ? "Updated Financial Statement"
                      : "Business License"}
                  </span>
                </label>
              )
            )}
            <label className="flex items-center cursor-pointer">
              <div onClick={() => handleCheckboxChange("other")}>
                {checkedOptions.other ? (
                  <Checkbox className="w-5 h-5" />
                ) : (
                  <CheckboxActive className="w-5 h-5" />
                )}
              </div>
              <span className="ml-2 text-xs font-normal">Other</span>
              {checkedOptions.other && (
                <input
                  type="text"
                  value={checkedOptions.otherDescription}
                  onChange={handleOtherTextChange}
                  className="w-[200px] p-2 ml-2 text-xs border border-gray-300 rounded-[10px]"
                  placeholder="Registration documents"
                />
              )}
            </label>
          </div>
        </>
      ) : (
        <p className=" text-xs">{description}</p>
      )}
    </>
  );

  const modalFooter = (
    <div className="flex justify-end gap-2">
      <button
        onClick={onClose}
        className="px-4 w-[114px] text-xs text-gray-700 bg-white border rounded-[10px] h-8"
      >
        Cancel
      </button>
      <button
        onClick={handleSubmit}
        className={`px-4 text-xs w-[114px] rounded-[10px] text-white ${confirmColor} h-8`}
      >
        {confirmText}
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      customWidth="!w-[783px]! max-w-[783px]"
    >
      <div className="w-full h-max p-4 ">{modalContent}</div>
      <div className="w-full p-4 border-t border-t-primary50">
        {modalFooter}{" "}
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
