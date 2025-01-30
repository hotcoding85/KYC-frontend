import React, { useState } from "react";
import VerticalThreeDots from "@/Icons/VerticalThreeDots";

const ActionDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="relative inline-block text-left">
            <button
                type="button"
                className="inline-flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-500"
                onClick={toggleDropdown}
            >
                <VerticalThreeDots />
            </button>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                        >
                            Pause Buying
                        </a>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                        >
                            Pause Sending
                        </a>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 hover:text-red-700"
                            role="menuitem"
                        >
                            Freeze
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActionDropdown;