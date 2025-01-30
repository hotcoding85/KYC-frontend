export default function Close({ color }) {
  return (
    <>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.8">
          <rect
            x="0.5"
            y="0.5"
            width="23"
            height="23"
            rx="11.5"
            stroke="#E6E6E6"
            strokeWidth="1"
          />
          <g clipPath="url(#clip0_1_8587)">
            <g clipPath="url(#clip1_1_8587)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                fill={color || "#1C1C1C"}
                d="M16.8622 8.02194L15.9784 7.13818L12.0009 11.1157L8.02343 7.13818L7.13965 8.02194L11.1172 11.9994L7.13965 15.9769L8.02343 16.8607L12.0009 12.8832L15.9784 16.8607L16.8622 15.9769L12.8847 11.9994L16.8622 8.02194Z"
              />
            </g>
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_8587">
            <rect
              width="15"
              height="15"
              fill="white"
              transform="translate(4.5 4.5)"
            />
          </clipPath>
          <clipPath id="clip1_1_8587">
            <rect
              width="15"
              height="15"
              fill="white"
              transform="translate(4.5 4.5)"
            />
          </clipPath>
        </defs>
      </svg>
    </>
  );
}
