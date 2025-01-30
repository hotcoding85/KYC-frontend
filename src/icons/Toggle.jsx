import React from 'react'

export default function Toggle({ className }) {
  return (
    <div>
      <svg className={className}
           width="36"
           height="26"
           viewBox="0 0 36 26"
           fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <rect y="1.85715" width="32" height="18.2857" rx="9.14286" fill="#14151A" />
        <g filter="url(#filter0_dd_186_35021)">
          <circle cx="22.8555" cy="11" r="8" fill="white" />
        </g>
        <defs>
          <filter id="filter0_dd_186_35021"
                  x="10.284"
                  y="0.142857"
                  width="25.1429"
                  height="25.1429"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha"
                           type="matrix"
                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                           result="hardAlpha" />
            <feOffset dy="1.71429" />
            <feGaussianBlur stdDeviation="2.28571" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_186_35021" />
            <feColorMatrix in="SourceAlpha"
                           type="matrix"
                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                           result="hardAlpha" />
            <feOffset dy="1.71429" />
            <feGaussianBlur stdDeviation="0.285714" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0" />
            <feBlend mode="normal" in2="effect1_dropShadow_186_35021" result="effect2_dropShadow_186_35021" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_186_35021" result="shape" />
          </filter>
        </defs>
      </svg>
    </div>
  )
}
