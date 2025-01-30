import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Logo from "@/Icons/Union";
import MenuOpen from "@/Icons/MenuOpen";
import MenuClose from "@/Icons/MenuClose";
import ProfileCard from "@/components/Home/ProfileCard/ProfileCard";
import DashboardIcon from "@/Icons/DashboardIcon";
import Transactions from "@/Icons/Transactions";
import Customers from "@/Icons/Customers";
import Assets from "@/Icons/Assets";
import Analytics from "@/Icons/Analytics";
import Support from "@/Icons/Support";
import Help from "@/Icons/Help";
import Gear from "@/Icons/Gear";
import Business from "@/Icons/Business";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Accounts from "@/Icons/Accounts";
import DashboardActiveIcon from "@/Icons/DashboardActiveIcon";
import AccountsActive from "@/Icons/AccountsActive";
import TransactionsActive from "@/Icons/TransactionsActive";
import AssetsActive from "@/Icons/AssetsActive";
import AnalyticsActive from "@/Icons/AnalyticsActive";
import SupportActive from "@/Icons/SupportActive";
import HelpActive from "@/Icons/HelpActive";
import GearActive from "@/Icons/GearActive";
import CustomersActive from "@/Icons/CustomersActive";
import BusinessActive from "@/Icons/BusinessActive";
import Financial from "@/Icons/Financials";
import FinancialActive from "@/Icons/FinancialsActive";
import TeamActive from "@/Icons/TeamActive";
import Team from "@/Icons/Team";
import ComplianceActive from "@/Icons/ComplianceActive";
import Compliance from "@/Icons/Compliance";
import ServiceFeesActive from "@/Icons/ServiceFeeActive";
import ServiceFees from "@/Icons/ServiceFees";
import BrandingActive from "@/Icons/BrandingActive";
import Branding from "@/Icons/Branding";
import { useUser } from "@/app/context/UserContext";
import { COMPANY_ACCOUNT_TYPE, ROLE } from "@/shared/enums";
import BuyCryptoActive from "@/Icons/BuyCryptoActive";
import BuyCrypto from "@/Icons/BuyCrypto";
import OtcActive from "@/Icons/OtcActive";
import Otc from "@/Icons/Otc";
import DeveloperIcon from "@/Icons/DeveloperIcon";
import DeveloperIconActive from "@/Icons/DeveloperActive";
import OrdersActive from "@/Icons/OrdersActive";
import Orders from "@/Icons/Orders";
import Profile from "@/Icons/imageicon/Profile";
import S3Image from "@/components/Elements/S3Image/S3Image";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const [selectedMenuItem, setSelectedMenuItem] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedMenuItem") || "Dashboard";
    }
  });

  const [isBusinessExpanded, setIsBusinessExpanded] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("isBusinessExpanded") === "true";
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedMenuItem", selectedMenuItem);
    }
  }, [selectedMenuItem]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isBusinessExpanded", isBusinessExpanded);
    }
  }, [isBusinessExpanded]);
  let mainMenuItems = []; 
  
  if ( user?.company?.company_account_type === COMPANY_ACCOUNT_TYPE.HOLDING ) {
    mainMenuItems = [
      {
        name: "Dashboard",
        icon:
          selectedMenuItem === "Dashboard"
            ? DashboardActiveIcon
            : DashboardIcon,
        href: "/dashboard/home",
      },
      {
        name: "Account",
        icon: selectedMenuItem === "Account" ? AccountsActive : Accounts,
        href: "/dashboard/accounts",
      },
      {
        name: "Company Management",
        icon:
          selectedMenuItem === "Company Management" ? BusinessActive : Business,
        href: "/dashboard/company",
      },
      {
        name: "Orders",
        icon: selectedMenuItem === "Orders" ? OrdersActive : Orders,
        href: "/dashboard/orders",
      },
      {
        name: "Transactions",
        icon:
          selectedMenuItem === "Transactions"
            ? TransactionsActive
            : Transactions,
        href: "/dashboard/transactions",
      },
      {
        name: "Customers",
        icon: selectedMenuItem === "Customers" ? CustomersActive : Customers,
        href: "/dashboard/customers",
      },
      {
        name: "Assets",
        icon: selectedMenuItem === "Assets" ? AssetsActive : Assets,
        href: "/dashboard/assets",
      },
      {
        name: "Analytics",
        icon: selectedMenuItem === "Analytics" ? AnalyticsActive : Analytics,
        href: "/dashboard/analytics",
      },
      {
        name: "Developers",
        icon:
          selectedMenuItem === "Developers"
            ? DeveloperIconActive
            : DeveloperIcon,
        href: "/dashboard/developers",
      },
    ];
  }

  if (user?.company?.company_account_type === COMPANY_ACCOUNT_TYPE.BANKING) {
    if (user?.role == ROLE.END_USER) {
      mainMenuItems = [
        {
          name: "Dashboard",
          icon:
            selectedMenuItem === "Dashboard"
              ? DashboardActiveIcon
              : DashboardIcon,
          href: "/dashboard/home",
        },
        {
          name: "Account",
          icon: selectedMenuItem === "Account" ? AccountsActive : Accounts,
          href: "/dashboard/accounts",
        },
        {
          name: "Transactions",
          icon:
            selectedMenuItem === "Transactions"
              ? TransactionsActive
              : Transactions,
          href: "/dashboard/transactions",
        },

        {
          name: "Contacts",
          icon: selectedMenuItem === "Customers" ? CustomersActive : Customers,
          href: "/dashboard/beneficiaries",
        },
      ];
    } else if (
      user?.role == ROLE.COMPANY_ADMINISTRATOR ||
      user?.role == ROLE.COMPANY_USER
    ) {
      mainMenuItems = [
        {
          name: "Dashboard",
          icon:
            selectedMenuItem === "Dashboard"
              ? DashboardActiveIcon
              : DashboardIcon,
          href: "/dashboard/home",
        },
        {
          name: "Account",
          icon: selectedMenuItem === "Account" ? AccountsActive : Accounts,
          href: "/dashboard/accounts",
        },
        {
          name: "Business Management",
          icon:
            selectedMenuItem === "Business Management"
              ? BusinessActive
              : Business,
          href: "",
        },
        {
          name: "Orders",
          icon: selectedMenuItem === "Orders" ? OrdersActive : Orders,
          href: "/dashboard/orders",
        },
        {
          name: "Transactions",
          icon:
            selectedMenuItem === "Transactions"
              ? TransactionsActive
              : Transactions,
          href: "/dashboard/transactions",
        },
        {
          name: "Customers",
          icon: selectedMenuItem === "Customers" ? CustomersActive : Customers,
          href: "/dashboard/customers",
        },
        {
          name: "Assets",
          icon: selectedMenuItem === "Assets" ? AssetsActive : Assets,
          href: "/dashboard/assets",
        },
        {
          name: "Analytics",
          icon: selectedMenuItem === "Analytics" ? AnalyticsActive : Analytics,
          href: "/dashboard/analytics",
        },
        {
          name: "Developers",
          icon:
            selectedMenuItem === "Developers"
              ? DeveloperIconActive
              : DeveloperIcon,
          href: "/dashboard/developers",
        },
      ];
    }
  }

  if (user?.company?.company_account_type === COMPANY_ACCOUNT_TYPE.WEB3) {
    if (user?.role == ROLE.END_USER) {
      mainMenuItems = [
        {
          name: "Dashboard",
          icon:
            selectedMenuItem === "Dashboard"
              ? DashboardActiveIcon
              : DashboardIcon,
          href: "/dashboard/home",
        },
        {
          name: "Transactions",
          icon:
            selectedMenuItem === "Transactions"
              ? TransactionsActive
              : Transactions,
          href: "/dashboard/transactions",
        },

        {
          name: "Contacts",
          icon: selectedMenuItem === "Customers" ? CustomersActive : Customers,
          href: "/dashboard/contacts",
        },
      ];
    } else if (user?.role == ROLE.COMPANY_ADMINISTRATOR || user?.role == ROLE.COMPANY_USER) {
      mainMenuItems = [
        {
          name: "Dashboard",
          icon:
            selectedMenuItem === "Dashboard"
              ? DashboardActiveIcon
              : DashboardIcon,
          href: "/dashboard/home",
        },
        {
          name: "Business Management",
          icon:
            selectedMenuItem === "Business Management"
              ? BusinessActive
              : Business,
          href: "",
        },
        {
          name: "Account",
          icon: selectedMenuItem === "Account" ? AccountsActive : Accounts,
          href: "/dashboard/accounts",
        },
        {
          name: "Orders",
          icon: selectedMenuItem === "Orders" ? OrdersActive : Orders,
          href: "/dashboard/orders",
        },
        {
          name: "Transactions",
          icon:
            selectedMenuItem === "Transactions"
              ? TransactionsActive
              : Transactions,
          href: "/dashboard/transactions",
        },
        {
          name: "Customers",
          icon: selectedMenuItem === "Customers" ? CustomersActive : Customers,
          href: "/dashboard/customers",
        },
        {
          name: "Assets",
          icon: selectedMenuItem === "Assets" ? AssetsActive : Assets,
          href: "/dashboard/assets",
        },
        {
          name: "Analytics",
          icon: selectedMenuItem === "Analytics" ? AnalyticsActive : Analytics,
          href: "/dashboard/analytics",
        },
        {
          name: "Developers",
          icon:
            selectedMenuItem === "Developers"
              ? DeveloperIconActive
              : DeveloperIcon,
          href: "/dashboard/developers",
        },
      ];
    }
    
  }

 
  const otherMenuItems = [
    {
      name: "Support",
      icon: selectedMenuItem === "Support" ? SupportActive : Support,
      href: "/dashboard/support",
    },
    {
      name: "Help & Support",
      icon: selectedMenuItem === "Help & Support" ? HelpActive : Help,
      href: "/dashboard/help",
    },
    {
      name: "Settings",
      icon: selectedMenuItem === "Settings" ? GearActive : Gear,
      href: "/dashboard/settings",
    },
  ];

  let bottomMenuItems = [];

  if ( user?.company?.company_account_type === COMPANY_ACCOUNT_TYPE.BANKING ||
    user?.company?.company_account_type === COMPANY_ACCOUNT_TYPE.HOLDING
  ) {
      bottomMenuItems = [
        {
          name: "Buy Crypto",
          icon: selectedMenuItem === "Buy Crypto" ? BuyCryptoActive : BuyCrypto,
          href: "/dashboard/buy-crypto",
        },
        {
          name: "Crypto OTC Desk",
          icon: selectedMenuItem === "Crypto OTC Desk" ? OtcActive : Otc,
          href: "/dashboard/otc",
        },
      ];
    }
  

  const businessItems = [
    {
      name: "Financials",
      icon: pathname === "/dashboard/financials" ? FinancialActive : Financial,
      href: "/dashboard/financials",
    },
    {
      name: "Team",
      icon: pathname === "/dashboard/team" ? TeamActive : Team,
      href: "/dashboard/team",
    },
    {
      name: "Accounts",
      icon: pathname === "/dashboard/accounts" ? AccountsActive : Accounts,
      href: "/dashboard/accounts",
    },
    {
      name: "Compliance",
      icon:
        pathname === "/dashboard/compliance" ? ComplianceActive : Compliance,
      href: "/dashboard/compliance",
    },
    {
      name: "Service Fees",
      icon:
        pathname === "/dashboard/servicefees" ? ServiceFeesActive : ServiceFees,
      href: "/dashboard/servicefees",
    },
    {
      name: "Branding",
      icon: pathname === "/dashboard/branding" ? BrandingActive : Branding,
      href: "/dashboard/branding",
    },
  ];

  const handleMenuItemClick = (name) => {
    setSelectedMenuItem(name);
    if (name !== "Business" && !businessItems.includes(name)) {
      setIsBusinessExpanded(false);
    }
  };

  const toggleBusinessManagement = () => {
    setIsBusinessExpanded(!isBusinessExpanded);
    setSelectedMenuItem("Business");
  };

  const handleBusinessItemClick = (businessItem) => {
    setSelectedMenuItem(businessItem);
    setIsBusinessExpanded(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("isBusinessExpanded", "true");
    }
  };

  return (
    <div
      className={`${
        isSidebarOpen ? "w-72" : "w-24"
      } overflow-y-scroll bg-white text-white scroll-auto flex flex-col justify-between transition-all duration-300 h-full`}
    >
      <div>
        <div className="flex items-center justify-between p-4">
          {isSidebarOpen && (
            <div className="flex flex-row items-center justify-between w-full">
              <div
                className="flex flex-row items-center hover:cursor-pointer justify-center text-center"
                onClick={() => router.push("/dashboard/home")}
              >
                {user?.company?.branding?.logo ? (
                  <S3Image
                    s3Url={user?.company?.branding?.logo}
                    className="w-24"
                  ></S3Image>
                ) : (
                  <>
                    <Logo className="w-24" />
                    <div className="ml-2 text-sm font-medium text-textBlack">
                      Payment Dashboard
                    </div>
                  </>
                )}
              </div>
              <button onClick={toggleSidebar}>
                <MenuClose className="w-5 h-3" />
              </button>
            </div>
          )}

          {!isSidebarOpen && (
            <div className="flex flex-row items-center justify-between">
              <Logo className="size-4" />
              <button onClick={toggleSidebar}>
                <MenuOpen className="w-5 h-3" />
              </button>
            </div>
          )}
        </div>

        {isSidebarOpen && (
          <div className="px-4 py-2">
            <div className="flex items-center h-11 py-2 px-3 space-x-2 bg-primary rounded-xl">
              <div className="flex items-center justify-center w-5 h-5 overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white  rounded-full cursor-pointer ">
                <span className="text-xs">
                  {`${user?.first_name?.[0] || ""}${
                    user?.last_name?.[0] || ""
                  }`.toUpperCase()}
                </span>
              </div>
              <span className="text-white text-xs font-bold">
                {user?.first_name} {user?.last_name} - Personal
              </span>
            </div>
          </div>
        )}

        <nav className="flex flex-col">
          <div
            className={`text-textLight mb-2 text-xs ${
              isSidebarOpen ? "text-left px-4" : "text-center"
            } `}
          >
            MAIN
          </div>
          {mainMenuItems.map((item, index) => (
            <React.Fragment key={item.name}>
              <Link href={item.href} shallow>
                {item.name != "Business Management" ? (
                  <div
                    className={`flex items-center px-4 py-3 text-xs mx-2.5 rounded-xl font-normal ${
                      isSidebarOpen ? "justify-left" : "justify-center"
                    } ${
                      pathname === item.href
                        ? "bg-lightGrey text-textBlack  border border-primary50"
                        : "text-textLight"
                    }`}
                    onClick={() => handleMenuItemClick(item.name)}
                  >
                    <item.icon />
                    {isSidebarOpen && (
                      <span className="ml-3 text-xs">{item.name}</span>
                    )}
                  </div>
                ) : (
                  <div
                    className={`rounded-xl ${
                      selectedMenuItem === "Business" ||
                      businessItems.includes(selectedMenuItem)
                        ? "bg-lightGrey mx-3  text-textBlack border border-primary50"
                        : "text-textLight"
                    }`}
                  >
                    <div
                      className={`flex items-center px-4 py-3 ${
                        selectedMenuItem === "Business" ||
                        businessItems.includes(selectedMenuItem)
                          ? "mx-0"
                          : "mx-2.5"
                      }  text-md font-light ${
                        isSidebarOpen ? "justify-left" : "justify-center"
                      }`}
                      onClick={toggleBusinessManagement}
                    >
                      {selectedMenuItem === "Business" ||
                      businessItems.includes(selectedMenuItem) ? (
                        <BusinessActive />
                      ) : (
                        <Business className="ml-12" />
                      )}
                      {isSidebarOpen && (
                        <>
                          <span
                            className={`ml-3 text-xs font-normal ${
                              selectedMenuItem === "Business"
                                ? "text-textBlack"
                                : "text-textLight"
                            }`}
                          >
                            Business Management
                          </span>
                          <FontAwesomeIcon
                            icon={
                              isBusinessExpanded ? faChevronUp : faChevronDown
                            }
                            className="w-3 h-3 ml-4"
                          />
                        </>
                      )}
                    </div>

                    {isBusinessExpanded && isSidebarOpen && (
                      <div className="pb-2 pl-6 space-y-4">
                        {businessItems.map((businessItem) => (
                          <Link
                            href={businessItem.href}
                            shallow
                            key={businessItem}
                          >
                            <div
                              className={`flex items-center text-xs font-light py-1 ${
                                pathname === businessItem.href
                                  ? "bg-lightGrey text-textBlack "
                                  : "text-textLight"
                              }`}
                              // onClick={() => handleBusinessItemClick(businessItem)}
                            >
                              {businessItem?.icon && <businessItem.icon />}
                              <span className="ml-3 text-xs">
                                {businessItem.name}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </Link>
            </React.Fragment>
          ))}

          <div
            className={`text-textLight my-2 text-xs ${
              isSidebarOpen ? "text-left px-3" : "text-center"
            } `}
          >
            OTHER
          </div>
          <div className="my-2">
            {otherMenuItems.map((item, index) => (
              <React.Fragment key={item.name}>
                <Link href={item.href} shallow>
                  <div
                    className={`flex items-center px-4 py-3 ${
                      isSidebarOpen ? "justify-left" : "justify-center"
                    } text-xs mx-2.5 rounded-xl font-normal ${
                      pathname === item.href
                        ? "bg-lightGrey text-textBlack border border-primary50"
                        : "text-textLight"
                    }`}
                    onClick={() => handleMenuItemClick(item.name)}
                  >
                    <item.icon />
                    {isSidebarOpen && (
                      <span className="ml-3 text-xs">{item.name}</span>
                    )}
                  </div>
                </Link>
              </React.Fragment>
            ))}
          </div>
          <div className="px-4">
            <hr />
          </div>
          <div className="my-2">
            {bottomMenuItems.map((item, index) => (
              <React.Fragment key={item.name}>
                <Link href={item.href} shallow>
                  <div
                    className={`flex items-center px-4 py-3 ${
                      isSidebarOpen ? "justify-left" : "justify-center"
                    } text-xs mx-2.5 rounded-xl font-normal ${
                      pathname === item.href
                        ? "bg-lightGrey text-textBlack border border-primary50"
                        : "text-textLight"
                    }`}
                    onClick={() => handleMenuItemClick(item.name)}
                  >
                    <item.icon />
                    {isSidebarOpen && (
                      <span className="ml-3 text-xs">{item.name}</span>
                    )}
                  </div>
                </Link>
              </React.Fragment>
            ))}
          </div>
        </nav>
      </div>
      {/* <div className="bottom-3">
        <ProfileCard isSidebarOpen={isSidebarOpen} />
      </div> */}
    </div>
  );
};

export default Sidebar;
