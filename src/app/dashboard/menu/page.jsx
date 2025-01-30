import React from "react";
import Link from "next/link";
import ChevronRight from "@/Icons/ChevronRight";
import Container from "@/components/Container/Container";
import BuyCryptoActive from "@/Icons/BuyCryptoActive";
import OtcActive from "@/Icons/OtcActive";
import AnalyticsActive from "@/Icons/AnalyticsActive";
import GearActive from "@/Icons/GearActive";

export default function MoreMenuPage() {
  const menuItems = [
    {
      id: "buy-crypto",
      icon: BuyCryptoActive,
      title: "Buy Crypto",
      href: "/dashboard/buy-crypto",
    },
    {
      id: "crypto-otc",
      icon: OtcActive,
      title: "Crypto OTC Desk",
      href: "/dashboard/otc",
    },
    {
      id: "analytics",
      icon: AnalyticsActive,
      title: "Analytics",
      href: "/dashboard/analytics",
    },
    {
      id: "settings",
      icon: GearActive,
      title: "Settings",
      href: "/dashboard/settings",
    },
  ];

  return (
    <Container pageName={""}>
      <div className="flex-1 p-2">
        <div className="space-y-2">
          {menuItems.map((item) => {
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center justify-between p-4 transition-colors border border-lightGrey bg-white shadow-sm rounded-2xl hover:bg-gray-50 
            `}
              >
                <div className="flex items-center space-x-2">
                  <div className={`text-gray-600`}>
                    <item.icon />
                  </div>
                  <span className={`text-xs`}>{item.title}</span>
                </div>
                <ChevronRight className={`w-5 h-5 `} />
              </Link>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
