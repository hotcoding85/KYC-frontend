import Image from 'next/image'
import Modal from "../Modal/Modal";
import React, { useCallback, useState } from "react";
import BlueCheck from "@/Icons/BlueCheck";
import { ButtonsText, TextButton } from "../Elements/Button/Button";
import System from "@/Icons/imageicon/System";
import Device from "@/Icons/imageicon/Device";

// Define a session item component
const SessionItem = ({
  deviceType,
  deviceName,
  location,
  browser,
  isCurrentSession,
  lastActive,
  signOutHandler
}) => {
  const [isSignoutModalOpen, setIsSignoutModalOpen] = useState(false);

  const closeModal = () => {
    setIsSignoutModalOpen(false);
  };

  const singoutSession = useCallback(async () => {
    await signOutHandler()
    closeModal()
  }, [])

  return (
    <div className="flex flex-wrap md:flex-nowrap flex-row items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-primary50 md:h-28">
      {/* Placeholder for device icon */}
      <div className="w-full flex flex-row items-center gap-4">
        {deviceType === "Mac" ? (
            <System className="w-[48px] h-[35px]" />
        ) : (
            <Device className="w-[48px] h-[35px]" />
        )}
        <h3 className="font-semibold text-xs leading-[16px] text-textBlack text-left">
          {deviceName}
        </h3>
      </div>
      <div className="w-full flex flex-col gap-2 md:flex-row justify-between items-start md:items-center mt-2">
        <div className="flex flex-col gap-2">
          {isCurrentSession ? (
            <>
              <span className="font-medium text-xs leading-[16px] text-textBlack text-left">
                {deviceType}
              </span>
              <span className="font-normal text-xs text-textBlack">
                {location}
              </span>

              <span className="font-normal text-xs text-textBlack">
                {browser}
              </span>
              {/* <span className="font-normal text-xs text-textBlack">{lastActive} ago</span> */}
              <div className="flex flex-row items-center gap-2">
                <BlueCheck />
                <span className="font-normal text-xs text-textBlack">
                  Your current session
                </span>
              </div>
            </>
          ) : (
            <>
              <span className="font-medium text-xs leading-[16px] text-textBlack text-left">
                {deviceType}
              </span>
              <span className="font-normal text-xs text-textBlack">
                {location}
              </span>
              <span className="font-normal text-xs text-textBlack">
                {lastActive} ago
              </span>
              <span className="font-normal text-xs text-textBlack">
                {browser}
              </span>
            </>
          )}
        </div>
        {!isCurrentSession && (
          <ButtonsText
            title="Sign out"
            width="79"
            onClick={() => setIsSignoutModalOpen(true)}
            backgroundColor="bg-white"
            textColor="text-textBlack"
            borderColor="border-primary50"
            className={"border h-8 text-xs rounded-[10px] px-0 py-1"}
          />
        )}
      </div>

      <Modal
        isOpen={isSignoutModalOpen}
        onClose={closeModal}
        title="Sign Out"
        customWidth={"w-[523px]"}
        contentClassName="p-0"
      >
        <p className="p-4 text-xs text-textSecondary">
          Are you sure you want to sign out from this account?
        </p>

        <div className="flex justify-end p-4 gap-2 border-t border-primary50">
          <TextButton
            title="Cancel"
            type="secondary"
            className="text-xs !w-[114px] !min-w-[114px] bg-white border border-primary50 !text-textBlack"
            onClick={closeModal}
          />
          <TextButton
            title="Log out"
            type="primary"
            className="text-xs !w-[114px] !min-w-[114px]"
            onClick={singoutSession}
          />
        </div>
      </Modal>
    </div>
  );
};

export default SessionItem;
