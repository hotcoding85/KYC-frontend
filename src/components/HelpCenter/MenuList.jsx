import Image from "next/image";
import Search from "@/Icons/Search";
import SearchBar from "../Elements/search/SearchBar";
import { useState } from "react";

const MenuList = ({ menuItems, selectedTopic, handleMenuClick }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter menu items based on search term
  const filteredMenuItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex items-center justify-center mx-auto">
      <div className="md:w-[70%] w-full p-4 bg-white shadow-lg rounded-2xl">
        <div className="mb-2">
          <h2 className="mb-2 text-sm font-semibold text-textBlack">
            Select a topic:
          </h2>
          <SearchBar
            value={searchTerm}
            onValueChange={(value) => setSearchTerm(value)}
            className="w-full"
            inputClassName="w-full"
            placeholder="Search topics..."
          />
        </div>
        <div className="flex flex-col gap-2">
          {filteredMenuItems.length > 0 ? (
            filteredMenuItems.map((item, index) => (
              <div
                key={index}
                className={`h-10 flex items-center text-xs cursor-pointer gap-2 ${
                  selectedTopic === item.name ? "bg-gray-100" : ""
                } hover:bg-gray-200 ${
                  index !== filteredMenuItems.length - 1 ? "border-b" : ""
                }`}
                onClick={() => handleMenuClick(item.name)}
              >
                {/* <Image
                  className="mr-2"
                  width={25}
                  height={25}
                  src={item.icon}
                  alt={item.name}
                /> */}
                <div className="flex items-center justify-center border border-primary50 rounded-full p-2">
                  {item.icon}
                </div>

                <span className="font-semibold">{item.name}</span>
              </div>
            ))
          ) : (
            <div className="py-4 text-center text-sm text-gray-500">
              No matching topics found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuList;
