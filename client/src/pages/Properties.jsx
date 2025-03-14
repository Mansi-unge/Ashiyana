import React, { useState, useEffect } from "react";
import Searchbar from "../components/Searchbar";
import PropertyCard from "../components/PropertyCard";
import PropertiesSkeleton from "../skeletons/PropertiesSkeleton"; // Import the skeleton component
import shuffle from "lodash/shuffle";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "https://ashiyana.onrender.com/api/residencies/allresidencies"
        );
        if (response.ok && response.headers.get("Content-Type").includes("application/json")) {
          const data = await response.json();
          setProperties(data);
        } else {
          throw new Error("Failed to fetch properties, non-JSON response.");
        }
      } catch (error) {
        setError("Failed to load properties. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperties();
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  const shuffledData = shuffle(properties);

  return (
    <div className="p-4 flex items-center flex-col gap-4 w-full">
      <Searchbar />
      {/* Grid layout for property cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 w-full">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <PropertiesSkeleton key={index} />
            ))
          : shuffledData.map((property) => (
              <PropertyCard key={property._id} card={property} />
            ))}
      </div>
    </div>
  );
};

export default Properties;
