import React from "react";
import PropertyCard from "./Propertycard";

const Recidencies = ({card}) => {
  return (
    <section className=" ms-[10vw] mt-[10vh]">
      {/* Heading Section */}
      <div className="text-center">
        <h1 className="text-orange-400 font-bold text-3xl">Best Choices</h1>
        <h1 className="text-blue-900 font-bold text-5xl">
          Popular Residencies
        </h1>
      </div>

      <PropertyCard card={card} />
    </section>
  );
};

export default Recidencies;

