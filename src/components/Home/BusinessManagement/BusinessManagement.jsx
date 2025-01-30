import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Business from '@/Icons/Business';

const BusinessManagement = ({ isSidebarOpen }) => {
  const businessItems = [
    'financials',
    'team',
    'accounts',
    'compliance',
    'serviceFees', 
    'branding',
  ];

  // State to track selected menu item and expanded state
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const [isBusinessExpanded, setIsBusinessExpanded] = useState(() => {
    return selectedMenuItem === 'Business' || businessItems.includes(selectedMenuItem);
  });

  // Toggle the Business Management section
  const toggleBusinessManagement = () => {
    setIsBusinessExpanded(!isBusinessExpanded);
    setSelectedMenuItem('Business'); // Set the selected item to Business when toggling
  };

  // Handle selecting submenu items
  const handleMenuItemClick = (value) => {
    const tab = value.toLowerCase();
    console.log(tab);
    setSelectedMenuItem(tab);
  };

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="flex text-start justify-start text-sm font-normal">
      <div
        className={`flex flex-col items-start justify-start rounded-lg ${selectedMenuItem === 'Business' || businessItems.includes(selectedMenuItem)
            ? `bg-lightGrey border border-gray-300 ${!isSidebarOpen ? 'ml-1 w-14' : 'ml-1'}`  // Add px-2 if the sidebar is open
            : 'bg-white'
          }`}

      >
        <a
          href="#"
          className={`flex items-center px-6 py-2 text-md font-light ${selectedMenuItem === 'Business' ? 'text-textBlack' : 'text-textLight'
            }`}
          onClick={toggleBusinessManagement}
        >
          <Business className="ml-10" />
          {isSidebarOpen && (
            <>
              <span className="ml-3 w-22">Business Management</span>
              <FontAwesomeIcon
                icon={isBusinessExpanded ? faChevronDown : faChevronRight}
                className="ml-1 h-3 w-3"
              />
            </>
          )}
        </a>

        {/* Submenu: Business Management expanded options */}
        {isBusinessExpanded && isSidebarOpen && (
          <div className="py-2 space-y-4 pl-6 pr-4">
            {businessItems.map((item) => (
              <a
                key={item}
                href={`/dashboard/${item.replace(' ', '').toLowerCase()}`} // Lowercase for URLs
                className={`block text-md font-light ${selectedMenuItem === item ? 'text-textBlack' : 'text-textLight'
                  }`}
                onClick={() => handleMenuItemClick(item)}
              >
                {capitalizeFirstLetter(item)} {/* Display with first letter capitalized */}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessManagement;
