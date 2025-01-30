import React, { useState } from "react";
import Button from "@/components/Elements/Button/Button";
import Modal from "@/components/Elements/Modal/Modal";
import Search from "@/Icons/Search";
import AllCash from "@/Icons/CrytpoAssets/AllCash";
import Dollar from "@/Icons/CrytpoAssets/Dollar";
import AusDollar from "@/Icons/CrytpoAssets/AusDollar";

const NewFiatModal = ({ isModalOpen, closeModal }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const languages = [
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
      icon: <AusDollar className="w-4 h-4" />,
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
        title="Add a new account"
        customWidth="max-w-[96%] sm:max-w-lg"
      >
        {/* Modal Body */}
        <div className="p-4">
          {/* Search Input */}
         
          <div className="flex items-center mb-4 border border-gray-300 rounded-[10px]  pr-3 p-3 h-8 text-xs">
            <Search/>
            <input
              type="text"
              value={searchTerm}
              placeholder="Search"
              onChange={handleSearchChange}
              className="ml-2 border-none outline-none w-full"
            />
          </div>

          {/* List of Languages */} 
          <div className="space-y-2 max-h-[32rem] overflow-scroll px-2">
            {filteredLanguages.map((language, index) => (
              <label
                key={index} // Ensure key is unique
                className="flex items-center justify-between w-full py-4 space-x-2 border-b cursor-pointer"
              >
                <div className="flex flex-row items-center space-x-2">
                  {language.icon}
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold">
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
                    className="form-radio text-textBlack focus:ring-black accent-black"
                  />
                </div>
              </label>
            ))}
          </div>
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end px-4 py-2 gap-2 border-t">
          <Button
            title="Cancel"
            className={"h-8 text-xs bg-white text-textBlack"}
            onClick={closeModal}
          />
          <Button
            title="Create account"
            className={" h-8 text-xs bg-primary text-white"}
          />
        </div>
      </Modal>
    </>
  );
};

export default NewFiatModal;
