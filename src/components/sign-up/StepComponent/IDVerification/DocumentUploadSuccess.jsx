import React from "react";
import Image from "next/image";

const DocumentUploadSuccess = () => {
  return (
    <div className="w-full mt-6 text-center">
      <div className="flex justify-center sm:mb-6">
        <Image
          src="/assets/icons/doneImg.svg"
          alt="Success Icon"
          width={500}
          height={220}
        />
      </div>
    </div>
  );
};

export default DocumentUploadSuccess;
