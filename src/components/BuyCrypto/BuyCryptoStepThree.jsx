import Back from "@/Icons/Back";
import Button from "../Elements/Button/Button";
import Warning from "@/Icons/Warning";
import Btc from "@/Icons/imageicon/Btc";
import Mastercard from "@/Icons/imageicon/Mastercard";

const BuyCryptoStepThree = ({ onBack, onNext }) => {
  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <div className="items-center justify-center w-full md:w-3/6 bg-white border rounded-2xl">
        <div className="flex-col p-6 ">
          <div className="flex flex-row items-center gap-2">
            <button className="" onClick={onBack}>
              <Back />
            </button>
            <h1 className="text-sm font-semibold">
              Does everything look good?
            </h1>
          </div>
          <div className="flex flex-col items-center justify-center my-4 space-y-1">
            <p className="text-textSecondary text-xs">You are buying</p>
            <Btc className="mb-4 size-6" />
            <p className="text-sm font-bold">10.00 BTC</p>
            <p className="font-semibold text-primary100 text-sm">
              ≈ 568,666.40 USD
            </p>
          </div>

          <div className="p-4 mb-4 space-y-2 border border-primary50 rounded-xl">
            <div className="flex items-center justify-between mt-2 text-textSecondary">
              <p className="text-xs text-textSecondary">Pay with</p>
              <p className="flex flex-row items-center space-x-2 text-sm font-semibold text-primary">
                <Mastercard className="w-6 h-4" />
                <span className="text-xs font-normal">Mastercard</span>
              </p>
            </div>
            <div className="flex items-center justify-between text-textSecondary">
              <p className="text-sm text-textSecondary">You’ll pay</p>
              <p className="text-xs font-medium text-primary">25 BTC</p>
            </div>
            {/* <div className="flex items-center justify-between mt-6 text-textSecondary">
              <p className="text-sm text-textSecondary">Rate</p>
              <p className="text-sm font-semibold text-primary">
                1 BTC = 25,000 USDT
              </p>
            </div> */}
            {/* <div className="flex items-center justify-between mt-2 text-textSecondary">
              <p className="text-sm text-textSecondary">Conversion fee</p>
              <p className="text-sm font-semibold text-primary">0.0005 BTC</p>
            </div> */}

            <div className="flex items-center justify-between mt-2 text-textSecondary">
              <p className="text-xs text-textBlack font-semibold">Total</p>
              <p className="text-xs font-semibold text-primary">0.0005 BTC</p>
            </div>
          </div>
          {/* <div className="flex items-start justify-between p-3 space-x-4 border border-primary50 rounded-xl">
            <Warning />
            <p className="text-sm text-textSecondary">
              This address can only receive BTC from Bitcoin network. Don’t send
              BTC from other networks, or it may result in a loss of funds.
            </p>
          </div> */}
          <Button
            title={"Continue"}
            className={"w-full p-4 bg-primary text-white mt-4"}
            onClick={onNext}
          />
        </div>
      </div>
    </div>
  );
};

export default BuyCryptoStepThree;
