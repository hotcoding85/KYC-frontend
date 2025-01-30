import React, { useState } from "react";
import Button, { TextButton } from "../Elements/Button/Button";
import YellowCheck from "@/Icons/YellowCheck";
import MessageInput from "./MessageInput";
import Online from "@/Icons/Online";
import Modal from "../Modal/Modal";
import SearchBar from "../Elements/search/SearchBar";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Backarrowthinner from "@/Icons/Backarrowthinner";
import ChatButton from "@/Icons/ChatButton";
import NoMessage from "@/Icons/imageicon/NoMessage";

const initialContacts = [
  {
    id: 1,
    name: "Jane Doe",
    message: "Hi, I want to make enquiries about...",
    time: "12:55 am",
    unread: 2,
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "Janet Adebayo",
    message: "Hi, I want to make enquiries about...",
    time: "12:55 am",
    unread: 1,
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Kunle Adekunle",
    message: "Hi, I want to make enquiries about...",
    time: "12:55 am",
    unread: 1,
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
];

const initialMessages = {
  1: [
    {
      type: "received",
      text: "Hello, I want to make enquiries about this service",
      time: "12:55 am",
    },
    {
      type: "sent",
      text: "Hello Jane, thank you for reaching out",
      time: "12:57 am",
    },
    { type: "sent", text: "What do you need to know?", time: "12:57 am" },
  ],
  2: [
    { type: "received", text: "Is this available?", time: "1:00 pm" },
    { type: "sent", text: "Yes, it is available", time: "1:02 pm" },
  ],
  3: [
    { type: "received", text: "Can I get a discount?", time: "3:00 pm" },
    { type: "sent", text: "We can discuss this further", time: "3:02 pm" },
  ],
};

export default function SupportBody({ handleBackClick }) {
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [contacts, setContacts] = useState(initialContacts);
  const router = useRouter();
  const pathName = usePathname();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Filter contacts based on search term
  const filteredContacts = searchTerm
    ? contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.message.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : contacts;

  // Handler for searching
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  // Handler for sending messages
  const handleMessageSend = (messageText) => {
    if (!selectedContact || !messageText.trim()) return;

    const newMessage = {
      type: "sent",
      text: messageText,
      time: new Date()
        .toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
        .toLowerCase(),
    };

    // Update messages
    setMessages((prevMessages) => ({
      ...prevMessages,
      [selectedContact]: [...(prevMessages[selectedContact] || []), newMessage],
    }));

    // Update contact's last message
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === selectedContact
          ? { ...contact, message: messageText, time: newMessage.time }
          : contact
      )
    );
  };

  return (
    <>
      <div className="flex flex-col max-h-[calc(100vh-100px)] h-full px-4 py-2">
        <div className="flex justify-between items-center pb-4">
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-row items-center gap-3">
              {pathName.toString().includes("help") && (
                <button
                  onClick={() => {
                    handleBackClick ? handleBackClick() : router.back();
                  }}
                >
                  <Backarrowthinner className="h-4 w-4" />
                </button>
              )}
              <h1 className="text-base font-semibold text-textBlack">
                Support
              </h1>
            </div>
          </div>
          <div className="flex gap-3">
            <TextButton
              width="w-auto"
              title="New message"
              className="h-8 text-sm text-white"
              onClick={openModal}
            />
          </div>
        </div>

        <div className="flex flex-col justify-between flex-grow gap-4 md:flex-row">
          {/* Left Section */}
          <div className="flex flex-col w-full gap-4 md:w-1/3">
            {/* Status Card */}
            <div className="flex flex-col h-full py-4 bg-white shadow-sm rounded-2xl">
              <div className="flex items-center justify-between mb-2 px-4">
                <p className="text-sm font-medium text-textBlack">Contacts</p>
                <span className="text-xs text-textLight">
                  {contacts.length}
                </span>
              </div>
              <div>
                <div className="w-full mb-[16px] px-4">
                  <SearchBar
                    value={searchTerm}
                    onValueChange={handleSearchChange}
                  />
                </div>
                <ul className="space-y-2 overflow-auto">
                  {filteredContacts.map((contact) => (
                    <li
                      key={contact.id}
                      onClick={() => setSelectedContact(contact.id)}
                      className={`p-4 flex items-center justify-between cursor-pointer ${
                        selectedContact === contact.id
                          ? "bg-blue-50  border-r-4 border-r-blue-500 border-b"
                          : "hover:bg-gray-100 border-b mr-1"
                      }`}
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className="relative flex-shrink-0">
                          <img
                            src={contact.avatar}
                            alt={contact.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="absolute top-0 right-0">
                            <Online />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-medium truncate">
                            {contact.name}
                          </h3>
                          <p className="text-xs text-gray-500 truncate">
                            {contact.message}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 flex flex-col">
                        {contact.unread > 0 && (
                          <span className="flex items-center justify-center w-6 h-6 text-xs rounded-full bg-warning text-primary self-end">
                            {contact.unread}
                          </span>
                        )}
                        <span className="block pt-1 mb-1">{contact.time}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col w-full h-full mt-4 bg-white shadow-sm md:mt-0 md:w-2/3 rounded-2xl">
            {selectedContact ? (
              <div className="flex flex-col flex-grow">
                <div className="border-b">
                  <div className="flex flex-wrap items-center justify-between gap-2 p-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          contacts.find((c) => c.id === selectedContact)?.avatar
                        }
                        alt={
                          contacts.find((c) => c.id === selectedContact)?.name
                        }
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="text-sm font-medium">
                          {contacts.find((c) => c.id === selectedContact)?.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Online />
                          <span className="text-xs text-primary">Online</span>
                          <span className="text-xs text-gray-500">
                            {
                              contacts.find((c) => c.id === selectedContact)
                                ?.time
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="hidden px-3 py-2 text-xs rounded-lg bg-primary50 sm:block">
                          New Customer
                        </h3>
                        <h3
                          className="text-xs text-primary cursor-pointer"
                          onClick={() => {
                            router.push("/dashboard/profile");
                          }}
                        >
                          View Profile
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-grow p-4 space-y-4 overflow-auto text-sm">
                  {messages[selectedContact]?.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.type === "sent" ? "justify-end" : ""
                      }`}
                    >
                      <div>
                        <p
                          className={`py-2 px-4 text-xs text-nowrap ${
                            msg.type === "sent"
                              ? "rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
                              : "rounded-tl-2xl rounded-tr-2xl rounded-br-2xl"
                          } max-w-xs ${
                            msg.type === "sent"
                              ? "bg-warningLight text-right text-textBlack"
                              : "bg-primary text-white"
                          }`}
                        >
                          {msg.text}
                        </p>
                        <span
                          className={`text-xs mt-1 text-gray-400 flex items-center ${
                            msg.type === "sent" ? "justify-end" : ""
                          }`}
                        >
                          <span className="mr-2">{msg.time}</span>
                          {msg.type === "sent" ? <YellowCheck /> : ""}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <MessageInput onMessageSend={handleMessageSend} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center flex-grow gap-2 text-center">
                <NoMessage className="w-20 h-20" />
                <p className="text-sm">Messages</p>
                <p className="text-xs text-textLight">
                  Click on a contact to view messages.
                </p>
                <div className="flex ">
                  <Button
                    icon={<ChatButton />}
                    title="New message"
                    type="primary"
                    className="h-8 text-xs text-white bg-black border-none"
                    width={"full"}
                    onClick={openModal}
                    imgHeight={16}
                    imgWidth={16}
                    imgClassName="w-4 h-4"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Message Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="New message"
        className="md:w-[530px] w-11/12"
        headerClassName="p-2 px-4 h-[48px]"
      >
        <>
          <div className="pb-3">
            <SearchBar value={searchTerm} onValueChange={handleSearchChange} />
          </div>
          <ul className="space-y-2">
            {filteredContacts.map((contact) => (
              <li
                key={contact.id}
                onClick={() => {
                  setSelectedContact(contact.id);
                  closeModal();
                }}
                className={`py-2 flex items-center justify-between cursor-pointer ${
                  selectedContact === contact.id
                    ? "hover:bg-gray-100 border-r-4"
                    : "hover:bg-gray-100 border-b"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="absolute top-0 right-0">
                      <Online />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">{contact.name}</h3>
                    <p className="text-xs text-gray-500">{contact.message}</p>
                  </div>
                </div>
                <div className="text-xs text-gray-400 self-end">
                  <span className="block pt-2">{contact.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </>
      </Modal>
    </>
  );
}
