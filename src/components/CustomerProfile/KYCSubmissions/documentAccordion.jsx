import React, { useState } from "react";
import Image from "next/image";
import Chevdown from "@/Icons/Chevdown";
import Tickgreen from "@/Icons/Tickgreen";

const DocumentAccordion = ({ title, progress, children }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div
      className={`border border-primary50 w-full bg-white p-4 rounded-2xl transition-all duration-300 ease-in-out h-auto`}
    >
      <div
        className="flex items-center justify-between gap-3 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <h3 className='font-inter font-semibold text-sm leading-5 tracking-tightest text-textBlack'>{title}</h3>

        <div className='flex items-center justify-end sm:justify-start gap-2'>
          <p className='font-normal text-xs text-textBlack hidden sm:block'>
            Progress ({progress}%)
          </p>
          <Tickgreen className=" h-[25px] w-[25px]" />
          <Chevdown
            className={` w-5 h-10 transition-transform duration-300 ${
              isOpen ? "rotate-0" : "rotate-180"
            }`}
          />
        </div>
      </div>
      {isOpen && <>{children}</>}
    </div>
  );
};

export default DocumentAccordion;
