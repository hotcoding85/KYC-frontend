import React, { useState, useEffect } from "react"
import Image from "next/image"
import Modal from "@/components/Elements/Modal/Modal"
import { TextButton } from "@/components/Elements/Button/Button"

const data = [
  {
    "label": "Exchange rate",
    "value": "1 USDT FOR 0.0015 BTC"
  },
  {
    "label": "Amount",
    "value": "100.00 USDT",
    "usdValue": "≈ 100.00 USD"
  }
]

const CryptoExchangeSuccessModal = ({ title, isModalOpen, onCloseModal }) => {
  const [timeLeft, setTimeLeft] = useState(58)

  useEffect(() => {
    if (!isModalOpen) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [isModalOpen])

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={onCloseModal}
      title={title}
      customWidth="max-w-[96%] md:max-w-3xl"
    >
      <>
        <div className="w-full h-full p-4">
          {/* Success Card */}
          <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border border-primary50">
            <p className="font-normal text-base text-[#4D4D4D]">
              You swapped BTC for USDT
            </p>
            <div className="flex items-center -space-x-2">
              <Image
                src="/assets/icons/theter.svg"
                alt="btc"
                width={48}
                height={41}
              />
              <Image
                src="/assets/icons/theter.svg"
                alt="usdt"
                width={48}
                height={41}
              />
            </div>
            <p className="font-semibold text-4xl text-textBlack">
              100.00 <span className="text-[#BABABA]">USDT</span>
            </p>
            <p className="font-semibold text-base text-[#BABABA]">
              ≈ 0.0015 <span>BTC</span>
            </p>
            <p className="flex items-center gap-1 font-normal text-sm text-[#26BD6C]">
              <Image
                src="/assets/icons/check-small.svg"
                alt="check"
                width={18}
                height={17}
              />
              Successful
            </p>
          </div>

          {/* Exchange Details */}
          <div className="flex flex-col gap-2 w-full border border-primary50 p-4 rounded-2xl my-6">
            {data.map((each, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center w-full gap-3"
              >
                <p className="text-sm text-[#4D4D4D] font-medium">
                  {each.label}
                </p>
                <div className="text-end">
                  <p className="font-semibold text-sm text-textBlack">
                    {each.value}
                  </p>
                  {each.usdValue && (
                    <span className="font-semibold text-sm text-[#BABABA] mt-1">
                      {each.usdValue}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Timer */}
          <div className="flex items-center justify-between gap-2 mt-6">
            <p className="font-semibold text-sm text-[#4D4D4D]">
              Quote will expire in
            </p>
            <p className="font-semibold text-sm text-primary">{timeLeft}s</p>
          </div>
        </div>

        {/* Footer Button */}
        <div className="rounded-bl-2xl rounded-br-2xl border-t border-t-primary-50 p-4 flex items-center justify-end gap-4">
          <TextButton
            title="Done"
            textColor="text-white"
            backgroundColor="bg-primary"
            className="rounded-xl h-10"
            onClick={onCloseModal}
          />
        </div>
      </>
    </Modal>
  );
}

export default CryptoExchangeSuccessModal
