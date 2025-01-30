import React from "react";

export default function Tag({ status, text, width, height, className }) {
  return (
    <div
      className={`${className} h-7 px-3 py-1 rounded-full ${width || "w-24"} ${
        height || ""
      } text-center content-center text-xs font-medium ${
        status === "success"
          ? "bg-successLight text-success"
          : status === "warning"
          ? "bg-warningLight text-warning"
          : status === "danger"
          ? "bg-warningLight text-alert"
          : "bg-gray-100 text-gray-600"
      }`}
    >
      {text}
    </div>
  );
}