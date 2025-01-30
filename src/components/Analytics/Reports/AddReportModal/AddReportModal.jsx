import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { useReport } from "@/components/Analytics/Reports/ReportContext/ReportContext";
import Modal from "@/components/Elements/Modal/Modal";
import useIsMobile from "@/hooks/useIsMobile";
import Button, { TextButton } from "@/components/Elements/Button/Button";

const AddReportModal = ({ buttonnTitle, reportsName, setReportsName }) => {
  const {
    addReport,
    closeModal,
    isModalOpen,
    reportTitle,
    setReportTitle,
    selectedTemplate,
    setSelectedTemplate,
    modalTitle,
  } = useReport();

  // Add local state for input value
  const [inputValue, setInputValue] = useState("");

  const isMobile = useIsMobile();
  const toast = useRef(null);

  const templates = [
    { value: "Total orders", label: "Total orders" },
    { value: "Total sales", label: "Total sales" },
    { value: "Average order value", label: "Average order value" },
    {
      value: "Buyer conversion percentage",
      label: "Buyer conversion percentage",
    },
  ];

  // Handle form submission
  const handleSubmit = () => {
    if (inputValue && selectedTemplate) {
      // Update reportsName with the input value only when submitting
      setReportsName(inputValue);

      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Report created",
      });

      setTimeout(() => {
        addReport(reportTitle, selectedTemplate);
        closeModal();
      }, 1000);
    }
  };

  useEffect(() => {
    setInputValue(reportsName);
  }, [reportsName]);

  if (!isModalOpen) return null;

  return (
    <>
      <Toast ref={toast} />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        customWidth={"w-[90%] sm:w-[500px] sm:max-w-[500px]"}
      >
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700">
              Report title
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)} // Update local state instead of reportsName
              placeholder="Enter Report Name"
              className={`w-full p-2 mt-1 text-xs border rounded-[10px] focus:outline-none ${"border-gray-300"}`}
            />
          </div>

          {/* Report Template */}
          <div>
            <p className="block text-xs font-semibold text-gray-700">
              Report template
            </p>
            <div className="mt-3 space-y-4">
              {templates.map((template) => (
                <label key={template.value} className="flex items-center">
                  <input
                    type="radio"
                    value={template.value}
                    checked={selectedTemplate === template.value}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="w-4 h-4 form-radio text-textBlack focus:ring-black accent-black"
                  />
                  <span className="ml-2 text-xs text-gray-700">
                    {template.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end p-4 space-x-4 border-t">
          <TextButton
            isAssetPage
            title="Cancel"
            onClick={closeModal}
            textColor="text-textBlack"
            backgroundColor="border border-primary50"
            className="!min-w-[100px] !w-[114px] rounded-[10px]"
          />
          <TextButton
            title={`${buttonnTitle || "Add new report"}`}
            onClick={handleSubmit}
            // disabled={!inputValue}
            className={`h-8 !w-[114px] !min-w-[100px] rounded-[10px] ${
              !inputValue || !selectedTemplate
                ? "bg-gray-300"
                : "bg-black text-white"
            }`}
          />
        </div>
      </Modal>
    </>
  );
};

export default AddReportModal;
