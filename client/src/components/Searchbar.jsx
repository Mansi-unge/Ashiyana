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
      const response = await axios.get(`https://ashiyana.onrender.com/api/residencies/search`, {
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 200);
  };

  return (
    <div
      className={`relative w-full sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] shadow-lg flex items-center px-3 py-2 rounded-full transition-all duration-300 ${
        isSticky ? "bg-white border border-gray-300" : "bg-gray-100"
      }`}
    >
      <input
        type="search"
        className="border-none outline-none flex-grow text-sm md:text-base p-3 rounded-l-full bg-transparent placeholder-gray-500"
        placeholder="Search for properties..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown} // Detect Enter key press
        onBlur={handleBlur}
      />
      <button
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold px-5 py-2 rounded-full hover:from-blue-700 hover:to-blue-900 transition-transform transform hover:scale-105"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default Searchbar;
