import React, { useState } from "react";
import Button, { TextButton } from "@/components/Elements/Button/Button";
import Modal from "@/components/Elements/Modal/Modal";
import Search from "@/Icons/Search";
import AllCash from "@/Icons/CrytpoAssets/AllCash";
import Dollar from "@/Icons/CrytpoAssets/Dollar";
import AusDollar from "@/Icons/CrytpoAssets/AusDollar";
import useIsMobile from "@/hooks/useIsMobile";

const SpendingCurrenciesModal = ({ isModalOpen, closeModal }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useIsMobile(); // Using the custom hook to detect mobile screen

  const languages = [
    {
      name: "All cash accounts",
      amount: "19.85 usd",
      value: "cash",
      icon: <AllCash className="w-4 h-4"  />,
    },
    {
      name: "US Dollar",
      amount: "USD",
      value: "usd",
      icon: <Dollar className="w-6 h-6" />,
    },
    {
      name: "Australian Dollar",
      amount: "AUD",
      value: "aud",
      icon: <AusDollar className="w-4 h-4"  />,
    },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState("All cash accounts");

  // Update the state correctly for radio input change
  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value); // Use e.target.value to capture the selected value
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Should be e.target.value for input change
  };

  // Filter the list of languages based on the search term
  const filteredLanguages = languages.filter((language) =>
    language.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Spend from"
        size={isMobile ? "md" : "2xl"}
      >
        {/* Modal Body */}
        <div className="p-4">
          {/* Search Input */}
          <div className="flex items-center px-3 h-10 pr-3 mb-4 border border-gray-300 rounded-2xl">
            <Search />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full ml-2 h- border-none outline-none placeholder:text-xs"
            />
          </div>

          {/* List of Languages */}
          <div className="space-y-2">
            {filteredLanguages.map((language, index) => (
              <label
                key={index} // Ensure key is unique
                className="flex items-center justify-between w-full py-4 space-x-2 border-b cursor-pointer"
              >
                <div className="flex flex-row items-center space-x-2">
                  {language.icon}
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">
                      {language.name}
                    </span>
                    <span className="text-[11px] text-textSecondary">
                      {language.amount}
                    </span>
                  </div>
                </div>
                <div>
                  <input
                    type="radio"
                    value={language.name} // Use language.name as the value for the radio button
                    checked={selectedLanguage === language.name}
                    onChange={handleLanguageChange}
                    className="w-5 h-5 form-radio text-textBlack focus:ring-black accent-black" // Adjust width and height with w-6 h-6
                  />
                </div>
              </label>
            ))}
          </div>
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end p-4 space-x-4 border-t">
          <TextButton
            title="Cancel"
            className={"bg-white text-textBlack h-10 "}
            onClick={closeModal}
          />
          <TextButton title="Continue" className={"bg-black text-white h-10"} />
        </div>
      </Modal>
    </>
  );
};

export default SpendingCurrenciesModal;
