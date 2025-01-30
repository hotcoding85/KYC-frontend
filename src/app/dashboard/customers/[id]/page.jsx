"use client";
import React, { useEffect, useRef, useState } from "react";
import NavBar from "@/components/NavBar/NavBar";
import ProfileBody from "@/components/Profile/ProfileBody";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useApi from "@/hooks/useApi";
import ConfirmationModal from "@/components/Elements/ConfirmationModal";
import Back from "@/Icons/Back";
import Modal from "@/components/Modal/Modal";
import CustomerProfileBody from "@/components/CustomerProfile/CustomerProfileBody";
import Button, { TextButton } from "@/components/Elements/Button/Button";
import CustomerBody from "@/components/Customers/CustomerBody/CustomerBody";

export default function Page() {
  const [customerDetails, setCustomerDetails] = useState({
    first_name: 'XXXXXX',
    last_name: "XXXXXX",
    email: "XXXX.XXXX.XXX",
    status: true,
  });
  const params = useParams();
  const searchParams = useSearchParams();
  const company_id = searchParams.get("companyId");
  const { fetchData, loading, error } = useApi();
  const customer_id = params.id;

  async function fetchCustomerDetails() {
    const { result, error } = await fetchData(`/users/user/${customer_id}`, {
      method: "GET",
    });
    if (error) {
      setCustomerDetails([]);
    } else {
      setCustomerDetails(result);
    }
  }

  useEffect(() => {
    fetchCustomerDetails();
  }, []);
  

  //---------------------------profile body---------------------------------
  const [isModalOpen, setModalOpen] = useState(false);
  const [showSecondComponent, setShowSecondComponent] = useState(false);
  const [formData, setFormData] = useState(customerDetails);
  const [editedformData, seteditedFormData] = useState(customerDetails);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleToggle = () => {
    setShowSecondComponent((prevState) => {
      if (!prevState) {
        seteditedFormData(formData)
        seteditedProfile(profile)
      }
      return !prevState
    });
  };
  const [modalContent, setModalContent] = useState({});
  const handleStatusChange = (_data) => {
    if (!_data) return
    let content = {
      title: ` ${_data.status ? "Activate" : "Suspend"}`,
      description: `Are you sure you want to ${
        _data.status ? "Confirm activate" : "Confirm Suspension"
      } this user?`,
      confirmText: _data.status ? "Activate" : "Suspend",
      confirmColor: _data.status ? "bg-success" : "bg-error",
      onConfirm: () => handleUserStatus(_data),
    };
    setModalContent(content);
    setModalOpen(true);
  }

  async function handleUserStatus(user) {
    const { result, error } = await fetchData(`/users/${user.user_id}`, {
      method: "PUT",
      body: {
        status: user.status,
      },
    });
    if (error) {
      setModalOpen(false);
    } else {
      await fetchCustomerDetails();
      setModalOpen(false);
    }
  }

  const handleAddNote = () => {
    console.log("Add note clicked");
  };

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
        role: 'END_USER'
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
  const [lastLogin, setLastLogin] = useState('')
  const handleBack = () =>
    // router.push(`/dashboard/company/${company_id}?tab=5`);
    // router.push(`/dashboard/customers`);
    router.back()

  const [profile, setProfile] = useState({
    image: "",
    dateRegistered: "XXXX-XX-XX",
    dob: "XXXX-XX-XX",
    gender: "X",
    phone: "XXXXXXXX",
    phoneCountryCode: "",
    address: "XXXXX",
    city: "XXXXX",
    state: "XXXXX",
    zip: "XXXXX",
    country: "XXX",
    username: "",
    nationality: 'XXX'
  })
  const [editedprofile, seteditedProfile] = useState({})

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
  useEffect(() => {
    if (customerDetails && customerDetails.company) {
      setFormData(customerDetails);
      seteditedFormData(customerDetails);
      setProfile(customerDetails)
      seteditedProfile(customerDetails)
      const sessions = customerDetails.sessions
      if (sessions && sessions[sessions.length - 1]?.created) {
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
      getPrivateNote(customerDetails?.company?.company_id)
    }
  }, [customerDetails]);

  //----------------------------------profile body---------------------------------

  return (
    // <>
    //   <NavBar>
    //     <ProfileBody
    //       customerDetails={customerDetails}
    //       fetchCustomerDetails={fetchCustomerDetails}
    //       company_id={company_id}
    //     />
    //   </NavBar>
    // </>

    <>
      <NavBar pageName={"Customers"}>
        <div className="flex flex-col md:flex-row items-center justify-between py-2 gap-4 md:gap-0 px-4">
          <div className="flex flex-row items-center gap-4">
            <button onClick={showSecondComponent ? handleToggle : handleBack}>
              <Back />
            </button>
            <div className="flex items-center gap-1">
              <img
                src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                alt="Logo"
                className="w-8 h-8 rounded-full"
              />
              <h1 className="text-[14px] md:text-[14px] font-medium leading-[20px] tracking[-0.005em] text-left">
                {`${customerDetails?.first_name || "Name"} ${
                  customerDetails?.last_name || ""
                }`}
              </h1>
            </div>
            <p className={`${customerDetails?.status ? 'bg-successLight text-success' : 'bg-errorLight text-error'} font-medium text-xs md:text-sm rounded-full py-1 px-3 w-fit`}>
              {customerDetails?.status ? 'Active' : 'Suspended'}
            </p>
          </div>

          <div className="flex items-center justify-center">
            {!showSecondComponent ? (
              <div className="flex flex-col md:flex-row gap-2">
                <TextButton
                  title="Download Summary"
                  textColor="text-textBlack"
                  backgroundColor="bg-white"
                  borderColor="border border-primary50"
                  width="w-full md:w-auto sm:min-w-[80px]"
                />
                <TextButton
                  title={customerDetails?.status ? 'Deactivate' : 'Active'}
                  textColor={customerDetails?.status ? 'text-error' : 'text-success'}
                  backgroundColor="bg-white"
                  borderColor="border border-alert"
                  width="w-full md:w-auto sm:min-w-[80px]"
                  onClick={() => handleStatusChange({
                    status: !customerDetails?.status,
                    user_id: customerDetails?.id,
                  })}
                />
                <TextButton
                  title="Edit"
                  onClick={handleToggle}
                  width="w-full md:w-auto sm:min-w-[80px]"
                />
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-2">
                <TextButton
                  title="Cancel"
                  onClick={handleToggle}
                  backgroundColor="bg-white"
                  textColor="text-textBlack"
                  width="w-full md:w-auto sm:min-w-[80px]"
                />
                <TextButton
                  title="Save"
                  onClick={handleSubmit}
                  width="w-full md:w-auto sm:min-w-[80px]"
                />
              </div>
            )}
          </div>
        </div>

        <CustomerBody
          customerDetails={customerDetails}
          profile={editedprofile}
          fetchCustomerDetails={fetchCustomerDetails}
          lastLogin={lastLogin}
          setProfile={seteditedProfile}
          formData={editedformData}
          setFormData={seteditedFormData}
          showSecondComponent={showSecondComponent}
        />
        <ConfirmationModal
            isOpen={isModalOpen}
            onClose={() => {setModalContent(false); setModalOpen(false)}}
            title={modalContent.title}
            description={modalContent.description}
            confirmText={modalContent.confirmText}
            confirmColor={modalContent.confirmColor}
            onConfirm={modalContent.onConfirm}
            showForm={modalContent.showForm}
        />
      </NavBar>
    </>
  );
}
