import React, { useState, useEffect, useRef } from "react";
import Back from "@/Icons/Back";
import ChevronRight from "@/Icons/ChevronRight";
import Search from "@/Icons/Search";
import Button, { TextButton } from "../Elements/Button/Button";
import { useRouter } from "next/navigation";
import useApi from "@/hooks/useApi";
import S3Image from "../Elements/S3Image/S3Image";

const ChooseBeneficiary = ({ onNext, onAdd }) => {
  const { fetchData, loading, error } = useApi();
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  
  async function fetchListBeneficiary() {
    const { result, error } = await fetchData(`/beneficiary/all`, {
      method: "POST",
      body: {}
    });
    if (error) {
      setBeneficiaries([]);
      setFilteredItems([]);
    } else {
      let filteredBeneficiary = result;

      // if (type === ASSET_TYPE.FIAT) {
      //   filteredAssets = result.filter(
      //     (asset) => asset.type === ASSET_TYPE.FIAT
      //   );
      // } else if (type === ASSET_TYPE.CRYPTOCURRENCY) {
      //   filteredAssets = result.filter((asset) =>
      //     [ASSET_TYPE.CRYPTOCURRENCY, ASSET_TYPE.TOKEN].includes(asset.type)
      //   );
      // }

      setBeneficiaries(filteredBeneficiary);
      setFilteredItems(filteredBeneficiary);
    }
  }

  useEffect(() => {
    if (beneficiaries.length == 0) {
      fetchListBeneficiary();
    }
  }, []);

  const router = useRouter();
  // const beneficiaries = [
  //   {
  //     name: "Alice John",
  //     flag: <Dollar className="w-2 h-2 rounded-full" />,
  //   },
  //   {
  //     name: "Charlie Brown",
  //     flag: <Dollar className="w-2 h-2 rounded-full" />,
  //   },
  //   {
  //     name: "Frank Wilson",
  //     flag: <Dollar className="w-2 h-2 rounded-full" />,
  //   },
  // ];

  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <div className="items-center justify-center w-full bg-white border md:w-[500px] rounded-2xl">
        <div className="flex flex-col p-4 sm:p-6">
          <div className="flex items-center mb-2 sm:mb-4 gap-2">
            <button onClick={() => router.back()}>
              <Back />
            </button>
            <h1 className="text-sm font-semibold">Choose Beneficiary</h1>
          </div>
          <div className="flex items-center justify-between my-2 gap-2 sm:gap-4">
            <div className="flex items-center w-full h-10 px-2 text-xs border border-primary50 rounded-2xl">
              <Search />
              <input
                type="text"
                placeholder="Name, email, phone"
                className="w-full h-8 ml-2 border-none outline-none"
              />
            </div>
            <TextButton
              width="w-auto"
              onClick={onAdd}
              title={"Add Beneficiary"}
              className={"h-8 text-nowrap text-sm py-1 px-4"}
            />
          </div>
          {/* Beneficiaries List */}
          <p className="text-[11px] mb-2">Recent</p>
          <hr />
          <div className="flex mt-4 space-x-8">
            {beneficiaries.map((beneficiary, index) => (
              <div
                key={index}
                className="text-center"
                onClick={() => onNext(beneficiary)}
              >
                <div className="relative">
                  <S3Image
                    s3Url={beneficiary?.avatar}
                    className="object-cover w-8 h-8 border rounded-full"
                  ></S3Image>
                  <span className="absolute bottom-0 text-2xl right-1">
                    {beneficiary?.flag}
                  </span>
                </div>
                <p className="mt-2 text-xs font-normal">
                  {beneficiary?.full_name}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 mb-2 text-[11px]">All</p>
          <hr />
          <div className="mt-4 space-y-4">
            {beneficiaries.map((beneficiary, index) => (
              <button
                key={index}
                className="flex items-center justify-between w-full space-x-4"
                onClick={() => onNext(beneficiary)}
              >
                <div className="flex items-center space-x-4">
                  <S3Image
                    s3Url={beneficiary?.avatar}
                    className="w-4 h-4 rounded-full"
                  ></S3Image>
                  <p className="text-xs font-medium">
                    {beneficiary?.full_name}
                  </p>
                </div>
                <ChevronRight />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseBeneficiary;
