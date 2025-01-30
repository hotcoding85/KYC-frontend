import React, { useEffect, useState } from "react";
import DropDown from "@/components/Elements/DropDown/DropDown";
import CombinedCard from "./CombinedCard";
import BasicInformationForm from "./BasicInformationForm";
import ContactInformation from "./ContactInformation";
import { country as Countries } from "@/data/Country/Country";

const EditProfile = ({ formData, profile, setProfile, setFormData, showCombinedCard = true, privateNote, privateNoteId, onAddNote, onRemoveNote }) => {
  const [profileImage, setProfileImage] = useState(profile?.image || null);
  const [isLessThanOneYear, setisLessThanOneYear] = useState(null)
  useEffect(() => {
    const ONE_YEAR_IN_MS = 365 * 24 * 60 * 60 * 1000; // One year in milliseconds
    const currentDate = new Date();
    const lastUpdatedDate = new Date(profile?.usernameLastUpdated);
    setisLessThanOneYear(profile?.usernameLastUpdated && (currentDate - lastUpdatedDate) < ONE_YEAR_IN_MS)
    // Calculate the number of days since last update
    // setdaysSinceLastUpdate(profile?.usernameLastUpdated
    //   ? Math.floor((currentDate - lastUpdatedDate) / (1000 * 60 * 60 * 24))
    //   : null)
  }, [profile])
  useEffect(() => {
    return () => {

    }
  }, [formData])

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setProfileImage(URL.createObjectURL(file));

        setProfile((prevState) => ({
          ...prevState,
          image: base64String,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const gender = [
    { value: "1", label: "Male" },
    { value: "2", label: "Female" }
  ];

  const statusValue = [
    { value: "1", label: "Active" },
    { value: "2", label: "Suspend" }
  ];

  const roleValue = [
    { value: "SUPER_ADMINISTRATOR", label: "Super Administrator" },
    { value: "SUPER_USER", label: "Super User" },
    { value: "COMPANY_ADMINISTRATOR", label: "Company Administrator" },
    { value: "COMPANY_USER", label: "Company User" },
    { value: "END_USER", label: "End User" },
  ];

  const handleAddNote = () => {
    console.log("Add Note Clicked");
  };

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" }
  ];

  const citizenshipOptions = [
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "United States", label: "United States" }
  ];
  const stateOptions = [
    { value: "IL", label: "Illinois" },
    { value: "NY", label: "New York" },
    { value: "CA", label: "California" },
    { value: "TX", label: "Texas" }
  ];

  const countryOptions = [
    { value: "US", label: "United States" },
    { value: "UK", label: "United Kingdom" },
    { value: "AE", label: "United Arab Emirates" },
    { value: "IN", label: "India" }
  ];

  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const onProfileInputChange = (e, field) => {
    setProfile({ ...profile, [field]: e.target.value })
  }

  const handleGenderChange = (value) => {
    setProfile({ ...profile, gender: value.value === 'Male' ? 'M' : 'F' });
  };

  const handleStateChange = (value) => {
    setProfile({ ...profile, state: value });
  };

  const handleCitizenshipChange = (value) => {
    setProfile({ ...profile, nationality: value.title });
  };

  const handleCountryChange = (value) => {
    const country = value.title;
    setProfile({ ...profile, country: country });
  };

  const onPhoneChange = (value) => {
    setProfile({ ...profile, phone: value });
    setFormData({ ...formData, phone: value });
  }

  const onPhoneCountryCodeChange = (value) => {
    setProfile({ ...profile, phoneCountryCode: value });
    setFormData({ ...formData, phoneCountryCode: value });
  }

  const updateOnRoleChange = (value) => {
    const role = roleValue.find(r => value.value === r.value).value;
    setFormData({ ...formData, role: role });
  };

  const updateOnStatusChange = (value) => {
    const status = value.value !== "2";
    setFormData({ ...formData, status: status });
  };

  return (
    <>
      <div
        className={`flex flex-col ${
          showCombinedCard ? "" : ""
        } md:flex-row gap-2`}
      >
        <div
          className={`flex flex-col w-full gap-2 ${
            showCombinedCard ? "md:w-2/3" : "w-full"
          }`}
        >
          <div className="p-4 bg-white rounded-2xl">
            {/* <h2 className="mb-3 text-sm sm:text-base font-semibold">
              Profile Picture
            </h2> */}
            <p className="mb-1 text-xs font-normal text-textBlack">Photo</p>
            <div className="flex flex-col items-center justify-center w-full h-[128px] bg-gray-50 p-4 text-center border-[1px] border-gray-300 border-dashed rounded-2xl">
              {profileImage ? (
                <img
                  src={profileImage || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                  alt="Profile"
                  className="w-12 h-12 rounded-full mx-auto mb-2"
                />
              ) : (
                <div className="flex flex-col items-center justify-center mb-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="Placeholder"
                    className="w-8 h-8 rounded-full mb-2"
                  />
                  <p className="text-xs font-normal text-textSecondary">
                    Drag and drop image here, or click add image
                  </p>
                </div>
              )}
              <input
                type="file"
                onChange={handleImageChange}
                className="hidden"
                id="upload"
              />
              <div className="mt-2">
                <label
                  htmlFor="upload"
                  className="px-4 py-1.5 bg-white text-xs  text-textBlack border border-primary50 rounded-[10px] cursor-pointer font-inter"
                >
                  {profileImage ? "Replace image" : "Add image"}
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="p-4 bg-white shadow-sm rounded-2xl">
              <BasicInformationForm
                firstName={formData?.first_name}
                lastName={formData?.last_name}
                dateOfBirth={profile?.dob}
                genderOptions={genderOptions}
                selectedGender={profile?.gender === 'M' ? genderOptions[0] : genderOptions[1]}
                citizenshipOptions={Countries}
                selectedCitizenship={Countries.find(ct => ct.title === profile?.nationality)}
                dateRegistered={profile?.dateRegistered}
                onInputChange={handleInputChange}
                onProfileInputChange={onProfileInputChange}
                onGenderChange={handleGenderChange}
                onCitizenshipChange={handleCitizenshipChange}
              />
            </div>
            <div className="p-4 bg-white shadow-sm rounded-2xl">
              <ContactInformation
                formData={formData}
                profile={profile}
                stateOptions={stateOptions}
                countryOptions={countryOptions}
                onInputChange={handleInputChange}
                onProfileInputChange={onProfileInputChange}
                onStateChange={handleStateChange}
                onCountryChange={handleCountryChange}
                onPhoneChange={onPhoneChange}
                onPhoneCountryCodeChange={onPhoneCountryCodeChange}
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar Section */}
        {showCombinedCard && (
          <div className="flex flex-col w-full gap-2 md:w-1/3">
            <CombinedCard
              privateNote={privateNote}
              privateNoteId={privateNoteId}
              status={formData?.status}
              role={roleValue.find(rb => rb.value === formData?.role).label}
              onAddNote={onAddNote}
              onRemoveNote={onRemoveNote}
              showDropdown={true}
              input={true}
              showinput={
                <>
                  <div className="w-full ">
                    <label className="font-inter text-xs font-normal leading-4 text-left text-textBlack">Username</label>
                    <input
                      type="text"
                      placeholder="Username"
                      className="w-full px-3 py-2.5  border rounded-[10px] h-[32px] border-gray-300  text-xs text-textBlack"
                      disabled={isLessThanOneYear}
                      value={profile?.username || ''}
                      onChange={(e) => setProfile({ ...profile, username: value })}
                    />
                  </div>
                </>
              }
              dropdownComponent={
                <DropDown
                  onSelect={updateOnStatusChange}
                  items={statusValue}
                  initialItems={[
                    {
                      value: formData?.status ? "1" : "2",
                      label: formData?.status ? "Active" : "Suspend"
                    }
                  ]}
                  className="w-full px-3 py-2.5 mt-1 border rounded-[10px] h-[32px] border-gray-300 text-xs text-textBlack"
                />
              }
              dropdownRole={
                <DropDown
                  onSelect={updateOnRoleChange}
                  items={roleValue}
                  defaultValue={roleValue.find(rb => rb.value === formData?.role)}
                  className="w-full px-3 py-2.5 mt-1 border rounded-[10px] h-[32px] border-gray-300 text-xs text-textBlack"
                />
              }
            />
          </div>
        )}
      </div>
    </>
  );
};

export default EditProfile;
