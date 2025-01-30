
import Button from "@/components/Elements/Button/Button";
import Modal from "../Modal/Modal";

const AddNotesModal = ({ isModalOpen, closeModal }) => {

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title="Notes"
                size="2xl"
            >
                {/* Modal Body */}
                <div className="w-full mx-auto  p-6">
                    <div className="space-y-2">
                        <h2 className="text-base text-textBlack text-secondary">Note</h2>
                        <textarea className="w-full p-3 resize-y border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Type your notes here..."></textarea>
                    </div>
                    <div className="flex justify-end">
                        <p className="text-sm text-textLight">Notes are private and won’t be shared with anyone</p>
                    </div>
                </div>
                {/* Modal Footer */}
                <div className="flex justify-end p-4 border-t space-x-4">
                    <Button title="Cancel" className={"bg-white text-textBlack"} onClick={closeModal} />
                    <Button title="Add" className={"bg-black text-white"} />
                </div>
            </Modal>
        </>
    )
}
export default AddNotesModal;