import React from "react";

const OtpInput = ({ value, onChange, onPaste, index }) => {
    return (
        <input
            type="text"
            maxLength="1"
            value={value}
            onChange={(e) => onChange(e, index)}
            onPaste={onPaste}
            className="w-16 h-16 border border-gray-300 rounded-md text-center text-xl text-textBlack"
        />
    );
};

export default OtpInput;
