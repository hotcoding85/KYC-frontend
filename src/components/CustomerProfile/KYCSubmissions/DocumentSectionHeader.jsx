import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Image from "next/image";
import DocumentSection from "./DocumentSection";
import InfoSection from "@/components/Elements/InfoSection";
import Tickgreen from "@/Icons/Tickgreen";
import Chevdown from "@/Icons/Chevdown";

const DocumentSectionHeader = ({
  title,
  providedInfo,
  extractedInfo,
  documentImageSrc,
}) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div
        className={`border border-primary50 w-full bg-white p-4 rounded-2xl transition-all duration-300 ease-in-out h-auto`}
      >
        <div
          className="flex items-center justify-between gap-3 cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          <h3 className="font-inter text-14px font-semibold leading-5 text-left text-textBlack tracking-negative">
            {title}
          </h3>

          <div className="flex items-center justify-end md:justify-start gap-2">
            <Tickgreen className=" h-[25px] w-[25px]" />
            <Chevdown
              className={` w-5 h-10 transition-transform duration-300 ${
                isOpen ? "rotate-0" : "rotate-180"
              }`}
            />
          </div>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-full opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-3 mt-4 w-full">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
              {/* Provided Info */}
              <InfoSection
                title="Personal Information (Provided)"
                fields={providedInfo}
              />
              {/* Extracted Info */}
              <InfoSection
                title="Personal Information (Extracted)"
                fields={extractedInfo}
              />
              {/* Document Section */}
              <DocumentSection
                title="Identification Documents"
                imageSrc={documentImageSrc}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentSectionHeader;
