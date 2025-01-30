import HelpSettingsIcon from "@/Icons/HelpSettingsIcon";
import Setting from "@/Icons/Setting";
import Image from "next/image";

const HelpSection = () => {
  return (
    <div className="flex items-center justify-center mx-auto">
      <div className="md:w-[70%] w-full p-4 mt-3 bg-white shadow-lg rounded-2xl">
        <h2 className="mb-2 text-sm font-semibold">Get help</h2>
        <div className="flex gap-1 h-10">
          <div className="flex w-[33px] h-[33px] items-center justify-center border border-primary50 !rounded-full p-1 mr-1">
            <HelpSettingsIcon className=" w-[25px] h-[11px]" />
          </div>
          <div className="flex flex-col">
            <p className="my-auto text-sm font-semibold">
              Check Service Status
            </p>
            <p className="text-xs font-normal">
              Get updates on issues & maintenance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;
