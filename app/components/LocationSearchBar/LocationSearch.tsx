"use client"
import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { ActionMeta, SingleValue } from "react-select";

// Dynamically import react-select with ssr: false
const Select = dynamic(() => import("react-select"), { ssr: false });

interface LocationOption {
  value: string;
  label: string;
  type: string;
  postalCode: string;
}


const CityStateZipAutocomplete = () => {
  const [searchInput, setSearchInput] = useState(""); // To hold search query
  const [searchResults, setSearchResults] = useState([]); // To hold search results
  const [selectedLocation, setSelectedLocation] = useState<SingleValue<LocationOption> | null | undefined | unknown>(undefined);
  const [zipCode, setZipCode] = useState(""); // For zip code input

  useEffect(() => {
    if (searchInput.length > 2) {
      axios
        .get(`http://api.geonames.org/searchJSON`, {
          params: {
            q: searchInput, // Grabs the Query
            maxRows: 20,
            username: "tienmpham", 
            country: "US",
          },
        })
        .then((response) => {
          const data = response.data.geonames.map((item) => ({
            value: `${item.name}, ${item.adminName1}`,
            label: `${item.name}, ${item.adminName1}`, // City, State
            type: item.fcodeName, // Type to distinguish city or state
            postalCode: item.postalCode, // Zip code info if available
          }));
          setSearchResults(data);
        })
        .catch((error) => console.error("Error fetching search results:", error));
    } else {
      setSearchResults([]);
    }
  }, [searchInput]); // Trigger when searchInput changes

  const handleSearchChange = (newInputValue: string) => {
    setSearchInput(newInputValue); // Update searchInput state as user types
  };

  const handleLocationSelect = (
    selectedOption: SingleValue<LocationOption> | null | unknown,
  ) => {
    console.log(selectedOption)
    setSelectedLocation(selectedOption);
  };

  const handleZipChange = (e: ChangeEvent<HTMLInputElement>) => {
    setZipCode(e.target.value); // Handle manual zip code input
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="location">Search City or State</label>
        <Select
          id="location"
          options={searchResults} // Pass in search results
          value={selectedLocation}
          onChange={handleLocationSelect}
          onInputChange={handleSearchChange} // Capture text input by user
          inputValue={searchInput} // Bind the input field's value to searchInput state
          placeholder="Search for city or state"
          className="text-black"
          isClearable
        />
      </div>

      <div>
        <label htmlFor="zipCode">Zip Code</label>
        <input
          type="text"
          id="zipCode"
          value={zipCode}
          onChange={handleZipChange}
          placeholder="Enter Zip Code"
          maxLength={5}
          pattern="\d{5}"
          className="text-black"
        />
      </div>
    </div>
  );
};

export default CityStateZipAutocomplete;
