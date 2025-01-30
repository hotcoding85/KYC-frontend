import Button from "../Elements/Button/Button";
import Back from "@/Icons/Back";
import Mastercard from "@/Icons/imageicon/Mastercard";
import Load from "@/Icons/imageicon/Load";

const BuyCryptoStepFour = ({ onBack, onNext }) => {
  return (
    <div className="flex flex-col justify-between items-center h-screen">
      <div className="bg-white rounded-2xl border w-full md:w-3/6 justify-center items-center">
        <div className=" flex-col p-6">
          <div className="flex flex-row items-center gap-2 mb-4">
            <button className="" onClick={onBack}>
              <Back />
            </button>
            <p className="text-sm font-semibold">Does everything look good?</p>
          </div>
          <div className="mb-4 space-y-1 flex flex-col justify-center items-center">
            <Load className="w-8 h-8 mb-4" />
            <h1 className="text-sm font-semibold">Recipient Amount</h1>
            <p className="text-textSecondary text-xs text-center">
              Please wait while we process transaction. this will take no more
              than 30 seconds.
            </p>
          </div>
          {/* Transaction Details */}
          <div className="border border-primary50 rounded-xl p-4 space-y-2 mb-4">
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
          <Button
            title={"Ok"}
            className={"w-full p-4 bg-primary text-white"}
            onClick={onNext}
          />
        </div>
      </div>
    </div>
  );
};

export default BuyCryptoStepFour;
