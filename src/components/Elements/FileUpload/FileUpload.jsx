import React, { useEffect, useState } from "react";
import Image from 'next/image'
import Upload from "@/Icons/Upload";
import S3Image from "@/components/Elements/S3Image/S3Image";

const FileUpload = ({ title, onChange, selectedFileUrl, isAssetPage, children }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImg, setSelectedImg] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedImg(URL.createObjectURL(file))

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        if (onChange) {
          onChange(base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImg = () => {
    setSelectedFile(null)
    setSelectedImg('')
  }

  useEffect(() => {
    if (selectedFileUrl) {
      setSelectedImg(selectedFileUrl)
      onChange(selectedFileUrl)
    }
  }, [selectedFileUrl])

  return (
    <div
      className={`flex items-center justify-center ${
        isAssetPage && "relative"
      }`}
    >
      <span
        onClick={handleRemoveImg}
        className={`absolute top-2 right-2 cursor-pointer ${
          !selectedFile && !selectedImg && "hidden"
        }`}
      >
        <span className="text-xs bg-gray-700 text-white rounded-full py-1 px-2 w-32 h-32">
          clear
        </span>
      </span>
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-full border py-2 border-dashed border-primary50 rounded-lg cursor-pointer hover:bg-gray-100"
      >
        <div className="flex flex-col items-center justify-center w-full">
          {isAssetPage && (
            <>
              {selectedImg &&
              selectedImg.includes("watpay.s3.eu-north-1.amazonaws.com") ? (
                <S3Image className="w-32 h-32" s3Url={selectedImg} />
              ) : selectedImg ? (
                <img
                  src={selectedImg}
                  alt="image"
                  width={0}
                  height={0}
                  className="w-32 h-32"
                />
              ) : (
                <p className=" text-sm flex flex-row items-center gap-2">
                  {children || (
                    <>
                      <Upload /> <span className="text-textBlack">{title || "Click here to upload"}</span>
                    </>
                  )}
                </p>
              )}
            </>
          )}
          {!isAssetPage && (
            <>
              {!selectedFile && !selectedImg ? (
                <p className=" text-sm flex flex-row items-center gap-2">
                  {children || (
                    <>
                      <Upload /> <span className="text-textBlack">{title || "Click here to upload"}</span>
                    </>
                  )}
                </p>
              ) : (
                <p className="truncate line-clamp-1 w-10/12 text-center text-textBlack">
                  {selectedFile?.name}
                </p>
              )}
            </>
          )}
        </div>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default FileUpload;
