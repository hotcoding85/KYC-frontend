import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <span
        className="inline-block w-5 h-5 bg-black rounded-full animate-pulse opacity-90 scale-50"
        style={{ animationDelay: "0s" }}
      ></span>
      <span
        className="inline-block w-5 h-5 bg-black rounded-full animate-pulse opacity-90 scale-50"
        style={{ animationDelay: "0.2s" }}
      ></span>
      <span
        className="inline-block w-5 h-5 bg-black rounded-full animate-pulse opacity-90 scale-50"
        style={{ animationDelay: "0.4s" }}
      ></span>
    </div>
  );
};

export default Loader;
