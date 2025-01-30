import React, { useState, useEffect, useRef } from "react";
import Button from "@/components/Elements/Button/Button";
import Link from "next/link";
import Search from "@/Icons/Search";
import SortModal from "@/components/Elements/SortModal/SortModal";
import S3Image from "@/components/Elements/S3Image/S3Image";
import useApi from "@/hooks/useApi";
import { Toast } from "primereact/toast";
import NewAccountModal from "./NewAccountModal";
import { useParams } from "next/navigation";

// AccountTypeSelector component
const AccountTypeSelector = ({ selectedType, handleTypeSelection }) => (
  <div className="flex gap-2">
    <Button
      onClick={() => handleTypeSelection("FIAT")}
      title="Fiat"
      className={`rounded-[10px px-4 h-8 border text-xs ${
        selectedType === "FIAT" ? "border-primary border" : "border-primary50"
      } text-gray-800`}
    />
    <Button
      onClick={() => handleTypeSelection("DIGITAL")}
      title="Crypto"
      className={`rounded-[10px] h-8 border text-xs ${
        selectedType === "DIGITAL"
          ? "border-primary border"
          : "border-primary50"
      } text-gray-800`}
    />
  </div>
);

// SearchBar component
const SearchBar = ({
  searchTerm,
  setSearchTerm,
  inputClassName,
  className,
}) => (
  <div
    className={`items-center hidden h-8 text-xs p-2 border lg:flex border-primary50 rounded-[10px] ${className}`}
  >
    <Search className="md:w-52 self-start" />
    <input
      type="text"
      placeholder="Search"
      className={`custom-placeholder ml-2 mb-[0px] ${inputClassName} text-textSecondary`}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
);

// AccountCard component
const AccountCard = ({ account, selectedType }) => (
  // <Link
  //   href={`/dashboard/accounts/account-details?type=${selectedType}&id=${account.account_id}`}
  //   className="w-full md:w-52"
  // >
  //   <div className="relative justify-between flex-shrink-0 p-4 bg-white border rounded-2xl border-primary50 scroll-auto h-[6.3rem]">
  //     <div className="flex flex-row items-start justify-start">
  //       {/* <img className="w-6 h-6 mr-3" src={account.asset.icon} alt="" /> */}
  //       <S3Image
  //         className="w-6 h-6 mr-3 rounded-full"
  //         s3Url={account?.asset?.icon}
  //       />
  //       <span className="w-8 h-12 text-sm font-semibold text-textBlack">
  //         {account?.asset?.name}
  //       </span>
  //     </div>
  //     <div className="flex items-end justify-start">
  //       <p className="text-sm font-semibold text-textBlack">
  //         {account?.balance?.toFixed(2)}{" "}
  //         <span className="text-gray-300">{account.asset.ticker}</span>
  //       </p>
  //     </div>
  //   </div>
  // </Link>

  <Link
    href={`/dashboard/accounts/account-details?type=${selectedType}&id=${account.account_id}`}
    key={account.id}
    className="w-full md:w-[158px]"
  >
    <div className="relative w-full justify-between flex-shrink-0 p-4 bg-white border rounded-2xl border-primary50 scroll-auto h-[6.3rem]">
      <div className="flex flex-row items-start ">
        <S3Image className="w-6" s3Url={account?.asset?.icon} />
        <span className="w-8 h-12 text-sm font-semibold text-textBlack ml-1">
          {account?.asset?.name}{" "}
          <i className="text-xs">{account?.network?.name}</i>
        </span>
      </div>

      <div className="flex items-end justify-start">
        <p className="text-sm font-semibold text-textBlack">
          {account?.balance?.toFixed(2)}{" "}
          <span className="text-gray-300">{account.asset.ticker}</span>
        </p>
      </div>
    </div>
  </Link>
);

// NewAccountCard component
const NewAccountCard = ({ openModal }) => (
  <div
    className="flex justify-start h-[6.3rem] p-4 bg-white border border-gray-200 rounded-2xl w-full md:w-[158px] hover:cursor-pointer"
    onClick={openModal}
  >
    <div className="flex flex-col justify-between">
      <span className="flex items-center justify-center w-6 h-6 border border-black rounded-full text-textBlack ">
        +
      </span>
      <p className="text-sm font-semibold text-textBlack">New Wallet</p>
    </div>
  </div>
);

const CompanyAccounts = ({ accountsList, fetchAccounts }) => {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("Balance");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedType, setSelectedType] = useState("FIAT");
  const [isModalOpen, setModalOpen] = useState(false);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [assets, setAssets] = useState([]);
  const { fetchData, loading, error } = useApi();
  const toast = useRef(null);
  const param = useParams();
  const companyId = param.id;

  const sortBy = [
    { label: "Balance", value: "Balance", type: "value" },
    { label: "Account name", value: "Account name", type: "text" },
  ];

  const handleSortChange = ({ sort, order }) => {
    setSortOption(sort);
    setSortOrder(order);
  };

  const handleTypeSelection = (type) => setSelectedType(type);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const fetchAssets = async () => {
    const { result, error } = await fetchData("/asset/all", { method: "GET" });
    if (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to fetch assets. Please try again later.",
        life: 3000,
      });
    }
    if (result) {
      setAssets(result);
    }
  };

  const createAccount = async (assetId) => {
    const { result, error } = await fetchData("/account", {
      method: "POST",
      body: {
        companyId: companyId,
        assetId: assetId,
      },
    });
    if (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to create account. Please try again later.",
        life: 3000,
      });
    }

    if (result) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Account has been created successfully.",
        life: 3000,
      });
      fetchAccounts();
    }
  };

  useEffect(() => {
    const filtered = accountsList.filter((account) => {
      const matchesType =
        selectedType === "DIGITAL"
          ? ["NFT", "CRYPTOCURRENCY", "TOKEN"].includes(account.asset.type)
          : account.asset.type === selectedType;
  
      const matchesSearch = account.asset.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase());    
      
      return matchesType && matchesSearch;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortOption === "Balance") {
        return sortOrder === "desc"
          ? b.balance - a.balance
          : a.balance - b.balance;
      } else {
        return sortOrder === "desc"
          ? b.asset.name.localeCompare(a.asset.name)
          : a.asset.name.localeCompare(b.asset.name);
      }
    });
    
    setFilteredAccounts(sorted);
  }, [accountsList, selectedType, searchTerm, sortOption, sortOrder]);

  useEffect(() => {
    fetchAssets();
  }, []);

  // Filter assets based on selectedType
  const filteredAssets = assets.filter((asset) => asset.type === selectedType);

  return (
    <>
      <Toast ref={toast} />
      <div className="w-full p-4 h-auto mg:h-[12.5rem] space-y-1 bg-white border rounded-2xl border-primary50">
        <h2 className="font-semibold text-sm leading-[20px] tracking-[-0.005em] text-textBlack text-left mb-1">
          All Accounts
        </h2>
        <div className="flex flex-wrap items-center md:!mt-0 justify-between gap-2 md:flex-nowrap md:space-y-0">
          <AccountTypeSelector
            selectedType={selectedType}
            handleTypeSelection={handleTypeSelection}
          />
          <div className="flex flex-col justify-end w-full gap-2 py-0 md:flex-row md:pb-2">
            <SearchBar
              className="md:w-52 self-start"
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <SortModal
              sortBy={sortBy}
              onChange={handleSortChange}
              selected={sortOption}
              position="right-2"
            />
          </div>
        </div>
        <div className="flex flex-wrap w-full gap-2 scrollbar-hide !mt-1 whitespace-nowrap">
          {filteredAccounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              selectedType={selectedType}
            />
          ))}
          <NewAccountCard openModal={openModal} />
        </div>
      </div>
      <NewAccountModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        assets={filteredAssets}
        handleCreateAccount={createAccount}
        selectedType={selectedType}
      />
    </>
  );
};

export default CompanyAccounts;
