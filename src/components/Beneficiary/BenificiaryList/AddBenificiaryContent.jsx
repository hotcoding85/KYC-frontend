import React, { useState } from "react";
import TabNavigationBar from "@/components/Elements/TabNavigationBar/TabNavigationBar";
import TabNavigationBarMobile from "@/components/Elements/TabNavigationBar/TabNavigationBarMobile";
import LocalBeneficiary from "@/components/AddBeneficiary/LocalBeneficiary";
import InternationalBeneficiary from "@/components/AddBeneficiary/InternationalBeneficiary";
import SubTabNavigation from "@/components/Elements/TabNavigationBar/SubTabsNavigation";
import Country from "@/components/Elements/Country/Country";
import CurrencyDropdown from "@/components/Elements/DropDown/CurrencyDropdown";
import * as z from "zod";

const beneficiarySchema = z.object({
  country: z.object({
    value: z.string().min(1, "Country value is required"),
    title: z.string().min(1, "Country title is required"),
    areaCode: z.string().min(1, "Country area code is required"),
    isoCode: z.string().min(1, "Country ISO code is required"),
  }),
  currency: z.object({
    ticker: z.string().min(1, "Currency ticker is required"),
    name: z.string().min(1, "Currency name is required"),
  }),
});

const AddBenificiaryContent = ({ onChange, onCurrencyChange }) => {
  
  const [activeTab, setActiveTab] = useState(0);
  const [country, setCountry] = useState({
    value: "AE",
    title: "United Arab Emirates",
    areaCode: "+971",
    isoCode: "ARE",
  });
  const [asset, setAsset] = useState(null);
  const [selectedType, setSelectedType] = useState("Account Number");
  const subTabs = ["Account Number", "IBAN"];
  const tabs = [{ name: "Individual" }, { name: "Business" }];
  const [errors, setErrors] = useState([]);

  // onChange handler to receive updates from child components
  const handleBeneficiaryChange = (data) => {
    const finalData = {
      ...data,
      country,
      currency: asset ? asset : null,
      type: tabs[activeTab].name,
      account: selectedType,
    };
    console.log(asset)
    try {
      beneficiarySchema.parse(finalData);
      onChange(finalData);
    } catch (err) {
      setErrors(err.errors);
    }

    
  };


  return (
    <div className="items-center justify-center w-full bg-white max-h-[70vh] overflow-y-auto">
      <div className="flex-col p-4">
        <div className="md:hidden">
          <TabNavigationBarMobile
            tabs={tabs}
            width="w-full"
            activeTab={activeTab}
            className="bg-white"
            setActiveTab={setActiveTab}
          />
        </div>
        <div className="hidden md:block">
          <TabNavigationBar
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
        <div className="mt-4 rounded-lg">
          <div>
            <div className="space-y-4">
              <div className="mb-2 flex flex-col gap-1">
                <h2 className="text-xs">Country of recipient’s account</h2>
                <Country
                  className={`block w-full h-8 py-1 px-2 mt-1 border rounded-[10px] border-primary50 text-xs placeholder:text-xs placeholder:text-primary300 text-primary300 ${
                    errors.country ? "border-red-500" : ""
                  }`}
                  width={"w-full"}
                  onChange={(value) => setCountry(value)}
                  selectedValue={country}
                />
                {errors.country && (
                  <p className="text-alert text-xs mt-1">{errors.country}</p>
                )}
              </div>
              <div className="mb-2 flex flex-col gap-1">
                <h2 className="text-xs">Currency</h2>
                <CurrencyDropdown
                  onSelect={(value) => {setAsset(value); onCurrencyChange(value)}}
                  className={`block w-full h-8 py-1 px-2 mt-1 border rounded-[10px] border-primary50 text-xs placeholder:text-xs placeholder:text-primary300 text-primary300 ${
                    errors.currency ? "border-red-500" : ""
                  }`}
                  selectedItem={asset}
                />
                {errors.currency && (
                  <p className="text-alert text-xs mt-1">{errors.currency}</p>
                )}
              </div>
              <div className="flex flex-row flex-wrap items-center justify-between gap-2 md:gap-0">
                <h2 className="text-sm font-semibold">Account details</h2>
                <div className="w-max h-max">
                  <SubTabNavigation
                    tabs={subTabs}
                    width="min-w-[80px]"
                    activeTab={selectedType}
                    setActiveTab={setSelectedType}
                  />
                </div>
              </div>
              {selectedType === subTabs[0] && (
                <LocalBeneficiary onChange={handleBeneficiaryChange} />
              )}
              {selectedType === subTabs[1] && (
                <InternationalBeneficiary onChange={handleBeneficiaryChange} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBenificiaryContent;
