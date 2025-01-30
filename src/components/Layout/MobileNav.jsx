import React from 'react'
import Link from "next/link"
import { usePathname, useRouter } from 'next/navigation'

import Assets from "@/Icons/Assets"
import Accounts from "@/Icons/Accounts"
import AssetsActive from "@/Icons/AssetsActive"
import Transactions from "@/Icons/Transactions"
import DashboardIcon from "@/Icons/DashboardIcon"
import AccountsActive from "@/Icons/AccountsActive"
import TransactionsActive from "@/Icons/TransactionsActive"
import DashboardActiveIcon from "@/Icons/DashboardActiveIcon"

const MobileNav = () => {
  const pathname = usePathname()

  const data = [
    {
      name: 'Home',
      link: '/dashboard/home',
      icon: pathname.includes("/dashboard/home") ? DashboardActiveIcon : DashboardIcon
    },
    {
      name: 'Home',
      link: '/dashboard/transactions',
      icon: pathname.includes("/dashboard/transactions") ? TransactionsActive : Transactions
    },
    {
      name: 'Assets',
      link: '/dashboard/assets',
      icon: pathname.includes("/dashboard/assets") ? AssetsActive : Assets
    },
    {
      name: 'Assets',
      link: '/dashboard/assets',
      icon: pathname.includes("/dashboard/assets") ? AssetsActive : Assets
    },
    {
      name: 'Accounts',
      link: '/dashboard/accounts',
      icon: pathname.includes("/dashboard/accounts") ? AccountsActive : Accounts
    },
    {
      name: 'More',
      link: '/dashboard/more',
      icon: pathname.includes("/dashboard/more") ? AccountsActive : Accounts
    }
  ]
  return (
    <div className="flex items-center w-full h-16 bg-white border-[1px] border-primary50 pt-3 pb-2.5 px-4">
      {data.map((each, idx) => (
        <Link key={idx} href={each.link} className="flex flex-col gap-1">
          <each.icon />
          <p className={`font-normal text-xs text-textSecondary`}>
            {each.name}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default MobileNav;