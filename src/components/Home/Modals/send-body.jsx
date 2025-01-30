import React, { useState, useEffect } from "react";
import Image from "next/image"

import { TextButton } from "@/components/Elements/Button/Button"
import ChevronRight from "@/Icons/ChevronRight";
import Scan from "@/Icons/Scan";
import { FaExchangeAlt } from "react-icons/fa";
import useApi from "@/hooks/useApi";
import S3Image from "@/components/Elements/S3Image/S3Image";
import Currency from "@/components/Elements/Currency/Currency";
import Loader from "@/components/Elements/Loader/Loader";
import { ASSET_TYPE } from "@/shared/enums";


const SendBody = ({ data, accounts, onCloseModal, handleOpenConfirmationModal }) => {

  const { fetchData, loading, error } = useApi();
  const [assetData, setAssetData] = useState(data);

  useEffect(() => {
    async function listAccounts() {
      const { result, error } = await fetchData(`/account/all/${data?.id}`, {
        method: "POST",
      });
      if (error) {
        setAssetData([]);
      } else {
        setAssetData(result);
      }
    }

    if (data?.id) {
      listAccounts();
    }
  }, [data]);

  const [currency, setCurrency] = useState(assetData?.asset);
  const [altCurrency, setAltCurrency] = useState('USD');
  const [amount, setAmount] = useState(0);
  const [fetchingPrice, setFetchingPrice] = useState(false);
  const [recipient, setRecipient] = useState();
  const [amountValidation, setAmountValidation] = useState(true);
  const [addressValidation, setAddressValidation] = useState(true);
  const [chainFee, setChainFee] = useState(0);
  const [totalFee, setTotalFee] = useState(0);
  const [totalFeeUSD, setTotalFeeUSD] = useState(
    parseFloat(totalFee) * parseFloat(assetData?.price)
  );

  useEffect(() => {
    handleChangeAmount();
  }, [recipient, amount, currency]);
  
  const [networkFee, setNetworkFee] = useState(0);
  const [networkFeeUSD, setNetworkFeeUSD] = useState(
    parseFloat(networkFee) * parseFloat(assetData?.price)
  );

  const handleMaxBalance = () => {
    if(currency == assetData?.asset){
      setAmount(assetData?.balance);
    }
    else{
      setAmount(assetData?.balanceUSD);
    }
  }

  const validateAddress =() => {
    if(assetData?.address == recipient){
      setAddressValidation(false);
    }
    else{
      setAddressValidation(true);
    }
  }

  const handleTransfer = async  () => {
    assetData.recipient = recipient;
    assetData.amount = amount;
    assetData.chainFee = chainFee;
    assetData.networkFee = networkFee;
    assetData.networkFeeUSD = networkFeeUSD;
    assetData.totalFee = totalFee;
    assetData.totalFeeUSD = totalFeeUSD;
    handleOpenConfirmationModal && handleOpenConfirmationModal(assetData);
  };

  const handleChangeCurrency = () => {
    setAmount(0);
    setNetworkFee(0);
    setNetworkFeeUSD(0);
    setTotalFee(0);
    setTotalFeeUSD(0);
    const activeCurrency = currency;
    setCurrency(altCurrency);
    setAltCurrency(activeCurrency);
  };

  const handleChangeAmount = async () => {
    if ( amount == "" ||
        parseFloat(amount) <= 0 ){
       setAmountValidation(true);
    }
    else if (( currency == assetData?.asset &&
        parseFloat(amount) > parseFloat(assetData?.balance)) ||
      ( currency != assetData?.asset &&
        parseFloat(amount) > parseFloat(assetData?.balanceUSD))
    ) {
      setAmountValidation(false);
      setNetworkFee(0);
      setNetworkFeeUSD(0);
      setTotalFee(0);
      setTotalFeeUSD(0);
    } else {
      if (recipient) {
        setFetchingPrice(true);
        if (assetData?.assetType == ASSET_TYPE.CRYPTOCURRENCY) {
          const { result, error } = await fetchData(
            `/transaction/estimate_gas`,
            {
              method: "POST",
              body: {
                blockchain: { name: assetData?.asset },
                to: recipient,
                from: assetData?.address,
                amount: amount,
              },
            }
          );
          if (error) {
            setNetworkFee(0);
          } else {
            setChainFee(result.chain_fee);
            const networkFeeTotal =
              parseFloat(result.chain_fee) +
              parseFloat(result.platform_fee) +
              parseFloat(result.company_fee);
            const networkFeeTotalUsd =
              parseFloat(networkFeeTotal) * parseFloat(assetData?.price);

            const totalFee = parseFloat(amount) + parseFloat(networkFeeTotal);
            const totalFeeUsd =
              (parseFloat(amount) + parseFloat(networkFeeTotal)) *
              parseFloat(assetData?.price);
            setNetworkFee(networkFeeTotal || 0);
            setNetworkFeeUSD(networkFeeTotalUsd || 0);
            setTotalFee(totalFee || 0);
            setTotalFeeUSD(totalFeeUsd || 0);
          }
        } else if (assetData?.assetType == ASSET_TYPE.TOKEN) {
          const network = accounts.find(
            (account) => account.network === assetData?.network?.name
          );
          const { result, error } = await fetchData(
            `/transaction/estimate_execution_gas`,
            {
              method: "POST",
              body: {
                token: {
                  blockchain: { name: assetData?.network?.name },
                  name: assetData?.asset,
                },
                to: recipient,
                from: assetData?.address,
                amount: amount,
              },
            }
          );
          if (error) {
            setNetworkFee(0);
          } else {
            setChainFee(result.chain_fee);
            const networkFeeTotal =
              parseFloat(result.chain_fee) +
              parseFloat(result.platform_fee) +
              parseFloat(result.company_fee);
            const networkFeeTotalUsd =
              parseFloat(networkFeeTotal) *
              parseFloat(assetData?.network?.currentPrice);

            const totalFee = parseFloat(amount);
            const totalFeeUsd =
              parseFloat(amount) * parseFloat(assetData?.price) +
              parseFloat(networkFeeTotal) *
                parseFloat(assetData?.network?.currentPrice);
            setNetworkFee(networkFeeTotal || 0);
            setNetworkFeeUSD(networkFeeTotalUsd || 0);
            setTotalFee(totalFee || 0);
            setTotalFeeUSD(totalFeeUsd || 0);
          }
        }
        setFetchingPrice(false);
      }
    }

    if (amount == "") {
      setAmountValidation(true);
    }

    
  };


  return (
    <>
      <div className="w-full h-full p-4">
        <div className="flex gap-2 p-4 border rounded-2xl border-primary50 h-[72px]">
          <div className="flex relative">
            <S3Image
              className="w-[40px] h-[40px] rounded-full"
              s3Url={assetData?.icon}
            />
            {data?.network && (
              <S3Image
                className="w-[15px] h-[15px] rounded-full bottom-0 right-0 absolute"
                s3Url={assetData?.network_icon}
              />
            )}
          </div>
          <div className="flex items-center justify-between w-full gap-2">
            <div className="flex flex-col">
              <p className="text-xs font-normal text-textBlack">
                Total Balance
              </p>
              <p>
                <span className="mr-1 font-semibold text-sm text-[#272727]">
                  {assetData?.balance} {assetData?.asset}
                </span>
                <span className="font-seibold text-sm text-[#BABABA]">
                  <Currency>{assetData?.balanceUSD}</Currency>
                </span>
              </p>
            </div>

            <ChevronRight></ChevronRight>
          </div>
        </div>
        {/**@networks*/}
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-xs font-normal text-textBlack">Network</p>
          <div className="flex items-center w-full h-12 px-3 py-2 border border-primary50 rounded-2xl">
            {data?.network ? (
              <S3Image
                className="w-[15px] h-[15px] rounded-full"
                s3Url={assetData?.network_icon}
              />
            ) : (
              <S3Image
                className="w-[15px] h-[15px] rounded-full"
                s3Url={assetData?.icon}
              />
            )}
            <input
              disabled
              type="text"
              value={
                assetData?.network ? assetData?.network?.name : assetData?.asset
              }
              className="w-full pl-1 bg-white text-textBlack text-xs"
            />
          </div>
        </div>
        {/**@recipient*/}
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-normal text-textBlack">Recipient</p>
            <a className="font-semibold text-xs text-[#4778F5]">Contacts</a>
          </div>
          <div className="flex items-center border border-primary50 w-full h-[48px] py-2 px-4 rounded-2xl">
            <input
              type="text"
              value={recipient}
              onChange={(e) => {
                setRecipient(e.target.value);
                validateAddress();
              }}
              placeholder="Recipient Address"
              className="w-full truncate bg-white text-textBlack focus-visible:outline-none text-xs"
            />
            <div className="flex items-center gap-2">
              <p
                className="font-semibold text-xs text-[#4D4D4D]"
                onClick={async () => {
                  setRecipient(await navigator.clipboard.readText());
                }}
              >
                Paste
              </p>
              <Scan></Scan>
            </div>
          </div>
          <span
            className={`text-alert text-sm ${
              addressValidation === false ? "flex" : "hidden"
            }`}
          >
            This address is not allowed to receive funds
          </span>
        </div>
        {/**@amount*/}
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-normal text-textBlack">Amount</p>
            <p
              className="flex items-center gap-1 font-semibold text-xs text-[#272727]"
              onClick={handleChangeCurrency}
            >
              {currency}
              <FaExchangeAlt></FaExchangeAlt>
              <span className="text-[#BABABA]">{altCurrency}</span>
            </p>
          </div>
          <div className="flex items-center border border-primary50 w-full h-[48px] py-2 px-4 rounded-2xl">
            <input
              type="text"
              onChange={(e) => {
                const numericValue = e.target.value.replace(/[^0-9.]/g, ""); // Allow numbers and one decimal point
                const decimalCheck = numericValue.split("."); // Check for multiple decimals
                if (decimalCheck.length <= 2) {
                  // If there's only one or no decimal point
                  setAmount(numericValue);
                }
              }}
              onKeyUp={() => handleChangeAmount()}
              value={amount}
              placeholder="Amount"
              className={`w-full text-xs bg-white text-textBlack active:border-none hover:border-none focus-visible:outline-none ${
                amountValidation === false
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            <p
              className="font-semibold text-xs text-[#858C95]"
              onClick={handleMaxBalance}
            >
              Max
            </p>
          </div>
          <span
            className={`text-alert text-sm ${
              amountValidation === false ? "flex" : "hidden"
            }`}
          >
            Your account does not have enough balance to make this transaction.
          </span>
        </div>
        {/**@note*/}
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-xs font-normal text-textBlack">Note (optional)</p>
          <div className="flex items-center border border-primary50 w-full h-12 py-2.5 px-4 rounded-2xl">
            <input
              type="text"
              placeholder="Leave a note"
              className="w-full text-xs bg-white text-textBlack active:border-none hover:border-none focus-visible:outline-none"
            />
          </div>
        </div>
        {/**@fee*/}
        <div className="flex items-center justify-between gap-3 my-4">
          <p className=" text-xs text-[#858C95]">Network Fee</p>
          {fetchingPrice ? (
            <Loader></Loader>
          ) : (
            <p className="text-xs text-textBlack">
              {parseFloat(networkFee).toFixed(10)}{" "}
              {assetData?.assetType == ASSET_TYPE.CRYPTOCURRENCY
                ? assetData?.asset
                : assetData?.network?.name}{" "}
              (<Currency>{parseFloat(networkFeeUSD || 0).toFixed(2)}</Currency>)
            </p>
          )}
        </div>
        <div className="flex items-center justify-between gap-3 my-4">
          <p className="text-xs font-semibold text-textBlack">
            Total Sending Amount
          </p>
          {fetchingPrice ? (
            <Loader></Loader>
          ) : (
            <p className="text-xs font-semibold text-textBlack">
              {parseFloat(totalFee).toFixed(10)} {assetData?.asset} (
              <Currency>{parseFloat(totalFeeUSD || 0).toFixed(2)}</Currency>)
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-end gap-4 p-3 border-t rounded-bl-2xl rounded-br-2xl border-t-primary-50">
        <TextButton
          title="Cancel"
          textColor="text-primary"
          backgroundColor="bg-white"
          borderColor="border border-primary50"
          className="h-10 w-[114px] rounded-xl"
          onClick={onCloseModal}
        />
        <TextButton
          title="Continue"
          textColor="text-white"
          backgroundColor="bg-primary"
          className="h-10 w-[114px] rounded-xl"
          {...(!recipient ||
          !amountValidation ||
          !amount ||
          fetchingPrice ||
          !addressValidation
            ? { isLoading: true }
            : {})}
          onClick={() => {
            handleTransfer();
          }}
        />
      </div>
    </>
  );
};

export default SendBody;
