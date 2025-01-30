import Button from "@/components/Elements/Button/Button";
import Modal from "@/components/Modal/Modal";
import Nfticon from "@/Icons/imageicon/Nfticon";

const NftDetailsModal = ({ isModalOpen, closeModal }) => {
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="NFT details"
        width="w-2/3"
      >
        {/* Modal Body */}
        <div>
          <div className="text-center mb-4 ">
            <div className="w-[484px] flex justify-center items-center p-none ">
              <Nfticon className="w-4 h-4 mr-4" />
            </div>
          </div>
          <div className="text-sm text-gray-600 mb-4 space-y-4">
            <div className="flex justify-between py-1">
              <span className="font-medium text-[12px] leading-[16px] text-left">
                Contact Address
              </span>
              <span className="font-semibold text-[12px] leading-[16px] text-right text-textBlack">
                john.watwallet
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium text-[12px] leading-[16px] text-left">
                {" "}
                Token ID
              </span>
              <span className="font-semibold text-[12px] leading-[16px] text-right text-textBlack">
                john.wallet
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium text-[12px] leading-[16px] text-left">
                Token Standard
              </span>
              <span className="font-semibold text-[12px] leading-[16px] text-right text-textBlack">
                xx xxx xxxx
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium text-[12px] leading-[16px] text-left">
                Last Updated
              </span>
              <span className="font-semibold text-[12px] leading-[16px] text-right text-textBlack">
                xx xxx xxxx
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium text-[12px] leading-[16px] text-left">
                Creator Earning
              </span>
              <span className="font-semibold truncate">xx xxx xxxx</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium text-[12px] leading-[16px] text-left">
                Price
              </span>
              <span className="font-semibold text-[12px] leading-[16px] text-right text-textBlack">
                xx xxx xxxx
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium text-[12px] leading-[16px] text-left">
                Expiration
              </span>
              <span className="font-semibold text-[12px] leading-[16px] text-right text-textBlack">
                Base
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default NftDetailsModal;
