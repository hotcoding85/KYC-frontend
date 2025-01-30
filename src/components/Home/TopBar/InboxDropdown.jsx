import React, { useState } from "react";
import TabWithCount from "./TabWithCount";

const messagesData = [
  {
    id: 1,
    avatar: "https://via.placeholder.com/40", // Replace with actual avatar
    sender: "Carmen Parksouth",
    message: "Hello, I want to make enquiries about this service.",
    time: "2m",
    isUnread: true,
  },
  {
    id: 2,
    avatar: "https://via.placeholder.com/40", // Replace with actual avatar
    sender: "John doe",
    message: "Thank you for your help!",
    time: "14h",
    isUnread: false,
  },
];

const InboxDropdown = ({ closeDropdown }) => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="absolute space-y-4 bg-white border border-gray-300 shadow-lg w-60 md:w-96 right-20 md:right-[8rem] rounded-xl top-14">
      <div className="p-4 space-y-4">
        <div className="text-sm font-semibold">Inbox</div>

        {/* Tabs */}
        <div className="relative flex pb-2 space-x-4 text-xs border-b border-gray-300">
          <button
            className={`relative pb-2 ${activeTab === "All" ? "font-semibold text-textBlack" : "text-gray-500"}`}
            onClick={() => setActiveTab("All")}
          >
            <TabWithCount label="All" count={messagesData.length} />
            {activeTab === "All" && <span className="absolute left-0 bottom-[-10px] w-full h-[3px] bg-black"></span>}
          </button>

          <button
            className={`relative pb-2 ${activeTab === "Unread" ? "font-semibold text-textBlack" : "text-gray-500"}`}
            onClick={() => setActiveTab("Unread")}
          >
            <TabWithCount label="Unread" count={0} />
            {activeTab === "Unread" && <span className="absolute left-0 bottom-[-10px] w-full h-[3px] bg-black"></span>}
          </button>
        </div>

        {/* Messages List */}
        <div className="divide-y">
          {messagesData.map((message) => (
            <div key={message.id} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                {/* Sender Avatar */}
                <img src={message.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
                {/* Message Text */}
                <div>
                  <p className="text-xs font-semibold">{message.sender}</p>
                  <p className="text-[11px] text-gray-500">{message.message}</p>
                </div>
              </div>
              {/* Message Time */}
              <div className="text-[11px] text-gray-500">{message.time}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-3 bg-gray-50">
        <button
          className="w-full py-2 text-xs font-semibold text-center rounded-lg text-primary"
          onClick={closeDropdown}
        >
          View all
        </button>
      </div>
      {/* View All Button */}
    </div>
  );
};

export default InboxDropdown;
