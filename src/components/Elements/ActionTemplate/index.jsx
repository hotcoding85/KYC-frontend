import React, { useState } from "react";
import Action from "@/components/Elements/Action/Action";
import ConfirmationModal from "../ConfirmationModal";
import { useRouter } from "next/navigation";


const CompanyActions = ({ status, active, company_id, handleOption }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const router = useRouter();

  const openModal = (action) => {
    let content = {};
    switch (action) {
      case "Approve":
        content = {
          title: "Confirm Approval",
          description: `Are you sure you want to approve the registration for this company?`,
          confirmText: "Approve",
          confirmColor: "bg-primary",
          onConfirm: () => handleConfirm(action),
        };
        break;
      case "Reject":
        content = {
          title: "Confirm Rejection",
          description: `Are you sure you want to reject the registration for this company?`,
          confirmText: "Reject",
          confirmColor: "bg-alert",
          onConfirm: () => handleConfirm(action),
        };
        break;
      case "Reinstate":
        content = {
          title: "Confirm Reinstatement",
          description: `Are you sure you want to reinstate this company?`,
          confirmText: "Reinstate",
          confirmColor: "bg-primary",
          onConfirm: () => handleConfirm(action),
        };
        break;
      case "Delete":
        content = {
          title: "Confirm Deletion",
          description: `Are you sure you want to permanently delete this company?`,
          confirmText: "Delete",
          confirmColor: "bg-alert",
          onConfirm: () => handleConfirm(action),
        };
        break;
      case "Suspend":
        content = {
          title: "Confirm Suspension",
          description: `Are you sure you want to suspend this company?`,
          confirmText: "Suspend",
          confirmColor: "bg-alert",
          onConfirm: () => handleConfirm(action),
        };
        break;
      case "Request More Info":
        content = {
          title: "Request Additional Information",
          showForm: true,
          confirmText: "Send",
          confirmColor: "bg-primary",
          onConfirm: (formData) => handleConfirm(action, formData),
        };
        break;
      default:
        break;
    }
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleConfirm = (action, formData) => {
    handleOption(action, company_id, formData);
    setIsModalOpen(false);
  };

  const handleViewDetails = () => {
    router.push(`/dashboard/company/${company_id}`);
  };

  return (
    <div className="text-xs font-normal">
      <Action>

        {/* For Pending status */}
        {(!status && !active) && (
            <>
              <li
                  onClick={() => openModal("Approve")}
                  className="px-4 py-2 text-xs font-normal text-success cursor-pointer hover:bg-gray-50"
              >
                Approve
              </li>
              <li
                  onClick={handleViewDetails}
                  className="px-4 py-2 text-xs font-normal cursor-pointer text-textBlack hover:bg-gray-50"
              >
                View Details
              </li>
              <li
                  onClick={() => openModal("Request More Info")}
                  className="px-4 py-2 text-xs font-normal cursor-pointer text-textBlack hover:bg-gray-50"
              >
                Request More Info
              </li>
              <li
                  onClick={() => openModal("Reject")}
                  className="px-4 py-2 text-xs font-normal text-red-600 cursor-pointer hover:bg-gray-50"
              >
                Reject
              </li>
            </>
        )}

        {/* For Suspended status */}
        {(!active) && (
            <>
              <li
                  onClick={() => openModal("Reinstate")}
                  className="px-4 py-2 text-xs font-normal text-textBlack cursor-pointer hover:bg-gray-50"
              >
                Reinstate
              </li>
              <li
                  onClick={handleViewDetails}
                  className="px-4 py-2 text-xs font-normal cursor-pointer text-textBlack hover:bg-gray-50"
              >
                View Details
              </li>
              <li
                  onClick={() => openModal("Request More Info")}
                  className="px-4 py-2 text-xs font-normal cursor-pointer text-textBlack hover:bg-gray-50"
              >
                Request More Info
              </li>
              <li
                  onClick={() => openModal("Delete")}
                  className="px-4 py-2 text-xs font-normal text-red-600 cursor-pointer hover:bg-gray-50"
              >
                Delete
              </li>
            </>
        )}

        {/* For Active status */}
        {(active && status) && (
            <>
              <li
                  onClick={handleViewDetails}
                  className="px-4 py-2 text-xs font-normal cursor-pointer text-textBlack hover:bg-gray-50"
              >
              View Details
            </li>
            {/*<li*/}
            {/*  onClick={() => handleOption("Edit", company_id)}*/}
            {/*  className="px-4 py-2 cursor-pointer text-textBlack hover:bg-gray-50"*/}
            {/*>*/}
            {/*  Edit*/}
            {/*</li>*/}
            {/*<li*/}
            {/*  onClick={() => handleOption("Send Message", company_id)}*/}
            {/*  className="px-4 py-2 cursor-pointer text-textBlack hover:bg-gray-50"*/}
            {/*>*/}
            {/*  Send Message*/}
            {/*</li>*/}
            <li
              onClick={() => openModal("Suspend")}
              className="px-4 py-2 text-xs font-normal text-red-600 cursor-pointer hover:bg-gray-50"
            >
              Suspend
            </li>
          </>
        )}
      </Action>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent.title}
        description={modalContent.description}
        confirmText={modalContent.confirmText}
        confirmColor={modalContent.confirmColor}
        onConfirm={modalContent.onConfirm}
        showForm={modalContent.showForm}
      />
    </div>
  );
};

export default CompanyActions;
