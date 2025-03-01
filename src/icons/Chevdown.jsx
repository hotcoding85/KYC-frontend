import React from "react";

export default function Chevdown({ className }) {
  return (
    <div>
      <svg
        className={className}
        viewBox="0 0 24 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1795_328201)">
          <path
            d="M17.4198 2.95589L18.4798 4.01689L12.7028 9.79589C12.6102 9.88905 12.5001 9.96298 12.3789 10.0134C12.2576 10.0639 12.1276 10.0898 11.9963 10.0898C11.8649 10.0898 11.7349 10.0639 11.6137 10.0134C11.4924 9.96298 11.3823 9.88905 11.2898 9.79589L5.50977 4.01689L6.56977 2.95689L11.9948 8.38089L17.4198 2.95589Z"
            fill="#4D4D4D"
          />
        </g>
        <defs>
          <clipPath id="clip0_1795_328201">
            <rect
              width="12"
              height="24"
              fill="white"
              transform="matrix(0 1 -1 0 24 0.5)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
