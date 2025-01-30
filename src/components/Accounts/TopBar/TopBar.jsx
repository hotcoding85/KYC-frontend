import React, { useState } from "react";
import Back from "@/Icons/Back";
import ConfirmationModal from "@/components/Elements/ConfirmationModal";
import useApi from "@/hooks/useApi";
import Profile from "@/Icons/imageicon/Profile";

const TopBar = ({
  userData,
  option,
  onEdit,
  onSave,
  onEditSave,
  fetchAccountData,
  goBack,
  isAdd,
}) => {
  const userName =
    `${userData?.first_name || ''}  ${userData?.last_name || ''}` || "Unnamed User";
  const isActive = userData?.status || false;
  const { fetchData } = useApi();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const renderLeftSection = () => {
    return (
    <div className="flex items-center">
        <span classNmae="cursor-pointer" onClick={goBack}>
        <Back />
        </span>
        <Profile className="w-8 h-8 rounded-full ml-4" />
        <h2 className="ml-4 text-sm font-medium text-textBlack">{userName}</h2>
        <span
        className={`ml-4 px-4 py-1 rounded-full text-sm ${
            isActive
            ? "bg-successLight text-success"
            : "bg-alertLight text-red-600"
        }`}
        >
        {isActive ? "Active" : "Suspend"}{" "}
        </span>
    </div>
    );
  };

  const renderRightSection = () => {
    return (
      <div className="flex items-center space-x-4">
        {!isAdd && (
          <button
            onClick={handleOption}
            className={`px-5 h-8 text-center text-sm py-2 border flex items-center justify-center rounded-xl ${
              isActive
                ? "border-red-600 text-red-600"
                : "border-green-600 text-success"
            }`}
          >
            {isActive ? "Suspend" : "Activate"}
          </button>
        )}
        <button
          className="px-5 py-2 h-8 text-center text-sm text-white bg-black rounded-[10px] flex items-center justify-center hidden"
          onClick={() => {
            if (option === "Edit") onEditSave?.();
            else if (option === "Add") onSave?.();
            else onEdit?.();
          }}
        >
          {option === "Edit" || option === "Add" ? "Save Changes" : "Edit"}
        </button>
      </div>
    );
  };

  async function handleAccountStatus() {
    const { result, error } = await fetchData(`/account/${userData.id}`, {
      method: "PUT",
      body: {
        status: !userData.status,
      },
    });
    if (error) {
      setIsModalOpen(false);
    } else {
      await fetchAccountData();
      setIsModalOpen(false);
    }
  }

  const handleOption = async () => {
    let content = {};
    content = {
      title: `Confirm ${!userData.status ? "Activation" : "Suspension"}`,
      description: `Are you sure you want to ${
        !userData.status ? "Activate" : "Suspend"
      } this account?`,
      confirmText: userData.status ? "Suspend" : "Activate",
      confirmColor: userData.status ? "bg-alert" : "bg-primary",
      onConfirm: () => handleUserStatus(),
    };
    setModalContent(content);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex justify-between items-center px-2 py-1 bg-lightGrey rounded-lg">
        {renderLeftSection()}
        {renderRightSection()}
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent.title}
        description={modalContent.description}
        confirmText={modalContent.confirmText}
        confirmColor={modalContent.confirmColor}
        onConfirm={modalContent.onConfirm}
        showForm={modalContent.showForm}
      />
    </>
  );
};

export default TopBar;
