import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import Button from "@/components/Elements/Button/Button";
import InboxDropdown from "./InboxDropdown";
import ProfileDropdown from "./ProfileDropdown";
import NotificationsDropdown from "./NotificationsDropdown";
import Bell from "@/Icons/Bell";
import Messages from "@/Icons/messages";
import Contacts from "@/Icons/Contacts";
import ArrowDown from "@/Icons/ArrowDown";
import SearchBar from "@/components/Elements/search/SearchBar";
import AccountDropdown from "./AccountsDropdown";
import Modal from "@/components/Modal/Modal";
import { FaChevronDown } from "react-icons/fa";
import { TextButton } from "@/components/Elements/Button/Button";
import Crypto from "@/Icons/Crypto";
import Fait from "@/Icons/Fait";
import Profile from "@/Icons/imageicon/Profile";
import Vector from "@/Icons/Vector";
import Logo from "@/Icons/Union";
import { messaging } from '@/utils/firebaseConfig';
import CurrencyDropdown from "@/components/Elements/DropDown/CurrencyDropdown";

const TopBar = ({ isSidebarOpen, pageName }) => {
  const { user, notifications, getNotifications } = useUser();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const topBarRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState();
  const userId = useRef()
  useEffect(() => {
    setSelectedAccount(`${user?.first_name} ${user?.last_name} - Personal`);
    userId.current = user?.user_id
  },[user])

  const toggleDropdown = (dropdown) => {
    setIsOpen(false);
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
    setMenuOpen(false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCryptoModalOpen, setIsCryptoModalOpen] = useState(false);
  const [isFiatModalOpen, setIsFiatModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

  const [depositAsset, setDepositAddress] = useState(false);
  const [withdrawAsset, setWithdrawAsset] = useState(false);
  // Methods to open modals
  const openDepositModal = () => setIsDepositModalOpen(true);
  const openMainModal = () => setIsModalOpen(true);

  // Methods to close modals
  const closeDepositModal = () => setIsDepositModalOpen(false);
  const closeCryptoModal = () => setIsCryptoModalOpen(false);
  const closeFiatModal = () => setIsFiatModalOpen(false);
  // Methods to handle opening of nested modals and closing the main modal
  const openCryptoModal = () => {
    setIsModalOpen(false);
    setIsCryptoModalOpen(true);
  };

  const openFiatModal = () => {
    setIsModalOpen(false);
    setIsFiatModalOpen(true);
  };

  const depositSelect = (selectedAsset) => {
    setDepositAddress(selectedAsset);
  }

  const withdrawSelect = (selectedAsset) => {
    setWithdrawAsset(selectedAsset);
  };

  const openAccount = () => {
    router.push(`/dashboard/accounts`);
    setIsCryptoModalOpen(false);
  }

  // State management for deposit modals
  const [isCryptoDepositModalOpen, setIsCryptoDepositModalOpen] =
    useState(false);
  const [isFiatDepositModalOpen, setIsFiatDepositModalOpen] = useState(false);

  // Open specific modals and close the main modal
  const openCryptoDepositModal = () => {
    setIsDepositModalOpen(false);
    setIsCryptoDepositModalOpen(true);
  };

  const openFiatDepositModal = () => {
    setIsDepositModalOpen(false);
    setIsFiatDepositModalOpen(true);
  };

  // Close specific modals
  const closeCryptoDepositModal = () => {
    setIsCryptoDepositModalOpen(false);
  };

  const closeFiatDepositModal = () => {
    setIsFiatDepositModalOpen(false);
  };

  const [notificationsData, setNotificationsData] = useState([])

  useEffect(() => {
    notifications && setNotificationsData(notifications)
  }, [notifications])
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (topBarRef.current && !topBarRef.current.contains(event.target)) {
        closeAllDropdowns();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    // This handler listens for foreground notifications
    messaging.onMessage((payload) => {
      console.log('Message received. ', payload);
      getNotifications(userId.current)
    });
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      messaging.onMessage(() => {}); // Cleanup when component unmounts
    };
  }, []);


  return (
    <div
      ref={topBarRef}
      className="flex flex-row gap-3 h-[64px] items-center p-4 bg-white border-b border-gray-200 lg:w-full"
    >
      <div
        className={`${
          isSidebarOpen ? "w-6/12 lg:pl-[295px]" : "w-1/5 lg:pl-[110px] "
        } items-center gap-2 hidden md:flex`}
      >
        <h1 className="hidden text-sm font-semibold sm:block text-start text-textBlack text-nowrap">
          {pageName}
        </h1>
        <SearchBar className={"w-[208px]"} inputClassName="w-full" onValueChange={() => {}} />
      </div>

      <div className="flex items-center justify-between w-full gap-2 md:justify-end">
        <div className="flex md:hidden">
          <Logo className="w-24" />
        </div>
        <div className="hidden md:flex gap-1 mr-1 text-xs">
          <TextButton
            title="Deposit"
            textColor="text-primary"
            backgroundColor="bg-lightGrey"
            width="w-[88px]"
            className="text-xs font-normal border-[1px] border-primary bg-white py-1 px-4"
            onClick={openDepositModal}
          />
          <TextButton
            title="Withdraw"
            textColor="text-primary"
            backgroundColor="bg-lightGrey"
            width="w-[88px]"
            className="text-xs font-normal border-[1px] border-primary bg-white py-1 px-4"
            onClick={openMainModal}
          />
          <TextButton
            title="Exchange"
            textColor="text-primary"
            backgroundColor="bg-lightGrey"
            width="w-[88px]"
            className="text-xs font-normal border-[1px] border-primary bg-white py-1 px-4"
            onClick={() => router.push("/dashboard/exchange")}
          />
        </div>
        <button
          onClick={() => {
            setActiveDropdown(null);
            setIsOpen(!isOpen);
          }}
          className="flex items-center justify-between whitespace-nowrap h-8 px-4 py-3 text-xs text-gray-800 transition-colors bg-white border border-gray-200 rounded-[10px] hover:border-gray-300"
        >
          <span className="text-xs">{selectedAccount}</span>
          <span className="ml-2">
            <svg
              width="8"
              height="6"
              viewBox="0 0 8 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 5.46654L0 1.46654L0.933333 0.533203L4 3.59987L7.06667 0.533203L8 1.46654L4 5.46654Z"
                fill="#4D4D4D"
              />
            </svg>
          </span>
        </button>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center h-8 gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg md:hidden hover:bg-gray-50"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Actions</span>
            <FaChevronDown className="w-2 h-2 text-gray-500" />
          </div>
        </button>

        <div
          className="flex items-center justify-center w-10 h-10 overflow-hidden border text-white  rounded-full cursor-pointer "
          onClick={() => toggleDropdown("messages")}
        >
          <div>
            <Messages></Messages>
          </div>
        </div>
        <div className="relative">
          <div
            className="flex items-center justify-center w-10 h-10 overflow-hidden border text-white  rounded-full cursor-pointer "
            onClick={() => toggleDropdown("notifications")}
          >
            <div>
              <Bell></Bell>
            </div>
            {notificationsData.filter((notify) => notify.isUnread).length !==
              0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-alert rounded-full">
                {notificationsData.filter((notify) => notify.isUnread).length}
              </span>
            )}
          </div>
        </div>
        <div
          className="flex items-center justify-center w-10 h-10 overflow-hidden border text-white  rounded-full cursor-pointer "
          onClick={() => {
            router.push(`/dashboard/beneficiaries`);
          }}
        >
          <Contacts></Contacts>
        </div>
        <div
          className="flex items-center justify-center w-10 h-10 overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white  rounded-full cursor-pointer "
          onClick={() => toggleDropdown("profile")}
        >
          <div>
            <span className="text-sm font-semibold">
              {`${user?.first_name?.[0] || ""}${
                user?.last_name?.[0] || ""
              }`.toUpperCase()}
            </span>
          </div>
          <div className="hidden">
            <ArrowDown />
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="absolute p-4 space-y-2 bg-white border border-gray-300 shadow-lg md:hidden top-16 right-24 rounded-xl">
          <button className="block w-full px-4 py-2 text-left">Deposit</button>
          <button className="block w-full px-4 py-2 text-left">Withdraw</button>
          <button className="block w-full px-4 py-2 text-left">Exchange</button>
        </div>
      )}

      {activeDropdown === "profile" && (
        <ProfileDropdown closeDropdown={closeAllDropdowns} />
      )}
      {activeDropdown === "notifications" && (
        <NotificationsDropdown
          closeDropdown={closeAllDropdowns}
          notificationsData={notificationsData}
        />
      )}
      {isOpen && (
        <AccountDropdown
          closeDropdown={() => setIsOpen(false)}
          selectedAccount={selectedAccount}
          setSelectedAccount={setSelectedAccount}
          accounts={[
            {
              id: 1,
              name: `${user?.first_name || ""} ${user?.last_name || ""}`,
              type: "Personal",
            },
          ]}
        />
      )}
      {activeDropdown === "messages" && (
        <InboxDropdown closeDropdown={closeAllDropdowns} />
      )}

      {/* Deposit Modal */}
      {/* Main Deposit Modal */}
      <Modal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        title="Deposit"
        customWidth="max-w-md w-full"
        contentClassName="p-0"
      >
        <div className="flex flex-col space-y-4 pt-4">
          <button
            className="flex items-center justify-between w-full p-4 border-b hover:bg-gray-100"
            onClick={openCryptoDepositModal}
          >
            <div className="flex items-center space-x-2">
              <Crypto className="w-8 h-8" />
              <div>
                <p className="text-xs font-semibold text-start">Crypto</p>
                <p className="text-xs text-gray-500 text-start">
                  Deposit cryptocurrency directly to your wallet.
                </p>
              </div>
            </div>
            <span>
              <Vector className="w-[5.94px] h-[10.81px]" />
            </span>
          </button>
          <button
            className="flex items-center justify-between w-full p-4 hover:bg-gray-100"
            onClick={openFiatDepositModal}
          >
            <div className="flex items-center space-x-2">
              <Fait className="w-8 h-8" />
              <div>
                <p className="text-xs font-semibold text-start">Fiat</p>
                <p className="text-xs text-gray-500 text-start">
                  Deposit traditional currency through bank transfer or card.
                </p>
              </div>
            </div>
            <span>
              <Vector className="w-[5.94px] h-[10.81px]" />
            </span>
          </button>
        </div>
        <div className="flex justify-end p-4 border-t border-primary50">
          <Button
            title="Close"
            className="h-8 w-[114px] rounded-[10px] bg-primary text-xs font-normal border-[1px] border-primary50 text-white"
            onClick={() => setIsDepositModalOpen(false)}
          />
        </div>
      </Modal>

      {/* Crypto Deposit Modal */}
      <Modal
        isOpen={isCryptoDepositModalOpen}
        onClose={closeCryptoDepositModal}
        title="Deposit Crypto"
        customWidth="max-w-md w-full"
        contentClassName="p-0"
      >
        <div className="p-4">
          <label className="block mb-2 text-xs font-medium">Currency</label>
          <CurrencyDropdown
            type="CRYPTOCURRENCY"
            selectedItem={depositAsset}
            onSelect={depositSelect}
          ></CurrencyDropdown>
        </div>
        <div className="flex justify-end p-4 border-t">
          <Button
            title="Close"
            className="h-8 w-[114px] mt-3 rounded-[10px] bg-primary text-xs font-normal border-[1px] border-primary50 text-white"
            onClick={closeCryptoDepositModal}
          />
        </div>
      </Modal>

      {/* Fiat Deposit Modal */}
      <Modal
        isOpen={isFiatDepositModalOpen}
        onClose={closeFiatDepositModal}
        title="Deposit Fiat"
        customWidth="max-w-md w-full"
        contentClassName="p-0"
      >
        <div className="p-4">
          <label className="block mb-2 text-xs font-medium">Currency</label>
          <CurrencyDropdown
            type="FIAT"
            selectedItem={depositAsset}
            onSelect={depositSelect}
          ></CurrencyDropdown>
        </div>
        <div className="flex justify-end p-4 border-t">
          <Button
            title="Close"
            className="h-8 w-[114px] mt-3 rounded-[10px] bg-primary text-xs font-normal border-[1px] border-primary50 text-white"
            onClick={closeFiatDepositModal}
          />
        </div>
      </Modal>
      {/* Main Withdraw Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Withdraw"
        customWidth="max-w-md w-full"
        contentClassName="p-0"
      >
        <div className="flex flex-col space-y-4">
          <button
            className="flex items-center justify-between w-full p-4 border-b hover:bg-gray-100"
            onClick={() => {
              setIsModalOpen(false);
              setIsCryptoModalOpen(true);
            }}
          >
            <div className="flex items-center space-x-2">
              <Crypto className="w-8 h-8" />
              <div>
                <p
                  className="text-xs font-semibold text-start"
                  onClick={openCryptoModal}
                >
                  Crypto
                </p>
                <p className="text-xs text-gray-500 text-start">
                  Withdraw cryptocurrency from your wallet.
                </p>
              </div>
            </div>
            <span>
              <Vector className="w-[5.94px] h-[10.81px]" />
            </span>
          </button>
          <button
            className="flex items-center justify-between w-full p-4 border-b hover:bg-gray-100"
            onClick={() => {
              setIsModalOpen(false);
              setIsFiatModalOpen(true);
            }}
          >
            <div className="flex items-center space-x-2">
              <Fait className="w-8 h-8" />
              <div>
                <p
                  onClick={openFiatModal}
                  className="text-xs font-semibold text-start"
                >
                  Fiat
                </p>
                <p className="text-xs text-gray-500 text-start">
                  Withdraw traditional currency to your bank account or card.
                </p>
              </div>
            </div>
            <span>
              <Vector className="w-[5.94px] h-[10.81px]" />
            </span>
          </button>
        </div>
        <div className="flex justify-end p-4">
          <Button
            title="Close"
            className="h-8 w-[114px] rounded-[10px] bg-primary text-xs font-normal border-[1px] border-primary50 text-white"
            onClick={() => setIsModalOpen(false)}
          />
        </div>
      </Modal>

      {/* Crypto Withdraw Modal */}
      <Modal
        isOpen={isCryptoModalOpen}
        onClose={closeCryptoModal}
        title="Withdraw Crypto"
        customWidth="max-w-md w-full"
        contentClassName="p-0"
      >
        <div className="p-4">
          <label className="block mb-2 text-xs font-medium">Currency</label>
          <CurrencyDropdown
            type="CRYPTOCURRENCY"
            selectedItem={withdrawAsset}
            onSelect={withdrawSelect}
          ></CurrencyDropdown>
        </div>
        <div className="flex justify-end p-4 border-t">
          <Button
            title="Continue"
            className="h-8 w-[114px] mt-3 rounded-[10px] bg-primary text-xs font-normal border-[1px] border-primary50 text-white"
            onClick={() => {
              openAccount();
            }}
          />
        </div>
      </Modal>

      {/* Fiat Withdraw Modal */}
      <Modal
        isOpen={isFiatModalOpen}
        onClose={closeFiatModal}
        title="Withdraw Fiat"
        customWidth="max-w-md w-full"
        contentClassName="p-0"
      >
        <div className="p-4">
          <label className="block mb-2 text-xs font-medium">Currency</label>
          <CurrencyDropdown
            type="FIAT"
            selectedItem={withdrawAsset}
            onSelect={withdrawSelect}
          ></CurrencyDropdown>
        </div>
        <div className="flex justify-end p-4 border-t">
          <Button
            title="Continue"
            className="h-8 w-[114px] mt-3 rounded-[10px] bg-primary text-xs font-normal border-[1px] border-primary50 text-white"
            onClick={() => {
              openAccount();
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default TopBar;
