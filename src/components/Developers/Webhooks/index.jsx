import Action from "@/components/Elements/Action/Action";
import { TextButton } from "@/components/Elements/Button/Button";
import Modal from "@/components/Modal/Modal";
import Copy from "@/Icons/Copy";
import React, { useState } from "react";

const Webhooks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white border rounded-2xl">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-textBlack font-semibold text-[14px]">
            Webhook Keys
          </h2>
          <TextButton
            title="Add Webhook Key"
            textColor="text-white"
            backgroundColor="bg-primary"
            borderColor="border border-primary50"
            className="w-full md:w-auto"
            onClick={openModal}
          />
        </div>
      </div>

      <div className="p-4 mb-4 bg-white border rounded-2xl">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold">Webhook 1</p>
          <Action>
            <li className="px-4 py-2 cursor-pointer text-textBlack hover:bg-gray-50">
              View Details
            </li>
            <li className="px-4 py-2 cursor-pointer text-alert hover:bg-gray-50">
              Delete
            </li>
          </Action>
        </div>
        <div className="flex gap-3 my-2.5">
          <p className="mt-1 text-xs text-gray-500">Submitted 12/06/2023</p>
          <p className="text-xs px-3 py-1 text-warning bg-white my-auto rounded-full">
            Pending
          </p>
        </div>
        <hr />
        <div className="mt-2">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs font-medium text-textSecondary">
                Webhook Name
              </p>
              <p className="mt-2 text-xs font-semibold">XXXXXXXXXXXXXX</p>
            </div>
            <div>
              <p className="text-xs font-medium text-textSecondary">
                Last Used
              </p>
              <p className="mt-2 text-xs font-semibold">20 - 08 - 2029</p>
            </div>
            <div>
              <p className="text-xs font-medium text-textSecondary">
                Created On
              </p>
              <p className="mt-2 text-xs font-semibold">20 - 08 - 2029</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs font-medium text-textSecondary">
              Webhook Key
            </p>
            <div className="flex gap-1">
              <p className="mt-2 text-xs font-semibold">
                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
              </p>
              <div className="mt-2 cursor-pointer">
                <Copy />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Add Webhook Key"
        customWidth="max-w-[500px] "
        contentClassName="p-0"
      >
        {/* Modal Body */}
        <div className="w-full mx-auto">
          <div className="px-4 pt-4 mb-4 space-y-2">
            <div className="mb-4">
              <label
                htmlFor="webhookName"
                className="block text-xs font-medium text-gray-700 ml-0.5"
              >
                Webhook Name
              </label>
              <input
                type="text"
                id="webhookName"
                className="mt-1 p-3 block w-full h-8 rounded-[10px] border border-primary50 text-xs"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="url"
                className="block text-xs font-medium text-gray-700 ml-0.5"
              >
                URL
              </label>
              <input
                type="text"
                id="url"
                className="mt-1 p-3 block w-full h-8 rounded-[10px] border border-primary50 text-xs"
              />
            </div>
          </div>
        </div>
        <hr />
        {/* Modal Footer */}
        <div className="flex justify-end p-4 space-x-4">
          <TextButton
            title="Cancel"
            className={"bg-white !text-textBlack border border-primary50 "}
            onClick={closeModal}
            width="w-[114px]"
          />
          <TextButton
            title="Save"
            className={"bg-black text-white "}
            width="w-[114px]"
            Webhooks
          />
        </div>
      </Modal>
    </div>
  );
};

export default Webhooks;
