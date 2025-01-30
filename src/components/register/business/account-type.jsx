import Image from "next/image";
import { TextButton } from "@/components/Elements/Button/Button";
import { useState } from "react";
import Persondollar from "@/Icons/Persondollar";
import Dollarbudget from "@/Icons/Dollarbudget";

const BusinessAccountType = ({ onNext }) => {
  const [selectedType, setSelectedType] = useState("");
  return (
    <div className="flex flex-col gap-4">
      <p className="font-normal text-xs text-textSecondary">
        Select the type of business account you need.
      </p>

      <SingleSelectAccountType
        title="USD Account"
        setSelectedType={setSelectedType}
        icon={<Persondollar className="h-4 w-4" />}
        isSelected={selectedType}
      />

      <SingleSelectAccountType
        title="Multi Currency Account"
        setSelectedType={setSelectedType}
        icon={<Dollarbudget className="h-4 w-4" />}
        isSelected={selectedType}
      />

      <TextButton
        title="Continue"
        textColor="text-white"
        backgroundColor="bg-primary"
        className="py-1 px-4 w-full"
        onClick={onNext}
      />
    </div>
  );
};

export default BusinessAccountType;

const SingleSelectAccountType = ({
  title,
  icon,
  isSelected,
  setSelectedType,
}) => {
  return (
    <div
      onClick={() => setSelectedType(title)}
      className={`flex items-center gap-3 w-full h-8 border-[1px] ${
        isSelected === title ? "border-textBlack" : "border-primary50"
      } rounded-[10px] py-1 px-2 cursor-pointer`}
    >
      {/* <Image
        src={icon}
        alt="icon"
        width={16}
        height={16}
      /> */}
      {icon}
      <p className="font-medium text-xs text-textBlack">{title}</p>
    </div>
  );
};
