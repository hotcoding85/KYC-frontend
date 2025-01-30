import React from "react";

export default function Card({ title, subtitle, body, link, children, footer, onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick(title);
    }
  };

  return (
    <div className="flex-1 p-4 h-[7.7rem] bg-white shadow-sm rounded-2xl">
      <div className="flex flex-row justify-between">
        <h3 className="text-sm font-semibold text-textBlack">{title}</h3>
        {link && (
          <a
            onClick={handleClick}
            className="text-[10px] font-semibold text-blue-500 cursor-pointer"
          >
            {link}
          </a>
        )}
      </div>
      <div className="flex flex-row items-center justify-between space-x-4">
        <div>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] text-textSecondary">{subtitle}</p>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-base font-bold">100K</p>
            <div className="mt-1">{footer}</div>
          </div>
        </div>
        <div className="max-w-40 max-h-28">{children}</div>
      </div>
    </div>
  );
}
