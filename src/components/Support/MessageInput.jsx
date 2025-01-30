import AddMessage from "@/Icons/AddMessage";
import HappyEmoji from "@/Icons/HappyEmoji";
import MessageSend from "@/Icons/MessageSend";
import React, { useState, useRef } from "react";

const MessageInput = ({
  onMessageSend,
  placeholder = "Your message",
  maxLength = 1000,
  disabled = false,
}) => {
  const [message, setMessage] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled && !isComposing) {
      onMessageSend(message.trim());
      setMessage("");
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between p-1.5 bg-white rounded-[10px] shadow-sm border border-gray-200 sm:m-4 m-2 h-10">
        <div className="flex items-center w-10/12">
          {/* Attachment Button */}
          <button type="button" className="flex items-center justify-center ">
            <AddMessage />
          </button>

          {/* Message Input */}
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            placeholder={placeholder}
            maxLength={maxLength}
            disabled={disabled}
            className="flex-1 px-2 sm:px-4  text-gray-700 bg-transparent border-none outline-none placeholder-gray-400"
          />
        </div>

        <div className="flex items-center justify-end w-2/12">
          {/* Emoji Button */}
          <button
            type="button"
            className="flex items-center justify-center w-8 h-8 text-gray-500 mr-2"
          >
            <HappyEmoji />
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!message.trim() || disabled || isComposing}
            className="flex items-center px-2 sm:px-4 py-1 h-8 full text-xs sm:py-2 bg-black text-white rounded-[10px] sm:space-x-2"
          >
            <span className="hidden sm:inline">Send</span>
            <MessageSend />
          </button>
        </div>
      </div>
    </form>
  );
};

export default MessageInput;
