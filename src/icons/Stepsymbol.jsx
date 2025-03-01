import React from 'react'

export default function Stepsymbol({ className }) {
  return (
    <div>
      <svg className={className}
           width="33"
           height="32"
           viewBox="0 0 33 32"
           fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_1_91759)">
          <circle cx="16.5" cy="16" r="15" fill="#14151A" stroke="#14151A" strokeWidth="2" />
        </g>
        <path d="M13.0782 19.642L22.7202 10L24.0005 11.2802L13.0782 22.2025L8 17.1257L9.28025 15.8455L13.0782 19.642Z"
              fill="white" />
        <defs>
          <clipPath id="clip0_1_91759">
            <rect width="32" height="32" fill="white" transform="translate(0.5)" />
          </clipPath>
        </defs>
      </svg>

    </div>
  )
}
