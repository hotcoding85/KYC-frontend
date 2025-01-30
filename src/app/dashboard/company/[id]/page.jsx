"use client";
import React, { useEffect, useState } from "react";
import Container from "@/components/Container/Container";
import CompanyInfoTab from "@/components/Companies/CompanyInfoTab";
import FinancialsTab from "@/components/Companies/FinancialsTab/FinancialsTab";
import ComplianceTab from "@/components/Companies/ComplianceTab";
import TeamTab from "@/components/Companies/TeamTab/TeamTab";
import ServiceFeeTab from "@/components/Companies/ServiceFeeTab/ServiceFeeTab";
import AccountsTab from "@/components/Companies/AccountsTab";
import Back from "@/Icons/Back";
import Button from "@/components/Elements/Button/Button";
import { useParams, useSearchParams } from "next/navigation";
import useApi from "@/hooks/useApi";
import CompanyStatusTemplate from "@/app/dashboard/company/company_components/status_template";
import ConfirmationModal from "@/components/Elements/ConfirmationModal";
import { useRouter } from "next/navigation";
import CustomersTab from "@/components/Companies/CustomersTab";
import TabNavigationBar from "@/components/Elements/TabNavigationBar/TabNavigationBar";
import BrandingTab from "@/components/Companies/BrandingTab";
import Btc from "@/Icons/imageicon/Btc";

const CompanyDetailsPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [companyData, setCompanyData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [additionalInformation, setAdditionalInformation] = useState({});
  const [modalContent, setModalContent] = useState({});

  const { fetchData } = useApi();
  const params = useParams();
  const company_id = params.id;
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const router = useRouter();

  const tabs = [
    {
      name: "Overview",
      content: (
        <CompanyInfoTab company_id={company_id} companyData={companyData} />
      ),
    },
    { name: "Financials", content: <FinancialsTab /> },
    { name: "Compliance", content: <ComplianceTab /> },
    { name: "Team", content: <TeamTab company_id={company_id} /> },
    { name: "Service Fee", content: <ServiceFeeTab company_id={company_id} /> },
    { name: "Customers", content: <CustomersTab company_id={company_id} /> },
    { name: "Accounts", content: <AccountsTab company_id={company_id} /> },
    { name: "Branding", content: <BrandingTab company_id={company_id} /> },
  ];

  const handleOption = async (action, company_id, formData) => {
    let updateData = {};
    let endpoint = `/company/${company_id}/update`;

    switch (action) {
      case "Approve":
        updateData = { status: true, active: true };
        break;
      case "Reject":
        updateData = { status: false, active: false };
        break;
      case "Reinstate":
        updateData = { active: true };
        break;
      case "Delete":
        updateData = { deleted: true };
        endpoint = `/company/${company_id}/delete`;
        break;
      case "Suspend":
        updateData = { active: false };
        break;
      case "Request More Info":
        endpoint = `/company/${company_id}/additional-info`;
        updateData = {
          requestedInformationDetail:
            formData?.requestedInformationDetail || "",
          proofOfAddress: formData?.proofOfAddress || false,
          financialStatement: formData?.financialStatement || false,
          businessLicense: formData?.businessLicense || false,
          other: formData?.other || false,
          otherDescription: formData?.otherDescription || "",
        };
        break;
      default:
        console.log("Unknown action:", action);
        return;
    }

    const { result, error } = await fetchData(endpoint, {
      method: action === "Delete" ? "DELETE" : "PATCH",
      body: updateData,
    });

    if (result) {
      setCompanyData(result);
    } else if (error) {
      console.error("Error updating company:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleConfirm = async (action, formData) => {
    await handleOption(action, company_id, formData);
    setIsModalOpen(false);
  };

  const handleBack = () => router.back();

  const openModal = (action) => {
    let content = {};
    switch (action) {
      case "Suspend":
        content = {
          title: "Confirm Suspension",
          description: `Are you sure you want to suspend this company?`,
          confirmText: "Suspend",
          confirmColor: "bg-alert",
          onConfirm: () => handleConfirm(action),
        };
        break;
      case "Reinstate":
        content = {
          title: "Confirm Reinstate",
          description: `Are you sure you want to Reinstate?`,
          confirmText: "Reinstate",
          confirmColor: "bg-primary",
          onConfirm: () => handleConfirm(action),
        };
        break;
      case "Approve":
        content = {
          title: "Confirm Approval",
          description: `Are you sure you want to approve the registration for this company?`,
          confirmText: "Approve",
          confirmColor: "bg-primary",
          onConfirm: () => handleConfirm(action),
        };
        break;
      case "Reject":
        content = {
          title: "Confirm Rejection",
          description: `Are you sure you want to reject the registration for this company?`,
          confirmText: "Reject",
          confirmColor: "bg-alert",
          onConfirm: () => handleConfirm(action),
        };
        break;
      case "Request More Info":
        content = {
          title: "Request Additional Information",
          showForm: true,
          confirmText: "Send",
          confirmColor: "bg-primary",
          onConfirm: (formData) => handleConfirm(action, formData),
        };
        break;
      default:
        break;
    }
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCompany = async () => {
    if (company_id) {
      const { result, error } = await fetchData(`/company/${company_id}`);
      if (result) {
        setCompanyData(result);
      } else {
        console.log(error);
      }
    }
  };

  const getAdditionalInfo = async () => {
    if (company_id) {
      const { result, error } = await fetchData(
        `/company/${company_id}/additional-info`
      );
      if (result) {
        setAdditionalInformation(result);
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (company_id) {
      handleCompany();
      getAdditionalInfo();
    }
  }, [company_id]);

  useEffect(() => {
    if (tab) {
      setActiveTab(Number(tab));
    }
  }, [tab]);

  return (
    <>
      <Container pageName={"Company Management"}>
        <div className="flex flex-wrap justify-between gap-8 pb-2 md:flex-nowrap">
          <div className="flex flex-row items-center space-x-4">
            <span className="cursor-pointer" onClick={handleBack}>
              <Back />
            </span>
            <Btc wrapperClassName={'flex pt-3 w-[32px] h-[32px] items-center'} className="" />
            <h1 className="text-sm font-medium text-textBlack">{companyData.name}</h1>
            <CompanyStatusTemplate
              status={companyData.status}
              active={companyData.active}
            />
          </div>
          <div className="flex gap-2 items-center">
            <Button
              title="Request more info"
              onClick={() => openModal("Request More Info")}
              className={
                "bg-white w-max h-8 text-xs  border border-primary50  text-primary text-nowrap"
              }
            />
            {companyData.status && companyData.active && (
              <Button
                title="Suspend"
                onClick={() => openModal("Suspend")}
                className={
                  "bg-white w-38 h-8 text-xs   text-primary border-red-200"
                }
              />
            )}
            {companyData.status && !companyData.active && (
              <Button
                title="Activate"
                onClick={() => openModal("Reinstate")}
                className={"bg-primary w-38 h-8 text-xs text-xs  text-white"}
              />
            )}
            {!companyData.status && !companyData.active && (
              <div className="flex flex-row items-center gap-2">
                <Button
                  title="Reject"
                  onClick={() => openModal("Suspend")}
                  className={
                    "bg-white h-8 text-xs border border-red-500  text-alert"
                  }
                />
                <Button
                  title="Approve"
                  onClick={() => openModal("Approve")}
                  className={"bg-primary h-8 text-xs  text-white"}
                />
              </div>
            )}
          </div>
        </div>
        <div className="mx-auto max-w">
          <TabNavigationBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={tabs}
          />

          {/* Tab Content */}
          <div className="mt-2 rounded-lg">
            <div>{tabs[activeTab].content}</div>
          </div>
        </div>
      </Container>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent.title}
        description={modalContent.description}
        confirmText={modalContent.confirmText}
        confirmColor={modalContent.confirmColor}
        onConfirm={modalContent.onConfirm}
        showForm={modalContent.showForm}
        additionalInformation={additionalInformation}
      />
    </>
  );
};

export default CompanyDetailsPage;
