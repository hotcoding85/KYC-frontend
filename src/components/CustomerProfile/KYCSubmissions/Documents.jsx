import React from "react";
import DocumentSectionHeader from "./DocumentSectionHeader";
import Cnic from "@/Icons/Cnic";

const Documents = () => {
  const providedInfo = [
    { label: "First Name", value: "XXXXXX" },
    { label: "Middle Name", value: "XXXXXX" },
    { label: "Last Name", value: "XXXXXX" },
    { label: "Legal Name", value: "XXXXXX" },
    { label: "Date of Birth", value: "XXXXXX" },
    { label: "Gender", value: "XXXXXX" },
    { label: "Country", value: "XXXXXX" },
    { label: "Country of Birth", value: "XXXXXX" },
    { label: "State of Birth", value: "XXXXXX" },
    { label: "Nationality", value: "XXXXXX" },
    { label: "Phone", value: "XXXXXX" },
    { label: "Place of Birth", value: "XXXXXX" },
  ];

  const extractedInfo = [
    { label: "First Name", value: "XXXXXX" },
    { label: "Middle Name", value: "XXXXXX" },
    { label: "Last Name", value: "XXXXXX" },
    { label: "Legal Name", value: "XXXXXX" },
    { label: "Date of Birth", value: "XXXXXX" },
    { label: "Gender", value: "XXXXXX" },
    { label: "Country", value: "XXXXXX" },
    { label: "Country of Birth", value: "XXXXXX" },
    { label: "State of Birth", value: "XXXXXX" },
    { label: "Nationality", value: "XXXXXX" },
    { label: "Phone", value: "XXXXXX" },
    { label: "Place of Birth", value: "XXXXXX" },
  ];

  const documentImageSrc = <Cnic className="w-full h-full" />;

  return (
    <div className="space-y-4">
      {/* First section with data */}
      <DocumentSectionHeader
        title="1. Personal Information"
        providedInfo={providedInfo}
        extractedInfo={extractedInfo}
        documentImageSrc={documentImageSrc}
      />

      {/* Second and third sections without data */}
      <DocumentSectionHeader title="2. Government Issued Information" />
      <DocumentSectionHeader title="3. Proof of Address" />
    </div>
  );
};

export default Documents;
