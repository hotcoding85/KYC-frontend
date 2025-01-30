import React, {useState} from "react";
import useApi from "@/hooks/useApi";
import Modal from "@/components/Modal/Modal";
import { ButtonsText, TextButton } from "../Elements/Button/Button";

const CombinedCard = ({
  username,
  usernameLastUpdated,
  status,
  role,
  onAddNote,
  setUpdatedUsername,
  updatedUsername,
  onUpdateUsername,
  showDropdown = false,
  dropdownComponent = null,
  dropdownRole = null,
  showUserRole = true,
  input = false,
  showinput = null,
  privateNote,
  privateNoteId,
  onRemoveNote
}) => {
  const ONE_YEAR_IN_MS = 365 * 24 * 60 * 60 * 1000; // One year in milliseconds
  const currentDate = new Date();
  const lastUpdatedDate = new Date(usernameLastUpdated);
  const isLessThanOneYear = usernameLastUpdated && (currentDate - lastUpdatedDate) < ONE_YEAR_IN_MS;

  // Calculate the number of days since last update
  const daysSinceLastUpdate = usernameLastUpdated
    ? Math.floor((currentDate - lastUpdatedDate) / (1000 * 60 * 60 * 24))
    : null;
  const [isModalCOpen, setModalCOpen] = useState(false);
  const closeCModal = () => setModalCOpen(false);


  return (
    <>
      {/* username card */}
      <div className="p-4 bg-white shadow-sm rounded-2xl">
        <div className="flex justify-between mb-1.5 ">
          <p className="my-auto  w-full text-textBlack h-[20px] font-inter text-sm font-semibold leading-[20px] tracking-[-0.005em] text-left text-textBlack">
            {input ? "Change Username" : "Username"}
          </p>
          {/* Conditionally render the button */}
          {!input && (!usernameLastUpdated || !isLessThanOneYear) && (
            <button
              className="text-xs text-blue-600 font-medium leading-4 text-left"
              onClick={() => {
                setModalCOpen(true);
              }}
            >
              {!username ? "Add" : "Change"}
            </button>
          )}
        </div>

        {/* Display the username or the input field */}
        {!input ? (
          <p className="font-inter text-sm font-medium leading-4 text-left mt-3 text-textBlack">
            {username ? "@" + username : "You don't have any username yet."}
          </p>
        ) : (
          showinput && <div className="mb-2">{showinput}</div>
        )}

        <p className="mt-3 text-xs text-gray-500 flex items-center mb-2">
          <span className="mr-1 flex items-center justify-center w-4 h-4 bg-warningLight border border-warning rounded-full text-white font-bold text-[10px] text-textBlack">
            !
          </span>
          {usernameLastUpdated && isLessThanOneYear
            ? daysSinceLastUpdate === 0
              ? "You changed the username recently. You can change your username once a year."
              : `You changed the username ${daysSinceLastUpdate} days ago. You can change your username once a year.`
            : "You can change your username once a year."}
          {}
        </p>
      </div>

      {/* Status Card */}
      <div className="p-4 bg-white shadow-sm rounded-2xl">
        <div className="flex justify-between mb-2">
          <p className="my-auto w-[79px] h-[20px] font-inter text-sm text-textBlack font-semibold leading-[20px] tracking-[-0.005em] text-left ">
            Status
          </p>
          {showDropdown && (
            <span
              className={`px-8 py-1.5  ${
                status
                  ? " text-success bg-successLight"
                  : " text-red-400 bg-alertLight"
              } rounded-full`}
            >
              <p className="w-full mx-auto text-xs font-medium text-center">
                {status ? "Active" : "Suspended"}
              </p>
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500 ">Status</p>
          {!showDropdown && (
            <span
              className={`px-8 py-1.5 text-xs h-7 ${
                status
                  ? " text-success bg-successLight"
                  : " text-red-600 bg-alertLight"
              } rounded-full`}
            >
              <p className="text-xs font-medium w-fulltext-center">{status ? "Active" : "Suspended"}</p>
            </span>
          )}
        </div>
        {showDropdown && dropdownComponent && (
          <div className="">{dropdownComponent}</div>
        )}
      </div>

      {/* User Role Card */}
      {showUserRole && (
        <div className="p-4 bg-white rounded-2xl ">
          <div className="flex justify-between mb-2">
            <p className="my-auto w-[65px] h-[20px] font-inter text-sm  text-textBlack font-semibold leading-[20px] tracking-[-0.005em] text-left">
              User Role
            </p>
            {showDropdown && (
              <span className="px-8 py-1.5 text-gray-600 bg-gray-200  rounded-full h-[28px]  text-center text-xs font-medium leading-4">
                <p className="w-full text-xs font-medium text-center text-textBlack">
                  {role}
                </p>
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">Role</p>
            {!showDropdown && (
              <span className="px-8 py-1.5 text-xs text-gray-600 bg-gray-200 rounded-full">
                <p className="w-full mx-auto text-xs font-medium text-center text-textBlack">
                  {role}
                </p>
              </span>
            )}
          </div>
          {showDropdown && dropdownRole && <div>{dropdownRole}</div>}
        </div>
      )}

      {/* Private Note Card */}
      <div className="p-4 bg-white shadow-sm rounded-2xl space-y-2">
        <div className="flex items-center justify-between">
          <p className="my-auto w-[81px] h-[20px] font-inter text-sm  text-textBlack font-semibold leading-[20px] tracking-[-0.005em] text-left text-nowrap">
            Private note
          </p>
          <button
            className="text-xs font-medium leading-4 text-left text-blue-600"
            onClick={onAddNote}
          >
            {privateNoteId && privateNoteId !== "" ? "Edit Note" : "+ Add Note"}
          </button>
        </div>
        <p className="text-xs text-gray-500">Only visible to you</p>
        {/* Display Private Note Content */}
        {privateNote ? (
          <div className="mt-2 p-3 bg-gray-50 rounded-lg flex justify-between items-center">
            <p className="text-sm font-inter text-gray-700 italic">
              {privateNote}
            </p>
            <button
              className="ml-2 text-alert hover:text-red-700"
              onClick={onRemoveNote}
              aria-label="Remove note"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.136 21H7.864a2 2 0 01-1.997-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v2m6 0H6"
                />
              </svg>
            </button>
          </div>
        ) : (
          <p className="mt-2 text-sm text-gray-400">
            No private notes added yet.
          </p>
        )}
      </div>
      {/* Update Username Modal Body */}
      <Modal
        isOpen={isModalCOpen}
        onClose={closeCModal}
        title="Add UserName"
        size="xl"
        headerClassName="p-2"
        contentClassName="p-0"
      >
        {/* Modal Body */}
        <div className="p-4">
          {/* List of Languages */}
          <div className="flex flex-col py-2 gap-2 ">
            <input
              className="w-full text-textBlack text-sm rounded-lg border border-primary50 p-2"
              value={updatedUsername}
              placeholder="Input your username"
              onChange={(e) => setUpdatedUsername(e.target.value)}
            />
          </div>
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end p-4 border-t gap-2 sm:gap-4">
          <TextButton
            title="Cancel"
            type="secondary"
            width="max-w-[114px] w-full"
            onClick={closeCModal}
            textColor="text-textBlack"
            backgroundColor="bg-white"
            borderColor="border border-primary50"
            className={"py-1 sm:py-2 px-4"}
          />
          <TextButton
            title="Save"
            type="primary"
            width="max-w-[114px] w-full"
            onClick={() => {
              onUpdateUsername();
              closeCModal();
            }}
            className={"py-1 sm:py-2 px-4"}
          />
        </div>
      </Modal>
    </>
  );
};

export default CombinedCard;
