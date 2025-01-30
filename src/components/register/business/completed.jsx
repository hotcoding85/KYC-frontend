import React from 'react'

const VerificationCompleted = () => {
  return (
    <div className="flex justify-center max-h-[60vh] overflow-y-auto mt-4">
      <div className="flex flex-col items-start w-[500px] gap-6">
        <h2 className="font-semibold text-base text-textBlack">
          Application Submitted: Awaiting Review
        </h2>

        <p className="font-normal font-xs text-textSecondary">
          Your application has been submitted. We’ll review it and notify you once the process is complete.
        </p>
      </div>
    </div>
  );
};

export default VerificationCompleted
