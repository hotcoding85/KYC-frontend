import React from 'react'

export default function Checkbox({className}) {
  return (
    <div>
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_1_8502)">
<path d="M2 5C2 2.79086 3.79086 1 6 1H18C20.2091 1 22 2.79086 22 5V17C22 19.2091 20.2091 21 18 21H6C3.79086 21 2 19.2091 2 17V5Z" fill="#212121"/>
</g>
<path d="M8 10.2857L10.9167 14L16 8" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
<defs>
<filter id="filter0_d_1_8502" x="0" y="0" width="24" height="24" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="1"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.0784314 0 0 0 0 0.0823529 0 0 0 0 0.101961 0 0 0 0.05 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_8502"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_8502" result="shape"/>
</filter>
</defs>
</svg>

    </div>
  )
}
