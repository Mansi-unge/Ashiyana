import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Searchbar = ({ isSticky }) => {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) {
      console.error("Search query is empty");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8000/api/residencies/search`, {
        params: { query },
      });

      if (response.status === 200) {
        navigate("/search-results", { state: { results: response.data } });
      } else {
        console.error("Unexpected response status:", response.status);
      }

    } catch (error) {
      if (error.response) {
        console.error("Error fetching search results:", error.response.data);
      } else if (error.request) {
        console.error("No response from server:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 200);
  };

  return (
    <div className={`relative w-full sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] shadow-lg flex items-center px-3 py-2 rounded-full transition-all duration-300 ${isSticky ? "bg-white border border-gray-300" : "bg-gray-100"}`}>
      <input
        type="search"
        className="border-none outline-none flex-grow text-sm md:text-base p-3 rounded-l-full bg-transparent placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
        placeholder="Search for properties..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={handleSearch}
        onBlur={handleBlur}
      />
      <button
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold px-5 py-2 rounded-full hover:from-blue-700 hover:to-blue-900 transition-transform transform hover:scale-105"
        onClick={handleSearch}
      >
        Search
      </button>

      {showDropdown && searchResults.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto z-10">
          {searchResults.map((residency) => (
            <div
              key={residency._id}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors duration-200"
            >
              <h4 className="font-semibold text-gray-800">{residency.title}</h4>
              <p className="text-sm text-gray-500">{residency.city}, {residency.country}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;