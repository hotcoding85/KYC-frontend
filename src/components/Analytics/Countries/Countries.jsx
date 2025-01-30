import SearchBar from "@/components/Elements/search/SearchBar";
import React, { useState } from "react";

const countriesData = [
  { rank: 1, country: "New Zealand", shortName: "NZ", value: 10, flag: "🇳🇿" },
  { rank: 2, country: "Germany", shortName: "DE", value: 12, flag: "🇩🇪" },
  { rank: 3, country: "France", shortName: "FR", value: 16, flag: "🇫🇷" },
  { rank: 4, country: "New Zealand", shortName: "NZ", value: 10, flag: "🇳🇿" },
  { rank: 5, country: "Germany", shortName: "DE", value: 12, flag: "🇩🇪" },
  { rank: 6, country: "France", shortName: "FR", value: 16, flag: "🇫🇷" },
  { rank: 7, country: "New Zealand", shortName: "NZ", value: 10, flag: "🇳🇿" },
  { rank: 8, country: "Germany", shortName: "DE", value: 12, flag: "🇩🇪" },
  { rank: 9, country: "France", shortName: "FR", value: 16, flag: "🇫🇷" },
  { rank: 10, country: "New Zealand", shortName: "NZ", value: 10, flag: "🇳🇿" },
  { rank: 11, country: "Germany", shortName: "DE", value: 12, flag: "🇩🇪" },
  { rank: 12, country: "France", shortName: "FR", value: 16, flag: "🇫🇷" },
  // Add more countries as needed
];

const Countries = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCountries = countriesData.filter((country) =>
    country.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full p-4 bg-white shadow-sm rounded-2xl">
      <h3 className="mb-4 text-sm font-semibold text-textBlack">Countries</h3>
      <SearchBar />
      <div className=" mt-2 px-2 space-y-4">
        {filteredCountries.map((country, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center space-x-4">
              <span className="text-xs">{country.rank}</span>
              <img
                alt={`${country.shortName}`}
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country.shortName}.svg`}
                className={"inline mr-2 h-8 w-8 rounded-full object-cover"}
              />
              <span className="text-xs font-medium">{country.country}</span>
            </div>
            <span className="text-xs font-semibold">{country.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countries;
