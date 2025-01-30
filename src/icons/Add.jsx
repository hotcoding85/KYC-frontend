export default function Add({ fill }) {
  return (
    <>
      <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4.5 1.0625V8.9375M8.4375 5H0.5625"
          stroke={fill || "black"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
