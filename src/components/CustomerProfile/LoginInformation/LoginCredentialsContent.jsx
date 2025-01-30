import React from "react";
import AccountField from "./AccountField";
import SecurityQuestions from "./SecurityQuestions";
import SecurityTab from "@/components/Settings/SecurityTab";

const LoginCredentialsContent = ({user_id, fetchCustomerDetails}) => {
  const questions = [
    {
      question: "What is the name of your first pet?",
    },
    {
      question: "What is your father's middle name?",
    },
    {
      question: "What is the name of the street you grew up on?",
    },
  ];

  const handleResetClick = () => {
    console.log("Reset security questions email sent");
  };

  const handlePasswordChange = () => {
    console.log("Password change action");
  };

  const handleEmailVerification = () => {
    console.log("Send email verification");
  };

  const handlePhoneChange = () => {
    console.log("Phone number change action");
  };

  const handle2FAToggle = () => {
    console.log("2FA toggled");
  };

  return (
    <>
      <SecurityTab isAccountActivation={false} user_id={user_id} fetchCustomerDetails={fetchCustomerDetails} />
    </>
  );
};

export default LoginCredentialsContent;
