import React, { useState, useEffect } from "react";
import Back from "@/Icons/Back";
import ChevronRight from "@/Icons/ChevronRight";
import AddNewCardModal from "./AddNewCardModal";
import Mastercard from "@/Icons/imageicon/Mastercard";
import Plus from "@/Icons/Plus";

const BuyCryptoStepTwo = ({ onBack, onNext }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <>
      <div className="flex flex-col justify-between items-center h-screen">
        <div className="bg-white rounded-2xl border w-full md:w-3/6 justify-center items-center">
          <div className=" flex-col p-4 sm:p-6">
            <div className="flex flex-row items-center gap-2">
              <button className="" onClick={onBack}>
                <Back />
              </button>
              <p className="text-sm font-semibold py-2">Pay with a card</p>
            </div>
            <div className="border border-primary50 rounded-xl space-y-2 my-2">
              <div className="bg-lightGrey rounded-t-xl">
                <p className="text-sm text-textSecondary font-semibold p-3">
                  Saved cards
                </p>
              </div>
              <div className="p-3 space-y-4">
                <div onClick={onNext}>
                  <div className="flex justify-between items-center text-textSecondary my-2">
                    <div className="flex flex-row items-center space-x-2">
                      <Mastercard  className="w-14 h-9" />
                      <div>
                        <p className="text-xs font-medium">Mastercard</p>
                        <p className="text-xs text-textSecondary">
                          Card ending with 012
                        </p>
                      </div>
                    </div>
                    <ChevronRight />
                  </div>
                  <p className="text-xs text-textLight font-normal">
                    If your card isn’t in USD, your bank may charge you an extra
                    fee
                  </p>
                </div>
                <hr></hr>
                <div
                  className="flex justify-between items-center text-textSecondary mt-2"
                  onClick={openModal}
                >
                  <div className="flex flex-row items-center space-x-2">
                    <Plus className="size-5" />
                    <p className="text-xs font-semibold">Add a new card</p>
                  </div>
                  <ChevronRight />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddNewCardModal isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};

export default BuyCryptoStepTwo;
