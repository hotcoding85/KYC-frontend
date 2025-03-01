import React from 'react'

export default function Photo({ className }) {
  return (
    <div>
      <svg className={className} width="358" height="226" viewBox="0 0 358 226" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_b_1_92192)">
          <rect width="357.731"
                height="225.026"
                rx="20"
                transform="matrix(1 0 -0.000125174 1 0.148438 0)"
                fill="#14151A" />
          <rect x="2.49969"
                y="2.5"
                width="352.731"
                height="220.026"
                rx="17.5"
                transform="matrix(1 0 -0.000125174 1 0.148751 0)"
                stroke="#E9E9E9"
                strokeWidth="5" />
          <path d="M15.6714 43.5L15.6717 28C15.6718 22.4772 20.149 18 25.6719 18H45.1938"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round" />
          <path d="M342.117 43.5L342.117 28C342.117 22.4772 337.64 18 332.117 18H312.595"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round" />
          <path d="M15.2654 182L15.2655 197.5C15.2656 203.023 19.7428 207.5 25.2656 207.5H44.7876"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round" />
          <path d="M341.711 182L341.711 197.5C341.711 203.023 337.234 207.5 331.711 207.5H312.189"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round" />
        </g>
        <defs>
          <filter id="filter0_b_1_92192"
                  x="-11.8799"
                  y="-12"
                  width="381.76"
                  height="249.025"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="6" />
            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1_92192" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_1_92192" result="shape" />
          </filter>
        </defs>
      </svg>


    </div>
  )
}
