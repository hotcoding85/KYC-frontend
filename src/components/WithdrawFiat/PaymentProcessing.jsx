import Button from "../Elements/Button/Button";
import Back from "@/Icons/Back";
import Load from "@/Icons/imageicon/Load";

const PaymentProcessing = ({ onBack, onNext }) => {
  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <div className="items-center justify-center w-full bg-white border md:w-[500px] rounded-2xl">
        <div className="flex-col p-4">
        <div className="flex items-center mb-4 space-x-2">
            <button onClick={onBack}>
              <Back />
            </button>
            <h1 className="text-sm font-semibold">Does everything look good?</h1>
          </div>
          <div className="flex flex-col items-center justify-center mb-4 space-y-1">
            <Load className="w-8 h-8" />
            <h1 className="text-sm font-semibold">Recipient Amount</h1>
            <p className="text-xs text-center text-textSecondary">
              Please wait. Your payment is being processed. This may take a few seconds.
            </p>
          </div>
          {/* Transaction Details */}
          <div className="p-4 mb-4 space-y-2 border border-primary50 rounded-xl">
            <div className="flex flex-col justify-between md:flex-row md:items-center text-textSecondary">
              <p className="text-xs text-textSecondary">To</p>
              <p className="text-xs font-normal text-primary">@adsmith1995</p>
            </div>
            <div className="flex flex-col justify-between mt-6 md:flex-row md:items-center text-textSecondary">
              <p className="text-xs text-textSecondary">Short code</p>
              <p className="text-xs font-normal text-primary">123456</p>
            </div>
            <div className="flex flex-col justify-between mt-6 md:flex-row md:items-center text-textSecondary">
              <p className="text-xs text-textSecondary">Account number</p>
              <p className="text-xs font-normal text-primary">987654321</p>
            </div>
            <div className="flex flex-col justify-between mt-2 md:flex-row md:items-center text-textSecondary">
              <p className="text-xs text-textSecondary">Fees</p>
              <p className="text-xs font-normal text-primary">No fees</p>
            </div>
            <div className="flex flex-col justify-between mt-2 md:flex-row md:items-center text-textSecondary">
              <p className="text-xs text-textSecondary">Estimated Arrival</p>
              <p className="text-xs font-normal text-primary">2024-07-25 14:31:12</p>
            </div>
            <div className="flex flex-col justify-between mt-2 md:flex-row md:items-center text-textSecondary">
              <p className="text-xs font-semibold text-primary">Beneficiary will receive</p>
              <p className="text-xs font-semibold text-primary">$25.00 USD</p>
            </div>
          </div>
          <Button title={"Ok"} className={"w-full h-8 bg-primary text-white"} onClick={onNext} />
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessing;
