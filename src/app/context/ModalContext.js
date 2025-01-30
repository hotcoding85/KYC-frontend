"use client";
import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isOpenSendModal, setOpenSendModal] = useState(false);
  const [isOpenReceiveModal, setOpenReceiveModal] = useState(false);
  const [isOpenExchangeModal, setOpenExchangeModal] = useState(false);
  const [isOpenExchangeConfirmModal, setOpenExchangeConfirmModal] = useState(false);
  const [isOpenConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [isOpenSwappedConfirmModal, setOpenSwappedConfirmModal] =
    useState(false);

  const handleCloseSendModal = () => setOpenSendModal(false);
  const handleCloseReceiveModal = () => setOpenReceiveModal(false);
  const handleCloseExchangeModal = () => setOpenExchangeModal(false);
  const handleCloseConfirmationModal = () => setOpenConfirmationModal(false);
  const handleOpenSwappedConfirmModal = () => setOpenSwappedConfirmModal(true);
  const handleCloseSwappedConfirmModal = () =>
    setOpenSwappedConfirmModal(false);
  const handleOpenExchangeConfirmModal = () => setOpenConfirmationModal(true);
  const handleCloseExchangeConfirmModal = () => setOpenConfirmationModal(false);

  return (
    <ModalContext.Provider
      value={{
        isOpenSendModal,
        isOpenReceiveModal,
        isOpenExchangeModal,
        isOpenConfirmationModal,
        isOpenSwappedConfirmModal,
        isOpenExchangeConfirmModal,
        setOpenSendModal,
        setOpenReceiveModal,
        setOpenExchangeModal,
        setOpenConfirmationModal,
        handleCloseSendModal,
        handleCloseReceiveModal,
        handleCloseExchangeModal,
        handleCloseConfirmationModal,
        handleOpenSwappedConfirmModal,
        handleCloseSwappedConfirmModal,
        handleOpenExchangeConfirmModal,
        handleCloseExchangeConfirmModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
