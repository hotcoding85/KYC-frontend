import DropDown from "@/components/Elements/DropDown/DropDown";
import React, { useEffect, useRef, useState, useCallback  } from "react";
import Copy from "@/Icons/Copy";
import CombinedCard from "@/components/Profile/CombinedCard";
import BasicInformation from "@/components/Profile/BasicInformation";
import PersonalInfo from "@/components/Profile/PersonalInfo";
import EditProfile from "@/components/Profile/EditProfile";
import useApi from "@/hooks/useApi";
import { Toast } from "primereact/toast";
import Modal from "@/components/Modal/Modal";
import { TextButton } from "@/components/Elements/Button/Button";
const riskData = [
  { label: "Risk Score", value: "100%" },
  { label: "Transaction Flags", value: "XXXXXXXXXX" },
  { label: "PEP Affiliation Flag", value: "XXXXXXXXXX" },
  { label: "Blacklisted Occasions", value: "XXXXXXXXXX" }
];

const riskData_two = [
  { label: "Account Flags", value: "XXXXXXXXXX" },
  { label: "Suspicious Activity Flags", value: "XXXXXXXXXX" },
  { label: "Transaction Limit Breach Flag", value: "XXXXXXXXXX" },
  { label: "Blocked Occasions", value: "XXXXXXXXXX" }
];

const statusValue = [
  { value: "1", label: "Active" },
  { value: "2", label: "Suspend" }
];

export default function CustomerProfileOverviewTab({
  customerDetails,
  formData,
  lastLogin,
  fetchCustomerDetails,
  profile,
  setProfile,
  setFormData,
  showSecondComponent
}) {

  const toast = useRef(null);

  const { fetchData } = useApi()
  const [updatedUsername, setUpdatedUsername] = useState('')
  const [isLessThanOneYear, setisLessThanOneYear] = useState(null)
  useEffect(() => {
    if(customerDetails && customerDetails.company){
      getPrivateNote(customerDetails.company.company_id)
    }

    const ONE_YEAR_IN_MS = 365 * 24 * 60 * 60 * 1000; // One year in milliseconds
    const currentDate = new Date();
    const lastUpdatedDate = new Date(customerDetails?.usernameLastUpdated);
    setisLessThanOneYear(customerDetails?.usernameLastUpdated && (currentDate - lastUpdatedDate) < ONE_YEAR_IN_MS);
    setUpdatedUsername(customerDetails?.username)
  }, [customerDetails])

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
      await fetchCustomerDetails();
    }
  }, [updatedUsername, customerDetails])

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
  const [isModalCOpen, setModalCOpen] = useState(false);
  const closeCModal = () => setModalCOpen(false);
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

  const updateOnStatusChange = (value) => {
    const status = value.value !== "2";
    setFormData({ ...formData, status: status });
  };

  return (
    <>
      <div className="flex flex-col justify-between gap-3 md:flex-row">
        {/* Left Section */}
        <div className="flex flex-col w-full gap-3 md:w-2/3">
          {!showSecondComponent ? (
            <div className="flex flex-col justify-between gap-3 md:flex-row">
              {/* Left Section */}
              <div className="flex flex-col w-full gap-3">
                <BasicInformation customerDetails={customerDetails} profile={profile} 
                lastLogin={lastLogin} />
                <PersonalInfo customerDetails={customerDetails} profile={profile}  />
              </div>
              {/* Right Section */}
              {/* <div className="flex flex-col gap-3  md:w-[50%] w-full">
                <CombinedCard
                  status={customerDetails?.status ? "Active" : "Inactive"}
                  role={customerDetails?.role}
                  onAddNote={handleAddNote}
                />
              </div> */}
            </div>
          ) : (
            <EditProfile
              formData={formData}
              profile={profile}
              setProfile={setProfile}
              setFormData={setFormData}
              privateNote={privateNote}
              privateNoteId={privateNoteId}
              showCombinedCard={false}
              onRemoveNote={onRemoveNote}
            />
          )}
          <div className="p-4 bg-white shadow-sm rounded-2xl">
            <h2 className="mb-4 text-sm font-semibold text-textBlack leading-5 tracking-tighter text-left">
              Risk Level
            </h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {/* Column 1 */}
              <div className="flex flex-col justify-between gap-3 ">
                {riskData.map((item, index) => (
                  <div className={`flex flex-col ${showSecondComponent ? 'gap-1' : 'gap-2'}`} key={index}>
                    <p className={`text-xs font-normal ${showSecondComponent ? 'text-textBlack' : 'text-textSecondary'}`}>{item.label}</p>
                    {showSecondComponent ? (
                      <input
                        type="text"
                        value={item.value}
                        placeholder={item.label}
                        onChange={(e) => onInputChange(e, item.label)}
                        className="w-full px-3 py-2.5 border rounded-[10px] h-[32px] border-primary50  text-xs text-textBlack"
                      />
                    ) : (
                      <p className="text-xs font-semibold text-textBlack">{item.value}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Column 2 */}
              <div className="flex flex-col w-full gap-3">
                {riskData_two.map((item, index) => (
                  <div className={`flex flex-col ${showSecondComponent ? 'gap-1' : 'gap-2'}`} key={index}>
                    <p className={`text-xs font-normal ${showSecondComponent ? 'text-textBlack' : 'text-textSecondary'}`}>{item.label}</p>
                    {showSecondComponent ? (
                      <input
                        type="text"
                        value={item.value}
                        placeholder={item.label}
                        onChange={(e) => onInputChange(e, item.label)}
                        className="w-full px-3 py-2.5 border rounded-[10px] h-[32px] border-primary50  text-xs text-textBlack"
                      />
                    ) : (
                      <p className="text-xs font-semibold text-textBlack">{item.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col w-full gap-3 mb-3 md:mt-0 md:w-1/3 md:mb-0 ">
          <CombinedCard
            input={showSecondComponent}
            role="User"
            username={customerDetails?.username}
            usernameLastUpdated={customerDetails?.usernameLastUpdated}
            onUpdateUsername={onUpdateUsername}
            setUpdatedUsername={setUpdatedUsername}
            updatedUsername={updatedUsername}
            privateNote={privateNote}
            privateNoteId={privateNoteId}
            status={customerDetails?.status}
            showUserRole={false}
            onAddNote={handleAddNote}
            onRemoveNote={onRemoveNote}
            showDropdown={showSecondComponent}
            showinput={
              <div className="w-full ">
                <label className="font-inter text-xs font-normal leading-4 text-left text-textBlack">Username</label>
                <input
                  type="text"
                  placeholder="Input Username"
                  className="w-full px-3 py-2.5 border rounded-[10px] h-8 border-gray-300 text-xs text-textBlack"
                  value={profile.username || ''}
                  disabled={isLessThanOneYear}
                  onChange={(e) => {setUpdatedUsername(e.target.value); setProfile({...profile, username: e.target.value})}}
                />
              </div>
            }
            dropdownComponent={
              <DropDown
                onSelect={updateOnStatusChange}
                items={statusValue}
                labelClasses={'text-textBlack'}
                initialItems={customerDetails?.status ? [
                  {
                    value: "1",
                    label: "Active"
                  }
                ] : [
                  {
                    value: "2",
                    label: "Suspended"
                  }
                ]}
                className="w-full px-3 py-2.5 mt-1 border rounded-[10px] h-8 border-primary50 text-xs"
              />
            }
          />
        </div>
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
    </>
  );
}
