const TabNavigationBarMobile = ({ tabs, activeTab, setActiveTab, width, className }) => {
  return (
    <div className={`flex items-center overflow-auto bg-lightGrey border-b-[1px] border-b-primary50 scrollbar-hide w-full ${className}`}>
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`block ${width || 'w-1/3'} font-normal text-center text-xs focus:outline-none whitespace-nowrap h-8 text-textBlack ${
            activeTab === index && "border-b-2 border-b-primary"
          }`}
          onClick={() => setActiveTab(index)}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default TabNavigationBarMobile
