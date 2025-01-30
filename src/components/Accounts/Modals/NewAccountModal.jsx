import React, { useState } from "react";
import Button from "@/components/Elements/Button/Button";
import Modal from "@/components/Elements/Modal/Modal";
import Search from "@/Icons/Search";
import S3Image from "@/components/Elements/S3Image/S3Image";

const NewAccountModal = ({
  isModalOpen,
  closeModal,
  assets,
  handleCreateAccount,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAssetSelection = (asset) => {
    setSelectedAsset(asset);
  };

  // Filter the assets based on the search term
  const filteredAssets = assets && assets.filter((asset) =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateAccountClick = async () => {
    setIsLoading(true);
    try {
      await handleCreateAccount(selectedAsset.asset_id);
      closeModal();
    } catch (error) {
      console.error("Error creating account:", error);
      // Handle error here (e.g., show an error message to the user)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      title="Add a new account"
      size="lg"
    >
      <div className="p-4">
        <div className="flex items-center mb-4 border border-gray-300 rounded-[10px]  pr-3 p-3 h-8 text-xs">
          <Search />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="ml-2 border-none outline-none w-full w-full"
          />
        </div>

        <div className="space-y-2 max-h-[32rem] overflow-scroll px-2">
          {filteredAssets.map((asset) => (
            <label
              key={asset.id}
              className="flex items-center space-x-2 cursor-pointer w-full justify-between gap-4"
            >
              <div className="flex flex-row items-center space-x-2">
                <S3Image className="size-6 rounded-full" s3Url={asset.icon} />
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">
                    {asset.name}
                  </span>
                  <span className="text-xs  text-textSecondary">
                    {asset.ticker}
                  </span>
                </div>
              </div>
              <div>
                <input
                  type="radio"
                  value={asset.id}
                  checked={selectedAsset && selectedAsset.id === asset.id}
                  onChange={() => handleAssetSelection(asset)}
                  className="form-radio text-textBlack focus:ring-black"
                />
              </div>
            </label>
          ))}
        </div>
      </div>
      <div className="flex justify-end p-4 border-t space-x-4">
        <Button
          title="Cancel"
          className="h-8 text-xs bg-white text-textBlack"
          onClick={closeModal}
          disabled={isLoading}
        />
        <Button
          title={isLoading ? "Creating..." : "Create Account"}
          className=" h-8 text-xs bg-primary text-white"
          disabled={!selectedAsset || isLoading}
          onClick={handleCreateAccountClick}
        >
          {isLoading && (
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {isLoading ? "Creating..." : "Create Account"}
        </Button>
      </div>
    </Modal>
  );
};

export default NewAccountModal;
