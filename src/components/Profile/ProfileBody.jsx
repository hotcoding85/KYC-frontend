import React, { useCallback, useEffect, useState, useRef } from "react";
import Button from "@/components/Elements/Button/Button";
import Back from "@/Icons/Back";
import Modal from "@/components/Modal/Modal";
import EditProfile from "./EditProfile";
import BasicInformation from "./BasicInformation";
import PersonalInfo from "./PersonalInfo";
import CombinedCard from "./CombinedCard";
import { useRouter } from "next/navigation";
import useApi from "@/hooks/useApi";
import SearchBar from "../Elements/search/SearchBar";
import { ButtonsText, TextButton } from "../Elements/Button/Button";
import { Toast } from "primereact/toast";

export default function ProfileBody({
  customerDetails,
  fetchCustomerDetails,
  company_id,
}) {
  const { fetchData, loading, error } = useApi();
  const toast = useRef(null);

  const [lastLogin, setLastLogin] = useState('')
  useEffect(() => {
    if (customerDetails && customerDetails.id) {
      console.log(customerDetails)
      const sessions = customerDetails.sessions
      if (sessions[sessions.length - 1]?.created) {
        const date = new Date(sessions[sessions.length - 1]?.created);
  
        // Extract date parts
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
  
        // Extract time parts
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
  
        setLastLogin(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
      }
      else{
        setLastLogin('Not Specified')
      }
      getUserProfile(customerDetails.user_id)
      getPrivateNote(customerDetails.company.company_id)
    }
  }, [customerDetails])

  const [profile, setProfile] = useState({})
  const [editedprofile, seteditedProfile] = useState({})
  const getUserProfile = async (id) => {
    const { result, error } = await fetchData(`/users/user/${id}`, {
      method: "GET",
    });
    if (!error) {
      if (result) {
        setProfile(result)
        seteditedProfile(result)
      }
    }
  }

  const [privateNote, setPrivateNote] = useState('')
  const [editedprivateNote, setEditedPrivateNote] = useState('')
  const [privateNoteId, setPrivateNoteId] = useState('')
  const getPrivateNote = async (id) => {
    const { result, error } = await fetchData(`/private-notes/${id}`, {
      method: "GET",
    });
    if (!error) {
      if (result) {
        setPrivateNote(result.content)
        setEditedPrivateNote(result.content)
        setPrivateNoteId(result.private_note_id)
      }
      else{
        setPrivateNote('')
        setEditedPrivateNote('')
        setPrivateNoteId('')
      }
    }
  }

  const [isModalOpen, setModalOpen] = useState(false);
  const [showSecondComponent, setShowSecondComponent] = useState(false);
  const [formData, setFormData] = useState(customerDetails);
  const [editedformData, seteditedFormData] = useState(customerDetails);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const status = customerDetails?.status ? "Active" : "Inactive";
  const roleValue = [
    { value: "SUPER_ADMINISTRATOR", label: "Super Administrator" },
    { value: "SUPER_USER", label: "Super User" },
    { value: "COMPANY_ADMINISTRATOR", label: "Company Administrator" },
    { value: "COMPANY_USER", label: "Company User" },
    { value: "END_USER", label: "End User" },
  ];
  const role = customerDetails?.role || "SUPER_ADMINISTRATOR";

  const handleToggle = () => {
    setShowSecondComponent((prevState) => !prevState);
  };

  const handleAddNote = useCallback(async () => {
    setModalCOpen(true)
    setEditedPrivateNote(privateNote)
  }, [privateNote]);

  const onRemoveNote = useCallback(async () => {
    if (privateNoteId === '') return
    
    const { result, error } = await fetchData(
      `/private-notes/${privateNoteId}`,
      {
        method: "DELETE",
        body: {
          user: {
            userId: formData.id
          }
        },
      }
    );

    if (error) {
      toast.current.show({
        severity: "warn",
        summary: "Warning",
        detail: error.message,
        life: 3000,
      });
    } else {
      getPrivateNote(customerDetails.company.company_id)
      toast.current.show({
        severity: "success",
        summary: "Deleted",
        detail: "Private note had been removed successfully!",
        life: 3000,
      });
    }
  }, [privateNoteId])

  const [updatedUsername, setUpdatedUsername] = useState('')
  const onUpdateUsername = useCallback(async () => {
    if (!customerDetails) return
    const { result, error } = await fetchData(
      `/users/update-user/${profile.id}`,
      {
        method: "PATCH",
        body: {
          profile: {
            username: updatedUsername,
            usernameLastUpdated: new Date().toISOString() // Converts to ISO 8601 format
          }
        }
      }
    );
    if (error) {
      console.log("error", error);
    } else {
      console.log("result", result);
      toast.current.show({
        severity: "success",
        summary: "Username Changed",
        detail: "You username had been updated successfully!",
        life: 3000,
      });
      await getUserProfile(customerDetails.user_id);
    }
  }, [updatedUsername, customerDetails])

  function validatePayload(payload) {
    const errors = {};
  
    // Validate email
    if (!payload.user.email) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.user.email)) {
      errors.email = "Invalid email format.";
    }
  
    // Validate dateRegistered
    if (payload.profile.dateRegistered) {
      if (isNaN(Date.parse(payload.profile.dateRegistered))) {
        errors.dateRegistered = "Invalid date for dateRegistered.";
      }
    } else {
      errors.dateRegistered = "dateRegistered is required.";
    }
  
    // Validate dob
    if (payload.profile.dob) {
      if (isNaN(Date.parse(payload.profile.dob))) {
        errors.dob = "Invalid date for dob.";
      }
    } else {
      errors.dob = "Date of birth (dob) is required.";
    }
  
    return errors;
  }

  const handleSubmit = async () => {
    let _usernameLastUpdated = profile?.usernameLastUpdated
    if (editedprofile?.username !== profile.username) {
      _usernameLastUpdated = new Date().toISOString()
    }
    const payload = {
      user: {
        first_name: editedformData?.first_name,
        last_name: editedformData?.last_name || "",
        email: editedformData?.email || "",
        status: editedformData?.status,
        role: editedformData?.role || 'END_USER'
      },
      profile: {
        image: editedprofile?.image || "",
        dateRegistered: editedprofile?.dateRegistered || "",
        dob: editedprofile?.dob || "",
        gender: editedprofile?.gender || "",
        phone: editedprofile?.phone || "",
        phoneCountryCode: editedprofile?.phoneCountryCode || "",
        address: editedprofile?.address || "",
        city: editedprofile?.city || "",
        state: editedprofile?.state || "",
        zip: editedprofile?.zip || "",
        country: editedprofile?.country || "",
        username: editedprofile?.username || "",
        usernameLastUpdated: _usernameLastUpdated,
        nationality: editedprofile?.nationality || ''
      },
    };

    const validationErrors = validatePayload(payload);

    if (Object.keys(validationErrors).length > 0) {
      const [firstField, firstError] = Object.entries(validationErrors)[0] || []
      toast.current.show({
        severity: "warn",
        summary: "Invalid Input",
        detail: `${firstError}`,
        life: 3000,
      })
      return;
    }

    const { result, error } = await fetchData(
      `/users/update-user/${customerDetails.id}`,
      {
        method: "PATCH",
        body: payload,
      }
    );
    if (error) {
      console.log("error", error);
    } else {
      console.log("result", result);
      await fetchCustomerDetails();
      handleToggle();
    }
  };
  const router = useRouter();

  const handleBack = () => {
    // router.push(`/dashboard/company/${company_id}?tab=5`);
    router.back();
  };

  useEffect(() => {
    if (customerDetails) {
      setFormData(customerDetails);
      seteditedFormData(customerDetails);
    }
  }, [customerDetails]);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.current.show({
        severity: "success",
        summary: "Copied to clipboard",
        detail: type + " copied to clipboard successfully!",
        life: 3000,
      });
    }).catch((err) => {
      console.error("Failed to copy: ", err);
    });
  };

  const [isModalCOpen, setModalCOpen] = useState(false);
  const closeCModal = () => setModalCOpen(false);
  const savePrivateNote = useCallback(async () => {
    if (editedprivateNote.trim() === '') {
      toast.current.show({
        severity: "warn",
        summary: "Invalid Input",
        detail: "Please input private note contents!",
        life: 3000,
      });
      return
    }
    else{
      if (!formData || !profile) return;
      let url = '/private-notes'
      let method = 'POST'
      if (privateNoteId && privateNoteId !== '') {
        url += `/${privateNoteId}`
        method = 'PATCH'
      }
      const { result, error } = await fetchData(
        url,
        {
          method: method,
          body: {
            user: {
              id: formData.id
            },
            content: editedprivateNote,
            companyId: profile?.company?.company_id
          },
        }
      );
      if (error) {
        toast.current.show({
          severity: "warn",
          summary: "Warning",
          detail: error.message,
          life: 3000,
        });
      } else {
        getPrivateNote(customerDetails.company.company_id)
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Private note had been updated successfully!",
          life: 3000,
        });
        setModalCOpen(false)
      }
    }
  }, [editedprivateNote, profile, formData])

  return (
    <div className="p-4">
      <div className="flex flex-col justify-between gap-2 md:gap-0 md:flex-row">
        <div className="flex flex-row items-center gap-2">
          <button onClick={showSecondComponent ? handleToggle : handleBack}>
            <Back />
          </button>
          <img
            src={profile?.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            alt="Logo"
            className="w-[32px] h-[32px] rounded-[71.11px]"
          />
          <h1 className="text-xs md:text-sm font-medium leading-5 tracking-[-0.005em] text-left ml-2 text-textBlack">{`${customerDetails?.first_name} ${customerDetails?.last_name}`}</h1>
          <button
            className=" md:px-8 px-4 ml-4 py-1.5 rounded-full text-xs bg-primary50 text-primary h-[28px] text-center text[12px] font-medium leading-4 font-inter "
            disabled
          >
            {roleValue.find(r => r.value === role).label}
          </button>
        </div>{" "}
        <div className="flex justify-start md:justify-center">
          {!showSecondComponent ? (
            <div className="flex flex-wrap md:px-4 py-2 gap-2">
              {/* <Button
                title="Log out"
                onClick={openModal}
                type="secondary"
                className={
                  "md:text-sm text-xs bg-white md:h-8 h-8 md:w-[80px] w-[80px] border-10 border-primary50 text-center font-inter font-normal leading-4 text-textBlack"
                }
                color="gray"
              /> */}
              <Button
                title="Register business account"
                className="h-8 px-4 py-2 w-[182px] text-[12px] text-gray-700 bg-white border border-gray-200 rounded-[10px] whitespace-nowrap hover:bg-gray-50"
                onClick={() => {
                  router.push("/dashboard/register/business");
                }}
              />

              <Button
                title="Edit"
                type="primary"
                color="primary"
                className={
                  "text-white bg-primary h-8 w-[80px] text-[12px] rounded-[10px]"
                }
                onClick={handleToggle}
              />
            </div>
          ) : (
            <div className="flex flex-wrap md:px-4 py-2 gap-2">
              <Button
                title="Cancel"
                onClick={handleToggle}
                type="secondary"
                className={
                  "md:text-sm text-xs bg-white md:h-8 h-8 md:w-[80px] w-[80px] border-10 border-primary50 text-center font-inter font-normal leading-4 text-textBlack"
                }
                color="gray"
              />
              <Button
                title="Save"
                type="primary"
                color="primary"
                onClick={handleSubmit}
                className={
                  "text-white bg-primary md:h-8 h-[32px] md:w-[80px] w-[80px] md:text-[12px] text-[12px] rounded-[10px] m-0 "
                }
              />
            </div>
          )}
        </div>
      </div>

      {!showSecondComponent ? (
        <div className="flex flex-col justify-between gap-2  md:flex-row">
          {/* Left Section */}
          <div className="flex flex-col w-full gap-2">
            <BasicInformation customerDetails={customerDetails} profile={profile} lastLogin={lastLogin} />
            <PersonalInfo customerDetails={customerDetails} profile={profile} copyToClipboard={copyToClipboard} />
          </div>
          {/* Right Section */}
          <div className="flex flex-col gap-2  md:w-[50%] w-full">
            <CombinedCard
              username={profile?.username}
              usernameLastUpdated={profile?.usernameLastUpdated}
              status={status}
              privateNote={privateNote}
              privateNoteId={privateNoteId}
              role={roleValue.find(r => r.value === role).label}
              onUpdateUsername={onUpdateUsername}
              setUpdatedUsername={setUpdatedUsername}
              updatedUsername={updatedUsername}
              onAddNote={handleAddNote}
              onRemoveNote={onRemoveNote}
            />
          </div>
        </div>
      ) : (
        <EditProfile formData={editedformData} profile={editedprofile} setProfile={seteditedProfile} setFormData={seteditedFormData} privateNote={privateNote}
        privateNoteId={privateNoteId} onAddNote={handleAddNote}
        onRemoveNote={onRemoveNote} />
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        className={"md:w-[523px] w-[93%]"}
      >
        {/* Modal Body */}
        <div className="p-4 text-sm font-normal leading-4 text-left text-textBlack">
          <p>Are you sure you want to log out from this account?</p>
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end p-4 space-x-4 border-t">
          <Button
            title="Cancel"
            type="secondary"
            onClick={closeModal}
            className={
              "text-primary bg-lightGrey text-sm w-[114px] h-[32px] py-4 px-4 rounded-lg"
            }
          />
          <Button
            title="Log out"
            type="primary"
            onClick={closeModal}
            className={
              "text-white bg-primary text-sm w-[114px] h-[32px] py-4 px-4 rounded-lg"
            }
          />
        </div>
      </Modal>

      {/* Add Private Note Modal Body */}
      <Modal
        isOpen={isModalCOpen}
        onClose={closeCModal}
        title={privateNoteId && privateNoteId !== '' ? "Edit Private Note" : "Add Private Note"}
        size="xl"
        headerClassName="p-2"
        contentClassName="p-0"
      >
        {/* Modal Body */}
        <div className="p-4">
          {/* List of Languages */}
          <div className="flex flex-col py-2 gap-2 ">
            <textarea 
            value={editedprivateNote}
            className="w-full h-32 p-2 text-sm border border-gray-300 rounded-md resize-none outline-0 text-textBlack"
            placeholder="Type your notes here..."
            onChange={(e) => setEditedPrivateNote(e.target.value)} />
              <p className="mt-2 text-xs text-gray-500">
                Notes are private and won&apos;t be shared with anyone
            </p>
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
            onClick={savePrivateNote}
            className={"py-1 sm:py-2 px-4"}
          />
        </div>
      </Modal>
      <Toast ref={toast} baseZIndex={9999} />
    </div>
  );
}
