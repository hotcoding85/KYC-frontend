import React from "react";
import Image from "next/image";
import Binred from "@/Icons/Binred";
import Tickcircle from "@/Icons/Tickcircle";
import Solaruploadlinear from "@/Icons/Solaruploadlinear";
import Documenttextred from "@/Icons/Documenttextred";
import Documenttext from "@/Icons/Documenttext";

const Documents = () => {
  return (
    <div className="flex justify-center max-h-[60vh] overflow-y-auto mt-4">
      <div className="flex flex-col items-start w-[500px] gap-4">
        <h2 className="font-semibold text-base text-textBlack">Documents</h2>

        <UploadFileCard
          title="Application Form*"
          subtitle="You may upload PDF, PNG or JPEG files"
        />

        <UploadFileCard
          title="Certificate of Incorporation/Formation*"
          subtitle="You may upload PDF, PNG or JPEG files"
          status="uploading"
        />

        <UploadFileCard
          title="Certificate of Incorporation/Formation*"
          subtitle="You may upload PDF, PNG or JPEG files"
          status="uploaded"
        />

        <UploadFileCard
          title="Certificate of Incorporation/Formation*"
          subtitle="You may upload PDF, PNG or JPEG files"
          status="failed"
        />
      </div>
    </div>
  );
};

export default Documents;

const UploadFileCard = ({ title, subtitle, status }) => {
  return (
    <div className="flex flex-col w-full gap-2 border-[1px] border-primary50 rounded-2xl p-4">
      <div className="flex items-start justify-between gap-3 w-full">
        <div className="flex items-start justify-start gap-3 w-full">
          {status === "failed" ? (
            <Documenttextred className="h-5 w-5 mt-1" />
          ) : (
            <Documenttext className="h-5 w-5 mt-1" />
          )}
          <div className="flex flex-col gap-0.5">
            <p
              className={`font-medium text-xs ${
                status === "failed" ? "text-alert" : "text-textBlack"
              }`}
            >
              {status === "failed" ? "Upload failed, please try again" : title}
            </p>
            <p
              className={`font-normal text-xs ${
                status === "failed" ? "text-alert" : "text-textLight"
              }`}
            >
              {status === "failed"
                ? title
                : status === "uploaded"
                ? "200 KB"
                : subtitle}
            </p>
            {status !== "uploading" &&
              status !== "uploaded" &&
              status !== "failed" && (
                <p className="font-semibold text-xs text-textBlack">
                  Click or drag to upload
                </p>
              )}
            {status === "failed" && (
              <p className={`font-semibold text-xs text-alert`}>Try again</p>
            )}
          </div>
        </div>

        {status === "failed" ? (
          <Binred className="w-5 h-5" />
        ) : status === "uploaded" ? (
          <Tickcircle className="w-5 h-5" />
        ) : (
          <Solaruploadlinear className="w-5 h-5" />
        )}
      </div>
      {status === "uploading" ? (
        <div className="flex items-center gap-3">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-black h-full w-[40%] rounded-full"></div>
          </div>
          <p className="font-normal font-xs text-primary">40%</p>
        </div>
      ) : status === "uploaded" ? (
        <div className="flex items-center gap-3">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-successLight h-full w-full rounded-full"></div>
          </div>
          <p className="font-normal font-xs text-primary">100%</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
