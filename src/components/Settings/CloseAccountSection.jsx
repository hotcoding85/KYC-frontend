import React, { useEffect, useRef, useState } from "react";
import Button from "../Elements/Button/Button";
import Modal from "../Modal/Modal";

export default function CloseAccountSection() {
    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    return (
        <>
            <div className="pb-8">
                <p className="text-xl font-bold pt-4">Close your account</p>
                <div className="bg-white p-6 rounded-2xl shadow-sm mt-2 flex flex-row justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold mb-1">Close Account</h2>
                        <h2 className="mb-4 text-textSecondary">Closing your account can’t be undone. Please make sure your account balance is $0.00 before you begin.</h2>
                    </div>
                    <Button title="Close Account" className={"w-38 bg-alert text-white"} />
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title="Close your account"
            >
                {/* Modal Body */}
                <div className="p-4">
                    <p>Are you sure you want to close your account?</p>
                </div>
                {/* Modal Footer */}
                <div className="flex justify-end p-4 border-t space-x-4">
                    <Button title="Cancel" type="secondary" onClick={closeModal} />
                    <Button title="Close Account" className={"w-38 bg-alert text-white"} />
                </div>
            </Modal>
        </>
    )
}