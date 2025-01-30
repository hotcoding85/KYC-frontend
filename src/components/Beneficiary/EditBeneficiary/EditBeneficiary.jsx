import BasicInformationBeneficiary from "@/components/Profile/BasicInformationBeneficiary";
import CombinedCard from "@/components/Profile/CombinedCard";
import ContactInformation from "@/components/Profile/ContactInformation";
import React, { useEffect, useState } from "react";
import DropDown from "@/components/Elements/DropDown/DropDown";
import { country as Countries } from "@/data/Country/Country";

const EditBeneficiary = ({showCombinedCard = true, formData, setFormData}) => {
  const [profileImage, setProfileImage] = useState(null);
  useEffect(() => {
    setProfileImage(formData?.avatar)
  }, [formData])
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setProfileImage(URL.createObjectURL(file));

        setFormData((prevState) => ({
          ...prevState,
          avatar: base64String,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const statusValue = [
    { value: "1", label: "Active" },
    { value: "2", label: "Suspend" },
  ];

  const roleValue = [
    { value: "1", label: "Admin" },
    { value: "2", label: "User" },
  ];

  const handleAddNote = () => {
    console.log("Add Note Clicked");
  };

  const genderOptions = [
    { value: "M", label: "Male" },
    { value: "F", label: "Female" },
  ];

  const typeOptions = [
    { value: "Individual", label: "Individual" },
    { value: "Business", label: "Business" },
  ];

  const citizenshipOptions = [
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "United States", label: "United States" },
  ];
  const stateOptions = [
    { value: "IL", label: "Illinois" },
    { value: "NY", label: "New York" },
    { value: "CA", label: "California" },
    { value: "TX", label: "Texas" },
  ];

  const countryOptions = [
    { value: "US", label: "United States" },
    { value: "UK", label: "United Kingdom" },
    { value: "AE", label: "United Arab Emirates" },
    { value: "IN", label: "India" },
  ];

  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const onPhoneCountryCodeChange = (value) => {
    setFormData({ ...formData, phoneCountryCode: value });
  }

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  }

  const handleGenderChange = (value) => {
    setFormData({ ...formData, gender: value.value });
  };

  const handleTypeChange = (value) => {
    setFormData({ ...formData, type: value.value });
  }

  const handleStateChange = (value) => {
    setFormData({ ...formData, state: value });
  };

  const handleCitizenshipChange = (value) => {
    setFormData({ ...formData, nationality: value.value });
  };

  const handleCountryChange = (value) => {
    setFormData({ ...formData, country: value.value });
  };

  const updateOnRoleChange = (value) => {
    const role = value.value === "1" ? "Admin" : "User";
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
            <p className="mb-1 text-xs text-gray-500">Photo</p>
            <div className=" bg-gray-50 p-4 text-center border-[1px] border-gray-300 border-dashed rounded-2xl">
              {profileImage ? (
                <img
                  src={
                    profileImage ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt="Profile"
                  className="w-12 h-12 rounded-full mx-auto"
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="Placeholder"
                    className="w-12 h-12 rounded-full mb-2"
                  />
                  <p className="text-xs text-gray-400">
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
              <div className="mt-3">
                <label
                  htmlFor="upload"
                  className="px-4 py-1.5 bg-white text-xs  text-gray-600 border border-gray-300 rounded-xl cursor-pointer font-inter"
                >
                  {profileImage ? "Replace image" : "Add image"}
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="p-4 bg-white shadow-sm rounded-2xl">
              <BasicInformationBeneficiary
                firstName={formData?.first_name}
                lastName={formData?.last_name}
                dateOfBirth={formData?.dob}
                typeOptions={typeOptions}
                type={formData?.type}
                genderOptions={genderOptions}
                citizenshipOptions={Countries}
                selectedGender={formData?.gender}
                selectedCitizenship={formData?.nationality}
                dateRegistered={formData?.created_at}
                onInputChange={handleInputChange}
                onGenderChange={handleGenderChange}
                onTypeChange={handleTypeChange}
                onCitizenshipChange={handleCitizenshipChange}
              />
            </div>
            <div className="p-4 bg-white shadow-sm rounded-2xl">
              <ContactInformation
                formData={formData}
                stateOptions={stateOptions}
                countryOptions={countryOptions}
                onInputChange={handleInputChange}
                onStateChange={handleStateChange}
                onCountryChange={handleCountryChange}
                onPhoneChange={handlePhoneChange}
                onPhoneCountryCodeChange={onPhoneCountryCodeChange}
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar Section */}
        {showCombinedCard && (
          <div className="flex flex-col w-full gap-2 md:w-1/3">
            {/* Status Card */}
            <div className="p-4 bg-white shadow-sm rounded-2xl">
              <div className="flex justify-between mb-2">
                <p className="my-auto w-[150px] h-[20px] font-inter text-sm text-textBlack font-semibold leading-[20px] tracking-[-0.005em] text-left ">Beneficiary Status</p>
                {(
                  <span
                    className={`px-8 py-1.5  ${
                      formData.status ? " text-success bg-successLight" : " text-red-400 bg-alertLight"
                    } rounded-full`}
                  >
                    <p className="w-full mx-auto text-xs font-medium text-center">{formData.status ? 'Active' : 'Suspended'}</p>
                  </span>
                )}
              </div>
              <DropDown
                onSelect={updateOnStatusChange}
                items={statusValue}
                labelClasses={'text-textBlack'}
                initialItems={[
                  {
                    value: formData.status ? "Active" : "Suspend",
                    label: formData.status ? "Active" : "Suspend",
                  },
                ]}
                className="w-full px-3 py-2.5 mt-1 border rounded-[10px] h-[32px] border-gray-300 rounded-xl text-xs"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditBeneficiary;
