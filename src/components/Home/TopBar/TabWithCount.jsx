import React from 'react';

const TabWithCount = ({ label, count }) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="font-semibold">{label}</span>
      <span className="flex items-center justify-center w-6 h-6 text-sm font-semibold text-textBlack bg-gray-100 rounded-full">
        {count}
      </span>
    </div>
  );
};

export default TabWithCount;
