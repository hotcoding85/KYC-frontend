import { ButtonsText, TextButton } from "../Elements/Button/Button";
import Modal from "../Modal/Modal";
import Tag from "../Elements/Tag/Tag";
import React from "react";
import Btc from "@/Icons/imageicon/Btc";

const TransactionsDetailsModal = ({ isModalOpen, closeModal }) => {
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Transaction details"
        customWidth="w-11/12 md:w-3/4 xl:w-4/12"
      >
        {/* Modal Body */}
        <div className="w-full">
          <div className="  flex flex-col items-center justify-center text-center mb-6 gap-2">
            <h2 className="text-[11px] font-normal text-textSecondary leading-[24px] tracking-[-0.01em] text-center">Sent Amount</h2>
            <Btc className="w-6 h-6 mx-auto" />
            <div className="flex items-center justify-center font-bold text-textBlack">
              <span className="text-[16px] font-bold text-textBlack leading-6 tracking-[-0.01em] text-left mr-1">151.00</span>
              <span className="text-textLight text-[14px] font-semibold leading-5 tracking-[-0.005em] text-left ">USD</span>
            </div>
            <div className="flex items-center justify-center text-sm font-medium text-textSecondary">
              <span className="text-[12px] font-semibold leading-4 text-textBlack mr-1">≈ 0.00344</span>
              <span className="text-[14px] font-semibold leading-5 tracking-[-.005em] text-left text-textLight">BTC</span>
            </div>
            <Tag status="warning" text="Pending" />
          </div>

          <div className="text-sm text-textSecondary space-y-4">
            <div className="flex justify-between py-1">
              <span className="font-medium text-[12px] leading-[16px] text-left">
                To
              </span>
              <span className="text-[12px] font-semibold  leading-[16px] text-right text-textBlack">
                john.watwallet
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium text-[12px] leading-[16px] text-left">
                Reference #
              </span>
              <span className="text-[12px] font-semibold leading-[16px] text-right text-textBlack">
                12
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium text-[12px] leading-[16px] text-left">
                Asset Value
              </span>
              <span className="text-[12px] font-semibold  leading-[16px] text-right text-textBlack">
                xx xxx xxxx
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium text-[12px] leading-[16px] text-left">
                Value in USD
              </span>
              <span className="text-[12px] font-semibold leading-[16px] text-right text-textBlack">
                xx xxx xxxx
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span>Service Charge</span>
              <span className="text-[12px] font-semibold leading-[16px] text-right text-textBlack">
                xx xxx xxxx
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium text-[12px] leading-[16px] text-left">
                Reason of order
              </span>
              <span className="text-[12px] font-semibold leading-[16px] text-right text-textBlack">
                xx xxx xxxx
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium text-[12px] leading-[16px] text-left">
                Date
              </span>
              <span className="text-[12px] font-semibold  leading-[16px] text-right text-textBlack">
                29 Aug-2023 14:00:52
              </span>
            </div>
          </div>
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end py-4 mt-2 border-t space-x-2">
          <ButtonsText
            type="primary"
            title={"Decline"}
            className={`border`}
            textColor={"text-alert"}
            backgroundColor={"bg-white"}
            borderColor={"border-alert"}
          />
          <ButtonsText title="Approve" className="" />
        </div>
      </Modal>
    </>
  );
};

export default TransactionsDetailsModal;
