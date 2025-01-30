import MobileNav from "@/components/Layout/MobileNav";
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Home/SideBar/SideBar"; // Sidebar component
import TopBar from "@/components/Home/TopBar/TopBar"; // TopBar component
import useIsMobile from "@/hooks/useIsMobile"; // Import the custom hook
import CryptoDetailCard from "@/components/Home/DetailCard";
import CryptoSendModal from "@/components/Home/Modals/send";
import CryptoSendConfirmationModal from "@/components/Home/Modals/send-confirmation";
import CryptoReceiveModal from "@/components/Home/Modals/receive";
import CryptoExchangeModal from "@/components/Home/Modals/exchange";
import CryptoExchangeConfirmModal from "@/components/Home/Modals/receive-confirm";
import CryptoExchangeSuccessModal from "@/components/Home/Modals/swapped-confirmation";
import { useModal } from "@/app/context/ModalContext";
import BottomNav from "../BottomNav/BottomNav";

const Layout = ({ children, pageName }) => {
  const {
    isOpenSendModal,
    isOpenReceiveModal,
    isOpenExchangeModal,
    isOpenExchangeConfirmModal,
    isOpenConfirmationModal,
    isOpenSwappedConfirmModal,
    handleCloseSendModal,
    handleCloseReceiveModal,
    handleCloseExchangeModal,
    handleCloseConfirmationModal,
    handleOpenSwappedConfirmModal,
    handleCloseSwappedConfirmModal,
    handleOpenExchangeConfirmModal,
    handleCloseExchangeConfirmModal,
  } = useModal();

  const isMobile = useIsMobile();

  // Check if the sidebar state is saved in localStorage, otherwise default to true
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") {
      const savedSidebarState = localStorage.getItem("isSidebarOpen");
      return savedSidebarState ? JSON.parse(savedSidebarState) : true;
    }
    return true;
  });

  // Handle sidebar toggle and store the state in localStorage
  const toggleSidebar = () => {
    const newSidebarState = !isSidebarOpen;
    setIsSidebarOpen(newSidebarState);
    if (typeof window !== "undefined") {
      localStorage.setItem("isSidebarOpen", JSON.stringify(newSidebarState));
    }
  };

  // Effect to sync the sidebar state with localStorage when the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSidebarState = localStorage.getItem("isSidebarOpen");
      if (isMobile) {
        setIsSidebarOpen(false);
        localStorage.setItem("isSidebarOpen", JSON.stringify(false));
      } else if (savedSidebarState !== null) {
        setIsSidebarOpen(JSON.parse(savedSidebarState));
      }
    }
  }, [isMobile]);

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 z-20 hidden h-full md:block">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      <BottomNav />

      {/* Content Wrapper */}
      <div
        className={`flex flex-col h-full sm:h-screen transition-all duration-300 md:ml-24 md:w-[calc(100%-18rem)] ${
          isSidebarOpen && !isMobile
            ? "md:ml-72 w-full md:w-[calc(100%-18rem)]"
            : "md:ml-24 w-full md:w-[calc(100%-6rem)]"
        }`}
      >
        {/* TopBar */}
        <div className="fixed top-0 left-0 z-10 w-full">
          <TopBar isSidebarOpen={isSidebarOpen} pageName={pageName} />
        </div>
        {/*<div className="fixed bottom-0 left-0 z-20 h-full sm:hidden">*/}
        {/*  <MobileNav />*/}
        {/*</div>*/}
        {/* Main Content */}
        <div className="w-full px-[5px] pt-[74px] pb-2 h-screen overflow-auto bg-lightGrey">
          {children}
        </div>
      </div>

      {/* Modal */}
      <CryptoSendModal
        title="Send USDT"
        isModalOpen={isOpenSendModal}
        onCloseModal={handleCloseSendModal}
        handleOpenConfirmationModal={handleOpenExchangeConfirmModal}
      />
      <CryptoSendConfirmationModal
        title="Send USDT"
        isModalOpen={isOpenConfirmationModal}
        onCloseModal={handleCloseConfirmationModal}
      />
      <CryptoReceiveModal
        title="Receive"
        isModalOpen={isOpenReceiveModal}
        onCloseModal={handleCloseReceiveModal}
        onContinueClick={() => setOpenExchangeModal(true)}
      />
      <CryptoExchangeModal
        title="Exchange"
        isModalOpen={isOpenExchangeModal}
        onCloseModal={handleCloseExchangeModal}
      />
      <CryptoExchangeConfirmModal
        title="Exchange BTC to USDT"
        isModalOpen={isOpenExchangeConfirmModal}
        onCloseModal={handleCloseExchangeConfirmModal}
      />
      <CryptoExchangeSuccessModal
        title="Exchange BTC to USDT"
        isModalOpen={isOpenSwappedConfirmModal}
        onCloseModal={handleCloseSwappedConfirmModal}
      />
    </div>
  );
};

export default Layout;
