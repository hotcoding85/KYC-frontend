import AllAccounts from "@/components/Home/AllAccounts/AllAccounts";
import AllCards from "@/components/Home/AllCards/AllCards";
import React from "react";

const AccountsTab = () => {
  return (
    <div className='flex flex-col gap-3'>
      <AllAccounts />
      <AllCards />
    </div>
  );
};

export default AccountsTab;
