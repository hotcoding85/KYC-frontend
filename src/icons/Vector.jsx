import React from 'react'

export default function Vector({ className }) {
  return (
    <div>
      <svg className={className}
           width="6"
           height="11"
           viewBox="0 0 6 11"
           fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M0.043323 0.983203L0.927489 0.0998697L5.74332 4.91404C5.82095 4.99118 5.88256 5.08291 5.9246 5.18395C5.96664 5.28499 5.98828 5.39335 5.98828 5.50279C5.98828 5.61223 5.96664 5.72058 5.9246 5.82162C5.88256 5.92267 5.82095 6.0144 5.74332 6.09154L0.927489 10.9082L0.0441561 10.0249L4.56416 5.50404L0.043323 0.983203Z"
              fill="#4D4D4D" />
      </svg>

    </div>
  )
}
