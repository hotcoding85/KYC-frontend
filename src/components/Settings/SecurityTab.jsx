"use client";
import CountriesPhone from "@/components/Elements/Country/CountriesNumber";
import { country as Countries } from "@/data/Country/Country";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Modal from "../Modal/Modal";
import Button, { ButtonsText, TextButton } from "../Elements/Button/Button";
import VisibilityOn from "@/Icons/VisibilityOn";
import VisibilityOff from "@/Icons/VisibilityOff";
import DropDown from "@/components/Elements/DropDown/DropDown";
import useIsMobile from "@/hooks/useIsMobile";
import Switch from "react-switch";
import { useUser } from "@/app/context/UserContext";
import { Toast } from "primereact/toast";
import useApi from "@/hooks/useApi";

export default function SecurityTab({ isAccountActivation = true, user_id }) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    () => Countries.filter((each) => each.value === "AE")[0]
  );
  const [selectedNewValue, setSelectedNewValue] = useState(
    () => Countries.filter((each) => each.value === "")[0]
  );

  const [isActive, setIsActive] = useState(false)
  const toast = useRef(null);
  const { user, fetchUser } = useUser();
  const [isTwoFactorAuth, setTwoFactorAuth] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalPOpen, setModalPOpen] = useState(false);
  const [isSecurityRemoveModalOpen, setSecurityRemoveModalOpen] = useState(false);
  const [isEmailModalOpen, seEmailModalOpen] = useState(false);
  const [isSecurityModalOpen, setSecurityModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openPModal = () => setModalPOpen(true);
  const closePModal = () => setModalPOpen(false);
  const closeSecurityRemoveModal = () => setSecurityRemoveModalOpen(false);
  const openEmailModal = () => seEmailModalOpen(true);
  const closeEmailModal = () => seEmailModalOpen(false);
  const openSecurityModal = () => setSecurityModalOpen(true);
  const closeSecurityModal = () => setSecurityModalOpen(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [showSecretAnswer1, setShowSecretAnswer1] = useState(false);
  const [showSecretAnswer2, setShowSecretAnswer2] = useState(false);
  const [showSecretAnswer3, setShowSecretAnswer3] = useState(false);

  const { fetchData, loading, error } = useApi();
  const [currentEmail, setCurrentEmail] = useState('')
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState('')
  const [updatePhoneNumber, setUpdatePhoneNumber] = useState('')
  
  const questions = [
    { value: "1", label: "What is the name of your first pet?" },
    { value: "2", label: "What is your father&apos;s middle name?" },
    { value: "3", label: "What is the name of the street you grew up on?" },
    { value: "4", label: "What is the your mother&apos;s maiden name?" },
  ];

  const [existSecurityQuestions, setIsSecurityQuestions] = useState(false)
  const [question1, setQuestion1] = useState("");
  const [answer1, setAnswer1] = useState("");

  const [question2, setQuestion2] = useState("");
  const [answer2, setAnswer2] = useState("");

  const [question3, setQuestion3] = useState("");
  const [answer3, setAnswer3] = useState("");

  const [updatedquestion1, setupdatedQuestion1] = useState("1");
  const [updatedanswer1, setupdatedAnswer1] = useState("");

  const [updatedquestion2, setupdatedQuestion2] = useState("2");
  const [updatedanswer2, setupdatedAnswer2] = useState("");

  const [updatedquestion3, setupdatedQuestion3] = useState("3");
  const [updatedanswer3, setupdatedAnswer3] = useState("");

  const [userId, setUserId] = useState(user_id)
  useEffect(() => {
    if (!user_id) {
      if (!user) return
      setUserId(user.user_id)
      setCurrentEmail(user.email)
      fetchSecurityQuestions(user.user_id)
      setIsActive(user.status)
  
      setTwoFactorAuth(user.authenticator_secret ? true : false)
  
      if (user.verify_phone_country_code) {
        setSelectedValue(Countries.filter((each) => each.value === user.verify_phone_country_code)[0])
      }
      if (user.verify_phone) {
        setCurrentPhoneNumber(user.verify_phone)
      }
    }
    else{
      async function fetchCustomerDetails() {
        const { result, error } = await fetchData(`/users/user/${user_id}`, {
          method: "GET",
        });
        if (error) {
        } else {
          if (!result) return
          setCurrentEmail(result?.email)
          fetchSecurityQuestions(result?.user_id)
          setIsActive(result?.status)
      
          setTwoFactorAuth(result?.authenticator_secret ? true : false)
      
          if (result?.verify_phone_country_code) {
            setSelectedValue(Countries.filter((each) => each.value === result?.verify_phone_country_code)[0])
          }
          if (result?.verify_phone) {
            setCurrentPhoneNumber(result?.verify_phone)
          }
        }
      }
      fetchCustomerDetails()
    }
  }, [user, user_id])

  const change2faStatus = useCallback(async (checked) => {
    if (!userId) return
    const { result, error } = await fetchData(`/auth/2fa_status/${userId}`, {
      method: "POST",
      body: {
        status: !isTwoFactorAuth
      }
    });
    if (!error) {
      if (result.status === 'success') {
        toast.current.show({
          severity: isTwoFactorAuth ? "warn" : 'success',
          summary: "2FA Status Changed",
          detail: isTwoFactorAuth ? "2FA had been disabled!" : "2FA had been enabled!",
          life: 3000,
        });
        setTwoFactorAuth(!isTwoFactorAuth);
      }
      else{
        toast.current.show({
          severity: "warn",
          summary: "Sever Error",
          detail: "Whoops something went wrong!",
          life: 3000,
        });
        return
      }
    }
  }, [isTwoFactorAuth, userId])

  const handleUpdatePhoneNumber = useCallback(async () => {
    if (!userId) return
    if (selectedNewValue.areaCode === '' || updatePhoneNumber.trim() === '') {
      toast.current.show({
        severity: 'warn',
        summary: "Invalid Input",
        detail: "Please fill out all fields correctly!",
        life: 3000,
      });
      return
    }
    const { result, error } = await fetchData(`/auth/update-verify-phone/${userId}`, {
      method: "POST",
      body: {
        country_code: selectedNewValue.value,
        phone_number: updatePhoneNumber
      }
    });
    if (!error) {
      if (result.status === 'success') {
        toast.current.show({
          severity: 'success',
          summary: "Phone Number Changed",
          detail: "Your Phone Number had been updated successfully!",
          life: 3000,
        });
        closePhoneModal()
        fetchUser()
        setSelectedNewValue(Countries[0])
        setUpdatePhoneNumber('')
      }
    }
  }, [userId, updatePhoneNumber, selectedNewValue])

  const accountStatusChange = useCallback(async () => {
    if (!userId) return
    const { result, error } = await fetchData(`/auth/activate/${userId}`, {
      method: "POST",
      body: {
        status: !isActive
      }
    });

    if (!error) {
      if (result.status === 'success') {
        toast.current.show({
          severity: isActive ? "warn" : 'success',
          summary: "Status Changed",
          detail: isActive ? "Your account had been deactivated!" : "Your account had been activated!",
          life: 3000,
        });
        setIsActive(!isActive)
      }
    }
  }, [isActive, userId])

  const fetchSecurityQuestions = async (id) => {
    const { result, error } = await fetchData(`/security-questions/${id}`, {
      method: "GET"
    });
    if (!error) {
      if (result.status === "success" && result.questions && result.questions.question1) {
        const { question1, answer1, question2, answer2, question3, answer3 } = result.questions;
  
        setQuestion1(question1 || "");
        setAnswer1(answer1 || "");
  
        setQuestion2(question2 || "");
        setAnswer2(answer2 || "");
  
        setQuestion3(question3 || "");
        setAnswer3(answer3 || "");
        setIsSecurityQuestions(true)
      }
      else{
        setIsSecurityQuestions(false)
      }
    }
  }

  const setSecurityQuestions = useCallback(async () => {
    if (!userId) return
    if (updatedanswer1 !== '' && updatedanswer2 !== '' && updatedanswer3 !== '') {
      const { result, error } = await fetchData(`/security-questions/${userId}`, {
        method: "PUT",
        body: {
          question1: updatedquestion1,
          question2: updatedquestion2,
          question3: updatedquestion3,
          answer1: updatedanswer1,
          answer2: updatedanswer2,
          answer3: updatedanswer3,
        }
      });
      if (result.status === "success") {
        toast.current.show({
          severity: "success",
          summary: "Security Question Updated",
          detail: "Security questions had been updated successfully!",
          life: 3000,
        });
        setupdatedAnswer1('')
        setupdatedAnswer2('')
        setupdatedAnswer3('')

        setAnswer1(updatedanswer1)
        setAnswer2(updatedanswer2)
        setAnswer3(updatedanswer3)

        setQuestion1(updatedquestion1)
        setQuestion2(updatedquestion2)
        setQuestion3(updatedquestion3)
        setIsSecurityQuestions(true)
        closeSecurityModal()
        return
      }
      else{
        toast.current.show({
          severity: "warn",
          summary: "Sever Error",
          detail: "Whoops something went wrong!",
          life: 3000,
        });
        return
      }
    }
    else{
      toast.current.show({
        severity: "warn",
        summary: "Invalid Input",
        detail: "Please fill out all fields!",
        life: 3000,
      });
      return
    }
  }, [updatedquestion1, updatedquestion2, updatedquestion3, updatedanswer1, updatedanswer2, updatedanswer3, userId])

  const handleRemoveSecurity = useCallback(async () => {
    if (!userId) return
    const { result, error } = await fetchData(`/security-questions/${userId}`, {
      method: "DELETE"
    });

    if (result.status === "success") {
      closeSecurityRemoveModal()
      toast.current.show({
        severity: "warn",
        summary: "Security Question Removed",
        detail: "Security questions had been removed successfully!",
        life: 3000,
      });
      setIsSecurityQuestions(false)
      setAnswer1('')
      setAnswer2('')
      setAnswer3('')

      setQuestion1('')
      setQuestion2('')
      setQuestion3('')
      return
    }
    else{
      toast.current.show({
        severity: "warn",
        summary: "Sever Error",
        detail: "Whoops something went wrong!",
        life: 3000,
      });
      return
    }
  }, [user])

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmShowPassword((prevState) => !prevState);
  };

  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputs = useRef([]);

  const [isPhoneModalOpen, setPhoneModalOpen] = useState(false);
  const openPhoneModal = () => setPhoneModalOpen(true);
  const closePhoneModal = () => setPhoneModalOpen(false);

  const countryCodes = [
    { value: "+1", label: "+1" },
    { value: "+44", label: "+44" },
    { value: "+91", label: "+91" },
    { value: "+86", label: "+86" },
    { value: "+81", label: "+81" },
    { value: "+49", label: "+49" },
    { value: "+33", label: "+33" },
    { value: "+61", label: "+61" },
    { value: "+7", label: "+7" },
    { value: "+972", label: "+972" },
  ];

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Focus on the next input if available
      if (value && index < 5) {
        inputs.current[index + 1].focus();
      } else {
        nextStep();
      }
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text");
    if (/^\d*$/.test(pasteData)) {
      const newOtp = pasteData.split("").slice(0, 6);
      setOtp(newOtp);
      // Focus on the next input if available
      newOtp.forEach((value, index) => {
        if (value && index < 5) {
          inputs.current[index + 1].focus();
        }
      });
    }
  };

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newConfirmPassword, setNewConfirmPassword] = useState('')
  const updatePassword = useCallback(async () => {
    if (!userId) return
    if (currentPassword.trim() === '') {
      toast.current.show({
        severity: "warn",
        summary: "Invalid Password",
        detail: "Please enter current password correctly!",
        life: 3000,
      });
      return
    }
    if (newPassword !== newConfirmPassword) {
      toast.current.show({
        severity: "warn",
        summary: "Invalid Password",
        detail: "New Password and Re-type does not match!",
        life: 3000,
      });
      return
    }
    const { result, error } = await fetchData(`/auth/change-profile-password/${userId}`, {
      method: "Patch",
      body: {
        old_password: currentPassword,
        new_password: newPassword,
      }
    });
    if (!error) {
      if (result.status !== 'success') {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: result.message,
          life: 3000,
        });
      }
      else{
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Password updated successfuly!",
          life: 3000,
        });
        closeModal()
      }
    }
    else{
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: (Array.isArray(error.message) ? error.message[0] : error.message),
        life: 3000,
      });
    }
  }, [newConfirmPassword, newPassword, currentPassword, userId])

  const [newEmail, setNewEmail] = useState('')
  const updateEmail = useCallback(async () => {
    if (!userId) return
    // Regular expression for basic email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (currentPassword.trim() === '') {
      toast.current.show({
        severity: "warn",
        summary: "Invalid Password",
        detail: "Please enter current password correctly!",
        life: 3000,
      });
      return
    }
    if (!emailRegex.test(newEmail)) {
      toast.current.show({
        severity: "warn",
        summary: "Invalid Email",
        detail: "Please enter a valid email address!",
        life: 3000,
      });
      return;
    }
    const { result, error } = await fetchData(`/auth/change-profile-email/${userId}`, {
      method: "Patch",
      body: {
        old_password: currentPassword,
        new_email: newEmail,
      }
    });
    if (!error) {
      if (result.status !== 'success') {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: result.message,
          life: 3000,
        });
      }
      else{
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Email updated successfuly!",
          life: 3000,
        });
        setCurrentEmail(newEmail)
        closeEmailModal()
      }
    }
    else{
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: (Array.isArray(error.message) ? error.message[0] : error.message),
        life: 3000,
      });
    }

  }, [currentPassword, newEmail, userId])
  return (
    <>
      <div className="max-w-full mx-auto my-2 md:my-4">
        {/** Password Section */}
        <div className="bg-white p-4 rounded-2xl md:rounded-xl shadow-sm mt-2 border border-primary50">
          <h2 className="font-semibold text-sm leading-[20px] tracking[-0.005em] text-textBlack mb-2 text-left">
            Password
          </h2>
          <p className="font-normal text-[12px] leading-[16px] text-textSecondary mb-2 text-left">
            This is the password used for login. You can update it if needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center border border-primary50 p-2 rounded-xl justify-between">
            <p className="text-xs font-semibold flex flex-row items-center text-textBlack leading-[16px] text-left no-underline">
              Password:{" "}
              <span className="font-semibold text-xs leading-[16px] text-textBlack text-left ml-2">
                •••••••••••
              </span>
              <VisibilityOff />
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <TextButton
                width="w-auto"
                // onClick={() => {setCurrentPassword(''); setNewPassword(''); setNewConfirmPassword(''); openModal();}}
                textColor="textBlack"
                backgroundColor="bg-white"
                title={"Send email verification code"}
                borderColor="border-[1px] border-primary50"
                className={"px-4 py-1 md:py-2 rounded-[10px] text-textBlack"}
              />

              <TextButton
                width="w-auto"
                title={"Change"}
                onClick={() => {
                  setCurrentPassword("");
                  setNewPassword("");
                  setNewConfirmPassword("");
                  openModal();
                }}
                className={"px-4 py-1 md:py-2 rounded-[10px]"}
              />
            </div>
          </div>
        </div>

        {/* Email Section */}
        <div className="bg-white p-4 rounded-xl shadow-sm mt-2 border border-primary50">
          <h2 className="font-semibold text-sm leading-[20px] tracking[-0.005em] text-textBlack mb-1 ">
            Email Address
          </h2>
          <p className="font-normal text-xs leading-[16px] text-textSecondary mb-2 text-left">
            This is the email used for login. You can update it or send a
            verification code if needed.
          </p>
          <div className="flex flex-wrap flex-row gap-2 items-center border border-primary50 p-2 rounded-xl justify-between">
            <p className="font-semibold text-xs leading-[16px] text-textBlack text-left">
              Email Address:{" "}
              <span className="font-semibold text-xs leading-[16px] text-textBlack text-left ml-2">
                {currentEmail}
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <TextButton
                width="w-auto"
                // onClick={openModal}
                textColor="textBlack"
                backgroundColor="bg-white"
                title={"Send email verification code"}
                borderColor="border-[1px] border-primary50"
                className={"px-4 py-1 md:py-2 rounded-[10px]  text-textBlack"}
              />

              <TextButton
                width="w-auto"
                title={"Change"}
                onClick={() => {
                  openEmailModal();
                  setCurrentPassword("");
                  setNewEmail("");
                }}
                className={"px-4 py-1 md:py-2 rounded-[10px]"}
              />
            </div>
          </div>
        </div>

        {/* Phone Section */}
        <div className="bg-white p-4 rounded-xl shadow-sm mt-2 border border-primary50">
          <h2 className="font-semibold text-sm leading-[20px] tracking[-0.005em] text-textBlack mb-1 text-left">
            Phone Number
          </h2>
          <p className="font-normal text-[12px] leading-[16px] text-textSecondary mb-2 text-left">
            This phone number is associated with your account for security and
            verification purposes.
          </p>
          <div className="flex flex-wrap flex-row gap-2 items-center border border-primary50 p-2 rounded-xl justify-between">
            <p className="font-semibold text-[12px] leading-[16px] text-textBlack text-left">
              Phone Number:{" "}
              <span className="font-semibold text-[12px] leading-[16px] text-textBlack text-left ml-2">
                {selectedValue &&
                  Countries.find(
                    (option) => option.areaCode === selectedValue.areaCode
                  ).areaCode}{" "}
                {currentPhoneNumber || ""}
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <TextButton
                width="w-auto"
                // onClick={openModal}
                textColor="textBlack"
                backgroundColor="bg-white"
                borderColor="border-[1px] border-primary50"
                title={"Send SMS verification code"}
                className={"px-4 py-1 md:py-2 rounded-[10px]  text-textBlack"}
              />
              <TextButton
                width="w-auto"
                title={"Change"}
                onClick={openPhoneModal}
                className={"px-4 py-1 md:py-2 rounded-[10px] "}
              />
            </div>
          </div>
        </div>

        {/* 2FA Section */}
        <div className="bg-white p-4 rounded-xl shadow-sm mt-2 border border-primary50">
          <h2 className="font-semibold text-sm leading-[20px] tracking[-0.005em] text-textBlack mb-1 text-left">
            Two-Factor Authentication (2FA)
          </h2>
          <p className="font-normal text-[12px] leading-[16px] text-textSecondary mb-2 text-left">
            Enhance your account security by enabling 2FA. You can manage your
            2FA settings here.
          </p>
          <div className="flex flex-wrap flex-row gap-2 items-center border border-primary50 p-2 rounded-xl justify-between">
            <p className="font-semibold text-[12px] leading-[16px] text-textBlack text-left">
              Authenticator App
            </p>
            <div className="flex items-center gap-2">
              <Switch
                onChange={(checked) => change2faStatus(checked)}
                checked={isTwoFactorAuth}
                onColor="#000"
                offColor="#ddd"
                uncheckedIcon={false}
                checkedIcon={false}
                handleDiameter={14}
                height={18.29}
                width={32}
                borderRadius={28.57}
              />
            </div>
          </div>
        </div>

        {/* Security Questions Section */}
        <div className="bg-white p-4 rounded-xl shadow-sm mt-2 border border-primary50">
          <h2 className="font-semibold text-sm leading-[20px] tracking[-0.005em] text-textBlack mb-1 text-left">
            Security Questions
          </h2>
          <p className="font-normal text-[12px] leading-[16px] text-textSecondary mb-4 text-left">
            Set up security questions to help protect your account. You can
            change your answers here.
          </p>

          <div className="bg-white p-2 rounded-xl shadow-sm mt-2 border border-primary50">
            {existSecurityQuestions ? (
              <>
                <div key={1} className="mb-8">
                  <div className="flex flex-wrap itmes-center gap-2 sm:gap-10 justify-start">
                    <p className="font-semibold text-xs leading-[16px] text-textBlack text-left">
                      {"Question 1"}
                    </p>
                    <p className="font-normal text-xs leading-[16px] text-textSecondary mb-2 text-left">
                      {questions.find((q) => q.value === question1).label}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-start gap-2 sm:gap-10 mt1">
                    <p className="text-xs font-semibold text-textBlack mr-2">{`Answer 1`}</p>
                    <div className="flex items-center justify-start gap-2 text-xs font-normal text-textBlack">
                      <span>
                        {showSecretAnswer1
                          ? answer1
                          : new Array(answer1.length).fill("•").map(() => "•")}
                      </span>
                      <div
                        onClick={() => setShowSecretAnswer1(!showSecretAnswer1)}
                        className="cursor-pointer"
                      >
                        {!showSecretAnswer1 ? (
                          <VisibilityOff />
                        ) : (
                          <VisibilityOn />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div key={2} className="mb-8">
                  <div className="flex flex-wrap itmes-center gap-2 sm:gap-10 justify-start">
                    <p className="font-semibold text-xs leading-[16px] text-textBlack text-left">
                      {"Question 2"}
                    </p>
                    <p className="font-normal text-xs leading-[16px] text-textSecondary mb-2 text-left">
                      {questions.find((q) => q.value === question2).label}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-start gap-2 sm:gap-10 mt1">
                    <p className="text-xs font-semibold text-textBlack mr-2">{`Answer 2`}</p>
                    <div className="flex items-center justify-start gap-2 text-xs font-normal text-textBlack">
                      <span>
                        {showSecretAnswer2
                          ? answer2
                          : new Array(answer2.length).fill("•").map(() => "•")}
                      </span>
                      <div
                        onClick={() => setShowSecretAnswer2(!showSecretAnswer2)}
                        className="cursor-pointer"
                      >
                        {!showSecretAnswer2 ? (
                          <VisibilityOff />
                        ) : (
                          <VisibilityOn />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div key={3} className="mb-8">
                  <div className="flex flex-wrap itmes-center gap-2 sm:gap-10 justify-start">
                    <p className="font-semibold text-xs leading-[16px] text-textBlack text-left">
                      {"Question 3"}
                    </p>
                    <p className="font-normal text-xs leading-[16px] text-textSecondary mb-2 text-left">
                      {questions.find((q) => q.value === question3).label}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-start gap-2 sm:gap-10 mt1">
                    <p className="text-xs font-semibold text-textBlack mr-2">{`Answer 3`}</p>
                    <div className="flex items-center justify-start gap-2 text-xs font-normal text-textBlack">
                      <span>
                        {showSecretAnswer3
                          ? answer3
                          : new Array(answer3.length).fill("•").map(() => "•")}
                      </span>
                      <div
                        onClick={() => setShowSecretAnswer3(!showSecretAnswer3)}
                        className="cursor-pointer"
                      >
                        {!showSecretAnswer3 ? (
                          <VisibilityOff />
                        ) : (
                          <VisibilityOn />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h5 className="text-textSecondary pl-4 pt-4 text-xs font-normal">
                  You don&apos;t have any security questions yet.
                </h5>
              </>
            )}
            <div className="flex justify-end">
              <TextButton
                width="w-auto"
                onClick={() => {
                  openSecurityModal();
                  setupdatedAnswer1(answer1);
                  setupdatedAnswer2(answer2);
                  setupdatedAnswer3(answer3);
                  setupdatedQuestion1(question1);
                  setupdatedQuestion2(question2);
                  setupdatedQuestion3(question3);
                }}
                title={"Reset Security Question"}
                className={"px-4 py-1 md:py-2 rounded-[10px]"}
              />
              {existSecurityQuestions && <TextButton
                width="w-auto"
                backgroundColor="bg-white"
                textColor="text-alert"
                borderColor="border-[1px] border-alert"
                onClick={() => {setSecurityRemoveModalOpen(true)}}
                title={"Remove Security Question"}
                className={"px-4 py-1 ml-2 md:py-2 rounded-[10px]"}
              />}
            </div>
          </div>
        </div>

        {/* Account Activation Section */}
        {isAccountActivation && (
          <div className="bg-white p-4 rounded-xl shadow-sm mt-2 w-full text-left border border-primary50 flex flex-wrap gap-2 flex-row justify-between items-center">
            <h2 className="font-semibold text-sm text-textBlack">
              {isActive ? "Deactivate Account" : "Activate Account"}
            </h2>
            <p className="text-xs font-normal text-textSecondary">
              {isActive
                ? "Temporarily deactivate your account. You can reactivate it at any time."
                : "You can activate your account now."}
            </p>

            <TextButton
              width="w-auto"
              backgroundColor="bg-white"
              title={isActive ? 'Deactivate Account' : 'Activate Account'}
              textColor={isActive ? 'text-alert' : 'text-success'}
              borderColor={`border-[1px] ${isActive ? 'border-alert' : 'border-success'}`}
              className={"px-4 py-1 md:py-2 rounded-[10px]"}
              onClick={accountStatusChange}
            />
          </div>
        )}
      </div>

      {/* Change Passcode Modal Body */}
      <Modal
        isOpen={isModalPOpen}
        onClose={closePModal}
        title="Change Passcode"
        headerClassName="py-2 px-4"
        contentClassName="p-0"
      >
        {/* Modal Body */}
        <div className="p-4">
          <p>Enter Current Passcode</p>
        </div>
        <div className="flex justify-center space-x-2">
          {otp.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleChange(e, index)}
              onPaste={handlePaste}
              className="w-6 h-6 border border-primary rounded-full text-center text-xs"
            />
          ))}
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end p-4 border-t border-2 gap-2 p-4">
          <TextButton
            title="Cancel"
            type="secondary"
            width="w-[114px]"
            onClick={closePModal}
          />
        </div>
      </Modal>

      {/* Remove Security Question Modal Body */}
      <Modal
        isOpen={isSecurityRemoveModalOpen}
        onClose={closeSecurityRemoveModal}
        title="Change Passcode"
        headerClassName="py-2 px-4"
        contentClassName="p-0"
      >
        {/* Modal Body */}
        <div className="p-4">
          <p className="text-textBlack">Are you sure to remove <span className="text-alert">Security Questions</span>?</p>
        </div>
        <div className="flex justify-center space-x-2">
          
        </div>
        <div className="flex justify-center space-x-2"></div>
        {/* Modal Footer */}
        <div className="flex justify-end p-4 border-t border-2 gap-2 p-4">
          <TextButton
            title="Cancel"
            type="secondary"
            width="w-[114px]"
            onClick={closeSecurityRemoveModal}
          />
          <TextButton
            title="Remove"
            type="danger"
            width="w-[114px]"
            onClick={() => handleRemoveSecurity()} // Pass the ID or any relevant data
          />
        </div>
      </Modal>

      {/* Change Password Modal Body */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Change Password"
        customWidth="max-w-[96%] sm:max-w-[500px]"
        headerClassName="py-2 px-4"
        contentClassName="p-0"
      >
        {/* Modal Body */}
        <div className="p-4">
          <p className=" pb-1 font-normal text-xs text-textBlack">
            Current Password*
          </p>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Current password"
              className="border border-gray-300 p-3 rounded-[10px] text-xs h-8 w-full pr-10 text-textBlack"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            {/* Eye icon to toggle password visibility */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-[5px] text-gray-500"
            >
              {showPassword ? (
                <VisibilityOn /> // eye icon (open)
              ) : (
                <VisibilityOff /> // eye-off icon (closed)
              )}
            </button>
          </div>
          <p className="pt-4 pb-1 font-normal text-xs text-textBlack">
            New Password*
          </p>
          <div className="relative w-full">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="New password"
              className="border border-gray-300 p-3 rounded-[10px] text-xs h-8 w-full pr-10 text-textBlack"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {/* Eye icon to toggle password visibility */}
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-[5px] text-gray-500"
            >
              {showConfirmPassword ? (
                <VisibilityOn /> // eye icon (open)
              ) : (
                <VisibilityOff /> // eye-off icon (closed)
              )}
            </button>
          </div>
          <p className="pt-4 pb-1 font-normal text-xs text-textBlack">
            Re-type New Password*
          </p>
          <div className="relative w-full">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-type New Password"
              className="border border-gray-300 p-3 rounded-[10px] text-xs h-8 w-full pr-10 text-textBlack"
              value={newConfirmPassword}
              onChange={(e) => setNewConfirmPassword(e.target.value)}
            />
            {/* Eye icon to toggle password visibility */}
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-[5px] text-gray-500"
            >
              {showConfirmPassword ? (
                <VisibilityOn /> // eye icon (open)
              ) : (
                <VisibilityOff /> // eye-off icon (closed)
              )}
            </button>
          </div>
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end border-t gap-2 p-4">
          <TextButton
            title="Cancel"
            width="max-w-[114px] w-full"
            onClick={closeModal}
            textColor="text-textBlack"
            backgroundColor="bg-white"
            borderColor="border border-primary50"
          />
          <TextButton
            title="Change"
            width="max-w-[114px] w-full"
            onClick={updatePassword}
          />
        </div>
      </Modal>

      {/* Change Email Modal Body */}
      <Modal
        isOpen={isEmailModalOpen}
        onClose={closeEmailModal}
        title="Change email address"
        customWidth="max-w-[96%] sm:max-w-[500px]"
        headerClassName="py-2 px-4"
        contentClassName="p-0"
      >
        {/* Modal Body */}
        <div className="p-4">
          <p className=" pb-1 font-normal text-xs text-textBlack">
            Current Password*
          </p>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Current password"
              className="border border-gray-300 p-3 rounded-[10px] text-xs h-8 w-full pr-10 text-textBlack"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            {/* Eye icon to toggle password visibility */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-[5px] text-gray-500"
            >
              {showPassword ? (
                <VisibilityOn /> // eye icon (open)
              ) : (
                <VisibilityOff /> // eye-off icon (closed)
              )}
            </button>
          </div>
          <p className="pt-4 pb-1 font-normal text-sm text-textBlack">
            New email address
          </p>
          <input
            type="text"
            placeholder="Email address"
            className="border border-gray-300 p-3 rounded-[10px] w-full h-8 text-xs text-textBlack"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end border-t gap-2 p-4">
          <TextButton
            title="Cancel"
            onClick={closeEmailModal}
            textColor="text-textBlack"
            backgroundColor="bg-white"
            width="max-w-[114px] w-full"
            borderColor="border border-primary50"
          />
          <TextButton
            title="Change"
            onClick={() => {
              updateEmail();
            }}
            width="max-w-[114px] w-full"
          />
        </div>
      </Modal>

      <Modal
        isOpen={isPhoneModalOpen}
        onClose={closePhoneModal}
        title="Change Phone Number"
        customWidth="max-w-[96%] sm:max-w-[500px]"
        headerClassName="py-2 px-4"
        contentClassName="p-0"
      >
        {/* Modal Body */}
        <div className="p-4">
          <p className="text-sm font-normal leading-4 text-textBlack pb-1">
            Current Phone Number
          </p>
          <div className="flex gap-2">
            <div className="w-fit">
              <CountriesPhone
                id={"country-selector"}
                open={isOpen}
                onChange={(value) => setSelectedValue(value)}
                onToggle={() => setIsOpen((prev) => !prev)}
                selectedValue={Countries.find(
                  (option) => option.areaCode === selectedValue.areaCode
                )}
                width="w-24"
                className={`border border-primary50 py-1 px-2`}
                disabled={true}
              />
            </div>
            <input
              type="text"
              placeholder="Current phone number"
              className="w-[400px] h-8 px-2 border border-gray-300 p-3  py-1 rounded-[10px] text-xs text-textBlack"
              value={currentPhoneNumber}
              disabled={true}
            />
          </div>

          <p className="pt-4 text-sm font-normal leading-4 text-textBlack pb-1">
            New Phone Number
          </p>
          <div className="flex gap-2">
            <div className="w-fit">
              <CountriesPhone
                id={"country-selector-new"}
                open={isOpen}
                onChange={(value) => setSelectedNewValue(value)}
                onToggle={() => setIsOpen((prev) => !prev)}
                selectedValue={Countries.find(
                  (option) => option.areaCode === selectedNewValue.areaCode
                )}
                width="w-24"
                className={`border border-primary50 py-1 px-2`}
              />
            </div>
            <input
              type="text"
              placeholder="Current phone number"
              className="w-[400px] h-8 px-2 border border-gray-300 p-3  py-1 rounded-[10px] text-xs text-textBlack"
              value={updatePhoneNumber}
              onChange={(e) => setUpdatePhoneNumber(e.target.value)}
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end border-t gap-2 p-4">
          <TextButton
            title="Cancel"
            onClick={closePhoneModal}
            textColor="text-textBlack"
            backgroundColor="bg-white"
            width="max-w-[114px] w-full"
            borderColor="border border-primary50"
          />
          <TextButton
            title="Change"
            width="max-w-[114px] w-full"
            onClick={handleUpdatePhoneNumber}
          />
        </div>
      </Modal>

      {/* Change Security Question Modal Body */}
      <Modal
        isOpen={isSecurityModalOpen}
        onClose={closeSecurityModal}
        title="Security Questions"
        customWidth="max-w-[96%] sm:max-w-[500px]"
        headerClassName="py-2 px-4"
        contentClassName="p-0"
      >
        {/* Modal Body */}
        <div className="p-4">
          <p className=" pb-2 text-sm">Questions 1</p>
          <div className="relative w-full">
            <DropDown
              key={1}
              items={questions.filter(
                (q) =>
                  q.value !== updatedquestion3 && q.value !== updatedquestion2
              )}
              labelClasses={"text-textBlack"}
              className="w-full h-8 rounded-[10px] text-textBlack"
              width={"w-full"}
              defaultValue={
                questions.filter((q) => q.value === updatedquestion1)[0]
              }
              // title="What is the name of your first pet?"
              onSelect={(newValue) => setupdatedQuestion1(newValue.value)} // Handle value change
            />
          </div>
          <p className="pt-2 pb-2 text-xs">Answer 1</p>
          <div className="relative w-full mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Your Answer"
              className="border border-gray-300 p-2 rounded-[10px] text-xs h-8 w-full pr-10 text-textBlack"
              value={updatedanswer1}
              onChange={(e) => setupdatedAnswer1(e.target.value)}
            />
            {/* Eye icon to toggle password visibility */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-[5px] text-gray-500"
            >
              {showPassword ? (
                <VisibilityOn /> // eye icon (open)
              ) : (
                <VisibilityOff /> // eye-off icon (closed)
              )}
            </button>
          </div>

          <hr></hr>
          <p className="pt-2 pb-2 text-xs">Questions 2</p>
          <div className="relative w-full">
            <DropDown
              key={2}
              items={questions.filter(
                (q) =>
                  q.value !== updatedquestion1 && q.value !== updatedquestion3
              )}
              labelClasses={"text-textBlack"}
              className="w-full h-8  rounded-[10px] text-textBlack"
              width={"w-full"}
              defaultValue={
                questions.filter((q) => q.value === updatedquestion2)[0]
              }
              // title="What is the name of your first pet?"
              onSelect={(newValue) => setupdatedQuestion2(newValue.value)} // Handle value change
            />
          </div>
          <p className="pt-2 pb-2 text-sm">Answer 2</p>
          <div className="relative w-full mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Your Answer"
              className="border border-gray-300 p-2 rounded-[10px] text-xs w-full pr-10 text-textBlack"
              value={updatedanswer2}
              onChange={(e) => setupdatedAnswer2(e.target.value)}
            />
            {/* Eye icon to toggle password visibility */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-[5px] text-gray-500"
            >
              {showPassword ? (
                <VisibilityOn /> // eye icon (open)
              ) : (
                <VisibilityOff /> // eye-off icon (closed)
              )}
            </button>
          </div>

          <hr></hr>
          <p className="pt-2 pb-2 text-xs">Questions 3</p>
          <div className="relative w-full">
            <DropDown
              key={3}
              items={questions.filter(
                (q) =>
                  q.value !== updatedquestion1 && q.value !== updatedquestion2
              )}
              labelClasses={"text-textBlack"}
              className="w-full h-8 rounded-[10px] text-textBlack"
              width={"w-full"}
              defaultValue={
                questions.filter((q) => q.value === updatedquestion3)[0]
              }
              // title="What is the name of your first pet?"
              onSelect={(newValue) => setupdatedQuestion3(newValue.value)} // Handle value change
            />
          </div>
          <p className="pt-4 pb-2 text-xs">Answer 3</p>
          <div className="relative w-full mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Your Answer"
              className="border border-gray-300 p-2 rounded-[10px] text-xs w-full pr-10 text-textBlack"
              value={updatedanswer3}
              onChange={(e) => setupdatedAnswer3(e.target.value)}
            />
            {/* Eye icon to toggle password visibility */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-[5px] text-gray-500"
            >
              {showPassword ? (
                <VisibilityOn /> // eye icon (open)
              ) : (
                <VisibilityOff /> // eye-off icon (closed)
              )}
            </button>
          </div>
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end border-t gap-2 p-4">
          <TextButton
            title="Cancel"
            textColor="text-textBlack"
            backgroundColor="bg-white"
            onClick={closeSecurityModal}
            width="max-w-[114px] w-full"
            borderColor="border border-primary50"
            className={"py-2 px-4 gap-4 rounded-[10px]"}
          />
          <Button
            title="Change"
            width="max-w-[114px] w-full"
            className={"py-2 px-4 gap-4 rounded-[10px] bg-primary text-white"}
            onClick={setSecurityQuestions}
          />
        </div>
      </Modal>
      <Toast ref={toast} baseZIndex={9999} />
    </>
  );
}
