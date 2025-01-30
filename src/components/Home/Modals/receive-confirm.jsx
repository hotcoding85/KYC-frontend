import React, { useState, useEffect } from "react"
import Image from "next/image"
import Modal from "@/components/Elements/Modal/Modal"
import { TextButton } from "@/components/Elements/Button/Button"

const CryptoExchangeConfirmModal = ({ isModalOpen, onCloseModal }) => {
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
      title="Exchange BTC to USDT"
      customWidth="max-w-[96%] md:max-w-[500px]"
    >
      <>
        <div className="w-full h-full p-4">
          {/* Exchange Info Card */}
          <div className="border border-primary50 rounded-2xl py-4 px-6">
            <div className="flex justify-around items-center">
              <div className="flex flex-col items-center">
                <p className="text-textSecondary text-xs mb-2">From</p>
                <Image
                  src="/assets/icons/theter.svg"
                  alt="btc"
                  width={45}
                  height={45}
                />
                <p className="font-semibold text-base text-textBlack mt-2">
                  0.0015 BTC
                </p>
                <p className="font-semibold text-[#BABABA] text-xs mt-1">
                  ≈ $100.00 USD
                </p>
              </div>

              <div className="w-12 h-12 flex items-center justify-center bg-[#F8F8F9] rounded-full">
                <Image
                  src="/assets/icons/arrow-right.svg"
                  alt="arrow"
                  width={24}
                  height={24}
                />
              </div>

              <div className="flex flex-col items-center">
                <p className="text-[#4D4D4D] text-base mb-2">To</p>
                <Image
                  src="/assets/icons/theter.svg"
                  alt="usdt"
                  width={48}
                  height={48}
                />
                <p className="font-semibold text-sm text-[#272727] mt-2">
                  100.00 <span className="text-[#A5A5B2]">USDT</span>
                </p>
                <p className="text-[#BABABA] text-xs">
                  ≈ $100.00 <span className="text-[#A5A5B2]">USD</span>
                </p>
              </div>
            </div>
          </div>

          {/* Exchange Details */}
          <div className="border border-primary50 rounded-2xl p-4 my-4">
            <div className="flex justify-between items-center mb-3">
              <p className="text-[#4D4D4D] text-sm text-medium">
                Exchange rate
              </p>
              <p className="text-textBlack font-semibold text-sm">
                1 USDT FOR 0.0015 BTC
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-textBlack text-sm font-semibold">Amount</p>
              <div className="text-right">
                <p className="text-textBlack font-semibold text-sm mb-1">
                  100.00 USDT
                </p>
                <p className="text-[#BABABA] text-sm">≈ 100.00 USD</p>
              </div>
            </div>
          </div>

          {/* Timer */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-[#4D4D4D] font-semibold text-sm">
              Quote will expire in
            </p>
            <p className="text-textBlack font-semibold text-sm">{timeLeft}s</p>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="rounded-bl-2xl rounded-br-2xl border-t border-t-primary-50 p-4 flex items-center justify-end gap-4">
          <TextButton
            title="Back"
            textColor="text-primary"
            backgroundColor="bg-white"
            borderColor="border border-primary50"
            className="rounded-xl h-10"
            onClick={onCloseModal}
          />
          <TextButton
            title="Continue"
            textColor="text-white"
            backgroundColor="bg-primary"
            className="rounded-xl h-10"
          />
        </div>
      </>
    </Modal>
  );
}

export default CryptoExchangeConfirmModal
