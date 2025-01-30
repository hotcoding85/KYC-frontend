"use client";

import NavBar from "@/components/NavBar/NavBar";
import React, { useState, useEffect, useRef, useCallback } from "react";
import TopBar from "@/components/Team/TopBar/TopBar";
import DropDown from "@/components/Elements/DropDown/DropDown";
import LogoPlaceholder from "@/Icons/LogoPlaceholder";
import { TextButton } from "@/components/Elements/Button/Button";
import { useUser } from "@/app/context/UserContext";
import useApi from "@/hooks/useApi";
import { Toast } from "primereact/toast";

const BrandingPage = () => {
  const thems = [
    { value: 1, label: "Theme 1" },
    { value: 2, label: "Theme 2" },
  ];

  const [logoPreview, setLogoPreview] = useState(null);
  const [iconPreview, setIconPreview] = useState(null);
  const [appStyle, setAppStyle] = useState(null)
  const [customCss, setCustomCss] = useState(null)
  const [theme, setTheme] = useState(1)
  const toast = useRef(null);
  const customCssInputRef = useRef(null);
  const appStyleInputRef = useRef(null);

  // Placeholder function for file upload
  const handleFileUpload = (e) => {
    console.log(e.target.files[0]);
  };

  const handleImageUpload = (e, setPreview) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Image preview component
  const ImagePreview = ({ src, alt, onRemove }) => (
    <div className="relative group">
      <img 
        src={src} 
        alt={alt}
        className="w-16 h-16 object-contain"  // Matching LogoPlaceholder size
      />
      <button
        onClick={onRemove}
        className="absolute p-1 text-white bg-red-500 rounded-full -top-2 -right-2 hover:bg-alert opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Remove image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3 h-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );

  const { fetchData, loading, error } = useApi();
  const {user, fetchUser} = useUser();

  useEffect(() => {
    if (user) {
      fetchCompanyBranding(user.company.company_id)
    }
  }, [user])
  
  const fetchCompanyBranding = async (company_id) => {
    const { result, error } = await fetchData(`/branding/${company_id}`, {
      method: "GET",
    });

    if (error) {
    } else {
      if (result) {
        if (result.appStyle) setAppStyle(result.appStyle)
        else setAppStyle(null)
        if (result.customCss) setCustomCss(result.customCss)
        else setCustomCss(null)
      }
      else{
        setCustomCss(null)
        setAppStyle(null)
      }
    }
  }

  const handleThemeChange = (value) => {
    setTheme(value.value)
  }

  const handleFileChange = (
    e,
    setFile
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFile(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleUpdate = (inputRef) => {
    if (inputRef.current) {
      inputRef.current.value = ""; // Reset the input value
      inputRef.current.click(); // Trigger the file dialog
    } else {
      console.error("Input element not found.");
    }
  };

  const handleRemove = (setFile) => {
    setFile(null);
  };

  const saveCompanyBranding = useCallback(async () => {
    if (!user) return

    const { result, error } = await fetchData(`/branding/${user?.company.company_id}`, {
      method: "Post",
      body: {
        appStyle: appStyle,
        customCss: customCss,
        icon: iconPreview,
        logo: logoPreview,
        theme: theme
      } 
    });
    if (!error) {
      if (result.status === 'success') {
        toast.current.show({
          severity: "success",
          summary: "Saved",
          detail: "Company Branding had been saved successfully!",
          life: 3000,
        });
      }
      else{
        toast.current.show({
          severity: "warn",
          summary: "Warning",
          detail: "Something went wrong!",
          life: 3000,
        });
      }
    }
    else{
      toast.current.show({
        severity: "error",
        summary: "Warning",
        detail: error.message,
        life: 3000,
      });
    }

  }, [user, appStyle, customCss, iconPreview, logoPreview, theme])

  return (
    <NavBar pageName={"Branding"}>
      <TopBar />
      <div className="h-6"></div>
      <div className="bg-white p-6 rounded-2xl max-w-7xl ">
        <div className="flex items-center  justify-between">
          <h2 className="text-xl text-textBlack font-medium mb-6">Branding</h2>
          <TextButton
              title="Save"
              onClick={saveCompanyBranding}
              backgroundColor="bg-primary"
              textColor="text-textBlack"
              width="w-auto sm:w-[114px]"
              className="border brder-success50"
            />
        </div>
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
          {/* Logo Section */}
          <div>
            <div className="mb-2 text-xs font-normal text-textBlack">Logo</div>
            <div className="flex flex-col items-center justify-center p-4 border-2 border-gray-300 border-dashed bg-lightGrey rounded-2xl min-h-[160px]">
              {logoPreview ? (
                <ImagePreview
                  src={logoPreview}
                  alt="Selected logo"
                  onRemove={() => setLogoPreview(null)}
                />
              ) : (
                <>
                  <LogoPlaceholder />
                  <p className="mt-2 mb-2 text-xs text-gray-500 bg-gray-50">
                    Drag and drop image here, or click add image
                  </p>
                </>
              )}
              <input
                type="file"
                className="hidden"
                id="image-upload"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, setLogoPreview)}
              />
              <label
                htmlFor="image-upload"
                className="px-6 py-2 mt-2 text-xs text-gray-700 bg-white border rounded-[10px] border-gray-2 hover:bg-gray-200 cursor-pointer"
              >
                {logoPreview ? 'Change image' : 'Add image'}
              </label>
            </div>
          </div>

          {/* Icon Section */}
          <div>
            <div className="mb-2 text-xs font-normal text-textBlack">Icon</div>
            <div className="flex flex-col items-center justify-center p-4 border-2 border-gray-300 border-dashed bg-lightGrey rounded-2xl min-h-[160px]">
              {iconPreview ? (
                <ImagePreview
                  src={iconPreview}
                  alt="Selected icon"
                  onRemove={() => setIconPreview(null)}
                />
              ) : (
                <>
                  <LogoPlaceholder />
                  <p className="mt-2 mb-2 text-xs text-gray-500">
                    Drag and drop icon here, or click add icon
                  </p>
                </>
              )}
              <input
                type="file"
                className="hidden"
                id="icon-upload"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, setIconPreview)}
              />
              <label
                htmlFor="icon-upload"
                className="px-6 py-2 mt-2 text-xs text-gray-700 bg-white border rounded-[10px] border-gray-2 hover:bg-gray-200 cursor-pointer"
              >
                {iconPreview ? 'Change icon' : 'Add icon'}
              </label>
            </div>
          </div>
        </div>

        {/* Theme, Custom CSS, App Style Section */}
        <div className="grid items-center grid-cols-1 gap-4 md:grid-cols-3">
          {/* Theme Section */}
          <div>
            <div className="mb-2 text-xs font-normal text-textBlack">Theme</div>
            <DropDown labelClasses={'text-textBlack'} items={thems} className={"w-full h-8 rounded-[10px]"} defaultValue={thems.find(th => th.value == theme)} onSelect={handleThemeChange} />
          </div>

          {/* Custom CSS Upload */}
          <div>
            <div className="mb-2 text-xs font-normal text-textBlack">Custom CSS</div>
            <div className="flex flex-col items-center justify-center h-8 p-3 border border-primary50 border-dashed rounded-[10px] hover:bg-lightGrey">
              {/* Input is always rendered */}
              <input
                ref={customCssInputRef}
                type="file"
                id="custom-css-upload"
                className="hidden"
                accept=".css"
                onChange={(e) => handleFileChange(e, setCustomCss)}
              />
              {customCss ? (
                <div className="flex justify-between w-full">
                  <button
                    onClick={() => handleRemove(setCustomCss)}
                    className="px-2 py-1 text-xs text-white bg-red-500 rounded"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleUpdate(customCssInputRef)}
                    className="px-2 py-1 text-xs text-white bg-blue-500 rounded"
                  >
                    Update
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="custom-css-upload"
                  className="w-full text-xs text-center text-gray-500 cursor-pointer"
                >
                  Click here to upload
                </label>
              )}
            </div>
          </div>

          {/* App Style Upload */}
          <div>
            <div className="mb-2 text-xs font-normal text-textBlack">App Style</div>
            <div className="flex flex-col items-center justify-center h-8 p-3 border border-primary50 border-dashed rounded-[10px] hover:bg-lightGrey">
              <input
                ref={appStyleInputRef}
                type="file"
                id="app-style-upload"
                className="hidden"
                onChange={(e) => handleFileChange(e, setAppStyle)}
              />
              {appStyle ? (
                <div className="flex justify-between w-full">
                  <button
                    onClick={() => handleRemove(setAppStyle)}
                    className="px-2 py-1 text-xs text-white bg-red-500 rounded"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleUpdate(appStyleInputRef)}
                    className="px-2 py-1 text-xs text-white bg-blue-500 rounded"
                  >
                    Update
                  </button>
                </div>
              ) : (
                <>
                  <label
                    htmlFor="app-style-upload"
                    className="w-full text-xs text-center text-gray-500 cursor-pointer"
                  >
                    Click here to upload
                  </label>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Toast ref={toast} baseZIndex={9999} />
    </NavBar>
  );
};

export default BrandingPage;
