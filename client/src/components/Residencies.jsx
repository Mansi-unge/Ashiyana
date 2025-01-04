import React, { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import shuffle from "lodash/shuffle";

const Recidencies = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/residencies/allresidencies");

        if (response.ok && response.headers.get("Content-Type").includes("application/json")) {
          const data = await response.json();
          console.log("Fetched properties:", data); // Debug log
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

  // Shuffle and slice data to display only 8 properties
  const randomizedProperties = shuffle(properties).slice(0, 8);

  return (
    <section className="flex flex-col flex-wrap justify-center mt-8">
      {/* Heading Section */}
      <div className="text-center mb-6">
        <h1 className="text-orange-400 font-bold text-3xl">Best Choices</h1>
        <h1 className="text-blue-900 font-bold text-5xl">Popular Residencies</h1>
      </div>
      {/* Property Cards */}
      <div className="flex flex-wrap justify-center mx-[5%] gap-4">
      {randomizedProperties.map((card) => (
  <PropertyCard card={card} key={card._id} />
))}

      </div>
    </section>
  );
};

export default Recidencies;
