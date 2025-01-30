import React, { useState } from "react";
import { AuthButton } from "@/components/Elements/Button/Button";

const CreateUsername = ({ fromProofOfAddress, onNext }) => {
  const [username, setUsername] = useState("@alexajohn");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div className="w-full">
      <h2 className="mb-2 text-base font-semibold text-textBlack">Create @username</h2>
      <p className="text-xs text-textSecondary">
        Please provide the necessary details to create a username for your
        personal account.
      </p>
      <div className="my-6 sm:my-10">
        <div>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="@username"
          />
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-xs text-success ">✓ Username available</p>
          <p className="my-auto text-xs text-right text-gray-500">9/16</p>
        </div>
      </div>
      <AuthButton
        title="Create Username"
        onClick={onNext}
        className="w-full sm:mt-4 text-white bg-black rounded-lg"
      />
    </div>
  );
};

export default CreateUsername;
