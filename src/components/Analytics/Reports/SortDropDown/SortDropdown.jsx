import React, { useState } from 'react';

const SortDropdown = ({ sortBy, setSortBy, sortOption, setSortOption }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

  // Handle sort option change (radio button)
  const handleSortChange = (option) => {
    setSortOption(option);
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative w-80">
      {/* Button to toggle dropdown */}
      <button
        onClick={toggleDropdown}
        className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white text-center text-sm"
      >
        Sort by: {sortBy} ({sortOption})
      </button>

      {/* Dropdown content (only show when dropdown is open) */}
      {isDropdownOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-xl shadow-lg">
          <div className="p-4">
            <h3 className="font-semibold text-gray-600 mb-2">Sort by</h3>

            {/* Sort Options */}
            <div className="mb-4">
              <div className="flex items-center mb-1">
                <input
                  type="radio"
                  name="sortBy"
                  value="Report name"
                  checked={sortBy === 'Report name'}
                  onChange={() => setSortBy('Report name')}
                  className="mr-2"
                />
                <label className="text-gray-700">Report name</label>
              </div>
              <div className="flex items-center mb-1">
                <input
                  type="radio"
                  name="sortBy"
                  value="Created"
                  checked={sortBy === 'Created'}
                  onChange={() => setSortBy('Created')}
                  className="mr-2"
                />
                <label className="text-gray-700">Created</label>
              </div>
            </div>

            {/* Sort Direction */}
            <div className="flex flex-col">
              <button
                className={`flex items-center justify-between px-4 py-2 border rounded-md mb-2 ${
                  sortOption === 'Oldest to newest' ? 'bg-gray-100' : ''
                }`}
                onClick={() => handleSortChange('Oldest to newest')}
              >
                <span>Oldest to newest</span>
                <span className="text-gray-500">↑</span>
              </button>
              <button
                className={`flex items-center justify-between px-4 py-2 border rounded-md ${
                  sortOption === 'Newest to oldest' ? 'bg-gray-100' : ''
                }`}
                onClick={() => handleSortChange('Newest to oldest')}
              >
                <span>Newest to oldest</span>
                <span className="text-gray-500">↓</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
