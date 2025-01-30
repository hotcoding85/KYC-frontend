/* eslint-disable @next/next/no-img-element */
"use client";
import AddCircle from "@/Icons/Add-circle";
import React, { useState, useEffect, useRef } from "react";
import SortModal from "@/components/Elements/SortModal/SortModal";
import NewAccountModal from "@/components/Accounts/Modals/NewAccountModal";
import Link from "next/link";
import SubTabNavigation from "@/components/Elements/TabNavigationBar/SubTabsNavigation";
import SearchBar from "@/components/Elements/search/SearchBar";
import { useUser } from "@/app/context/UserContext";
import useApi from "@/hooks/useApi";
import { Toast } from "primereact/toast";
import { COMPANY_ACCOUNT_TYPE, ROLE, ASSET_TYPE } from "@/shared/enums";
import S3Image from "@/components/Elements/S3Image/S3Image";

const AllAccounts = ({user_id}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    sort: "balance",
    order: "desc"
  });
  const [selectedType, setSelectedType] = useState("Fiat");
  const [isModalOpen, setModalOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [assets, setAssets] = useState({});
  const [filteredAssets, setFilteredAssets] = useState([]);
  const { fetchData, loading, error } = useApi();
  const { user } = useUser() ?? {};
  const toast = useRef(null);
  const [fetchAssets, setFetchAssets] = useState(false);
  const [accountList, setAccountList] = useState([]);
  
  useEffect(() => {
    async function listAccounts() {
      if (!user_id) {
        const { result, error } = await fetchData(`/account/all`, {
          method: "POST",
        });
        if (error) {
          setAccounts([]);
        } else {
          setAccounts(result);
        }
      } else {
        const { result, error } = await fetchData(`/account/user/${user_id}`, {
          method: "POST",
        });
        if (error) {
          setAccounts([]);
        } else {
         
          setAccounts(result);
        }
      }
    }

    async function listAssets() {
      const { result, error } = await fetchData(`/asset/all`, {
        method: "GET",
      });
      if (error) {
        setAssets([]);
      } else {
        setAssets(result);
      }
    }

    if ((user && !fetchAssets ) || user_id) {
      setFetchAssets(true);
      if (
        [
          ROLE.END_USER,
          ROLE.SUPER_ADMINISTRATOR,
          ROLE.SUPER_USER,
          ROLE.COMPANY_USER,
          ROLE.COMPANY_ADMINISTRATOR,
        ].includes(user.role)
      ) {
        listAssets();
        listAccounts();
      }
    }
  }, [user, user_id]);


  const sortBy = [
    {
      label: "Balance",
      value: "balance",
      type: "value"
    },
    {
      label: "Account name",
      value: "name",
      type: "text"
    }
  ];

  const handleSortChange = (sortData) => {
    setSortConfig(sortData);
    const _card = [...searchFilteredAccounts].sort((a, b) => {
      const { sort, order } = sortData;

      if (sort === "balance") {
        if (order === "desc") {
          return b.balance - a.balance; // Highest to Lowest
        } else {
          return a.balance - b.balance; // Lowest to Highest
        }
      }

      if (sort === "name") {
        const comparison = a?.card_detail?.name
          .toLowerCase()
          .localeCompare(b?.card_detail?.name.toLowerCase());
        return order === "desc" ? -comparison : comparison; // desc = A-Z, asc = Z-A
      }

      return 0;
    });
    setSearchFilteredAccounts(_card)
  };

  const handleCreateAccount = async (asset) => {
    const { result, error } = await fetchData(
      `/account/add`,
      {
        method: "POST",
        body: { asset_id: asset },
      },
    );
    if (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Could not create an account for this asset",
        life: 3000,
      });
    } else {
      if (!user_id) {
        const { result, error } = await fetchData(`/account/all`, {
          method: "POST",
        });
        if (error) {
          setAccounts([]);
        } else {
          setAccounts(result);
        }
      } else {
        const { result, error } = await fetchData(`/account/user/${user_id}`, {
          method: "POST",
        });
        if (error) {
          setAccounts([]);
        } else {
          setAccounts(result);
        }
      }
    }
  };

  useEffect(() => {
    if (assets.length > 0) {
      const filteredAssets = assets.filter((asset) => {
        if (selectedType.toLowerCase() === "fiat") {
          return asset.type === ASSET_TYPE.FIAT;
        } else if (selectedType.toLowerCase() === "crypto") {
          return (
            asset.type === ASSET_TYPE.CRYPTOCURRENCY ||
            asset.type === ASSET_TYPE.TOKEN
          );
        }
        return asset.type.toLowerCase().includes(selectedType.toLowerCase());
      });

      setFilteredAssets(filteredAssets);
    }
  }, [assets, selectedType]);

  const handleTypeSelection = async (type) => {
    if(assets.length > 0){
      const filteredAssets = assets.filter((asset) => {
        if (type.toLowerCase() === "fiat") {
          return asset.type === ASSET_TYPE.FIAT;
        } else if (type.toLowerCase() === "crypto") {
          return (
            asset.type === ASSET_TYPE.CRYPTOCURRENCY ||
            asset.type === ASSET_TYPE.TOKEN
          );
        }
        return asset.type.toLowerCase().includes(type.toLowerCase());
      });

      setFilteredAssets(filteredAssets);
      setSelectedType(type);
    }
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const subTabs = ["Fiat", "Crypto"];

  // Filter Accounts based on search term
  const [searchFilteredAccounts, setSearchFilteredAccounts] = useState([])
  
  // Debounced search term state
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  
  // Handler for search input
  const handleSearch = (value) => {
    setSearchTerm(value);
    const searchFilteredAccounts = accounts.filter((account) => {
      const searchLower = value.toLowerCase().trim();
      return (
        account.asset.toLowerCase().includes(searchLower) ||
        account.address.toLowerCase().includes(searchLower) ||
        account.balance?.toString().includes(searchLower)
      );
    });
  };

  const handler = useRef(null)
  useEffect(() => {
    handler.current && clearTimeout(handler.current);
    handler.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Adjust debounce time (300ms is common)
  }, [searchTerm]);

  useEffect(() => {
    // Cleanup function
    return () => {
      handler.current && clearTimeout(handler.current);
    };
  }, [])

  useEffect(() => {
    let _accounts = [];
    if (selectedType.toLowerCase() === "fiat") {
      _accounts = accounts.filter((account) => account.assetType === ASSET_TYPE.FIAT);
    } else {
      _accounts = accounts.filter((account) => account.assetType === ASSET_TYPE.CRYPTOCURRENCY ||
      account.assetType === ASSET_TYPE.TOKEN);
    }

    if (debouncedSearchTerm !== "") {
      _accounts = _accounts.filter((account) => {
        const searchLower = debouncedSearchTerm.toLowerCase().trim();
        return (
          account.asset.toLowerCase().includes(searchLower) ||
          account.address.toLowerCase().includes(searchLower) ||
          account.balance?.toString().includes(searchLower)
        );
      });
    }

    // Assuming you have a state to hold filtered Accounts
    setSearchFilteredAccounts(_accounts);
  }, [debouncedSearchTerm, selectedType, accounts]);

  // const filteredAndSortedAccounts = sortAccounts(searchFilteredAccounts);
  const getAddButtonText = () => selectedType === "Fiat" ? "New Account" : "New Wallet";

  return (
    <>
      <div className="w-full p-4 h-auto bg-white border rounded-2xl border-primary50">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-textBlack">All Accounts</h2>
          <div className="flex items-center gap-1 cursor-pointer sm:hidden">
            <AddCircle />
            <p className="font-normal text-xs text-textSecondary">
              Add account
            </p>
          </div>
        </div>
        {/* Header Section */}
        <div className="flex flex-wrap items-center mt-2 justify-between gap-2 md:flex-nowrap md:space-y-0">
          <SubTabNavigation
            tabs={subTabs}
            width="min-w-[80px]"
            activeTab={selectedType}
            setActiveTab={handleTypeSelection}
          />
          <div className="flex justify-end w-full gap-2 py-0 md:gap-2 pb-2">
            <SearchBar
              value={searchTerm}
              onValueChange={setSearchTerm}
              className="md:self-start w-full md:w-52"
              placeholder="Search accounts..."
            />
            <SortModal
              sortBy={sortBy}
              onChange={handleSortChange}
              selected={sortConfig.sort}
              position="right-2"
              className="h-8 w-auto"
            />
          </div>
        </div>

        <div className="flex gap-2 w-full scrollbar-hide whitespace-nowrap overflow-scroll max-w-[full]">
          {searchFilteredAccounts.length > 0 &&
            searchFilteredAccounts.map((account) => {
              return (
                <Link
                  key={account.id}
                  className="w-[158px]"
                  href={`/dashboard/accounts/account-details/${account.id}`}
                >
                  <div className="relative w-[158px] justify-between flex-shrink-0 p-4 bg-white border rounded-2xl border-primary50 scroll-auto h-[6.3rem]">
                    <div className="flex flex-row items-start justify-between">
                      <span className="w-20 h-12 text-xs font-semibold text-textBlack text-wrap">
                        {account.asset}
                      </span>
                      <div className="w-6 h-6">
                        <S3Image s3Url={account.icon}></S3Image>
                      </div>
                    </div>
                    <div className="flex items-end justify-start">
                      <p className="text-sm font-semibold text-textBlack">
                        {account.balance}{" "}
                        <span className="text-gray-300">{account.ticker}</span>
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}

          <div
            className="flex justify-start h-[6.3rem] p-4 bg-white border border-primary rounded-2xl w-[158px] hover:cursor-pointer"
            onClick={openModal}
          >
            <div className="flex flex-col justify-between w-[158px]">
              <span className="flex items-center justify-center w-6 h-6 border border-primary rounded-full text-primary">
                +
              </span>
              <p className="text-sm font-semibold text-primary">
                {getAddButtonText()}
              </p>
            </div>
          </div>
        </div>
      </div>
      <NewAccountModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        assets={filteredAssets}
        handleCreateAccount={handleCreateAccount}
      />
      <Toast ref={toast} baseZIndex={9999} />
    </>
  );
};

export default AllAccounts;
