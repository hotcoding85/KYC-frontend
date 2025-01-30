import Image from "next/image"
import React, { useState, useEffect } from "react"
import Modal from "@/components/Elements/Modal/Modal"
import { TextButton } from "@/components/Elements/Button/Button"
import Check from "@/Icons/Check"
import { FaTimes } from "react-icons/fa"
import Warning from "@/Icons/Warning"
import useApi from "@/hooks/useApi";
import S3Image from "@/components/Elements/S3Image/S3Image";
import Currency from "@/components/Elements/Currency/Currency";
import { FaExclamationCircle } from "react-icons/fa";
import { ASSET_TYPE } from "@/shared/enums";

const data = [
  {
    "label": "To",
    "value": "TuGVen5182nDKKDjdas5129333dfjnDKKDjdas5129333dfjn"
  },
  {
    "label": "Network",
    "value": "Ethereum"
  },
  {
    "label": "Network fee",
    "value": "1 USD"
  },
  {
    "label": "Transaction type",
    "value": "External"
  },
  {
    "label": "Estimated time",
    "value": "15 mins"
  },
  {
    "label": "Recipient will receive",
    "value": "120 USDT"
  },
]
const CryptoSendConfirmationModal = ({
  isModalOpen,
  onCloseModal,
  title,
  data,
}) => {
  const { fetchData, loading, error } = useApi();
  const [isDone, setDone] = useState(false);
  const [isError, setError] = useState(false);
  const [result, setResult] = useState();
  const [assetData, setAssetData] = useState(data);

  const [timer, setTimer] = useState(10);
  const [isTimerStopped, setTimerStopped] = useState(false);

  useEffect(() => {
    setAssetData(data);
    setDone(false);
    setError(false);
    setResult();
    setTimer(10);
    setTimerStopped(false);
  }, [data, isModalOpen]);

  useEffect(() => {
    if (isModalOpen && !isTimerStopped) {
      setTimer(10); // Reset timer on modal open
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            onCloseModal();
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(interval); // Cleanup on close or stop
    }
  }, [isModalOpen, isTimerStopped, onCloseModal, data]);

  const handleStopTimer = () => {
    setTimerStopped(true); // Stop the timer
  };

  const handleTransfer = async () => {
    handleStopTimer();
    if (assetData?.assetType == ASSET_TYPE.CRYPTOCURRENCY) {
      const { result, error } = await fetchData(
        `/transaction/send/external_native`,
        {
          method: "POST",
          body: {
            blockchain: { name: assetData?.asset },
            to: assetData?.recipient,
            from: assetData?.address,
            amount: assetData?.amount,
            chain_fee: assetData?.chainFee,
          },
        }
      );
      if (error) {
        setError(true);
      } else {
        setDone(true);
        setError(false);
        setResult(result);
      }
    } else if (assetData?.assetType == ASSET_TYPE.TOKEN) {
      const { result, error } = await fetchData(
        `/transaction/send/external_token`,
        {
          method: "POST",
          body: {
            token: {
              blockchain: { name: assetData?.network?.name },
              name: assetData?.asset,
            },
            to: assetData?.recipient,
            from: assetData?.address,
            amount: assetData?.amount,
            chain_fee: assetData?.chainFee,
          },
        }
      );
      if (error) {
        setError(true);
      } else {
        setDone(true);
        setError(false);
        setResult(result);
      }
    }
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        title={title}
        customWidth="max-w-[96%] md:max-w-3xl"
      >
        <>
          <div className="w-full h-full p-4">
            <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border border-primary50">
              <p className="font-normal text-xs text-textSecondary">
                You’re sending
              </p>
              <div className="flex relative">
                <S3Image
                  className="w-[40px] h-[40px] rounded-full"
                  s3Url={assetData?.icon}
                />
                {assetData?.network && (
                  <S3Image
                    className="w-[15px] h-[15px] rounded-full bottom-0 right-0 absolute"
                    s3Url={assetData?.network_icon}
                  />
                )}
              </div>
              <p className="font-semibold text-base text-textBlack">
                {assetData?.amount} {assetData?.asset}
              </p>
              <p className="font-semibold text-xs text-[#BABABA]">
                ≈{" "}
                <Currency>
                  {parseFloat(assetData?.totalFeeUSD || 0).toFixed(2)}
                </Currency>{" "}
              </p>
              {isDone && (
                <p className="flex items-center gap-1 font-normal text-sm text-success">
                  <Check></Check>
                  Successful
                </p>
              )}
              {isError && (
                <p className="flex items-center gap-1 font-normal text-sm text-red-600">
                  <FaTimes></FaTimes>
                  Failed
                </p>
              )}
            </div>

            {/**@info*/}
            <div className="flex flex-col gap-2 w-full border border-primary50 p-4 rounded-2xl my-6">
              <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-1 sm:gap-3">
                <p className="w-full sm:w-1/3 text-xs font-semibold text-textBlack">
                  To
                </p>
                <p className="flex flex-col font-semibold text-xs text-textBlack text-start sm:text-end w-full sm:w-2/3 break-all">
                  <span className="font-semibold text-sm text-[#BABABA] mt-1">
                    {assetData?.recipient}
                  </span>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-1 sm:gap-3">
                <p className="w-full sm:w-1/3 text-xs font-semibold text-textBlack">
                  Network
                </p>
                <p className="flex flex-row font-semibold text-xs text-textBlack text-end sm:text-end w-full sm:w-2/3 break-all items-center justify-end">
                  {assetData?.network ? (
                    <S3Image
                      className="w-[15px] h-[15px] rounded-full"
                      s3Url={assetData?.network_icon}
                    />
                  ) : (
                    <S3Image
                      className="w-[15px] h-[15px] rounded-full"
                      s3Url={assetData?.icon}
                    />
                  )}{" "}
                  <span className="font-semibold text-sm text-[#BABABA] mt-1">
                    {assetData?.network
                      ? assetData?.network?.name
                      : assetData?.asset}
                  </span>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-1 sm:gap-3">
                <p className="w-full sm:w-1/3 text-xs font-semibold text-textBlack">
                  Network Fee
                </p>
                <p className="flex flex-col font-semibold text-xs text-textBlack text-start sm:text-end w-full sm:w-2/3 break-all">
                  <span className="font-semibold text-sm text-[#BABABA] mt-1">
                    {parseFloat(assetData?.networkFee).toFixed(10)}{" "}
                    {assetData?.assetType == ASSET_TYPE.CRYPTOCURRENCY
                      ? assetData?.asset
                      : assetData?.network?.name}{" "}
                    (
                    <Currency>
                      {parseFloat(assetData?.networkFeeUSD || 0).toFixed(2)}
                    </Currency>
                    )
                  </span>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-1 sm:gap-3">
                <p className="w-full sm:w-1/3 text-xs font-semibold text-textBlack">
                  Transaction Type
                </p>
                <p className="flex flex-col font-semibold text-xs text-textBlack text-start sm:text-end w-full sm:w-2/3 break-all">
                  <span className="font-semibold text-sm text-[#BABABA] mt-1">
                    External
                  </span>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-1 sm:gap-3">
                <p className="w-full sm:w-1/3 text-xs font-semibold text-textBlack">
                  Estimated Time
                </p>
                <p className="flex flex-col font-semibold text-xs text-textBlack text-start sm:text-end w-full sm:w-2/3 break-all">
                  <span className="font-semibold text-sm text-[#BABABA] mt-1">
                    10 Mins
                  </span>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-1 sm:gap-3">
                <p className="w-full sm:w-1/3 text-xs font-semibold text-textBlack">
                  Recipient will receive
                </p>
                <p className="flex flex-col font-semibold text-xs text-textBlack text-start sm:text-end w-full sm:w-2/3 break-all">
                  <span className="font-semibold text-sm text-[#BABABA] mt-1">
                    {assetData?.amount} {assetData?.asset}
                  </span>
                </p>
              </div>
            </div>

            {/**@warning*/}
            <div className="flex items-center gap-2 border border-primary50 px-4 py-2 rounded-2xl">
              <FaExclamationCircle className="fill-yellow-600"></FaExclamationCircle>
              <p className="font-normal text-xs text-textSecondary">
                Only send {assetData?.asset}{" "}
                {data?.network ? `(${assetData?.network?.name})` : ``} to this
                address or else you will lose your funds.
              </p>
            </div>
            <p className="font-semibold text-xs flex items-center justify-between gap-3 mt-6 text-textBlack">
              <span>Quote will expire in</span>
              <span>{timer}s</span>
            </p>
          </div>
          <div className="rounded-bl-2xl rounded-br-2xl border-t border-t-primary-50 p-3 flex items-center justify-end gap-4">
            {!isDone && (
              <TextButton
                title="Back"
                textColor="text-textBlack"
                backgroundColor="bg-white"
                borderColor="border border-primary50"
                className="rounded-xl h-10"
                onClick={onCloseModal}
              />
            )}
            <TextButton
              title={isDone ? "Done" : "Continue"}
              textColor="text-white"
              backgroundColor="bg-primary"
              className="rounded-xl h-10"
              {...(isTimerStopped ? { isLoading: true } : {})}
              onClick={() => (isDone ? onCloseModal() : handleTransfer())}
            />
          </div>
        </>
      </Modal>
    </>
  );
};

export default CryptoSendConfirmationModal
