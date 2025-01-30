"use client";
import React, { useState, useEffect } from "react";
import Container from "@/components/Container/Container";
import { useRouter, useParams } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import Withdraw from "@/components/Withdraw/Withdraw";
import Back from "@/Icons/Back";
import useApi from "@/hooks/useApi";
import { ASSET_TYPE } from "@/shared/enums";


export default function DepositsPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useUser();
  const [account, setAccount] = useState({});
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
          <div className="flex-col p-4">
            <Withdraw account={account} user={user} />
          </div>
        </div>
      </Container>
    </>
  );
}
