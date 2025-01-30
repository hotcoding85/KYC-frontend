import React from "react"
import Modal from "@/components/Elements/Modal/Modal"
import SendBody from "@/components/Home/Modals/send-body"

const CryptoSendModal = ({ isModalOpen, onCloseModal, data, accounts, handleOpenConfirmationModal }) => {
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        title={`Send ${data?.asset}`}
        customWidth="max-w-[96%] md:max-w-3xl"
      >
        <SendBody
          data={data}
          accounts={accounts}
          onCloseModal={onCloseModal}
          handleOpenConfirmationModal={handleOpenConfirmationModal}
        />
      </Modal>
    </>
  );
}

export default CryptoSendModal
