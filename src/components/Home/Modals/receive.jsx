import ReceiveBody from "@/components/Home/Modals/receive-body";
import React, { useState } from "react"
import Image from "next/image"
import Modal from "@/components/Elements/Modal/Modal"
import { TextButton } from "@/components/Elements/Button/Button";


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
  }
]

const CryptoReceiveModal = ({ isModalOpen, onCloseModal, data, onContinueClick }) => {
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        title={`Recieve ${data?.asset}`}
        customWidth='max-w-[96%] md:max-w-3xl'
      >
        <ReceiveBody data={data} onCloseModal={onCloseModal} />
      </Modal>
    </>
  )
}

export default CryptoReceiveModal
