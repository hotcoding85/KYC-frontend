import React from "react";
import Image from "next/image";
import { AuthButton } from "@/components/Elements/Button/Button";

const IDDocumentReview = ({ documentSrc, status, message, onNext }) => {
  return (
    <div className="w-full">
      <h2 className="mb-2 text-base font-semibold">Submit Front side</h2>
      <p className="mb-4 text-xs text-gray-500">
        Ensure the front side of your ID is clear and visible before submitting.
      </p>
      <div className="flex justify-center sm:mb-4">
        {/* <Image src={documentSrc} alt="ID Document" width={400} height={250} /> */}
        {documentSrc}
      </div>
      {/* <div
        className={`flex items-center justify-center w-full py-2 border rounded-lg ${
          status === "success" ? "border-green-500" : "border-red-500"
        }`}
      >
        <span
          className={`mr-2 ${
            status === "success" ? "text-success" : "text-alert"
          }`}
        >
          {status === "success" ? "✓" : "✗"}
        </span>
        <p className="text-sm">{message}</p>
      </div> */}
    </div>
  );
};

export default IDDocumentReview;
