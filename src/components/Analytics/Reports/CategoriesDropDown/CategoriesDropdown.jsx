import React, { useState } from 'react';

const CategoriesDropdown = ({ selectedCategories, selectCategory }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const categories = [
        'Acquisition',
        'Behavior',
        'Customers',
        'Finances',
        'Fraud',
        'Inventory',
        'Marketing',
        'Orders',
        'Profit margin',
        'Sales',
    ];

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="relative w-40">
            {/* Button to toggle dropdown */}
            <button
                onClick={toggleDropdown}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white text-sm text-center"
            >
                Categories {selectedCategories.length > 0 ? `(${selectedCategories.length})` : ''}
            </button>

            {/* Dropdown content (only show when dropdown is open) */}
            {isDropdownOpen && (
                <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-xl ">
                    <div className="p-4">
          
                        {categories.map((category) => (
                            <div key={category} className="flex items-center mb-1">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category)}
                                    onChange={() => selectCategory(category)}
                                    className="mr-2"
                                />
                                <label className="text-gray-700">{category}</label>
                            </div>
                        ))}

                        {/* Clear Button */}
                        <div className="mt-2">
                            <button onClick={() => selectCategory([])} className="text-blue-500">
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoriesDropdown;
