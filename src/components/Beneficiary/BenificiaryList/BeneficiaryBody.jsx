"use client"
import { useEffect, useState, useRef, useCallback } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import Modal from "@/components/Elements/Modal/Modal";
import { TextButton } from "../../Elements/Button/Button";
import AllBenificieariesList from "./AllBenificieariesList";
import AddBenificiaryContent from "./AddBenificiaryContent";
import SearchBar from "@/components/Elements/search/SearchBar";
import RecentBenificiariesList from "./RecentBenificiariesList";
import useApi from "@/hooks/useApi";
import { Toast } from "primereact/toast";
import { currency } from "@/data/Currency/Currency";

const BeneficiaryBody = () => {
  const { fetchData } = useApi();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddBenificiaryModalOpen, setisAddBenificiaryModalOpen] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [filteredBeneficiaries, setFilteredBeneficiaries] = useState([]);
  const [beneficiaryDetails, setBeneficiaryDetails] = useState({});
  const toast = useRef(null);

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleBeneficiaryChange = (data) => {
    setBeneficiaryDetails(data);
  };

  const onCurrencyChange = (value) => {
    setBeneficiaryDetails((prev) => ({
      ...prev,
      currency: value
    }))
  }

  const onSubmit = async () => {
    await handleAddBeneficiary();
  };

  const handleAddBeneficiary = async () => {
    const formData = {
      ...beneficiaryDetails,
      full_name: beneficiaryDetails.full_name,
      email: beneficiaryDetails.email,
      country: beneficiaryDetails.country?.value,
      type: beneficiaryDetails.type,
      currency: beneficiaryDetails.currency,
    };
    const { result, error } = await fetchData(`/beneficiary`, {
      method: "POST",
      body: formData,
    });
    if (result) {
      setisAddBenificiaryModalOpen(false);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "New beneficiary has been successfully added.",
        life: 3000,
      });
      getAllBeneficiaries();
    } else {
      toast.current.show({
        severity: "error",
        summary: "Warning",
        detail: Array.isArray(error.message) ? error.message[0] : error.message,
        life: 3000,
      });
    }
  };

  const getAllBeneficiaries = async () => {
    const { result, error } = await fetchData(`/beneficiary/all`, {
      method: "POST",
    });

    if (result) {
      setBeneficiaries(result);
      setFilteredBeneficiaries(result);
    } else {
      console.error(error);
    }
  };

  const filterBeneficiaries = useCallback(
    debounce((search) => {
      if (!search.trim()) {
        setFilteredBeneficiaries(beneficiaries);
        return;
      }
      const lowerSearch = search.toLowerCase();
      setFilteredBeneficiaries(
        beneficiaries.filter((b) =>
          [b.full_name, b.email, b.phone].some((field) =>
            field?.toLowerCase().includes(lowerSearch)
          )
        )
      );
    }, 300),
    [beneficiaries]
  );

  useEffect(() => {
    filterBeneficiaries(searchTerm);
  }, [searchTerm, filterBeneficiaries]);

  useEffect(() => {
    getAllBeneficiaries();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2 w-full h-max pt-4">
        {/* Search bar card */}
        <div className="p-4 h-auto w-full flex flex-row items-center gap-2 bg-white shadow-sm rounded-2xl overflow-hidden border-[1px] border-primary50">
          <SearchBar
            placeholder={"Name, email, phone"}
            className="w-full"
            inputClassName="w-full"
            onValueChange={(value) => setSearchTerm(value)}
          />
          <TextButton
            title="Add Beneficiary"
            width="max-w-[123px] w-full"
            className="bg-black text-white text-nowrap"
            onClick={() => setisAddBenificiaryModalOpen(true)}
          />
        </div>
        {/* Recent beneficiaries section */}
        <div className="h-max w-full flex flex-col items-center gap-2 bg-white shadow-sm rounded-2xl overflow-hidden border border-primary50">
          {/* Top heading div */}
          <div
            className={`flex items-center justify-between border-b bg-lightGrey rounded-t-2xl p-4 w-full h-max`}
          >
            <h2 className="text-xs font-bold leading-[20px] tracking-[-0.005em] text-textBlack text-left truncate">
              Recent
            </h2>
          </div>
          {/* Recent beneficiaries */}
          <RecentBenificiariesList
            beneficiaries={
              filteredBeneficiaries
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 3)
            }
          />
        </div>

        {/* All beneficiaries section */}
        <div className="h-max w-full flex flex-col items-center gap-2 bg-white shadow-sm rounded-2xl overflow-hidden border border-primary50">
          {/* Top heading div */}
          <div
            className={`flex items-center justify-between border-b bg-lightGrey rounded-t-2xl p-4 w-full h-max`}
          >
            <h2 className="pr-2 text-xs font-bold leading-[20px] tracking-[-0.005em] text-textBlack text-left truncate">
              All
            </h2>
          </div>
          {/* All beneficiaries */}
          <AllBenificieariesList beneficiaries={filteredBeneficiaries} />
        </div>
      </div>

      <Modal
        title="Add Beneficiary"
        size={isMobile ? "md" : "2xl"}
        customWidth="max-w-[96%] sm:max-w-2xl"
        isOpen={isAddBenificiaryModalOpen}
        onClose={() => setisAddBenificiaryModalOpen(false)}
      >
        <div className="flex flex-col items-center justify-between h-max">
          <AddBenificiaryContent onChange={handleBeneficiaryChange} onCurrencyChange={onCurrencyChange} />

          <div className="flex flex-row items-center justify-end w-full p-2 gap-2 border-t border-primary50">
            <TextButton
              width={"min-w-[114px] w-full"}
              title="Cancel"
              onClick={() => setisAddBenificiaryModalOpen(false)}
              className="bg-white !text-textBlack border border-primary50"
            />
            <TextButton
              width={"min-w-[114px] w-full"}
              title="Add Beneficiary"
              onClick={onSubmit}
              className="bg-black text-white"
            />
          </div>
        </div>
        <Toast ref={toast} baseZIndex={9999} />
      </Modal>
    </>
  );
};

export default BeneficiaryBody;
