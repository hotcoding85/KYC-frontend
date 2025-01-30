import Image from "next/image";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

const ContactItem = ({
  name,
  spent,
  day,
  avatar,
  verified,
  favIcon,
  onClick,
  isLast,
}) => {
  return (
    <div
      className={`flex flex-row justify-between w-full ${isLast && "border-b"}`}
    >
      <div
        className={`w-full flex items-center p-2 cursor-pointer`}
        onClick={onClick}
      >
        <Image
          src={"/assets/images/alice.png"}
          alt={name}
          width={32}
          height={32}
          className="object-cover mr-4 rounded-full"
        />
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold text-textBlack">
            {name}{" "}
            {verified && (
              <Image
                src={"/assets/icons/mask.svg"}
                alt="verified"
                width={14}
                height={14}
              />
            )}
          </p>
          <div className="flex justify-between gap-2">
            <p className="text-[#A5A5B2] font-normal  text-xs">{spent}</p>
          </div>
        </div>
      </div>

      {!favIcon ? (
        <p className="text-[#A5A5B2] font-normal  mx-4 text-xs">{day}</p>
      ) : (
        <div className="my-auto">
          <FaChevronRight className="w-2.5 h-2.5 text-textBlack" />
        </div>
      )}
    </div>
  );
};

export default ContactItem;
