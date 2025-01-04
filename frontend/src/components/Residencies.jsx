import React from "react";
import PropertyCard from "./PropertyCard";

const Recidencies = () => {
  // Static dummy data for properties
  const properties = [
    {
      id: "1",
      image: "https://via.placeholder.com/300",
      title: "Modern Family Home",
      description: "Spacious 3-bedroom house with a large backyard.",
      price: "$450,000",
    },
    {
      id: "2",
      image: "https://via.placeholder.com/300",
      title: "Luxury Apartment",
      description: "2-bedroom apartment in the heart of the city.",
      price: "$650,000",
    },
    {
      id: "3",
      image: "https://via.placeholder.com/300",
      title: "Cozy Cottage",
      description: "Charming 1-bedroom cottage with a beautiful garden.",
      price: "$250,000",
    },
    {
      id: "4",
      image: "https://via.placeholder.com/300",
      title: "Penthouse Suite",
      description: "Luxury penthouse with amazing city views.",
      price: "$1,200,000",
    },
    {
      id: "5",
      image: "https://via.placeholder.com/300",
      title: "Beachfront Villa",
      description: "Beautiful 4-bedroom villa right on the beach.",
      price: "$2,500,000",
    },
    {
      id: "6",
      image: "https://via.placeholder.com/300",
      title: "Suburban House",
      description: "3-bedroom house in a quiet suburban neighborhood.",
      price: "$350,000",
    },
    {
      id: "7",
      image: "https://via.placeholder.com/300",
      title: "City Loft",
      description: "Modern loft in the heart of downtown.",
      price: "$700,000",
    },
    {
      id: "8",
      image: "https://via.placeholder.com/300",
      title: "Farmhouse",
      description: "4-bedroom farmhouse on a large plot of land.",
      price: "$500,000",
    },
  ];

  // Randomize and slice the data to show only 8 properties
  const randomizedProperties = properties.sort(() => Math.random() - 0.5).slice(0, 8);

  return (
    <section className="flex flex-wrap justify-center mt-8">
      {/* Heading Section */}
      <div className="text-center">
        <h1 className="text-orange-400 font-bold text-3xl">Best Choices</h1>
        <h1 className="text-blue-900 font-bold text-5xl">Popular Residencies</h1>
      </div>
      <div className="flex flex-wrap justify-center mx-[5%]">
        {randomizedProperties.map((card, i) => {
          return <PropertyCard card={card} key={i} />;
        })}
      </div>
    </section>
  );
};

export default Recidencies;
