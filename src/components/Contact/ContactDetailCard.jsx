import { TextButton } from "@/components/Elements/Button/Button";
import React, { useState } from "react";
import Image from "next/image";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import Modal from "../Modal/Modal";

const ContactDetailCard = ({ contact, onClose }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [name, setName] = useState(contact.name);
  const [username, setUsername] = useState(contact.username);

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleSaveChanges = () => {
    setEditModalOpen(false);
  };
  return (
    <div className="flex flex-col md:h-[620px]  h-full p-4 bg-white border shadow rounded-2xl">
      {/* Close Button */}
      <div className="flex items-center justify-end w-full">
        <Image
          src="/assets/icons/cross.svg"
          alt="close"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={onClose}
        />
      </div>

      {/* Contact Details */}
      <div className="flex items-center gap-2">
        <Image
          src={"/assets/images/alice.png"}
          alt={contact.name}
          width={45}
          height={45}
          className="object-cover rounded-full"
        />
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-[#272727]">
            {contact.name}
          </h3>
          <p className="text-xs text-[#A5A5B2]">{contact.username}</p>
        </div>
      </div>

      <TextButton
        title="Send"
        textColor="text-white"
        backgroundColor="bg-[#272727]"
        className="w-full px-[18px] py-3 my-6 rounded-xl"
      />

      {/* Transactions */}
      <div className="w-full">
        <p className="pb-[5px] mb-4 text-xs text-[#A5A5B2] border-b">
          12th May, 2022
        </p>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 py-2">
            <span className="p-2.5 bg-[#d4d4d4] rounded-full">
              <FaArrowDown className="text-textBlack" />
            </span>
            <div className="flex flex-col">
              <p className="text-[#5F5F6F] text-xs">Received </p>
              <p className="font-semibold text-[#272727] text-sm">ETH</p>
            </div>
          </div>
          <p className="text-sm font-semibold text-success">$50.50</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 py-2">
            <span className="p-2.5 bg-[#d4d4d4] rounded-full">
              <FaArrowUp className="text-textBlack" />
            </span>
            <div className="flex flex-col">
              <p className="text-[#5F5F6F] text-base">Sent </p>
              <p className="font-semibold text-[#272727] text-lg">ETH</p>
            </div>
          </div>
          <p className="text-sm font-semibold text-textBlack">$150.50</p>
        </div>
      </div>

      <div className="w-full mt-6">
        <p className="pb-[5px] mb-4 text-sm text-[#A5A5B2] border-b">
          12th May, 2022
        </p>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-2.5 bg-[#d4d4d4] rounded-full">
              <FaArrowDown className="text-textBlack" />
            </span>
            <div className="flex flex-col">
              <p className="text-[#5F5F6F] text-base">Received </p>
              <p className="font-semibold text-[#272727] text-lg">ETH</p>
            </div>
          </div>
          <p className="text-sm font-semibold text-success">$50.50</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2.5 bg-[#d4d4d4] rounded-full">
              <FaArrowUp className="text-textBlack" />
            </span>
            <div className="flex flex-col">
              <p className="text-[#5F5F6F] text-base">Sent </p>
              <p className="font-semibold text-[#272727] text-lg">ETH</p>
            </div>
          </div>
          <p className="text-sm font-semibold text-textBlack">$150.50</p>
        </div>
      </div>

      <button
        onClick={handleEditClick}
        className="w-full px-4 py-2 mt-auto text-textBlack text-xs border border-[#E9E9E9] rounded-lg"
      >
        Edit Contact
      </button>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Contact"
        className="md:max-w-[500px] w-[93%]"
      >
        <div className="space-y-4">
          <label className="block">
            <span className="text-xs font-semibold text-textBlack">Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full p-2 mt-1 text-xs border rounded-lg"
              placeholder="Enter name"
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold text-gray-700">
              Username
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full p-2 mt-1 text-xs border rounded-lg"
              placeholder="Enter username"
            />
          </label>
        </div>

        <div className="flex justify-end mt-6 space-x-2">
          <button
            className="px-6 py-2.5 w-[114px] text-sm text-gray-500 border border-primary50 rounded-xl"
            onClick={() => setEditModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2.5 w-[114px] text-sm text-white bg-black rounded-xl"
            onClick={handleSaveChanges}
          >
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ContactDetailCard;
