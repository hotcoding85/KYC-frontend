import TabNavigationBarMobile from "@/components/Elements/TabNavigationBar/TabNavigationBarMobile";
import React, { useState } from "react"
import Back from "@/Icons/Back"
import BusinessTab from "./InternationalBeneficiary"
import IndividualTab from "./LocalBeneficiary"
import TabNavigationBar from "../Elements/TabNavigationBar/TabNavigationBar"

const AddBeneficiary = ({ onNext, onBack, onAdd }) => {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { name: 'Individual', content: <IndividualTab onNext={onNext} onBack={onBack} onAdd={onAdd} /> },
    { name: 'Business', content: <BusinessTab onNext={onNext} onBack={onBack} onAdd={onAdd} /> }
  ]
  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <div className="items-center justify-center w-full bg-white border md:w-[500px] rounded-2xl">
        <div className="flex-col p-4 ">
          <div className="flex items-center mb-4 space-x-2">
            <button onClick={onBack}>
              <Back />
            </button>
            <p className="text-sm font-semibold">Add Beneficiary</p>
          </div>
          <div className="sm:hidden">
            <TabNavigationBarMobile
              tabs={tabs}
              width="w-full"
              activeTab={activeTab}
              className="bg-white"
              setActiveTab={setActiveTab}
            />
          </div>
          <div className="hidden sm:block">
            <TabNavigationBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <div className="mt-4 rounded-lg">
            <div>{tabs[activeTab].content}</div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default AddBeneficiary
