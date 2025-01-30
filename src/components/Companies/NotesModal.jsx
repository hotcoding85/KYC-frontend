import React, { useState } from 'react';
import BaseModal from "@/components/Elements/BaseModal/BaseModal";

const NotesModal = ({ isOpen, onClose, note, setNote, handleAddNote }) => {

    const modalContent = (
        <>
      <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full h-32 p-2 text-sm border border-gray-300 rounded-md resize-none outline-0 text-textBlack"
          placeholder="Type your notes here..."
      />
            <p className="mt-2 text-xs text-gray-500">
                Notes are private and won&apos;t be shared with anyone
            </p>
        </>
    );

    const modalFooter = (
        <div className="flex justify-end space-x-4">
            <button
                onClick={onClose}
                className="px-4 w-[108px] text-xs text-gray-700 bg-white border rounded-xl h-8"
            >
                Cancel
            </button>
            <button
                onClick={handleAddNote}
                className={`px-4 text-xs w-[108px] rounded-xl text-white bg-primary h-8`}
            >
                Save
            </button>
        </div>
    );

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title={<span className="text-textBlack italic">Notes</span>}
            modalContent={modalContent}
            footer={modalFooter}
        />
    );
};

export default NotesModal;