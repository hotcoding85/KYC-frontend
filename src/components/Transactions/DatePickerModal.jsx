
import React, { useEffect, useRef, useState } from "react";
import Modal from "../Modal/Modal";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";

const DatePickerModal = ({ isModalOpen, closeModal }) => {
    const [date, setDate] = useState(null);

    const [checked, setChecked] = useState(false);



    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title="Custom date"
            >
                {/* DatePicker Component */}
                <div className="card flex justify-content-center">
                    <Calendar value={date} onChange={(e) => setDate(e.value)} selectionMode="range" readOnlyInput hideOnRangeSelection />
                </div>

                <div className="card flex justify-content-center">
                    <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
                </div>

            </Modal>
        </>
    )
}
export default DatePickerModal;