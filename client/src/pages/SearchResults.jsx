import React from "react";
import { useLocation } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import Searchbar from "../components/Searchbar";

const SearchResults = () => {
  const location = useLocation();
  const searchResults = location.state?.results || [];

  return (
    <div className="p-6">
      {/* Center the Searchbar */}
      <div className="flex justify-center mb-6">
        <Searchbar />
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-center">Results Related to your Search</h2>
      {searchResults.length === 0 ? (
        <p className="text-center">No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((residency) => (
            <PropertyCard key={residency._id} card={residency} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
