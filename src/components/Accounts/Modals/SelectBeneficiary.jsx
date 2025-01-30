import React, { useState, useEffect } from "react";
import Modal from "@/components/Elements/Modal/Modal";
import Search from "@/Icons/Search";
import useApi from "@/hooks/useApi";
import S3Image from "@/components/Elements/S3Image/S3Image";

const SelectBeneficiaryModal = ({ isModalOpen, closeModal, setSelectedBeneficiary }) => {
  const { fetchData, loading, error } = useApi();
  const [searchTerm, setSearchTerm] = useState("");
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  
  async function fetchListBeneficiary() {
    const { result, error } = await fetchData(`/beneficiary/all`, {
      method: "POST",
      body: {}
    });
    if (error) {
      setBeneficiaries([]);
      setFilteredItems([]);
    } else {
      let filteredBeneficiary = result;
      setBeneficiaries(filteredBeneficiary);
      setFilteredItems(filteredBeneficiary);
    }
  }

  useEffect(() => {
    if (beneficiaries.length == 0) {
      fetchListBeneficiary();
    }
  }, []);
  

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      title="Select Beneficiary"
      size="lg"
    >
      <div className="p-4">
        <div className="flex items-center h-8 p-3 pr-3 mb-4 text-xs border border-gray-300 rounded-2xl">
          <Search />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full ml-2 border-none outline-none"
          />
        </div>

        {/* List of Beneficiaries */}
        <div className="space-y-2">
          {beneficiaries.map((beneficiary, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedBeneficiary(beneficiary);
                closeModal();
              }}
              className="flex items-center py-4 space-x-3 border-b cursor-pointer"
            >
              <S3Image
                s3Url={beneficiary?.avatar}
                className="w-4 h-4 rounded-full"
              ></S3Image>
              <span className="text-xs font-semibold">
                {beneficiary?.full_name}
              </span>
            </div>
          ))}
        </div>

        {/* Add New Beneficiary Option */}
        <div
          onClick={() => {
            // Handle adding a new beneficiary
          }}
          className="flex items-center justify-start w-full mt-5 space-x-2 cursor-pointer"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 22.5C6.201 22.5 1.5 17.7975 1.5 12C1.5 6.2025 6.201 1.5 12 1.5C17.799 1.5 22.5 6.2025 22.5 12C22.5 17.7975 17.799 22.5 12 22.5ZM12 0C5.37225 0 0 5.37 0 12C0 18.63 5.37225 24 12 24C18.6278 24 24 18.63 24 12C24 5.37 18.6278 0 12 0ZM16.5 11.25H12.75V7.5C12.75 7.0875 12.4148 6.75 12 6.75C11.5852 6.75 11.25 7.0875 11.25 7.5V11.25H7.5C7.08525 11.25 6.75 11.5875 6.75 12C6.75 12.4125 7.08525 12.75 7.5 12.75H11.25V16.5C11.25 16.9125 11.5852 17.25 12 17.25C12.4148 17.25 12.75 16.9125 12.75 16.5V12.75H16.5C16.9147 12.75 17.25 12.4125 17.25 12C17.25 11.5875 16.9147 11.25 16.5 11.25Z"
              fill="#14151A"
            />
          </svg>
          <span className="text-xs font-semibold">Add new Beneficiary</span>
        </div>
      </div>
    </Modal>
  );
};

export default SelectBeneficiaryModal;
