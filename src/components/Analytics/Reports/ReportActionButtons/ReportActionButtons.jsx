import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPrint,
  faFileExport,
  faTrash,
  faTimes,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import AddReportModal from "../AddReportModal/AddReportModal";
import { TextButton } from "@/components/Elements/Button/Button";
import { useReport } from "../ReportContext/ReportContext";
import Modal from "@/components/Elements/Modal/Modal";
import Print from "@/Icons/Print";
import ExportIcon from "@/Icons/export";
import Edit from "@/Icons/Edit";
import Delete from "@/Icons/Delete";

const ReportModals = ({ reportsName, setReportsName, width }) => {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const { openModal, setModalTitle } = useReport();

  const handleSaveChanges = () => {
    // Save the updated report (in your case, update the context or send a request to the API)
    setIsEditModalOpen(false); // Close the modal after saving changes
  };

  return (
    <div className="p-2">
      {/* Buttons to open the modals */}
      <div className="flex flex-wrap gap-2">
        <button
          className={`flex items-center gap-2 px-4 py-2 h-8 text-xs text-gray-600 border border-gray-300 rounded-[10px] whitespace-nowrap ${width || 'w-full md:w-auto'}`}
          onClick={() => setIsPrintModalOpen(true)}
        >
          <Print />
          <span>Print</span>
        </button>

        <button
          className={`flex items-center gap-2 px-4 h-8 text-xs text-gray-600 border border-gray-300 rounded-[10px] whitespace-nowrap ${width || 'w-full md:w-auto'}`}
          onClick={() => setIsExportModalOpen(true)}
        >
          <ExportIcon />
          <span>Export</span>
        </button>

        <button
          onClick={() => {
            setModalTitle("Edit Report");
            openModal();
          }}
          className={`flex items-center gap-2 px-4 py-2 h-8 text-xs text-gray-600 border border-gray-300 rounded-[10px] whitespace-nowrap ${width || 'w-full md:w-auto'}`}
        >
          <Edit />
          <span>Edit</span>
        </button>

        <button
          className={`flex items-center gap-2 px-4 py-2 h-8 text-xs text-gray-600 border border-gray-300 rounded-[10px] whitespace-nowrap ${width || 'w-full md:w-auto'}`}
          onClick={() => setIsDeleteModalOpen(true)}
        >
          <Delete />
          <span>Delete</span>
        </button>

        <button
          className={`flex items-center justify-center gap-2 px-4 py-2 h-8 text-xs text-white bg-black rounded-[10px] ${width || 'w-full md:w-auto'}`}
        >
          Save Report
        </button>
      </div>

      {/* Export Modal */}
      <Modal
        isOpen={isExportModalOpen}
        title="Export your report"
        customWidth="w-[96%] sm:w-[492px]"
        onClose={() => setIsExportModalOpen(false)}
      >
        <div className="p-4 space-y-4">
          <p className="text-xs text-gray-600">
            Report will be exported as a CSV (comma-separated values) table.
          </p>
          <div className="flex items-center text-xs">
            <input
              type="checkbox"
              id="includeComparison"
              className="mr-2 accent-black"
            />
            <label htmlFor="includeComparison">
              Include comparison data (separate CSV file)
            </label>
          </div>
        </div>
        <div className="flex justify-end p-4 space-x-4 border-t">
          <TextButton
            isAssetPage
            title="Cancel"
            onClick={() => setIsExportModalOpen(false)}
            textColor="text-textBlack"
            backgroundColor="border border-primary50"
            className="!min-w-[100px] !w-[114px] "
          />
          <TextButton
            title="Export"
            className="h-8 text-white bg-black !min-w-[100px] !w-[114px] "
          />
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete your report"
        customWidth="w-[96%] sm:w-[492px]"
      >
        <div className="p-4 space-y-4">
          <p className="text-xs text-gray-600">
            Are you sure you want to delete this report? This action cannot be
            undone.
          </p>
        </div>
        <div className="flex justify-end p-4 space-x-4 border-t">
          <TextButton
            isAssetPage
            title="Cancel"
            onClick={() => setIsDeleteModalOpen(false)}
            textColor="text-textBlack"
            backgroundColor="border border-primary50"
            className="!min-w-[100px] !w-[114px]"
          />
          <TextButton title="Delete" className="h-8 text-white bg-alert !min-w-[100px] !w-[114px]" />
        </div>
      </Modal>

      {/* Print Modal */}
      <Modal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        title="Print your report"
        customWidth="w-[96%] sm:w-[492px]"
      >
        <div className="p-4 space-y-4">
          <p className="text-xs text-gray-600">
            Are you sure you want to print this report? Ensure your printer is
            connected and configured correctly.
          </p>
        </div>
        <div className="flex justify-end p-4 space-x-4 border-t">
          <TextButton
            isAssetPage
            title="Cancel"
            onClick={() => setIsPrintModalOpen(false)}
            textColor="text-textBlack"
            backgroundColor="border border-primary50"
            className="!min-w-[100px] !w-[114px]"
          />
          <TextButton title="Print" className="h-8 text-white bg-black !min-w-[100px] !w-[114px]" />
        </div>
      </Modal>

      <AddReportModal
        buttonnTitle={"Edit"}
        reportsName={reportsName}
        setReportsName={setReportsName}
      />
    </div>
  );
};

export default ReportModals;
