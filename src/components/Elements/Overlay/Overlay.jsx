import React from "react";

export default function Overlay({ message }){
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-semibold text-gray-800">{message}</h2>
      </div>
    </div>
  );
};

