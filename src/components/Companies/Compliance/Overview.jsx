"use client";
import Copy from "@/Icons/Copy";
import { useState } from "react";

export default function Overview() {
  const [progress] = useState(50);
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const activities = [
    {
      id: 1,
      status: "Pending Approval",
      description: "Watwallet LLC has submitted Proof of Address and is awaiting your approval.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15.7333" cy="15.7333" r="15.3913" stroke="#E9E9E9" strokeWidth="0.684058" />
          <path
            d="M10.8553 10.2023H19.7596V16.5793H20.8726V9.04297H9.74219V22.956H15.862V21.7966H10.8553V10.2023Z"
            fill="#14151A"
          />
          <path
            d="M11.8242 11.1289H18.7808V12.3115H11.8242V11.1289ZM11.8242 13.4942H17.6213V14.6767H11.8242V13.4942ZM11.8242 15.8592H15.3025V17.0418H11.8242V15.8592ZM19.3604 17.0419C17.7595 17.0419 16.4618 18.3656 16.4618 19.9985C16.4618 21.6313 17.7595 22.955 19.3604 22.955C20.9612 22.955 22.259 21.6313 22.259 19.9985C22.259 18.3656 20.9614 17.0419 19.3604 17.0419ZM19.3604 21.7723C18.4014 21.7723 17.6213 20.9765 17.6213 19.9985C17.6213 19.0203 18.4015 18.2247 19.3604 18.2247C20.3194 18.2247 21.0995 19.0205 21.0995 19.9985C21.0996 20.9765 20.3194 21.7723 19.3604 21.7723Z"
            fill="#14151A"
          />
          <path
            d="M19.8453 18.7852H18.7852V19.9524L20.126 20.8721L20.8721 20.351L19.8453 19.6467V18.7852Z"
            fill="#14151A"
          />
        </svg>
      ),
      time: "2m",
      bgColor: "bg-orange-100",
    },
    {
      id: 2,
      status: "File uploaded",
      description: "Your file has successfully been uploaded",
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="15.6522" stroke="#E9E9E9" strokeWidth="0.695652" />
          <path
            d="M15.0914 17.9647V20.1734C15.0914 20.3705 15.1553 20.5358 15.283 20.6694C15.4108 20.803 15.5687 20.8695 15.7568 20.8691C15.9453 20.8691 16.1035 20.8023 16.2312 20.6687C16.359 20.5351 16.4226 20.37 16.4222 20.1734V17.9647L17.0211 18.5908C17.0876 18.6604 17.1626 18.7125 17.246 18.7473C17.3294 18.7821 17.4125 18.7967 17.4955 18.7911C17.5784 18.7851 17.6587 18.7647 17.7364 18.7299C17.814 18.6951 17.8861 18.643 17.9526 18.5734C18.0746 18.4343 18.1385 18.272 18.1442 18.0864C18.15 17.9009 18.0861 17.7386 17.9526 17.5995L16.2226 15.7908C16.156 15.7212 16.0839 15.6721 16.0063 15.6433C15.9287 15.6146 15.8455 15.6 15.7568 15.5995C15.6681 15.5995 15.5849 15.6141 15.5073 15.6433C15.4296 15.6725 15.3576 15.7217 15.291 15.7908L13.561 17.5995C13.4279 17.7386 13.3642 17.9009 13.37 18.0864C13.3758 18.272 13.445 18.4343 13.5776 18.5734C13.7107 18.7009 13.8659 18.7677 14.0434 18.7738C14.2208 18.7798 14.3761 18.713 14.5092 18.5734L15.0914 17.9647ZM11.7644 22.956C11.3984 22.956 11.085 22.8197 10.8242 22.547C10.5633 22.2743 10.4332 21.9469 10.4336 21.5647V10.4343C10.4336 10.0517 10.564 9.72401 10.8248 9.45132C11.0857 9.17862 11.3989 9.04251 11.7644 9.04297H16.5386C16.7161 9.04297 16.8853 9.07775 17.0463 9.14732C17.2074 9.21688 17.3487 9.31543 17.4702 9.44297L20.6974 12.8169C20.8194 12.9444 20.9136 13.0924 20.9802 13.2607C21.0467 13.4291 21.08 13.6058 21.08 13.7908V21.5647C21.08 21.9473 20.9496 22.275 20.6887 22.5477C20.4279 22.8204 20.1147 22.9565 19.7492 22.956H11.7644ZM16.4222 13.2169C16.4222 13.414 16.4861 13.5793 16.6138 13.7129C16.7416 13.8464 16.8995 13.913 17.0876 13.9125H19.7492L16.4222 10.4343V13.2169Z"
            fill="#14151A"
          />
        </svg>
      ),
      time: "14h",
      bgColor: "bg-successLight",
    },
  ];

  return (
    <div className="space-y-2">
      {/* Compliance Status */}
      <div className="p-4 bg-white border rounded-2xl border-primary50">
        <h2 className="mb-4 text-sm font-semibold leading-5 tracking[-0.005em] text-left">Compliance Status</h2>
        <div className="flex flex-wrap items-center md:flex-nowrap gap-x-2 gap-y-2 md:gap-y-0">
          <p className="font-normal text-wrap md:text-nowrap text-xs leading-4 text-left">
            Up Next:{" "}
            <span className="font-semibold text-wrap md:text-nowrap text-xs leading-4 text-left">Company is yet to submit Proof of Address</span>
          </p>
          <div className="flex items-center w-full space-x-2">
            <div className="relative w-full h-2 overflow-hidden bg-gray-200 rounded-full">
              <div className="absolute top-0 left-0 h-full bg-success" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-sm">{progress}%</p>
            <div className="w-4 h-4 border-2 border-gray-300 rounded-full animate-spin border-t-transparent"></div>
          </div>
        </div>
      </div>
      {/*Basic Information<  */}
      <div className="p-4 bg-white border shadow-sm border-primary50 rounded-2xl">
        <h2 className="mb-4 text-sm font-semibold leading-5 tracking[-0.005em] text-left">Basic Information</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="space-y-3">
            <div>
              <p className="mb-2 text-xs font-medium text-textSecondary leading-4 text-left mb-2">Company Name</p>
              <p className="text-xs font-semibold text-textBlack leading-4 text-left mb-2">Tech Innovations Inc</p>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-textSecondary leading-4 text-left mb-2">Phone Number</p>
              <div className="flex items-center">
                <p className="text-xs font-semibold text-textBlack leading-4 text-left mb-2 text-blue-500">+971 786 7966</p>
                <button onClick={() => handleCopy("+971 786 7966")} className="ml-2">
                  <Copy />
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="mb-2 text-xs font-medium text-textSecondary leading-4 text-left mb-2">Website URL</p>
              <div className="flex items-center">
                <p className="text-xs font-semibold text-textBlack leading-4 text-left mb-2 text-blue-500">www.techcin.io</p>
                <button onClick={() => handleCopy("+971 786 7966")} className="ml-2">
                  <Copy />
                </button>
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-textSecondary leading-4 text-left mb-2">Address</p>
              <p className="text-xs font-semibold text-textBlack leading-4 text-left mb-2">Al Khail Gate, Al Quoz 4, Dubai, United Arab Emirates</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="mb-2 text-xs font-medium text-textSecondary leading-4 text-left mb-2">Business Email Address</p>
              <div className="flex items-center">
                <p className="text-xs font-semibold text-textBlack leading-4 text-left mb-2 text-blue-500">hello@techinc.io</p>
                <button onClick={() => handleCopy("hello@techinc.io")} className="ml-2">
                  <Copy />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="p-4 bg-white border shadow-sm border-primary50 rounded-2xl">
        <h2 className="mb-4 text-sm font-semibold leading-5 tracking[-0.005em] text-left">Recent Activity</h2>
        <p className="mb-4 text-xs text-gray-500">Today</p>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className={`flex items-center justify-between ${index !== activities.length - 1 && "pb-4 border-b"}`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full`}>
                  <span className="text-xl">{activity.icon}</span> {/* Icon placeholder */}
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium text-textBlack leading-5 tracking-[-0.005em] text-left">{activity.status}</p>
                  <p className="text-xs text-textLight font-normal leading-4 text-left">{activity.description}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
