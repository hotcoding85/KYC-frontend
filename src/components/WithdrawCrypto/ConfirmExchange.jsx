import Button from "../Elements/Button/Button";
import Back from "@/Icons/Back";
import Btc from "@/Icons/imageicon/Btc";

const ConfirmExchange = ({ onNext, onBack }) => {
  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <div className="items-center justify-center w-full bg-white border md:w-[500px] rounded-2xl">
        <div className="flex-col p-4 ">
          <div className="flex items-center mb-4 space-x-2">
            <button onClick={onBack}>
              <Back />
            </button>
            <h1 className="text-sm font-semibold">Does everything look good?</h1>
          </div>
          <div className="flex flex-col items-center justify-center my-4 space-y-1">
            <p className="text-textSecondary text-[11px]">You are sending</p>
            <Btc className="mb-4 size-6" />
            <p className="text-sm font-bold">10.00 BTC</p>
            <p className="text-sm font-semibold text-primary100">≈ 568,666.40 USD</p>
          </div>
          <div className="p-4 mb-4 space-y-2 border border-primary50 rounded-xl">
            <div className="flex flex-col justify-between md:flex-row md:items-center text-textSecondary">
              <p className="text-xs text-textSecondary">To</p>
              <p className="text-xs font-normal text-primary">@adsmith1995</p>
            </div>
            <div className="flex flex-col justify-between mt-6 md:flex-row md:items-center text-textSecondary">
              <p className="text-xs text-textSecondary">Network</p>
              <p className="text-xs font-normal text-primary">Bitcoin</p>
            </div>
            <div className="flex flex-col justify-between mt-2 md:flex-row md:items-center text-textSecondary">
              <p className="text-xs text-textSecondary">Conversion fee</p>
              <p className="text-xs font-normal text-primary">0.0005 BTC</p>
            </div>
            <div className="flex flex-col justify-between mt-2 md:flex-row md:items-center text-textSecondary">
              <p className="text-xs text-textSecondary">Note</p>
              <p className="text-xs font-normal text-primary">funds</p>
            </div>
            <div className="flex flex-col justify-between mt-2 md:flex-row md:items-center text-textSecondary">
              <p className="text-xs font-semibold text-primary">You will receive</p>
              <p className="text-xs font-semibold text-primary">9.9995 BTC</p>
            </div>
          </div>
          <Button title={"Continue"} className={"w-full p-4 h-8 bg-primary text-white"} onClick={onNext} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmExchange;
