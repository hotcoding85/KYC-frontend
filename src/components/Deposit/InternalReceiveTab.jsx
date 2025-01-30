import React from "react";
import Image from "next/image";
import { TextButton } from "../Elements/Button/Button";

const InternalReceiveTab = ({ onCloseModal }) => {
  return (
    <div>
      <div className="px-2">
        <div className="px-4 py-6 my-3 bg-white border border-primary50 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Image
                  src="/assets/images/profile.png"
                  alt="User Avatar"
                  width={20}
                  height={18}
                  className="rounded-full"
                />
                <p className="text-sm font-semibold text-textBlack">
                  johndoe.walletname
                </p>
              </div>
              <div>
                <p className="text-xs text-textSecondary font-normal">
                  You can receive crypto with your username from other watwallet
                  users
                </p>
              </div>
            </div>
            <button
              className="px-3 py-3 text-xs font-semibold text-textBlack border-l rounded-lg border-primary50"
              onClick={() => {
                navigator.clipboard.writeText("johndoe.walletname");
                alert("Wallet name copied to clipboard");
              }}
            >
              Copy
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-4 pt-3 border-t rounded-bl-2xl rounded-br-2xl border-t-primary-50">
        <TextButton
          title="Cancel"
          textColor="text-primary"
          backgroundColor="bg-white"
          borderColor="border border-primary50"
          className="h-10 w-[114px] rounded-xl"
          onClick={onCloseModal}
        />
        <TextButton
          title="Continue"
          textColor="text-white"
          backgroundColor="bg-primary"
          className="h-10 w-[114px] rounded-xl"
          onClick={() => {
            onCloseModal();
            handleOpenConfirmationModal();
          }}
        />
      </div>
    </div>
  );
};

export default InternalReceiveTab;
