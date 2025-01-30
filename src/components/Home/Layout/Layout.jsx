// components/Layout.js
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Home/SideBar/SideBar'; // Your Sidebar component
import TopBar from '@/components/Home/TopBar/TopBar'; // Your TopBar component

const Layout = ({ children, pageName }) => {
    
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-full overflow-hidden ">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Content Wrapper */}
      <div className={`flex flex-col w-full ${isSidebarOpen ? 'ml-[281px]' : 'ml-[80px]'} transition-all duration-300`}>
        {/* TopBar */}
        <div className="fixed top-0 left-0 z-10 w-full">
          <TopBar isSidebarOpen={isSidebarOpen} pageName={pageName} />
        </div>

        {/* Main Content */}
        <div className="px-[5px] !pt-[74px] h-full overflow-auto bg-gray-100">
          {children} {/* The dynamic content (pages) will be rendered here */}
        </div>
      </div>
    </div>
  );

  
};

export default Layout;
