import Button from "@/components/Elements/Button/Button";
import VisibilityOff from "@/Icons/VisibilityOff";
import React from "react";

const SecurityQuestions = ({ questions, onResetClick }) => {
  return (
    <div className="p-4 bg-white border rounded-xl">
      <h3 className="mb-2 text-sm font-semibold">Security Questions</h3>
      <p className="mb-4 text-xs text-gray-500">
        Set up security questions to help protect your account. You can change
        your answers here.
      </p>

      <div className="space-y-4">
        {questions.map((question, index) => (
          <div key={index} className="space-y-2">
            {/* Question */}
            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:gap-4">
              <p className="text-sm font-semibold">{`Question ${
                index + 1
              }:`}</p>
              <div className="flex items-center space-x-2 md:ml-12">
                <p className="text-xs">{question.question}</p>
              </div>
            </div>

            {/* Answer */}
            <div className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-y-0 md:gap-[75px]">
              <p className="text-sm font-semibold">Answer {index + 1}:</p>
              <div className="flex items-center space-x-2">
                <p className="pt-1 text-xs font-semibold">**********</p>
                <VisibilityOff className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-4">
        <Button
          title="Send Reset Security Question Email"
          onClick={onResetClick}
          className="w-full md:w-auto bg-primary text-white py-2.5"
          textClassName="text-xs font-semibold"
        />
      </div>
    </div>
  );
};

export default SecurityQuestions;
