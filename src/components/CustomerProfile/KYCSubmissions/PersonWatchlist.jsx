import React from "react";
import { TextButton } from "@/components/Elements/Button/Button";
import WatchlistTableComponent from "@/components/Elements/DataTable/customers-profile/watchlist";

const personData = [
  { label: "Search Time", value: "XXXXXX" },
  { label: "Search Ref", value: "XXXXXX" },
  { label: "Fuzziness Interval", value: "XXXXXX" },
  { label: "Created At", value: "XXXXXX" },
  { label: "Warning Types", value: "XXXXXX" },
  { label: "Year of Birth", value: "XXXXXX" }
]

const data = [
  {
    "Name": "John Doe",
    "Matches": "XXXXXXX",
    "Relevance": "XXXXXXX",
    "Country": "UAE",
    "Is While-listed": "XXXXXXX",
    "Match Status": "XXXXXXX",
    "Risk Level": "XXXXXXX",
    "Additional Info": "XXXXXXX"
  },
  {
    "Name": "John Doe",
    "Matches": "XXXXXXX",
    "Relevance": "XXXXXXX",
    "Country": "UAE",
    "Is While-listed": "XXXXXXX",
    "Match Status": "XXXXXXX",
    "Risk Level": "XXXXXXX",
    "Additional Info": "XXXXXXX"
  }
]
const PersonWatchlist = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="border border-primary50 bg-white p-4 rounded-2xl">
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
          <div className="flex flex-col gap-3">
            <h3 className="font-inter font-semibold text-sm text-textBlack leading-5 tracking-tightest text-left">
              Person Watchlist
            </h3>
            <p className="flex items-center gap-3 font-inter font-normal text-xs leading-4 text-textBlack">
              Ongoing Monitoring
              <span className="bg-successLight py-1 px-3 font-medium text-xs text-success rounded-full">
                Approved
              </span>
            </p>
          </div>
          <TextButton
            width="w-auto"
            className="py-1 px-4"
            title="Download Document"
            textColor="text-textBlack"
            backgroundColor="bg-white"
            borderColor="border border-primary50"
          />
        </div>
        <hr className="my-3 bg-primary50" />
        <div className="grid grid-cols-3 gap-3">
          {personData.map((each, idx) => (
            <p className="flex flex-col gap-2" key={idx}>
              <span className="font-inter font-medium text-xs leading-4 text-textSecondary">
                {each.label}
              </span>
              <span className="font-inter font-semibold text-xs leading-4 text-textBlack">
                {each.value}
              </span>
            </p>
          ))}
        </div>
      </div>
      <WatchlistTableComponent data={data} />
    </div>
  )
};

export default PersonWatchlist;
