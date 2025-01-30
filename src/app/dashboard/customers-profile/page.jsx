"use client";
import Back from "@/Icons/Back";
import React, { useState } from "react";
import Modal from "@/components/Modal/Modal";
import NavBar from "@/components/NavBar/NavBar";
import CustomerProfileBody from "@/components/CustomerProfile/CustomerProfileBody";
import Button from "@/components/Elements/Button/Button";

export default function ProfilePage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <>
      <NavBar>
        <div className="flex flex-col justify-between gap-5 p-2 md:px-4 md:gap-0 md:flex-row">
          <div className="flex flex-row items-center gap-4">
            <button>
              <Back />
            </button>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Logo"
              className="w-8 rounded-full md:w-11"
            />
            <h1 className="text-xs md:text-sm">Alexa John</h1>
          </div>{" "}
          <div className="flex justify-center items-center ">
            <div className="flex flex-col gap-2 md:space-x-4 md:gap-0 md:flex-row items-center">
              <Button
                title="Download Summary"
                type="secondary"
                className={
                  "text-sm   bg-white  h-10  text-nowrap w-full border "
                }
                color="gray"
              />
              <Button
                title="Deactivate"
                type="secondary"
                className={
                  "text-sm  bg-white  h-10   w-full  text-alert border-alert"
                }
                color="gray"
              />
              <Button
                title="Edit"
                type="primary"
                color="primary"
                className={"text-white bg-primary h-10  w-full text-sm "}
              />
            </div>
          </div>
        </div>
        <CustomerProfileBody />
      </NavBar>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {/* Modal Body */}
        <div className="p-4">
          <p>Are you sure you want to log out from this account?</p>
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end p-4 space-x-4 border-t">
          <Button title="Cancel" type="secondary" onClick={closeModal} />
          <Button title="Log out" type="primary" onClick={closeModal} />
        </div>
      </Modal>
    </>
  );
}
