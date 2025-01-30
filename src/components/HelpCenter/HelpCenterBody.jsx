import React, { useState } from "react";
import MenuList from "./MenuList";
import FAQComponent from "./FAQComponent";
import ChatSection from "./ChatSection";
import HelpSection from "./HelpSection";
import SupportBody from "../Support/SupportBody";
import Account from "@/Icons/imageicon/Account";
import Securityicon from "@/Icons/imageicon/Securityicon";
import Transfers from "@/Icons/imageicon/Transfers";
import Cards from "@/Icons/imageicon/Cards";
import Currencies from "@/Icons/imageicon/Currencies";
import Transactions from "@/Icons/imageicon/Transactions";
import PlusIcon from "@/Icons/PlusIcon";

const App = () => {
  const [selectedTopic, setSelectedTopic] = useState();
  const [showFaq, setShowFaq] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showSupportBody, setShowSupportBody] = useState(false);

  const menuItems = [
    {
      name: "Security and Fraud",
      icon: <Securityicon className="w-[12px] h-[12px]" />,
    },
    {
      name: "My Account and Profile",
      icon: <Account className="w-[12px] h-[12px]" />,
    },
    { name: "Adding Money", icon: <PlusIcon className="w-[12px] h-[12px]" /> },
    { name: "Transfers", icon: <Transfers className="w-[12px] h-[12px]" /> },
    {
      name: "Transactions & ATMs",
      icon: <Transactions className="w-[12px] h-[12px]" />,
    },
    { name: "Cards", icon: <Cards className="w-[12px] h-[12px]" /> },
    {
      name: "Currencies & Trading",
      icon: <Currencies className="w-[12px] h-[12px]" />,
    },
  ];

  const faqItems = {
    "My Account and Profile": [
      {
        question: "How do I change my name?",
        answer: [
          "Login to Your Account: Start by logging into your account on the platform.",
          "Navigate to Profile Settings: Go to the 'Profile' section from the main menu or dashboard. You can find it under 'Account Settings'.",
          "Edit Your Name: Click on the 'Edit' button next to your current name. This will allow you to enter your new name.",
          "Upload Required Documentation: For security reasons, we may require a valid ID or other official documents that verify your new name. Follow the prompts to upload the necessary files.",
          "Save Changes: Once you’ve entered your new name and uploaded the required documentation, click 'Save' to update your profile.",
          "Verification Process: Your request will be reviewed by our support team. You’ll receive a notification once the name change is approved.",
        ],
      },
      {
        question: "How do I change my phone number?",
        answer: "Update your phone number from the profile section.",
      },
      {
        question: "How do I verify my identity?",
        answer: "You can verify your identity using the verification section.",
      },
      {
        question: "I forgot my passcode",
        answer: "Reset your passcode using your email or phone number.",
      },
      {
        question: "Downgrading my plan",
        answer: "You can downgrade your plan from the billing section.",
      },
      {
        question: "Closing Account",
        answer: "You can close your account from the profile settings.",
      },
      {
        question: "How do I view/download my account statement?",
        answer:
          "You can download your account statement from the reports section.",
      },
    ],
  };

  const handleMenuClick = (topic) => {
    setSelectedTopic(topic);
    setShowFaq(true);
    setShowChat(false);
  };

  const handleStartChat = () => {
    setShowSupportBody(true);
    setShowChat(false);
  };

  const handleBackClick = () => {
    setShowFaq(false);
    setShowChat(false);
    setShowSupportBody(false);
  };

  return (
    <div className="flex h-screen ">
      <div className="w-full">
        {showSupportBody && <SupportBody handleBackClick={handleBackClick} />}

        {!showSupportBody && showFaq && (
          <FAQComponent
            selectedTopic={selectedTopic}
            faqItems={faqItems}
            onBackClick={handleBackClick}
          />
        )}

        {!showSupportBody && !showFaq && !showChat && (
          <MenuList
            menuItems={menuItems}
            selectedTopic={selectedTopic}
            handleMenuClick={handleMenuClick}
          />
        )}

        {!showSupportBody && <ChatSection onStartChat={handleStartChat} />}

        {!showSupportBody && !showChat && <HelpSection />}
      </div>
    </div>
  );
};

export default App;
