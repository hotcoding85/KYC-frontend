import React, { useState } from "react";
import { TextButton } from "@/components/Elements/Button/Button";
import TimerModal from "./TimerModal";
import CalendarIcon from "@/Icons/Calendar";

export default function StatementTab({ triggerToast }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleGenerateClick = () => {
    openModal();
    triggerToast(); // Show the toast in the parent component
  };

  return (
    <>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-normal leading-4 text-left text-textBlack pb-1">
            Starting On
          </label>
          <div className="relative w-full sm:w-[468px]">
            <input
              // type="date"
              className="px-4 pl-8 w-full h-[32px] block rounded-[10px] border border-gray-200 text-textSecondary font-inter text-xs font-normal leading-[16px] text-left"
              defaultValue="Jan 09 -2024"
            />
            <CalendarIcon className="absolute top-[50%] left-3 transform -translate-y-1/2 w-[16px] h-[16px]" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-normal leading-4 text-left text-textBlack pb-1">
            Ending On
          </label>
          <div className="relative w-full sm:w-[468px]">
            <input
              // type="date"
              className="px-4 pl-8 w-full h-[32px] block rounded-[10px] border border-gray-200 text-textSecondary font-inter text-xs font-normal leading-[16px] text-left"
              defaultValue="Jan 09 -2024"
            />
            <CalendarIcon className="absolute top-[50%] left-3 transform -translate-y-1/2 w-[16px] h-[16px]" />
          </div>
        </div>

        <div>
          <label className="text-xs font-normal leading-[16px] text-left text-textBlack font-inter  ">
            Transaction information is available here while your account is
            open. If you need a copy after your account is closed, you need to
            download it first.
          </label>
        </div>

        <TextButton
          title="Generate"
          width="w-full"
          onClick={handleGenerateClick}
          className="bg-primary h-[32px] px-4 py-4 rounded-lg text-white"
        />
      </div>
      <TimerModal isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
}
