"use client";
import React, { useState, useEffect } from "react";
import Statistics from "@/components/Home/Statistics/Statistics";
import Slider from "@/components/Home/Slider/Slider";
import DashboardCards from "@/components/Transactions/DashboardCards";
import AllAccounts from "@/components/Home/AllAccounts/AllAccounts";
import ActiveUsers from "@/components/Home/ActiveUsers/ActiveUsers";
import AllCards from "@/components/Home/AllCards/AllCards";
import Container from "@/components/Container/Container";
import TransactionList from "@/components/Transactions/List/List";
import  CompanyList from "@/components/Companies/List/List";
import FinancialsTable from "@/components/Companies/FinancialsTab/FinancialsTable";
import useApi from "@/hooks/useApi";
import ExchangeComponent from "@/components/Elements/Exchange/Exchange";
import { useUser } from "@/app/context/UserContext";
import DashboardCryptoTable from "@/components/Elements/DataTable/home/crypto";
import BalanceCard from "@/components/Elements/Cards/balance";
import CryptoDetailCard from "@/components/Home/DetailCard";
import CryptoSendModal from "@/components/Home/Modals/send";
import CryptoSendConfirmationModal from "@/components/Home/Modals/send-confirmation";
import CryptoReceiveModal from "@/components/Home/Modals/receive";
import CryptoExchangeModal from "@/components/Home/Modals/exchange";
import CryptoExchangeConfirmModal from "@/components/Home/Modals/receive-confirm";
import CryptoExchangeSuccessModal from "@/components/Home/Modals/swapped-confirmation";
import { COMPANY_ACCOUNT_TYPE, ROLE } from "@/shared/enums";

export default function HomePage() {
  const [companies, setCompanies] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [confirmationData, setConfirmationData] = useState(null);

  const [isOpenSendModal, setOpenSendModal] = useState(false);
  const [detailSideCard, setDetailSideCard] = useState(false);
  const [isOpenReceiveModal, setOpenReceiveModal] = useState(false);
  const [isOpenExchangeModal, setOpenExchangeModal] = useState(false);
  const [isOpenConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [isOpenSwappedConfirmModal, setOpenSwappedConfirmModal] =
    useState(false);
  const [isOpenExchangeConfirmModal, setOpenExchangeConfirmModal] =
    useState(false);

  const handleOpenSendModal = () => setOpenSendModal(true);
  const handleCloseSendModal = () => setOpenSendModal(false);
  const handleOpenReceiveModal = () => setOpenReceiveModal(true);
  const handleCloseReceiveModal = () => setOpenReceiveModal(false);
  const handleOpenExchangeModal = () => setOpenExchangeModal(true);
  const handleCloseExchangeModal = () => setOpenExchangeModal(false);
  const handleOpenConfirmationModal = (data) => {
    setConfirmationData(data); 
    setOpenConfirmationModal(true); 
  };
  const handleCloseConfirmationModal = () => {
    setOpenSendModal(false);
    setOpenConfirmationModal(false);
  }
  const handleOpenSwappedConfirmModal = () => setOpenSwappedConfirmModal(true);
  const handleCloseSwappedConfirmModal = () =>
    setOpenSwappedConfirmModal(false);
  const handleOpenExchangeConfirmModal = () => setOpenConfirmationModal(true);
  const handleCloseExchangeConfirmModal = () => setOpenConfirmationModal(false);

  const { fetchData, loading, error } = useApi();
  const { user } = useUser() ?? {};

  
  
  useEffect(() => {
    async function listCompanies() {
      const { result, error } = await fetchData(`/company/all`, {
        method: "GET",
      });
      if (error) {
        setCompanies([]);
      } else {
        setCompanies(result);
      }
    }

    async function listAccounts() {
      const { result, error } = await fetchData(`/account/all`, {
        method: "POST",
      });
      if (error) {
        setAccounts([]);
      } else {
        setAccounts(result);
      }
      
    }

    async function listTransactions() {
      const { result, error } = await fetchData(`/transaction/all`, {
        method: "POST",
      });
      if (error) {
        setTransactions([]);
      } else {
        setTransactions(result);
      }
    }


    if (user) {
      if (
        [ROLE.COMPANY_ADMINISTRATOR, ROLE.SUPER_ADMINISTRATOR].includes(
          user.role
        )
      ) {
        listCompanies();
      }

      if (
        [
          ROLE.END_USER,
          ROLE.SUPER_ADMINISTRATOR,
          ROLE.SUPER_USER,
          ROLE.COMPANY_USER,
          ROLE.COMPANY_ADMINISTRATOR,
        ].includes(user.role)
      ) {
        listAccounts();
      }

      if (
        [
          ROLE.END_USER,
          ROLE.COMPANY_USER,
          ROLE.COMPANY_ADMINISTRATOR,
        ].includes(user.role)
      ) {
        listTransactions();
      }
    }
    
  }, [user]);

  const [cardData, setCardData] = useState(null);
  const [cardTableData, setCardTableData] = useState(null);

   useEffect(() => {

    async function listAccounts() {
      const { result, error } = await fetchData(
        `/account/all/${cardTableData?.id}`,
        {
          method: "POST",
        }
      );
      if (error) {
        setCardData([]);
      } else {
        setCardData(result);
      }
    }

     if (cardTableData?.id) {
       listAccounts(); 
     }
   }, [cardTableData, accounts]);

   const handleSearch = (searchTerm) => {
     const filtered = cardData.filter((asset) =>
       cardData.name.toLowerCase().includes(searchTerm.toLowerCase())
     );
     setFilteredData(filtered);
   };
   
  return (
    <Container pageName={"Dashboard"}>
      {user?.company?.company_account_type == COMPANY_ACCOUNT_TYPE.HOLDING && (
        <div className="flex flex-col gap-y-2">
          <>
            <Slider />
            <DashboardCards />
            <AllAccounts />
            <AllCards />
            {/* Todo: This code is commented out for now due to client instructions but may be used again later */}
            {/* <div className="flex flex-row flex-wrap gap-2 pb-6 lg:flex-nowrap "> */}
            <CompanyList companies={companies} />
            {/* <ExchangeComponent /> */}
            {/* </div> */}
          </>
        </div>
      )}

      {user?.company?.company_account_type == COMPANY_ACCOUNT_TYPE.BANKING && (
        <div className="flex flex-col gap-y-2">
          <>
            <Slider />
            <DashboardCards />
            <AllAccounts />
            <AllCards />
            {/* Todo: This code is commented out for now due to client instructions but may be used again later */}
            {/* <div className="flex flex-row flex-wrap gap-2 pb-6 lg:flex-nowrap "> */}
            <TransactionList transactions={transactions} />
            {/* <ExchangeComponent /> */}
            {/* </div> */}
          </>
        </div>
      )}

      {user?.company?.company_account_type == COMPANY_ACCOUNT_TYPE.WEB3 && (
        <div className="flex flex-col gap-y-2">
          {(user?.role == ROLE.COMPANY_ADMINISTRATOR ||
            user?.role == ROLE.COMPANY_USER) && (
            <>
              <Slider />
              <DashboardCards />
              <AllAccounts />
              <AllCards />
              {/* Todo: This code is commented out for now due to client instructions but may be used again later */}
              {/* <div className="flex flex-row flex-wrap gap-2 pb-6 lg:flex-nowrap "> */}
              <TransactionList transactions={transactions} />
              {/* <ExchangeComponent /> */}
              {/* </div> */}
            </>
          )}
          {user?.role == ROLE.END_USER && (
            <>
              <div className="flex flex-col gap-2">
                <BalanceCard
                  data={accounts}
                  handleOpenConfirmationModal={handleOpenConfirmationModal}
                />
                <div className="grid grid-cols-12 gap-2">
                  <div
                    className={`${
                      detailSideCard
                        ? "hidden lg:block col-span-7 2xl:col-span-9"
                        : "col-span-12"
                    }`}
                  >
                    <DashboardCryptoTable
                      data={accounts}
                      title="Crypto"
                      isAddBtnVisible={false}
                      handleSearch={handleSearch}
                      setDetailSideCard={setDetailSideCard}
                      setOutput={setCardTableData}
                    />
                  </div>
                  <div
                    className={`col-span-12 lg:col-span-5 2xl:col-span-3 ${
                      !detailSideCard && "hidden"
                    }`}
                  >
                    <CryptoDetailCard
                      data={cardData}
                      setDetailSideCard={setDetailSideCard}
                      handleOpenSendModal={handleOpenSendModal}
                      onReceiveClick={handleOpenReceiveModal}
                      onExchangeClick={handleOpenExchangeModal}
                    />
                  </div>
                </div>
              </div>

              <CryptoSendModal
                data={cardData}
                accounts={accounts}
                isModalOpen={isOpenSendModal}
                onCloseModal={handleCloseSendModal}
                handleOpenConfirmationModal={(data) =>
                  handleOpenConfirmationModal(data)
                }
              />

              <CryptoSendConfirmationModal
                title="Send USDT"
                data={confirmationData}
                isModalOpen={isOpenConfirmationModal}
                onCloseModal={handleCloseConfirmationModal}
              />

              <CryptoReceiveModal
                data={cardData}
                isModalOpen={isOpenReceiveModal}
                onCloseModal={handleCloseReceiveModal}
                onContinueClick={handleOpenExchangeModal}
              />

              <CryptoExchangeModal
                title="Exchange"
                data={cardData}
                isModalOpen={isOpenExchangeModal}
                onCloseModal={handleCloseExchangeModal}
              />

              <CryptoExchangeConfirmModal
                title="Exchange BTC to USDT"
                data={cardData}
                isModalOpen={isOpenExchangeConfirmModal}
                onCloseModal={handleCloseExchangeConfirmModal}
              />

              <CryptoExchangeSuccessModal
                title="Exchange BTC to USDT"
                data={cardData}
                isModalOpen={isOpenSwappedConfirmModal}
                onCloseModal={handleCloseSwappedConfirmModal}
              />
            </>
          )}
        </div>
      )}
    </Container>
  );
}
