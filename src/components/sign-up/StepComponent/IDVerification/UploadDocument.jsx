import React from "react";
import Image from "next/image";
import Camera from "@/Icons/Camera";

export const UploadDocument = () => {
  return (
    <div className="flex items-center justify-center w-full py-10 sm:mb-6 border-[1px] border-primary50 border-dashed rounded-lg">
      <div className="text-center">
        <div className="flex justify-center">
       
          <Camera className="w-6 h-6" />
        </div>
        <p className="mt-3 font-semibold text-xs text-textSecondary">
          Drag & Drop your ID here or Browse Files
        </p>
        <p className="mt-1 text-xs text-textSecondary">
          You may upload PDF, PNG, or JPEG files
        </p>
      </div>
    </div>
  );
};
