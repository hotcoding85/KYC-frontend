import React from 'react'
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

export default function Crosscircle({color,className}) {
    const fullConfig = resolveConfig(tailwindConfig);
    const primaryColor = color || fullConfig.theme.colors.primary;
  return (
    <div>
       <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="16" height="16" rx="8" fill={primaryColor}/>
<g clip-path="url(#clip0_2366_192513)">
<g clip-path="url(#clip1_2366_192513)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.0236 5.5245L10.4737 4.97461L7.99878 7.4495L5.52389 4.97461L4.974 5.5245L7.44889 7.99939L4.974 10.4743L5.52389 11.0242L7.99878 8.54928L10.4737 11.0242L11.0236 10.4743L8.54867 7.99939L11.0236 5.5245Z" fill="white"/>
</g>
</g>
<defs>
<clipPath id="clip0_2366_192513">
<rect width="9.33333" height="9.33333" fill="white" transform="translate(3.33337 3.33325)"/>
</clipPath>
<clipPath id="clip1_2366_192513">
<rect width="9.33333" height="9.33333" fill="white" transform="translate(3.33337 3.33325)"/>
</clipPath>
</defs>
</svg>


    </div>
  )
}
