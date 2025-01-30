import WatchIcon from "@/Icons/WatchIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AuthButton } from "@/components/Elements/Button/Button";
import { useState } from "react";
import Activecircule from "@/Icons/Activecircule";

export function ChooseService({ onNext }) {
  const router = useRouter();
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [selectedOption3, setSelectedOption3] = useState("");

  return (
    <div className="flex flex-col justify-start h-full mx-auto gap-4 w-full sm:w-[500px]">
      <div className="mb-6">
        <h2 className="mb-2 text-base font-semibold text-textBlack">Sign up</h2>
        <p className="text-xs font-normal text-textSecondary">
          {`Banking for entrepreneurs`}
        </p>
      </div>

      {/* Business Account Card */}
      <div className="p-4 border border-textBlack rounded-2xl bg-white mb-6 w-full">
        <div className="flex gap-4">
          <h2 className="my-auto text-sm font-semibold text-gray-800">
            Business Account
          </h2>{" "}
          <div>
            <div className="px-3 py-1.5 flex gap-1  text-xs text-white bg-black rounded-[10px]">
              <Activecircule className="w-[6px] h-[6px]" />
              <p>Professional Tools</p>
            </div>
          </div>
        </div>
        <p className="mt-2.5 text-xs text-textSecondary">
          Account opening for Businesses, FinTechs, and Institutions
        </p>
        <div className="flex gap-4 mt-6">
          <div className="flex items-center text-xs text-textSecondary">
            <span role="img" aria-label="support" className="mr-2">
              <WatchIcon className="w-4 h-4" />
            </span>
            <p className="my-auto">24/7 support</p>
          </div>
          <div className="flex items-center text-xs text-textSecondary">
            <span role="img" aria-label="banking" className="mr-2">
              <Image
                src={"/assets/icons/dolorIcon.svg"}
                alt="support"
                width={16}
                height={16}
              />
            </span>
            <p className="my-auto"> Banking</p>
          </div>
        </div>
      </div>

      {/* Dropdown Questions */}
      <div className="space-y-6">
        <div>
          <label className="block mb-2 text-xs text-textBlack">
            Will you be conducting third party payments? (Money movement on
            behalf of others.) *
          </label>
          <select
            value={selectedOption1}
            onChange={(e) => setSelectedOption1(e.target.value)}
            className="w-full p-2 border text-xs border-gray-300 rounded-[10px] text-textBlack focus:outline-none focus:border-gray-500"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-xs text-textBlack">
            What product or service are you looking to open the account for? *
          </label>
          <select
            value={selectedOption2}
            onChange={(e) => setSelectedOption2(e.target.value)}
            className="w-full p-2 text-xs border border-gray-300 rounded-[10px] text-textBlack focus:outline-none focus:border-gray-500"
          >
            <option value="">Select</option>
            <option value="Product 1">Product 1</option>
            <option value="Product 2">Product 2</option>
            <option value="Product 3">Product 3</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-xs text-textBlack">
            What is the country of the residential address of the individual or
            the country of registration if this is for a business? *
          </label>
          <select
            value={selectedOption3}
            onChange={(e) => setSelectedOption3(e.target.value)}
            className="w-full p-2 border text-xs border-gray-300 rounded-[10px] text-textBlack focus:outline-none focus:border-gray-500"
          >
            <option value="">Select</option>
            <option value="Country 1">Country 1</option>
            <option value="Country 2">Country 2</option>
            <option value="Country 3">Country 3</option>
          </select>
        </div>
      </div>

      <AuthButton
        title="Continue"
        onClick={onNext}
        className="rounded-lg bg-primary"
      />
    </div>
  );
}
