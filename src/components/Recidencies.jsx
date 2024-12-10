import React from "react";
import PropertyCard from "./PropertyCard";
import useProperties from "../hooks/useProperties";

const Recidencies = () => {
  const { data, isError, isLoading } = useProperties();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) return <div>Error loading properties.</div>;

  // Randomize and slice the data to show only 8 properties
  const randomizedProperties = data.sort(() => Math.random() - 0.5).slice(0, 8);

  return (
    <section className="flex flex-wrap justify-center mt-8">
      {/* Heading Section */}
      <div className="text-center ">
        <h1 className="text-orange-400 font-bold text-3xl">Best Choices</h1>
        <h1 className="text-blue-900 font-bold text-5xl">Popular Residencies</h1>
      </div>
      <div className="flex  flex-wrap justify-center mx-[5%]">
        {randomizedProperties.map((card, i) => {
          return <PropertyCard card={card} key={i} />;
        })}
      </div>
    </section>
  );
};

export default Recidencies;
