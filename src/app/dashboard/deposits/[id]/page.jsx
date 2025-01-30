"use client";
import Back from "@/Icons/Back";
import React, {useState, useEffect} from "react";
import Container from "@/components/Container/Container";
import { useRouter, useParams } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import Deposit from "@/components/Deposit/Deposit";
import useApi from "@/hooks/useApi";
import { ASSET_TYPE } from "@/shared/enums";

export default function DepositsPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useUser();
  const [account, setAccount] = useState({});
  const [accounts, setAccounts] = useState([]);
  const [type, setType] = useState([]);
  const account_id = params?.id;

  const { fetchData, loading, error } = useApi();

  useEffect(() => {
    async function getAccount() {
      const { result, error } = await fetchData(`/account/all/${account_id}`, {
        method: "POST",
      });
      if (error) {
        setAccount({});
      } else {
        setAccount(result);
      }
    }
    if (account_id) {
      getAccount();
    }
  }, [account_id]);

  return (
    <>
      <Container pageName={"Accounts"}>
        <div className="flex flex-col items-center justify-between h-screen">
          <div className="items-center justify-center w-full bg-white border rounded-2xl sm:w-full md:w-[500px]">
            <div className="flex-col p-4">
              <div className="flex items-center mb-4 space-x-2">
                <div onClick={() => router.back()}>
                  <Back />
                </div>
                <p className="text-sm font-semibold">Deposit {account.assetType == ASSET_TYPE.CRYPTOCURRENCY || account.assetType == ASSET_TYPE.TOKEN ? " Crypto" : " Fiat" }</p>
              </div>
              <Deposit account={account} user={user} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
