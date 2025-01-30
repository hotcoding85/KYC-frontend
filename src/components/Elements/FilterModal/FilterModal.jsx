import React, { useState } from "react";
import Image from "next/image";
import Button, { TextButton } from "@/components/Elements/Button/Button";
import Modal from "@/components/Elements/Modal/Modal";
import Filters from "@/Icons/Filters";
import CloseFilter from "@/Icons/CloseFilter";
import Crosscircle from "@/Icons/Crosscircle";

export default function FilterModal({
  title,
  onChange,
  isValueVisible = true,
  className,
  iconClasses,
  textClasses,
  isAnalytics,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({
    status: "",
    activity: "",
    totalAssets: "",
    totalUsers: "",
  });

  // Function to count active filters
  const getActiveFiltersCount = () => {
    return Object.values(filterValues).filter((value) => value !== "").length;
  };

  const activeFiltersCount = getActiveFiltersCount();

  const openFiltersModal = () => {
    setIsModalOpen(true);
  };

  const closeFilterModal = () => {
    setIsModalOpen(false);
  };

  const setFilterValue = (field, value) => {
    setFilterValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFilter = () => {
    if (onChange) {
      onChange(filterValues);
    }
    setIsModalOpen(false);
  };

  const clearFilters = (e) => {
    if (e) {
      e.stopPropagation();
    }
    setFilterValues({
      status: "",
      activity: "",
      totalAssets: "",
      totalUsers: "",
    });
  };

  return (
    <>
      <button
        className={`relative h-8 w-24 py-1.5 flex items-center justify-center gap-1 rounded-[10px] px-1.5 border border-primary50 bg-white text-center text-xs font-normal text-textBlack ${className}`}
        onClick={openFiltersModal}
      >
        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="absolute -left-2 -top-1 w-4 h-4 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
          >
            <Crosscircle className="w-4 h-4" />
          </button>
        )}
        <span className={`w-5 h-5 ${iconClasses}`}>
          <Filters />
        </span>
        <p
          className={`text-xs text-textBlack flex flex-row items-center gap-[4px] ${textClasses}`}
        >
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <p className="bg-primary text-white text-[8px] font-bold rounded-full h-4 w-4 text-center flex items-center justify-center">
              {activeFiltersCount}
            </p>
          )}
        </p>
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={closeFilterModal}
        title={title || "Filters"}
        customWidth="max-w-sm md:max-w-3xl"
      >
        <div className="w-full p-4 mx-auto overflow-y-auto h-96 md:h-max">
          {/* Status */}
          <div className="pb-4 mb-4 border-b border-b-primary50">
            <h3 className="mb-2 text-xs font-medium">Status</h3>
            <div className="flex flex-wrap gap-2">
              {["Pending", "Active", "Suspended"].map((status, index) => (
                <button
                  key={index}
                  className={`py-2 px-4 h-8 text-xs rounded-[10px] border !w-[114px] ${
                    filterValues.status === status
                      ? "border-primary"
                      : "border-gray-300"
                  }`}
                  onClick={() => setFilterValue("status", status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div className="pb-4 mb-4 border-b border-b-primary50">
            <h3 className="mb-2 text-xs font-medium">Activity</h3>
            <div className="flex flex-wrap gap-2">
              {["Daily", "Weekly", "Monthly", "Rarely"].map(
                (activity, index) => (
                  <button
                    key={index}
                    className={`py-2 px-4 h-8 text-xs rounded-[10px] border !w-[114px] ${
                      filterValues.activity === activity
                        ? "border-primary"
                        : "border-gray-300"
                    }`}
                    onClick={() => setFilterValue("activity", activity)}
                  >
                    {activity}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Total Assets */}
          <div className="pb-4 mb-4 border-b border-b-primary50">
            <h3 className="mb-2 text-xs font-medium">Total Assets</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Under $10K",
                "$10-50K",
                "$50-100K",
                "$100-500K",
                "Over Stock",
              ].map((asset, index) => (
                <button
                  key={index}
                  className={`py-2 px-4 h-8 text-xs rounded-[10px] border !w-[114px] ${
                    filterValues.totalAssets === asset
                      ? "border-primary"
                      : "border-gray-300"
                  }`}
                  onClick={() => setFilterValue("totalAssets", asset)}
                >
                  {asset}
                </button>
              ))}
            </div>
          </div>

          {/* Total Users */}
          <div>
            <h3 className="mb-2 text-xs font-medium">Total Users</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Under $10K",
                "$10-50K",
                "$50-100K",
                "$100-500K",
                "Over $500K",
              ].map((user, index) => (
                <button
                  key={index}
                  className={`py-2 px-4 h-8 text-xs rounded-[10px] border !w-[114px] ${
                    filterValues.totalUsers === user
                      ? "border-primary"
                      : "border-gray-300"
                  }`}
                  onClick={() => setFilterValue("totalUsers", user)}
                >
                  {user}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with Apply and Clear Buttons */}
        <div className="flex justify-between p-4 border-t">
          <button
            className="h-8 text-xs font-semibold text-gray-700"
            onClick={clearFilters}
          >
            Clear all
          </button>
          <div className="flex gap-4">
            <Button
              title="Cancel"
              className="h-8 text-sm px-4 !w-[114px] bg-white border-[1px] text-primary border-gray-300 !rounded-[10px]"
              onClick={closeFilterModal}
            />
            <Button
              title="Apply"
              className="h-8 px-4 text-sm !w-[114px] text-center border-none text-white bg-primary !rounded-[10px]"
              onClick={handleFilter}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
