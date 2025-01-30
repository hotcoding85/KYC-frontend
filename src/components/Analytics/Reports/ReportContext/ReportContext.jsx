import React, { createContext, useContext, useState } from 'react';

// Create context
const ReportContext = createContext();

// Custom hook to use the context
export const useReport = () => {
  return useContext(ReportContext);
};

// Provider component
export const ReportProvider = ({ children }) => {
  const [reportTitle, setReportTitle] = useState('');
  const [modalTitle, setModalTitle] = useState('Add new report');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Analytics");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addReport = () => {
    setActiveTab('AddReport')
    console.log('Adding report with title:', reportTitle, 'and template:', selectedTemplate);
  };

  return (
    <ReportContext.Provider
      value={{
        setActiveTab,
        activeTab,
        reportTitle,
        setReportTitle,
        selectedTemplate,
        setSelectedTemplate,
        isModalOpen,
        openModal,
        closeModal,
        addReport,
        modalTitle,
        setModalTitle
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};
