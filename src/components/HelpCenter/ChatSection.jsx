import Chat from "@/Icons/Chat";
import Image from "next/image";

const ChatSection = ({ onStartChat }) => {
  return (
    <div className="flex items-center justify-center mx-auto">
      <div
        className="md:w-[70%] w-full p-4 mt-3 bg-white shadow-lg rounded-2xl cursor-pointer"
        onClick={onStartChat}
      >
        <h2 className="mb-2 text-sm font-semibold">Requests</h2>
        <div className="flex gap-1 h-10 items-center">
          <div className="flex items-center justify-center border border-primary50 rounded-full p-2 mr-1">
            <Chat className=" w-[15px] h-[15px]" />
          </div>
          <p className="my-auto text-sm font-semibold">Start new chat</p>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
