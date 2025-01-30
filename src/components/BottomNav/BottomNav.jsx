import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardActiveIcon from "@/Icons/DashboardActiveIcon";
import DashboardIcon from "@/Icons/DashboardIcon";
import TransactionsActive from "@/Icons/TransactionsActive";
import Transactions from "@/Icons/Transactions";
import AccountsActive from "@/Icons/AccountsActive";
import Accounts from "@/Icons/Accounts";
import AssetsActive from "@/Icons/AssetsActive";
import Assets from "@/Icons/Assets";
import MoreIcon from "@/Icons/MoreIcon";
import MoreActiveIcon from "@/Icons/MoreActiveIcon";

const BottomNav = () => {
  const pathname = usePathname();
  const iconSize = 24;

  const navItems = [
    {
      name: "Home",
      href: "/dashboard/home",
      activeIcon: DashboardActiveIcon,
      inactiveIcon: DashboardIcon,
    },
    {
      name: "Transactions",
      href: "/dashboard/transactions",
      activeIcon: TransactionsActive,
      inactiveIcon: Transactions,
    },
    {
      name: "Accounts",
      href: "/dashboard/accounts",
      activeIcon: AccountsActive,
      inactiveIcon: Accounts,
    },
    {
      name: "Assets",
      href: "/dashboard/assets",
      activeIcon: AssetsActive,
      inactiveIcon: Assets,
    },
    {
      name: "More",
      href: "/dashboard/menu",
      activeIcon: MoreActiveIcon,
      inactiveIcon: MoreIcon,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t md:hidden">
      <nav className="flex items-center justify-between px-8 py-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link key={item.name} href={item.href} className="flex flex-col items-center w-16">
              <div className="flex flex-col items-center">
                {isActive ? (
                  <item.activeIcon width={iconSize} height={iconSize} />
                ) : (
                  <item.inactiveIcon width={iconSize} height={iconSize} />
                )}
                <span className={`text-xs mt-1 ${isActive ? "text-textBlack font-semibold" : "text-gray-500"}`}>
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNav;
