import React, { useState, useEffect } from "react";
import Searchbar from "../components/Searchbar";
import PropertyCard from "../components/PropertyCard";
import shuffle from "lodash/shuffle";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/residencies/allresidencies");

        // Log the response to debug
        console.log(response);

        if (response.ok && response.headers.get("Content-Type").includes("application/json")) {
          const data = await response.json();
          console.log("Fetched properties:", data); // Log the fetched data
          setProperties(data);
        } else {
          throw new Error("Failed to fetch properties, non-JSON response.");
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  // Shuffle properties data
  const shuffledData = shuffle(properties);

  return (
    <div className="p-4 flex items-center flex-col gap-4">
      <Searchbar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {properties.map((property) => (
        <PropertyCard key={property._id} card={property} />
      ))}
    </div>
    </div>
  );
};

export default Properties;
