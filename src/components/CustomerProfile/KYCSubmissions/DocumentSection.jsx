import React from "react";
import Image from "next/image";

const DocumentSection = ({ title, imageSrc }) => {
  return title && imageSrc ? (
    <div className="flex flex-col gap-3 md:pl-5">
      <h4 className="font-inter text-sm font-semibold leading-4 text-left">{title}</h4>
      <div className="relative w-full flex justify-center mx-auto ">
        {/* <Image
          src={imageSrc}
          alt="Identification Document"
          width={0}
          height={0}
          className="w-full h-full rounded-lg"
        /> */}
        {imageSrc}
      </div>
    </div>
  ) : null;
};

export default DocumentSection;
