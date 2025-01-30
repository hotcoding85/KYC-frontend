export default function TransactionsActive({ width = "19", height = "18" }) {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
        <path
          d="M14 3V7C14 7.55228 14.4477 8 15 8H19"
          stroke="#14151A"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H14L19 8V19C19 20.1046 18.1046 21 17 21Z"
          stroke="#14151A"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9 9H10" stroke="#14151A" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 13H15" stroke="#14151A" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 17H15" stroke="#14151A" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );
}
