import React from "react"
import OnboardingAccordion from "@/components/CustomerProfile/KYCSubmissions/onboarding/accordion"

const data = [
  { label: "First Name", value: "XXXXXX" },
  { label: "Middle Name", value: "XXXXXX" },
  { label: "Last Name", value: "XXXXXX" },
  { label: "Legal Name", value: "XXXXXX" },
  { label: "Date of Birth", value: "XXXXXX" },
  { label: "Gender", value: "XXXXXX" },
  { label: "Country", value: "XXXXXX" },
  { label: "Country of Birth", value: "XXXXXX" },
  { label: "State of Birth", value: "XXXXXX" },
  { label: "Nationality", value: "XXXXXX" },
  { label: "Phone", value: "XXXXXX" },
  { label: "Place of Birth", value: "XXXXXX" }
]

const KYCOnboarding = () => {
  return (
    <div className='flex flex-col gap-4 my-2'>
      <OnboardingAccordion
        data={data}
        progress='90'
        title='1. General Questions'
        subTitle='Personal Information (Provided)'
      />
      <OnboardingAccordion
        data={data}
        progress='90'
        title='2. Source of Income'
        subTitle='Personal Information (Provided)'
      />
      <OnboardingAccordion
        data={data}
        progress='90'
        title='3. PEP Affiliation'
        subTitle='Personal Information (Provided)'
      />
      <OnboardingAccordion
        data={data}
        progress='90'
        title='4. Confirmation'
        subTitle='Personal Information (Provided)'
      />
    </div>
  );
};

export default KYCOnboarding
