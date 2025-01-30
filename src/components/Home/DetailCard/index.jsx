import React from "react";
import Image from "next/image";
import S3Image from "@/components/Elements/S3Image/S3Image";
import { FaArrowDown, FaArrowUp, FaExchangeAlt, FaTimes } from "react-icons/fa";
import { ASSET_TYPE } from "@/shared/enums";

const CryptoDetailCard = ({
  data,
  setDetailSideCard,
  handleOpenSendModal,
  onReceiveClick,
  onExchangeClick,
}) => {
  
  const groupedTransfers =
    data?.transactions?.reduce((acc, transfer) => {
      if (
        data.assetType == ASSET_TYPE.CRYPTOCURRENCY ||
        (data.assetType == ASSET_TYPE.TOKEN &&
          data?.network?.name == transfer?.blockchain)
      ) {
        if (!transfer.created_at) return acc; // Skip if `created_at` is missing

        const date = new Date(transfer.created_at).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });

        if (!acc[date]) {
          acc[date] = [];
        }

        acc[date].push(transfer);
      }

      return acc; 
    }, {}) || {}; 

  return (
    <div className="flex flex-col items-center justify-start border border-[#E4E4E8] bg-white w-full h-full rounded-2xl p-4 self-stretch">
      <div className="flex items-center justify-end w-full">
        <FaTimes
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={() => setDetailSideCard(false)}
        />
      </div>

      <div className="flex relative">
        <S3Image
          className="w-[40px] h-[40px] object-cover"
          s3Url={data?.icon}
        />
        {data?.network && (
          <S3Image
            className="w-[20px] h-[20px] rounded-full bottom-0 right-0 absolute"
            s3Url={data?.network_icon}
          />
        )}
      </div>

      <p className="font-semibold text-sm text-[#272727] mt-2 mb-6">
        {data?.asset} {data?.network && ` (${data?.network?.name})`}
      </p>

      <div className="flex items-center justify-around w-full">
        <div className="flex flex-col items-center justify-center gap-1">
          <button
            className="w-11 h-11 border border-[#E4E4E8] bg-[#F6F6F7] rounded-full flex items-center justify-center"
            onClick={handleOpenSendModal}
          >
            <FaArrowUp width={20} height={20} />
          </button>
          <p className="font-normal text-xs text-textBlack">Send</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-1">
          <button
            onClick={onReceiveClick}
            className="w-11 h-11 border border-[#E4E4E8] bg-[#F6F6F7] rounded-full flex items-center justify-center"
          >
            <FaArrowDown width={20} height={20} />
          </button>
          <p className="font-normal text-xs text-textBlack">Receive</p>
        </div>

        <div
          onClick={onExchangeClick}
          className="flex flex-col items-center justify-center gap-1"
        >
          <button className="w-11 h-11 border border-[#E4E4E8] bg-[#F6F6F7] rounded-full flex items-center justify-center">
            <FaExchangeAlt width={20} height={20} />
          </button>
          <p className="font-normal text-xs text-textBlack">Exchange</p>
        </div>
      </div>

      <div className="flex flex-col w-full gap-4 mt-6 max-w-[300px] overflow-scroll">
        {groupedTransfers && Object.keys(groupedTransfers).length > 0 ? (
          Object.keys(groupedTransfers).map((date) => (
            <div key={date}>
              <p className="text-xs text-textLight border-b border-b-primary50 pb-1">
                {date}
              </p>
              <div className="flex flex-col gap-4  mt-4">
                {groupedTransfers[date].map((each, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    {each?.type == "credit" ? (
                      <div className="p-1 object-cover bg-[#A8A8A866] bg-opacity-40 rounded-full">
                        <FaArrowDown width={20} height={20} />
                      </div>
                    ) : (
                      <div className="p-1 object-cover bg-[#A8A8A866] bg-opacity-40 rounded-full">
                        <FaArrowUp width={20} height={20} />
                      </div>
                    )}
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-xs text-textBlack">
                        {each?.type == "credit" ? "Received" : "Sent"}
                      </p>
                      <span className="font-normal text-xs text-textSecondary break-all">
                        {each?.type == "credit" ? (
                          <>From: {each?.from_address}</>
                        ) : (
                          <>To: {each?.to_address}</>
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div>
            <p className="text-xs text-textLight border-b border-b-primary50 pb-1">
              No transactions performed from/to this wallet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoDetailCard;
