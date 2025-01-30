import Back from "@/Icons/Back";
import Button from "../Elements/Button/Button";

const ExchangeStepThree = ({ onBack, onOk }) => {
  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <div className="items-center justify-center w-full bg-white border md:w-[500px] rounded-2xl">
        <div className="flex-col p-4 ">
          <button className="mb-4" onClick={onBack}>
            <Back />
          </button>
          <div className="flex flex-col items-center justify-center mb-4 space-y-1">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="#23A26D" fill-opacity="0.12" />
              <path
                d="M15.7133 8.38281C11.5152 8.38281 8.09424 11.8038 8.09424 16.0019C8.09424 20.2 11.5152 23.6209 15.7133 23.6209C19.9114 23.6209 23.3323 20.2 23.3323 16.0019C23.3323 11.8038 19.9114 8.38281 15.7133 8.38281ZM19.3552 14.2495L15.0352 18.5695C14.9285 18.6761 14.7838 18.7371 14.6314 18.7371C14.479 18.7371 14.3342 18.6761 14.2276 18.5695L12.0714 16.4133C11.8504 16.1923 11.8504 15.8266 12.0714 15.6057C12.2923 15.3847 12.658 15.3847 12.879 15.6057L14.6314 17.358L18.5476 13.4419C18.7685 13.2209 19.1342 13.2209 19.3552 13.4419C19.5761 13.6628 19.5761 14.0209 19.3552 14.2495Z"
                fill="#23A26D"
              />
            </svg>
            <p className="text-xs text-textSecondary">You received</p>
            <p className="text-sm font-semibold">15.3 AUD</p>
          </div>
          <div className="p-4 mb-4 space-y-2 text-xs border border-primary50 rounded-xl">
            <div className="flex items-center justify-between text-textSecondary">
              <p className="text-textSecondary">Rate</p>
              <p className="font-semibold text-primary">1 USD = 1.50 AUD</p>
            </div>
            <div className="flex items-center justify-between mt-6 text-textSecondary">
              <p className="text-textSecondary">Inverse</p>
              <p className="font-semibold text-primary">1 AUD = 0.66620 USD</p>
            </div>
            <div className="flex items-center justify-between mt-2 text-textSecondary">
              <p className="text-textSecondary">Converted</p>
              <p className="font-semibold text-primary">10 USD</p>
            </div>
          </div>
          <Button title="Ok" className={"w-full h-8 bg-primary text-white"} onOk={onOk} />
        </div>
      </div>
    </div>
  );
};

export default ExchangeStepThree;
