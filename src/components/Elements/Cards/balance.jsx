import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TextButton } from "@/components/Elements/Button/Button";
import SendBody from "@/components/Home/Modals/send-body";
import CryptoTab from "@/components/Deposit/CryptoTab";
import Modal from "@/components/Modal/Modal";
import InternalReceiveTab from "@/components/Deposit/InternalReceiveTab";
import Currency from "../Currency/Currency";

const BalanceCard = ({ data, handleOpenConfirmationModal }) => {
  const [isSendModalOpen, setSendModalOpen] = useState(false);
  const [isReceiveModalOpen, setReceiveModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("External");

   const [portfolioSummary, setPortfolioSummary] = useState({
     totalBalance: 0,
     priceChangePercent: 0,
     priceChangeUSD: 0,
   });

   useEffect(() => {
     async function fetchAccountBalance() {
       let totalBalanceUSD = 0.0;
       let totalChangeUSD = 0.0;
       let totalInitialUSD = 0.0;

       await Promise.all(
         data.map(async (account) => {
           const { balance, asset } = account;
           
           const currentPrice = parseFloat(account.price);
           const balanceUSD = parseFloat(balance) * parseFloat(currentPrice);
           const priceChangeUSD = parseFloat((account.priceChange * account.price) / 100) ;
           const initialBalanceUSD = balanceUSD - priceChangeUSD * parseFloat(balance);

           totalBalanceUSD = parseFloat(totalBalanceUSD) + parseFloat(balanceUSD);
           totalChangeUSD =
             parseFloat(totalChangeUSD) +
             parseFloat(priceChangeUSD) * parseFloat(balance);
           totalInitialUSD = parseFloat(totalInitialUSD) + parseFloat(initialBalanceUSD);
         })
       );

       const priceChangePercent =
         ((totalBalanceUSD - totalInitialUSD) / totalInitialUSD) * 100;
       setPortfolioSummary({
         totalBalance: totalBalanceUSD,
         priceChangePercent,
         priceChangeUSD: totalChangeUSD,
       });
     }

     if (data) {
       fetchAccountBalance();
     }
   }, [data]);

  const handleOpenSendModal = () => {
    setSendModalOpen(true);
  };

  const handleCloseSendModal = () => {
    setSendModalOpen(false);
  };

  const handleOpenReceiveModal = () => {
    setReceiveModalOpen(true);
  };

  const handleCloseReceiveModal = () => {
    setReceiveModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-white border border-primary50 rounded-2xl">
      <div className="flex flex-col gap-2">
        <h3 className="pb-2 text-[14px] font-semibold leading-[20px] tracking-[-0.005em] text-textBlack text-left">
          My Balance
        </h3>
        <p className="text-base font-bold text-textBlack">
          <Currency>{portfolioSummary.totalBalance}</Currency>
        </p>
        <p className="flex items-center gap-2">
          <span className="font-normal text-xs text-[#A5A5B2]">
            <Currency>{portfolioSummary.priceChangeUSD.toFixed(4)}</Currency>
          </span>
          {portfolioSummary?.priceChangePercent > 0 && (
            <span className="bg-[#2F2B430D] bg-opacity-5 rounded-lg px-2 font-normal text-xs sm:h-6 text-center content-center text-success">
              + {portfolioSummary?.priceChangePercent.toFixed(4)}%
            </span>
          )}

          {portfolioSummary?.priceChangePercent < 0 && (
            <span className="bg-[#2F2B430D] bg-opacity-5 rounded-lg px-2 font-normal text-xs sm:h-6 text-center content-center text-red-600">
              {portfolioSummary?.priceChangePercent.toFixed(4)}%
            </span>
          )}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-start gap-2">
        <TextButton
          title="Send"
          textColor="text-textBlack"
          backgroundColor="bg-white"
          borderColor="border rounded-lg border-[#E4E4E8]"
          className="w-[114px] pr-5 h-8 sm:w-auto"
          iconGap="mr-1"
          icon={
            <Image
              src="/assets/icons/arrow-up-black.svg"
              alt="arrow up"
              width={20}
              height={20}
            />
          }
          onClick={handleOpenSendModal}
        />
        <TextButton
          title="Receive"
          textColor="text-textBlack"
          backgroundColor="bg-white"
          borderColor="border rounded-lg border-[#E4E4E8]"
          className="w-[114px]  pr-5 h-8 sm:w-auto"
          iconGap="mr-1"
          icon={
            <Image
              src="/assets/icons/arrow-down-black.svg"
              alt="arrow down"
              width={20}
              height={20}
            />
          }
          onClick={handleOpenReceiveModal}
        />
      </div>

      {/* Send Modal */}
      <Modal
        isOpen={isSendModalOpen}
        onClose={handleCloseSendModal}
        title="Send"
        className="md:w-[40rem] w-[93%]"
      >
        <div className="flex justify-around p-1 m-2 bg-white border rounded-xl border-primary50">
          <button
            className={`w-1/2 py-2 text-sm ${
              activeTab === "External"
                ? "bg-[#F8F8F9] text-textBlack rounded-xl border border-primary50"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("External")}
          >
            External
          </button>
          <button
            className={`w-1/2 py-2 text-sm ${
              activeTab === "Internal"
                ? "bg-[#F8F8F9] text-textBlack rounded-xl border border-primary50"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Internal")}
          >
            Internal
          </button>
        </div>

        <SendBody
          onCloseModal={handleCloseSendModal}
          handleOpenConfirmationModal={handleOpenConfirmationModal}
        />
      </Modal>

      {/* Receive Modal */}
      <Modal
        isOpen={isReceiveModalOpen}
        onClose={handleCloseReceiveModal}
        title="Receive USTD"
        className="md:w-[40rem] w-[93%]"
      >
        <div className="flex justify-around p-1 m-2 bg-white border rounded-xl border-primary50">
          <button
            className={`w-1/2 py-2 text-sm ${
              activeTab === "External"
                ? "bg-[#F8F8F9] text-textBlack rounded-xl border border-primary50"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("External")}
          >
            External
          </button>
          <button
            className={`w-1/2 py-2 text-sm ${
              activeTab === "Internal"
                ? "bg-[#F8F8F9] text-textBlack rounded-xl border border-primary50"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Internal")}
          >
            Internal
          </button>
        </div>
        {activeTab === "Internal" ? (
          <InternalReceiveTab onCloseModal={handleCloseReceiveModal} />
        ) : (
          <CryptoTab onCloseModal={handleCloseReceiveModal} />
        )}
      </Modal>
    </div>
  );
};

export default BalanceCard;
