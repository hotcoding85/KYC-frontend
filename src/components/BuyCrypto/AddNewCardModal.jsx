import Button, { TextButton } from "../Elements/Button/Button";
import Modal from "../Modal/Modal";

const AddNewCardModal = ({ isModalOpen, closeModal }) => {
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Add a new card"
        customWidth="max-w-md w-full"
      >
        {/* Modal Body */}
        <div className="w-full mx-auto">
          <div className="mb-4 space-y-2">
            <div className="mb-4">
              <label
                htmlFor="cardNumber"
                className="block text-xs font-medium text-gray-700"
              >
                Card Holder Name
              </label>
              <input
                type="text"
                id="cardHolderName"
                placeholder="Mr."
                className="mt-1 p-3 block w-full h-8 rounded-[10px] border border-primary50 text-xs"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="cardNumber"
                className="block text-xs font-medium text-gray-700"
              >
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                placeholder="0000 0000 0000 0000"
                className="mt-1 p-3 block w-full h-8 rounded-[10px] border border-primary50 text-xs"
              />
            </div>

            <div className="flex space-x-4 mb-4">
              <div className="flex-1">
                <label
                  htmlFor="expiration"
                  className="block text-xs font-medium text-gray-700"
                >
                  Expiration
                </label>
                <input
                  type="text"
                  id="expiration"
                  placeholder="MM/YY"
                  className="mt-1 p-3 block w-full h-8 rounded-[10px] border border-primary50 text-xs"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="cvc"
                  className="block text-xs font-medium text-gray-700"
                >
                  CVC
                </label>
                <input
                  type="text"
                  id="cvc"
                  placeholder="123"
                  className="mt-1 p-3 block w-full h-8 rounded-[10px] border border-primary50 text-xs"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="billingAddress"
                className="block text-xs font-medium text-gray-700"
              >
                Billing address (optional)
              </label>
              <input
                type="text"
                id="billingAddress"
                placeholder=""
                className="mt-1 p-3 block w-full h-8 rounded-[10px] border border-primary50 text-xs"
              />
            </div>
          </div>
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end p-2 border-t gap-2 sm:gap-4">
          <TextButton
            title="Cancel"
            width="w-full"
            onClick={closeModal}
            backgroundColor="bg-white"
            textColor="text-textBlack"
            borderColor={"border border-primary50"}
          />
          <TextButton width="w-full" title="Save card" className={"bg-black text-white"} />
        </div>
      </Modal>
    </>
  );
};
export default AddNewCardModal;
