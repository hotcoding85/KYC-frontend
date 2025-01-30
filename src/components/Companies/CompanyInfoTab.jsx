"use client";
import React, { useEffect, useState, useRef } from "react";
import Copy from "@/Icons/Copy";
import CompanyStatusTemplate from "@/app/dashboard/company/company_components/status_template";
import { formatDate } from "@/utils/helper";
import NotesModal from "@/components/Companies/NotesModal";
import useApi from "@/hooks/useApi";
import { useParams } from "next/navigation";
import { Toast } from "primereact/toast";

export default function CompanyInfoTab({ companyData }) {
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const openModal = () => setIsNotesModalOpen(true);
  const closeModal = () => setIsNotesModalOpen(false);
  const params = useParams();
  const company_id = params.id;
  const toast = useRef(null);

  const { fetchData, loading, error } = useApi();
  const fullAddress = `${companyData?.address_line_one}, ${companyData?.city}, ${companyData?.state} ${companyData?.postal_code}`;
  async function getNote() {
    const { result, error } = await fetchData(`/private-notes/${company_id}`, {
      method: "GET",
    });
    if (error) {
      setNotes("");
    } else {
      console.log("companyData", result);
      setNotes(result?.content);
    }
  }

  async function updateNote() {
    const { result, error } = await fetchData(
      `/private-notes/company/${company_id}`,
      {
        method: "PATCH",
        body: {
          content: notes,
        },
      }
    );
    if (error) {
      setNotes({});
    } else {
      console.log("companyData");
      setNotes(result.content);
    }
  }

  useEffect(() => {
    getNote();
  }, []);

  const handleAddNote = async () => {
    await updateNote();
    setIsNotesModalOpen(false);
  };

  const copyToClipboard = (text, type) => {
    console.log('copy')
    navigator.clipboard.writeText(text).then(() => {
      toast.current.show({
        severity: "success",
        summary: "Copied to clipboard",
        detail: type + " copied to clipboard successfully!",
        life: 3000,
      });
    }).catch((err) => {
      console.error("Failed to copy: ", err);
    });
  };

  return (
    <>
      <div className="flex flex-wrap justify-between gap-2 lg:flex-nowrap">
        {/* Left Section */}
        <div className="w-full space-y-2 lg:w-2/3">
          <div className="p-4 bg-white shadow-sm rounded-2xl">
            <h2 className="mb-2 text-sm font-semibold leading-5 tracking-tight text-left text-textBlack">Basic Information</h2>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* Column 1 */}
              <div className="space-y-2">
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-500 leading-4 text-left mb-2">
                    Company Name
                  </p>
                  <p className="text-xs font-semibold leading-4 text-left mb-2 text-textBlack">
                    {companyData.business_name || companyData.name || "-"}
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-500 leading-4 text-left mb-2">Industry</p>
                  <p className="text-xs font-semibold leading-4 text-left mb-2 text-textBlack">
                    {companyData.name || "-"}
                  </p>
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-2">
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-500 leading-4 text-left mb-2">
                    Registration Number
                  </p>
                  <p className="text-xs font-semibold leading-4 text-left mb-2 text-textBlack">
                    {companyData.company_id || "-"}
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-500 leading-4 text-left mb-2">
                    Date Registered
                  </p>
                  <p className="text-xs font-semibold leading-4 text-left mb-2 text-textBlack">
                    {formatDate(companyData?.created_at)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white shadow-sm rounded-2xl">
            <h2 className="mb-2 text-sm font-semibold leading-5 tracking-tight text-left">Contact Information</h2>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* Column 1 */}
              <div className="space-y-2">
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-500 leading-4 text-left mb-2">
                    Email Address
                  </p>
                  <p className="flex items-center text-xs font-semibold leading-4 text-left mb-2 text-blue-600">
                    {companyData.business_email || "-"}
                    <button onClick={() => copyToClipboard(companyData.business_email || "-", 'Business Email')} className="ml-2">
                      <Copy />
                    </button>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-500 leading-4 text-left mb-2">
                    Website URL
                  </p>
                  <p className="flex items-center text-xs font-semibold leading-4 text-left mb-2 text-blue-600">
                    {companyData.business_website || "-"}
                    <button onClick={() => copyToClipboard(companyData.business_website || "-", 'Business Website')} className="ml-2">
                      <Copy />
                    </button>
                  </p>
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-2">
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-500 leading-4 text-left mb-2">
                    Phone Number
                  </p>
                  <p className="flex items-center text-xs font-semibold leading-4 text-left mb-2 text-blue-600">
                    {companyData.phone_number || "-"}
                    <button onClick={() => copyToClipboard(companyData.phone_number || "-", 'Phone Number')} className="ml-2">
                      <Copy />
                    </button>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-500 leading-4 text-left mb-2">Address</p>
                  <p className="text-xs font-semibold leading-4 text-left mb-2 text-textBlack">
                  {fullAddress || '-'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col w-full space-y-2 lg:w-1/3">
          {/* Status Card */}
          <div className="p-4 bg-white shadow-sm rounded-2xl">
            <p className="text-sm font-semibold leading-5 tracking-tight text-left text-textBlack">Company Status</p>
            <div className="flex items-center mt-[10px] justify-between">
              <p className="text-textBlack text-xs font-medium text-left leading-4">Status</p>
              <CompanyStatusTemplate
                status={companyData.status}
                active={companyData.active }
              />
            </div>
          </div>

          {/* User Role Card */}
          <div className="p-4 bg-white shadow-sm rounded-2xl">
            <div className="flex flex-row items-center justify-between w-full">
              <p className="text-sm font-semibold leading-5 tracking-tight text-left text-textBlack">Additional Information</p>
              <button className="mt-2 text-xs font-medium text-blue-600">
                + Add Info
              </button>
            </div>

            <div className="flex items-center mt-[10px] justify-between">
              <p className="text-textBlack text-xs font-normal leading-4 text-left">
                Tech Innovations Inc is a leading provider of innovative
                solutions in the fintech industry, dedicated to enhancing
                financial services with cutting-edge technology.
              </p>
            </div>
          </div>

          {/* Private Note Card */}
          <div className="p-4 bg-white shadow-sm rounded-2xl">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold leading-5 tracking-tight text-left text-textBlack">Private note</p>
              <button
                className="mt-2 text-xs font-medium text-blue-600 text-left"
                onClick={openModal}
              >
                + Add Note
              </button>
            </div>
            <p className=" mt-[10px] text-textBlack text-xs font-normal leading-4 text-left">
              Only visible to you
            </p>
            {notes?.length > 0 && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg flex justify-between items-center">
              <p className=" mt-[10px] italic text-textBlack text-xs font-normal leading-4 text-lefts">{notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <NotesModal
        note={notes}
        setNote={setNotes}
        isOpen={isNotesModalOpen}
        onClose={closeModal}
        handleAddNote={handleAddNote}
      />
      <Toast ref={toast} baseZIndex={9999} />
    </>
  );
}
