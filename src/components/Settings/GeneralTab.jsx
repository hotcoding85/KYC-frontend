"use client";
import React, { useCallback, useState, useEffect } from "react";
import Switch from "react-switch";
import { ButtonsText, TextButton } from "../Elements/Button/Button";
import Modal from "../Modal/Modal";
import SearchBar from "../Elements/search/SearchBar";
import useApi from "@/hooks/useApi";
import { useUser } from "@/app/context/UserContext";
import Loading from "@/Icons/Loading";

export default function GeneralTab() {
  // State for each toggle switch
  const [allNotifications, setAllNotifications] = useState(false);
  const [news, setNews] = useState(false);
  const { user } = useUser();
  const [promotions, setPromotions] = useState(false);
  const { fetchData, loading, error } = useApi();
  // Handle toggle functions
  const handleToggleAll = (checked) => {
    setAllNotifications((prev) => checked);
    updateUserSetting(checked, news, promotions, selectedLanguage, selectedCurrency);
  };

  const handleToggleNews = (checked) => {
    setNews((prev) => checked);
    updateUserSetting(allNotifications, checked, promotions, selectedLanguage, selectedCurrency);
  };

  const handleTogglePromotions = (checked) => {
    setPromotions((prev) => checked);
    updateUserSetting(allNotifications, news, checked, selectedLanguage, selectedCurrency);
  };
  
  useEffect(() => {
    async function checkCurrentSetting() {
      console.log(user)
      if (!user) return
      const { result, error } = await fetchData(`/settings/${user.id}`, {
        method: "GET",
      });
      if (!error) {
        if (result.status === 'success') {
          if (!result.settings) {
            await saveInitalSetting(user.id)
          }
          else{
            setNews(result.settings.news)
            setPromotions(result.settings.promotions)
            setAllNotifications(result.settings.allNotifications)
            setSelectedCurrency(result.settings.preferredCurrency)
            setSelectedLanguage(result.settings.preferredLanguage)
          }
        }
      }
    }
    checkCurrentSetting()
  }, [user])
  
  const [isModalCOpen, setModalCOpen] = useState(false);
  const [isModalLOpen, setModalLOpen] = useState(false);
  const openCurrencyModal = () => setModalCOpen(true);
  const openLanguageModal = () => setModalLOpen(true);
  const closeCModal = () => setModalCOpen(false);
  const closeLModal = () => setModalLOpen(false);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedCurrency, setSelectedCurrency] = useState("BTC");
  
  // List of languages
  const languages = ["English", "Deutsch", "Italian", "Arabic"];
  const currency = ["BTC", "ETH", "BNB", "BCH"];
  
  const saveInitalSetting = useCallback(async (id) => {
    const { result, error } = await fetchData(`/settings/${id}`, {
      method: "POST",
      body: {
        allNotifications: allNotifications,
        news: news,
        promotions: promotions,
        preferredLanguage: selectedLanguage,
        preferredCurrency: selectedCurrency,
        userId: id
      }
    });
    if (!error) {
      if (result.status === 'success' && result.settings) {
        setNews(result.settings.news)
        setPromotions(result.settings.promotions)
        setAllNotifications(result.settings.allNotifications)
        setSelectedCurrency(result.settings.preferredCurrency)
        setSelectedLanguage(result.settings.preferredLanguage)
      }
    }
  }, [allNotifications, news, promotions, selectedLanguage, selectedCurrency])

  const updateUserSetting = useCallback(
    async (allNotifications, news, promotions, selectedLanguage, selectedCurrency) => {
      if (!user) return
      const { result, error } = await fetchData(`/settings/${user.id}`, {
        method: "PUT",
        body: {
          allNotifications: allNotifications,
          news: news,
          promotions: promotions,
          preferredLanguage: selectedLanguage,
          preferredCurrency: selectedCurrency,
        },
      });
  
      if (!error) {
        if (result.status === 'success' && result.settings) {
          setAllNotifications(result.settings.allNotifications);
          setNews(result.settings.news);
          setPromotions(result.settings.promotions);
          setSelectedCurrency(result.settings.preferredCurrency);
          setSelectedLanguage(result.settings.preferredLanguage);
        }
      }
    },
    [user]
  );
  // Handler for searching languages
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  // Handler for selecting a language
  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  // Filtered languages based on the search term
  const filteredLanguages = languages.filter((language) =>
    language.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredCurrencies = currency.filter((currency) =>
    currency.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Save selected language to DB

  const savePreferredLanguage = useCallback(() => {
    updateUserSetting(allNotifications, news, promotions, selectedLanguage, selectedCurrency);
    closeLModal()
  }, [selectedLanguage])
  // Save selected currency to DB
  const savePreferredCurrency = useCallback(() => {
    updateUserSetting(allNotifications, news, promotions, selectedLanguage, selectedCurrency);
    closeCModal()
  }, [selectedCurrency])
  return (
    <>
      <div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-primary50 text-textBlack">
          <h2 className=" mb-1 text-sm text-customgray font-semibold mb-1 leading-[20px] tracking-[-0.005em] text-left no-underline">
            Notifications
          </h2>
          <h2 className="mb-2 text-textSecondary text-xs font-normal leading-[16px] text-left no-underline">
            Control how and when you receive notifications from the app.
          </h2>
          <div>
            <div style={styles.toggleContainer}>
              <span className=" text-xs font-semibold text-textBlack leading-[16px] text-left no-underline">
                All Notifications
              </span>
              <Switch
                onChange={handleToggleAll}
                checked={allNotifications}
                onColor="#000"
                offColor="#ddd"
                uncheckedIcon={false}
                checkedIcon={false}
                handleDiameter={14}
                height={18.29}
                width={32}
                disabled={loading}
                borderRadius={28.57}
              />
            </div>
            <hr className="my-4" />
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xs font-semibold text-textBlack leading-[16px] text-left no-underline">
                  News
                </h3>
                <Switch
                  onChange={handleToggleNews}
                  checked={news}
                  onColor="#000"
                  offColor="#ddd"
                  uncheckedIcon={false}
                  checkedIcon={false}
                  handleDiameter={14}
                  height={18.29}
                  width={32}
                  disabled={loading}
                  borderRadius={28.57}
                />
              </div>
              <p className="mb-2 text-textSecondary text-xs font-normal leading-[16px] text-left no-underline">
                Enable this to receive the latest updates and insights in the
                fintech industry and your app features.
              </p>
            </div>
            <hr className="my-4" />
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xs font-semibold text-textBlack leading-[16px] text-left no-underline">
                  Promotions
                </h3>
                <Switch
                  onChange={handleTogglePromotions}
                  checked={promotions}
                  onColor="#000"
                  offColor="#ddd"
                  uncheckedIcon={false}
                  checkedIcon={false}
                  handleDiameter={14}
                  height={18.29}
                  width={32}
                  disabled={loading}
                  borderRadius={28.57}
                />
              </div>
              <p className="text-textSecondary text-xs font-normal">
                Enable this to get exclusive offers and discounts from your app
                and its partners.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-primary50 mt-2">
          <h2 className=" mb-2 text-sm text-customgray font-semibold mb-1 leading-[20px] tracking-[-0.005em] text-left no-underline">
            Preferences
          </h2>
          <p className="mb-4  text-textSecondary text-xs font-normal leading-[16px] text-left no-underline">
            Choose preferred currency and preferred language.
          </p>
          <div className="flex items-center flex-row justify-between gap-4">
            <div className="flex items-center flex-row gap-4">
              <span className=" text-xs font-semibold text-textBlack leading-[16px] text-left no-underline">
                Preferred Language
              </span>
              <p className="text-xs font-normal text-textSecondary">
                {selectedLanguage}
              </p>
            </div>

            <ButtonsText
              width="w-20"
              title="Change"
              disabled={loading}
              onClick={openLanguageModal}
              className={
                "h-8 text-xs rounded-[10px] bg-primary text-white py-1 sm:py-2 px-4 "
              }
            />
          </div>

          <hr className="my-4" />

          <div className="flex items-center flex-row justify-between gap-4">
            <div className="flex items-center flex-row gap-4">
              <span className="text-xs font-semibold text-textBlack  leading-[16px] text-left no-underline">
                Preferred Currency
              </span>
              <p className="text-xs font-normal text-textSecondary">
                {selectedCurrency}
              </p>
            </div>
            <ButtonsText
              width="w-20"
              title="Change"
              disabled={loading}
              onClick={openCurrencyModal}
              className={
                "h-8 text-xs rounded-[10px] bg-primary text-white py-1 sm:py-2 px-5"
              }
            />
          </div>
        </div>
      </div>

      {/* Preferred Language Modal Body */}
      <Modal
        isOpen={isModalLOpen}
        onClose={closeLModal}
        title="Languages"
        size="xl"
        headerClassName="p-2"
        contentClassName="p-0"
      >
        {/* Modal Body */}
        <div className="p-4">
          <SearchBar
            value={searchTerm}
            onValueChange={(value) => {
              handleSearchChange(value);
            }}
          />

          {/* List of Languages */}
          <div className="flex flex-col gap-2 py-2 text-sm">
            {filteredLanguages.map((language) => (
              <label
                key={language}
                className="flex items-center text-sm space-x-2 cursor-pointer"
              >
                <input
                  type="radio"
                  value={language}
                  checked={selectedLanguage === language}
                  onChange={handleLanguageChange}
                  className="form-radio text-textBlack focus:ring-black accent-black"
                />
                <span className="text-textBlack">{language}</span>
              </label>
            ))}
          </div>
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end p-4 border-t gap-2 sm:gap-4">
          <TextButton
            title="Cancel"
            type="secondary"
            width="max-w-[114px] w-full"
            onClick={closeLModal}
            textColor="text-textBlack"
            backgroundColor="bg-white"
            className={"py-1 sm:py-2 px-4"}
            borderColor="border border-primary50"
          />
          <TextButton
            title="Apply"
            type="primary"
            width="max-w-[114px] w-full"
            onClick={savePreferredLanguage}
            className={"py-1 sm:py-2 px-4"}
          />
        </div>
      </Modal>

      {/* Preferred Currency Modal Body */}
      <Modal
        isOpen={isModalCOpen}
        onClose={closeCModal}
        title="Preferred Currency"
        size="xl"
        headerClassName="p-2"
        contentClassName="p-0"
      >
        {/* Modal Body */}
        <div className="p-4">
          <SearchBar
            value={searchTerm}
            onValueChange={(value) => {
              handleSearchChange(value);
            }}
          />

          {/* List of Languages */}
          <div className="flex flex-col py-2 gap-2 ">
            {filteredCurrencies.map((currency) => (
              <label
                key={currency}
                className="flex items-center space-x-2 cursor-pointer text-sm"
              >
                <input
                  type="radio"
                  value={currency}
                  checked={selectedCurrency === currency}
                  onChange={handleCurrencyChange}
                  className="form-radio text-textBlack focus:ring-black accent-black"
                />
                <span className="text-textBlack">{currency}</span>
              </label>
            ))}
          </div>
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end p-4 border-t gap-2 sm:gap-4">
          <TextButton
            title="Cancel"
            type="secondary"
            width="max-w-[114px] w-full"
            onClick={closeCModal}
            textColor="text-textBlack"
            backgroundColor="bg-white"
            borderColor="border border-primary50"
            className={"py-1 sm:py-2 px-4"}
          />
          <TextButton
            title="Apply"
            type="primary"
            width="max-w-[114px] w-full"
            onClick={savePreferredCurrency}
            className={"py-1 sm:py-2 px-4"}
          />
        </div>
      </Modal>
    </>
  );
}

// Styling
const styles = {
  toggleContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  description: {
    color: "#666",
    margin: "5px 0 0",
  },
};
