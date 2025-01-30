import Modal from "@/components/Elements/Modal/Modal";
import Timer from "@/Icons/imageicon/Timer";

const TimerModal = ({ isModalOpen, closeModal }) => {
  return (
    <>
      <Modal
        title=""
        customWidth="max-w-[90%] sm:max-w-lg"
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        {/* Modal Body */}
        <div className="mx-auto p-6 ">
          <div className="text-center mb-4 space-y-4">
            <Timer className="w-20 mx-auto" />
            <p className="text-[14px] font-medium leading-[20px] tracking-[-0.005em] text-left text-textBlack">
              Your statement is being generated{" "}
            </p>
            <p className="text-[12px] font-normal leading-[16px] text-center text-textLight">
              It should take less than 3-5 minutes
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default TimerModal;
