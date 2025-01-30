import React, {useState, useRef, useEffect} from "react";

export default function OTP({ onChange, className, validationMessage }) {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputs = useRef([]);

  useEffect(() => {
    if (onChange && otp.length == 6) {
      onChange(otp);
    }
  }, [otp]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        inputs.current[index + 1].focus();
      } else {
        nextStep();
      }
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text");
    if (/^\d*$/.test(pasteData)) {
      const newOtp = pasteData.split("").slice(0, 6);
      setOtp(newOtp);
      newOtp.forEach((value, index) => {
        if (value && index < 5) {
          inputs.current[index + 1].focus();
        }
      });
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center space-x-2 gap-2">
        <div className="flex flex-row gap-2">
          {otp.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleChange(e, index)}
              onPaste={handlePaste}
              className={`w-16 h-16 border border-gray-300 rounded-xl text-center text-textBlack text-xl ${className}`}
            />
          ))}
        </div>
        <div className="block">
          <span
            className={`text-alert text-sm ${
              validationMessage != "" ? "flex" : "hidden"
            }`}
          >
            {validationMessage}
          </span>
        </div>
      </div>
    </>
  );
}