import React from "react";

export default function CrossBtn({ className }) {
  return (
    <div>
      <svg
        className={className}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.8">
          <rect
            x="0.666667"
            y="0.666667"
            width="30.6667"
            height="30.6667"
            rx="15.3333"
            stroke="#E6E6E6"
            strokeWidth="1.33333"
          />
          <g clipPath="url(#clip0_1_8319)">
            <g clipPath="url(#clip1_1_8319)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M22.479 10.6959L21.3006 9.51758L15.9973 14.8209L10.694 9.51758L9.51562 10.6959L14.819 15.9992L9.51562 21.3026L10.694 22.4809L15.9973 17.1776L21.3006 22.4809L22.479 21.3026L17.1756 15.9992L22.479 10.6959Z"
                fill="#1C1C1C"
              />
            </g>
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_8319">
            <rect
              width="20"
              height="20"
              fill="white"
              transform="translate(6 6)"
            />
          </clipPath>
          <clipPath id="clip1_1_8319">
            <rect
              width="20"
              height="20"
              fill="white"
              transform="translate(6 6)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
