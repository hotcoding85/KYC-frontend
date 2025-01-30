import React from 'react';
import DashboardIcon from '@/Icons/DashboardIcon';
import Transactions from '@/Icons/Transactions';
import Customers from '@/Icons/Customers';
import Assets from '@/Icons/Assets';
import Analytics from '@/Icons/Analytics';
import Support from '@/Icons/Support';
import Help from '@/Icons/Help';
import Gear from '@/Icons/Gear';
import BusinessManagement from '@/components/Home/BusinessManagement/BusinessManagement';

const MenuItems = ({  isSidebarOpen }) => {
  const menuItems = [
    { name:  'Dashboard', label:"Dashboard", icon: DashboardIcon, href: '/dashboard/home' },
    // Business Management will be added here as the second menu item
    { name: 'Transactions', label:"transactions", icon: Transactions, href: '/dashboard/transactions' },
    { name: 'Customers', label: 'customers', icon: Customers, href: '/dashboard/customers' },
    { name: 'Assets', label: 'assets', icon: Assets, href: '/dashboard/assets' },
    { name: 'Analytics', label: 'analytics', icon: Analytics, href: '/dashboard/analytics' },
    { name: 'Support',label: 'support', icon: Support, href: '/dashboard/support' },
    { name: 'Help',name: 'help', icon: Help, href: '/dashboard/help' },
    { name: 'Settings',name: 'settings', icon: Gear, href: '/dashboard/settings' },
  ];

  return (
    <>
      {menuItems.map((item, index) => {
        // Render Business Management after Dashboard
        if (item.name === 'Dashboard') {
          return (
            <React.Fragment key={item.name}>
              <a
                href={item.href}
                className={`flex items-center px-6 py-2 text-sm font-normal text-textLight`}
            
              >
                <item.icon />
                {isSidebarOpen && <span className="ml-2">{item.name}</span>}
              </a>

              {/* Insert Business Management here as the second item */}
              <BusinessManagement
                isSidebarOpen={isSidebarOpen}
         
              />
            </React.Fragment>
          );
        }
        return (
          <a
            key={item.name}
            href={item.href}
            className={`flex items-center px-6 py-2 text-sm font-normal text-textLight`}
          
          >
            <div className=" text-textLight">
            <item.icon />
            </div>
          
            {isSidebarOpen && <span className="ml-2">{item.name}</span>}
          </a>
        );
      })}
    </>
  );
};

export default React.memo(MenuItems);
