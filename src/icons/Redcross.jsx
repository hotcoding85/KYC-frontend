import React from 'react'

export default function Redcross({ className }) {
  return (
    <div>
      <svg className={className}
           width="16"
           height="16"
           viewBox="0 0 16 16"
           fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M8 0.125C3.6125 0.125 0.125 3.6125 0.125 8C0.125 12.3875 3.6125 15.875 8 15.875C12.3875 15.875 15.875 12.3875 15.875 8C15.875 3.6125 12.3875 0.125 8 0.125ZM11.0375 11.9375L8 8.9L4.9625 11.9375L4.0625 11.0375L7.1 8L4.0625 4.9625L4.9625 4.0625L8 7.1L11.0375 4.0625L11.9375 4.9625L8.9 8L11.9375 11.0375L11.0375 11.9375Z"
              fill="#E6483D" />
      </svg>

    </div>
  )
}
