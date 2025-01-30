"use client";
import Back from "@/Icons/Back";
import React from "react";
import Container from "@/components/Container/Container";
import FiatTab from "@/components/Deposit/FiatTab";
import { useRouter } from "next/navigation";

export default function DepositPage() {
  const router = useRouter();

  return (
    <Container pageName={"Accounts"}>
      <div className="flex flex-col items-center justify-between h-screen">
        <div className="items-center justify-center w-full bg-white border rounded-2xl sm:w-full md:w-[500px]">
          <div className="flex-col p-4">
            <div className="flex items-center space-x-2">
              <div onClick={() => router.back()}>
                <Back />
              </div>
              <p className="text-sm font-semibold">Deposit Fiat</p>
            </div>
            <FiatTab />
          </div>
        </div>
      </div>
    </Container>
  );
}
