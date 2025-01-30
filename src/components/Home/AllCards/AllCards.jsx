"use client";
import AddCircle from "@/Icons/Add-circle";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import SearchBar from "@/components/Elements/search/SearchBar";
import SortModal from "@/components/Elements/SortModal/SortModal";
import NewAccountModal from "@/components/Accounts/Modals/NewAccountModal";
import SubTabNavigation from "@/components/Elements/TabNavigationBar/SubTabsNavigation";
import { useUser } from "@/app/context/UserContext";
import useApi from "@/hooks/useApi";
import { Toast } from "primereact/toast";
import Mastercard from "@/Icons/imageicon/Mastercard";
import Visa from "@/Icons/imageicon/Visa";
import { COMPANY_ACCOUNT_TYPE, ROLE, ASSET_TYPE } from "@/shared/enums";
import S3Image from "@/components/Elements/S3Image/S3Image";

const AllCards = ({user_id}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    sort: "balance",
    order: "desc",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("Virtual card");
  const [isModalOpen, setModalOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [assets, setAssets] = useState({});
  const { fetchData, loading, error } = useApi();
  const { user } = useUser() ?? {};
  const toast = useRef(null);
  const [fetchAssets, setFetchAssets] = useState(false);
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    async function listCards(user) {
      const { result, error } = await fetchData(`/card/all`, {
        method: "POST",
        body: {
          user_id: user.user_id
        }
      });
      if (error) {
        setCards([]);
      } else {
        setCards(result);
      }
      
    }

    async function listAssets(){
      const { result, error } = await fetchData(`/asset/all`, {
        method: "GET",
      });
      if (error) {
        setAssets([]);
      } else {
        setAssets(result);
      }
    }

    if (user && !fetchAssets) {
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
        listCards(user);
      }
    }
    
  }, [user]);
  
  const handleCreateCard = async (asset) => {
    const { result, error } = await fetchData(`/card/add`, {
      method: "POST",
      body: { asset_id: asset },
    });
    if (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Could not create an card for this asset",
        life: 3000,
      });
    } else {
      setCards(result);
    }
  };

  const sortBy = [
    {
      label: "Balance",
      value: "balance",
      type: "value",
    },
    {
      label: "Card name",
      value: "name",
      type: "text",
    },
  ];

  useEffect(() => {
    if (assets.length > 0) {
      setFilteredAssets(assets);
    }
  }, [assets, selectedType]);

  const handleSortChange = (sortData) => {
    setSortConfig(sortData);
    const _card = [...searchFilteredCards].sort((a, b) => {
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
    setSearchFilteredCards(_card)
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTypeSelection = (type) => {
    setSelectedType(type);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const subTabs = ["Virtual card", "Physical card"];

  // Filter cards based on search term
  const [searchFilteredCards, setSearchFilteredCards] = useState([])
  
  // Debounced search term state
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

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
    let _cards = [];
    if (selectedType === "Virtual card") {
      _cards = cards.filter((card) => card.type === "VIRTUAL");
    } else {
      _cards = cards.filter((card) => card.type !== "VIRTUAL");
    }

    if (debouncedSearchTerm !== "") {
      _cards = _cards.filter(
        (card) =>
          card?.card_detail?.name && card?.card_detail?.name
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase()) ||
          card?.card_detail?.desc && card?.card_detail?.desc
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase()) ||
          card?.card_detail?.currency && card?.card_detail?.currency
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase()) ||
          card.balance.toString().includes(debouncedSearchTerm)
      );
    }

    // Assuming you have a state to hold filtered cards
    setSearchFilteredCards(_cards);
  }, [debouncedSearchTerm, selectedType, cards]);

  // Get final sorted and filtered cards

  return (
    <>
      <div className="w-full p-4 h-auto bg-white border rounded-2xl border-primary50">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-textBlack">All Cards</h2>
          <div className="flex items-center gap-1 cursor-pointer sm:hidden">
            <AddCircle />
            <p className="font-normal text-xs text-textSecondary">Add card</p>
          </div>
        </div>
        {/* Header Section */}
        <div className="flex flex-wrap items-center mt-2 mb-2 justify-between gap-2 md:flex-nowrap md:space-y-0">
          <SubTabNavigation
            tabs={subTabs}
            width="min-w-[90px]"
            activeTab={selectedType}
            setActiveTab={setSelectedType}
          />
          <div className="flex justify-end w-full gap-2 py-0 pb-2">
            <SearchBar
              value={searchTerm}
              onValueChange={setSearchTerm}
              className="self-start w-full md:w-52"
              placeholder="Search cards..."
            />
            <SortModal
              sortBy={sortBy}
              position="right-2 w-auto"
              selected={sortConfig.sort}
              onChange={handleSortChange}
            />
          </div>
        </div>

        <div className="flex w-full gap-2 scrollbar-hide -mt-[8px]  overflow-auto">
          {searchFilteredCards.length > 0 &&
            searchFilteredCards.map((card) => (
              <Link
                key={card.id}
                className="w-[158px]"
                href={`/dashboard/accounts/card-details?type=${selectedType}`}
              >
                <div className="flex justify-start w-[158px] h-[6.3rem] p-4 bg-white border border-gray-200 rounded-2xl hover:cursor-pointer">
                  <div className="flex flex-col justify-between w-full">
                    <div className="flex flex-row items-center justify-between w-full gap-2">
                      <div className="w-full">
                        <div className="flex flex-row items-center justify-between w-full">
                          <p className="text-sm font-semibold text-textBlack text-nowrap">
                            {card?.card_detail?.name}
                          </p>
                          {card?.card_detail?.image}
                        </div>

                        <p className="text-[10px] text-textSecondary">
                          {card?.card_detail?.desc}
                        </p>
                      </div>
                    </div>
                    <p className="h-12 pt-4 text-sm font-semibold text-textBlack">
                      {card.balance && Number(card.balance).toFixed(2)}{" "}
                      <span className="text-gray-300">
                        {card?.card_detail?.currency}
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}

          <div
            onClick={openModal}
            className="flex justify-start h-[6.3rem] p-4 bg-white border border-primary w-[158px] rounded-2xl hover:cursor-pointer"
          >
            <div className="flex flex-col justify-between w-[158px]">
              <span className="flex items-center justify-center w-6 h-6 border border-primary text-primary rounded-full">
                +
              </span>
              <p className="text-sm font-semibold text-primary">New Card</p>
            </div>
          </div>
        </div>
      </div>
      <NewAccountModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        assets={filteredAssets}
        handleCreateAccount={handleCreateCard}
      />
      <Toast ref={toast} baseZIndex={9999} />
    </>
  );
};

export default AllCards;
