import React from 'react'

export default function CheckboxActive({className}) {
  return (
    <div>
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_1_8497)">
<path d="M2 5C2 2.79086 3.79086 1 6 1H18C20.2091 1 22 2.79086 22 5V17C22 19.2091 20.2091 21 18 21H6C3.79086 21 2 19.2091 2 17V5Z" fill="white"/>
<path d="M2.5 5C2.5 3.067 4.067 1.5 6 1.5H18C19.933 1.5 21.5 3.067 21.5 5V17C21.5 18.933 19.933 20.5 18 20.5H6C4.067 20.5 2.5 18.933 2.5 17V5Z" stroke="#E9E9E9"/>
</g>
<defs>
<filter id="filter0_d_1_8497" x="0" y="0" width="24" height="24" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="1"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.0784314 0 0 0 0 0.0823529 0 0 0 0 0.101961 0 0 0 0.05 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_8497"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_8497" result="shape"/>
</filter>
</defs>
</svg>

    </div>
  )
}
