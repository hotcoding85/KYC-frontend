import React, { useState } from "react";

const RequestMoreInfoModal = ({ isOpen, onClose }) => {
  const [selectedDocs, setSelectedDocs] = useState({
    proofOfAddress: false,
    financialStatement: false,
    businessLicense: false,
    other: false,
  });

  const [otherInput, setOtherInput] = useState("");

  // Function to handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedDocs((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Requested Documents:", selectedDocs);
    console.log("Other Document Info:", otherInput);
    onClose(); // Close the modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
      <div className="bg-white w-6/12 h-[480px] rounded-2xl shadow-lg overflow-hidden">
        {/* Modal Header */}
        <div className="w-full bg-gray-100 rounded-tl-2xl rounded-tr-2xl">
          <div className="flex items-center justify-between px-4 py-2 pb-2 mb-4">
            <h2 className="text-lg font-normal text-textBlack">Request Additional Information</h2>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-300"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Information Requested Input */}
        <div className="px-4 mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Information Requested
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-2xl h-[103px]"
            placeholder="Please specify the details you need from the company to proceed with the approval process."
          ></textarea>
        </div>

        {/* Requested Documents Section */}
        <div className="px-4 mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Requested Documents
          </label>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="proofOfAddress"
                checked={selectedDocs.proofOfAddress}
                onChange={handleCheckboxChange}
                className="w-5 h-5 text-indigo-600 form-checkbox"
              />
              <label className="ml-2 text-sm">Proof of Address</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="financialStatement"
                checked={selectedDocs.financialStatement}
                onChange={handleCheckboxChange}
                className="w-5 h-5 text-indigo-600 form-checkbox"
              />
              <label className="ml-2 text-sm">Updated Financial Statement</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="businessLicense"
                checked={selectedDocs.businessLicense}
                onChange={handleCheckboxChange}
                className="w-5 h-5 text-indigo-600 form-checkbox"
              />
              <label className="ml-2 text-sm">Business License</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="other"
                checked={selectedDocs.other}
                onChange={handleCheckboxChange}
                className="w-5 h-5 text-indigo-600 form-checkbox"
              />
              <label className="ml-2 text-sm">Other</label>

              {/* Registration documents input shown next to the checkbox */}
              {selectedDocs.other && (
                <input
                  type="text"
                  placeholder="Registration documents"
                  value={otherInput}
                  onChange={(e) => setOtherInput(e.target.value)}
                  className="p-2 ml-4 border border-gray-300 rounded-lg w-80"
                />
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* Modal Footer */}
        <div className="flex justify-end px-4 py-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 mr-2 text-sm bg-gray-200 rounded-xl hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 text-sm font-normal text-white bg-black rounded-xl hover:bg-gray-800"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestMoreInfoModal;
