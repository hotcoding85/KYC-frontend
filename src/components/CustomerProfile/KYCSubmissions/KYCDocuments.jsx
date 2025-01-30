import Tickgreen from "@/Icons/Tickgreen";
import React from "react";
import Image from "next/image";
import DocumentSectionHeader from "./DocumentSectionHeader";
import DocumentAccordion from "@/components/CustomerProfile/KYCSubmissions/documentAccordion";
import Cnic from "@/Icons/Cnic";

const KYCDocuments = () => {
  return (
    <div className="flex flex-col gap-3">
      <DocumentAccordion title="1. Passport" progress="90">
        <IDCardBody />
      </DocumentAccordion>

      <DocumentAccordion title="2. Utility Bill" progress="90">
        <IDCardBody />
      </DocumentAccordion>

      <DocumentAccordion title="3. Selfie" progress="90">
        <IDCardBody />
      </DocumentAccordion>

      <DocumentAccordion title="4. Bank Statement" progress="90">
        <IDCardBody />
      </DocumentAccordion>
    </div>
  );
};

export default KYCDocuments;

const IDCardBody = () => {
  return (
    <div className='flex flex-col gap-3 mt-5'>
      <div className='flex items-center gap-3'>
        <h3 className='font-inter font-semibold text-xs leading-4 text-textBlack'>Front</h3>
        <Tickgreen className="w-6 h-6" />
      </div>
      <Cnic className="w=[291px] h-[198px] self-start" />
    </div>
  );
};
