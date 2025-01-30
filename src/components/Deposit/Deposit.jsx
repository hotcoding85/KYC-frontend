"use client";
import React from "react";
import FiatTab from "@/components/Deposit/FiatTab";
import CryptoTab from "@/components/Deposit/CryptoTab";
import { ASSET_TYPE } from "@/shared/enums";

export default function Deposit({user, account, type, navPrev}) {
  return (
    <>
      {account.assetType == ASSET_TYPE.CRYPTOCURRENCY ||
      account.assetType == ASSET_TYPE.TOKEN ||
      type == "crypto" ? (
        <>
          <CryptoTab account={account} user={user} />
        </>
      ) : (
        <>
            <FiatTab account={account} user={user} />
        </>
      )}
    </>
  );
}
