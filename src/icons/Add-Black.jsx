export default function AddBlack({ width = "20", height = "20" }) {
  return (
    <>
      <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="20" height="20" rx="6" fill="#14151A" />
        <path d="M15 10.7143H10.7143V15H9.28571V10.7143H5V9.28571H9.28571V5H10.7143V9.28571H15V10.7143Z"
              fill="white" />
      </svg>
    </>
  );
}
