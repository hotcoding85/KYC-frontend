import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { TextButton } from "@/components/Elements/Button/Button";
import S3Image from "@/components/Elements/S3Image/S3Image";
import QRCode from "@/components/Elements/QRCode/QRCode";
import Share from '@/Icons/Share';
import CopySolid from "@/Icons/CopySolid";
import { Toast } from "primereact/toast";
import { FaExclamationCircle } from 'react-icons/fa';
import useApi from "@/hooks/useApi";

const ReceiveBody = ({data, onCloseModal}) => {
  const { fetchData, loading, error } = useApi();
  const [assetData, setAssetData] = useState(data);

  useEffect(() => {
    async function listAccounts() {
      const { result, error } = await fetchData(
        `/account/all/${data?.id}`,
        {
          method: "POST",
        }
      );
      if (error) {
        setAssetData([]);
      } else {
        setAssetData(result);
      }
    }

    if (data?.id) {
      listAccounts();
    }

  }, [data]);


  const toast = useRef(null);

  return (
    <>
      <div className="w-full h-full p-4">
        {/**@warning*/}
        <div className="flex items-center gap-2 border border-primary50 px-4 py-2 rounded-2xl">
          <FaExclamationCircle className="fill-yellow-600"></FaExclamationCircle>
          <p className="font-normal text-xs text-textSecondary">
            Only send {assetData?.asset}{" "}
            {data?.network ? `(${assetData?.network?.name})` : ``} to this
            address or else you will lose your funds.
          </p>
        </div>

        <div className="mx-auto">
          <div className="flex flex-col items-center justify-center gap-2 my-3">
            <p className="font-normal text-xs text-textSecondary flex items-center gap-1">
              {data?.network ? (
                <span className="bg-grey px-1 py-0.5 rounded">
                  {assetData?.network?.name}
                </span>
              ) : (
                <span className="bg-grey px-1 py-0.5 rounded">Base</span>
              )}
            </p>
            <div className="flex items-center gap-1">
              <div className="flex relative">
                <S3Image
                  className="w-[30px] h-[30px] rounded-full"
                  s3Url={assetData?.icon}
                />
                {assetData?.network && (
                  <S3Image
                    className="w-[15px] h-[15px] rounded-full bottom-0 right-0 absolute"
                    s3Url={assetData?.network_icon}
                  />
                )}
              </div>
              <p className="font-semibold text-lg text-textBlack">
                {assetData?.asset}
              </p>
            </div>

            <div className="border-1 border-primary50 p-3 rounded-xl">
              <QRCode
                data={assetData?.address}
                className="w-[300px] h-[300px]"
                alt="qr"
              ></QRCode>
            </div>
            <p className="font-semibold text-sm text-textBlack break-words text-center mt-3">
              {assetData?.address}
            </p>

            <div className="flex flex-row items-center justify-between gap-4">
              <TextButton
                title="Copy"
                textColor="text-textBlack"
                icon={<CopySolid width={24} height={24}></CopySolid>}
                backgroundColor="bg-grey"
                className="rounded-xl h-10 flex items-center gap-2"
                onClick={() => {
                  navigator.clipboard.writeText(assetData?.address);
                  toast.current.show({
                    severity: "success",
                    summary: "Copied",
                    detail: "Address copied to clipboard",
                    life: 3000,
                  });
                }}
              />
              <TextButton
                title="Share"
                textColor="text-textBlack"
                icon={<Share width={24} height={24}></Share>}
                backgroundColor="bg-grey"
                className="rounded-xl h-10 flex items-center justify-center gap-2"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-bl-2xl rounded-br-2xl border-t border-t-primary-50 p-3 flex items-center justify-end gap-4">
        <TextButton
          title="Cancel"
          textColor="text-primary"
          backgroundColor="bg-white"
          borderColor="border border-primary50"
          className="rounded-xl h-10"
          onClick={onCloseModal}
        />
        <TextButton
          title={"Continue"}
          textColor="text-white"
          backgroundColor="bg-primary"
          className="rounded-xl h-10"
          onClick={() => {
            onCloseModal();
          }}
        />
      </div>
      <Toast ref={toast} />
    </>
  );
};

export default ReceiveBody;