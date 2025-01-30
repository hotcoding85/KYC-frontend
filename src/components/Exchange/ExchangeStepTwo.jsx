import Back from "@/Icons/Back";
import Button from "../Elements/Button/Button";
import Aud from "@/Icons/imageicon/Aud";
import Dollar from "@/Icons/imageicon/Dollar";
import React from "react";

const ExchangeStepTwo = ({ fromCurrency, toCurrency, amount, convertedAmount, onBack, onConfirm }) => {
  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <div className="items-center justify-center w-full bg-white border md:w-[500px] rounded-2xl">
        <div className="flex-col p-4">
          <div className="flex items-center mb-4 space-x-2">
            <button className="" onClick={onBack}>
              <Back />
            </button>
            <h2 className="text-sm font-semibold">Does everything look good?</h2>
          </div>
          <div className="p-4 mb-4 space-y-2 border border-primary50 rounded-xl">
            <div className="flex flex-row items-center justify-center space-x-8">
              <div className="flex flex-col justify-center space-y-1 text-center">
                <p className="text-[11px] text-textLight">From</p>
                <div className="flex justify-center">
                  <Dollar className="items-center text-center size-6" />
                </div>
                <p className="text-sm font-bold">USD</p>
                <p className="text-sm font-semibold">
                  10.00 <span className="text-textLight">USD</span>
                </p>
              </div>
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.26533 3.73264C9.33556 3.80295 9.375 3.89826 9.375 3.99764C9.375 4.09701 9.33556 4.19232 9.26533 4.26264L6.26533 7.26264C6.231 7.29948 6.1896 7.32903 6.1436 7.34953C6.0976 7.37002 6.04794 7.38104 5.99759 7.38193C5.94724 7.38282 5.89722 7.37356 5.85053 7.3547C5.80384 7.33584 5.76142 7.30776 5.72581 7.27215C5.6902 7.23654 5.66213 7.19413 5.64327 7.14743C5.62441 7.10074 5.61515 7.05073 5.61603 7.00037C5.61692 6.95002 5.62794 6.90037 5.64844 6.85437C5.66894 6.80837 5.69849 6.76697 5.73533 6.73263L8.09533 4.37264L1.00033 4.37263C0.900874 4.37263 0.80549 4.33313 0.735164 4.2628C0.664839 4.19247 0.62533 4.09709 0.62533 3.99763C0.62533 3.89818 0.664839 3.8028 0.735165 3.73247C0.80549 3.66214 0.900874 3.62263 1.00033 3.62263L8.09533 3.62264L5.73533 1.26264C5.69849 1.2283 5.66894 1.1869 5.64844 1.1409C5.62794 1.0949 5.61692 1.04525 5.61603 0.994896C5.61515 0.944545 5.62441 0.89453 5.64327 0.847836C5.66213 0.801142 5.6902 0.758725 5.72581 0.723116C5.76142 0.687507 5.80384 0.659434 5.85053 0.640574C5.89723 0.621713 5.94724 0.612451 5.99759 0.613339C6.04794 0.614228 6.0976 0.625249 6.1436 0.645745C6.1896 0.666241 6.231 0.695792 6.26533 0.732635L9.26533 3.73264Z"
                  fill="#4D4D4D"
                />
              </svg>

              <div className="flex flex-col justify-center space-y-1 text-center">
                <p className="text-[11px] text-textLight">To</p>
                <div className="flex justify-center">
                  <Aud className="items-center text-center size-6" />
                </div>
                <p className="text-sm font-bold">AUD</p>
                <p className="text-sm font-semibold">
                  10.00 <span className="text-textLight">AUD</span>
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 mb-4 space-y-2 text-xs border border-primary50 rounded-xl">
            <div className="flex justify-between">
              <p>Rate</p>
              <p>
                1 {fromCurrency} = 1.53 {toCurrency}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Conversion fee</p>
              <p>0.06 {fromCurrency}</p>
            </div>
            <div className="flex justify-between font-bold">
              <p>You will receive</p>
              <p>
                {convertedAmount} {toCurrency}
              </p>
            </div>
          </div>
          <Button title="Confirm Exchange" className={"w-full h-8 text-xs bg-primary text-white"} onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};

export default ExchangeStepTwo;
