import Button from "../Elements/Button/Button";
import Modal from "../Elements/Modal/Modal";
import ContractForm from "./ContractForm";

const OtcCardModal = ({ isModalOpen, closeModal }) => {
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Buy BTC/USD Contract"
        customWidth="max-w-[96%] sm:max-w-md"
      >
        {/* Modal Body */}
        <div className="w-full p-4 mx-auto">
          <div className="space-y-4 text-center">
            <ContractForm />
          </div>
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end p-4 space-x-4 border-t">
          <Button title="Cancel" className={"bg-white text-textBlack"} onClick={closeModal} />
          <Button title="Book now" className={"bg-black text-white"} />
        </div>
      </Modal>
    </>
  );
};
export default OtcCardModal;
