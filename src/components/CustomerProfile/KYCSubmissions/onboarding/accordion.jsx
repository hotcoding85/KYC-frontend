import React, { useState } from "react";
import Image from "next/image";
import Tickgreen from "@/Icons/Tickgreen";
import Chevdown from "@/Icons/Chevdown";

const OnboardingAccordion = ({ title, progress, data, subTitle }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div
      className={`border border-primary50 w-full bg-white p-4 rounded-2xl transition-all duration-300 ease-in-out h-auto`}
    >
      <div
        className="flex items-center justify-between gap-3 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <h3 className='font-inter text-sm font-semibold leading-5 text-left text-textBlack tracking-negative p-1'>{title}</h3>

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
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-full opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className='flex flex-col gap-3 mt-4 w-full md:w-[316px]'>
          <p className=' text-xs font-semibold leading-4 text-left text-textBlack'>
            {subTitle}
          </p>
          {data?.map((each, idx) => (
            <div key={idx} className='flex items-center justify-between gap-3'>
              <p className='font-medium text-xs text-textSecondary'>{each.label}</p>
              <p className='font-inter text-xs font-semibold text-textBlack leading-4 text-left'>{each.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnboardingAccordion;
