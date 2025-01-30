"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import Container from "@/components/Container/Container";
import useApi from "@/hooks/useApi";
import ArrowDown from "@/Icons/ArrowDown";
import Button, { TextButton } from "@/components/Elements/Button/Button";
import TopBar from "@/components/Accounts/TopBar/TopBar";
import Add from "@/Icons/Add";
import Gear from "@/Icons/Gear";
import { useUser } from "@/app/context/UserContext";
import Setting from "@/Icons/Setting";
import Freeze from "@/Icons/Freeze";
import UpDownArros from "@/Icons/UpDownArrows";
import Minus from "@/Icons/Minus";
import Copy from "@/Icons/Copy";
import Back from "@/Icons/Back";
import FinancialsTable from "@/components/Companies/FinancialsTab/FinancialsTable";
import Btc from "@/Icons/imageicon/Btc";
import CryptoDropdown from "@/components/Otc/CryptoDropDown";
import { ASSET_TYPE } from "@/shared/enums";

export default function AccountsDetails() {
  const router = useRouter();
  const params = useParams();
  const { user } = useUser();
  const [account, setAccount] = useState({});
  const [accounts, setAccounts] = useState([]);
  const [type, setType] = useState([]);
  const account_id = params.id;
  
  const { fetchData, loading, error } = useApi();
  const handleOnSelectOption = (option) => {
    console.log(option);
    setOption(option);
  };
  const handleOnEditOption = () => setOption("Edit");

  useEffect(() => {
    async function listAccounts() {
      const { result, error } = await fetchData(
        `/account/all/`,
        {
          method: "POST",
        }
      );
      if (error) {
        setAccounts([]);
      } else {
        const allAccounts = result.map((account) => ({
          id: account.id,
          name: account.asset,
          logo: account.icon,
        }));
        setAccounts(allAccounts);
      }
    }

    async function getAccount() {
      const { result, error } = await fetchData(`/account/all/${account_id}`, {
        method: "POST",
      });
      if (error) {
        setAccount({});
      } else {
        setAccount(result);
        setSelectedCurrency(result.asset);
        setType(result.assetType == ASSET_TYPE.FIAT ? 'fiat' : 'crypto');
      }
    }
    if(account_id){
      getAccount();
      listAccounts();
    }
  }, [account_id]);

  const goBack = () => {
    router.push("/dashboard/account");
    setOption("");
  };

  async function fetchAccountData() {
    const { result, error } = await fetchData(`/account/all/${account_id}`, {
      method: "POST",
    });
    if (error) {
      setAccount({});
    } else {
      setAccount(result);
    }
  }

  const searchParams = useSearchParams();
  const initialOption = searchParams.get("option") ? searchParams.get("option") : '';
  const [option, setOption] = useState(initialOption);
  const [userData, setUserData] = useState();

  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleCurrencySelect = (currency) => {
    console.log(currency);
    const newUrl = `/dashboard/accounts/account-details/${currency}`;
    router.push(newUrl);
  };
  
  // const currencies = [
  //   { name: "BTC", logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
  //   {
  //     name: "USD",
  //     logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
  //   },
  // ];

  const [dummyData, setDummyData] = useState([
    {
      id: "302012",
      name: "Received",
      amount: 100,
      toFrom: "AUC346..YU76",
      created_at: "01/08/24",
      currency: "Credit",
    },
    {
      id: "302013",
      name: "Sent",
      amount: 200,
      toFrom: "john.watwallet",
      created_at: "02/08/24",
      currency: "Debit",
    },
  ]);

  return (
    <Container pageName={"Accounts"}>
      <Suspense>
        <div className="flex flex-col gap-y-2">
          <TopBar
            option={option}
            onEdit={handleOnEditOption}
            userData={user}
            onEditSave={() => {
              submitFunctionRef.current.submitFormData();
            }}
            onSave={() => {
              submitFunctionRef.current.submitFormData();
            }}
            fetchAccountData={fetchAccountData}
            goBack={goBack}
            isAdd={option === "Add"}
          />
          <div className="p-4 overflow-x-auto bg-white border border-primary50 rounded-2xl">
            <div className="space-y-1">
              <div className="flex items-center">
                {/* <Btc className="w-6" />
                <div className="flex flex-col">
                  <p className="flex flex-row items-center ml-1 text-sm font-semibold">
                    <span className="mr-2">Bitcoin Wallet</span>
                    <ArrowDown />
                  </p>
                </div> */}
                <CryptoDropdown
                  width={"!w-26"}
                  className="flex  justify-between items-center flex-nowrap rounded-xl py-2 text-lg bold text-gray-700"
                  currencies={accounts}
                  selectedCurrency={selectedCurrency}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  handleCurrencySelect={handleCurrencySelect}
                />
              </div>
              <div className="flex flex-row align-middle items-center space-x-2">
                <p className="text-base font-semibold">{`${
                  account.balance || "0"
                } ${account.ticker || ""}`}</p>
                <span className="text-xl text-primary100">
                  ${account.balanceUSD || "0"} {"USD"}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:flex sm:flex-row sm:flex-wrap items-center w-full py-6 gap-2">
              <TextButton
                title={"Deposit"}
                icon={<Add />}
                width="w-full sm:w-auto"
                backgroundColor="bg-white"
                textColor="text-textBlack"
                borderColor="border-[1px] border-primary50"
                onClick={() =>
                  router.push(`/dashboard/deposits/${account.id}`)
                }
              />
              <TextButton
                title={"Withdraw"}
                icon={<Minus />}
                width="w-full sm:w-auto"
                backgroundColor="bg-white"
                textColor="text-textBlack"
                borderColor="border-[1px] border-primary50"
                onClick={() => router.push(`/dashboard/withdraws/${account.id}`)}
              />
              <TextButton
                title={"Exchange"}
                icon={<UpDownArros />}
                width="w-full sm:w-auto"
                backgroundColor="bg-white"
                textColor="text-textBlack"
                borderColor="border-[1px] border-primary50"
                onClick={() => router.push("/dashboard/exchange")}
              />
              <TextButton
                title={"Settings"}
                icon={<Setting />}
                width="w-full sm:w-auto"
                backgroundColor="bg-white"
                textColor="text-textBlack"
                borderColor="border-[1px] border-primary50"
              />
            </div>
            <hr></hr>
            {/* Additional Details */}
            <div className="mt-6 text-xs">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Column 1 */}
                <div className="space-y-2">
                  <p className="font-medium text-gray-500">
                    {account.assetType == ASSET_TYPE.CRYPTOCURRENCY ||
                    account.assetType == ASSET_TYPE.TOKEN
                      ? "Wallet address"
                      : "Account Number"}
                  </p>
                  <p className="flex items-center font-semibold text-blue-600">
                    {account.address}
                    <button className="ml-2">
                      <Copy />
                    </button>
                  </p>
                </div>

                {/* Column 2 */}
                <div className="space-y-2">
                  <p className="font-medium text-gray-500">
                    {account.assetType == ASSET_TYPE.CRYPTOCURRENCY ||
                    account.assetType == ASSET_TYPE.TOKEN
                      ? "Network"
                      : "Routing Number"}
                  </p>
                  <p className="flex items-center font-semibold ">
                    <button className="ml-2">
                      <Copy />
                    </button>
                  </p>
                </div>
                {/* Column 3 */}
                <div className="space-y-2">
                  <p className="font-medium text-gray-500">
                    Current Market price
                  </p>
                  <p className="flex items-center font-semibold ">
                    {account.price} USD
                    {/* {account?.priceChangePercent > 0 && (
                      <span className="bg-[#2F2B430D] bg-opacity-5 rounded-lg px-2 font-normal text-xs sm:h-6 text-center content-center text-success">
                        + {portfolioSummary?.priceChangePercent.toFixed(4)}%
                      </span>
                    )}
                    {account?.priceChangePercent < 0 && (
                      <span className="bg-[#2F2B430D] bg-opacity-5 rounded-lg px-2 font-normal text-xs sm:h-6 text-center content-center text-red-600">
                        {portfolioSummary?.priceChangePercent.toFixed(4)}%
                      </span>
                    )} */}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <FinancialsTable transactions={account?.transactions} />
        </div>
      </Suspense>
    </Container>
  );
}
