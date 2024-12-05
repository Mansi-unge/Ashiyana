import React from "react";
import data from "../utils/Slider";
import { AiFillHeart } from "react-icons/ai";

const PropertyCard = ({ card }) => {
  return (
    <div className="p-8 flex overflow-hidden flex-wrap gap-6">
      {data.map((card, i) => (
        <div key={i}>
          <div
            className="relative rounded-lg gap-2 m-auto transition-all ease-in-out max-w-max flex flex-col p-4 hover:scale-105 hover:cursor-pointer hover:bg-gradient-to-b from-[rgba(255,255,255,0)] to-[rgba(136,160,255,0.46)] hover:drop-shadow-xl"
          >
            {/* Image and Heart Icon Container */}
            <div className="relative w-full">
              <img
                src={card.image}
                alt={`Residency ${i + 1}`}
                className="w-[100%] max-w-60 h-44 object-cover rounded-lg"
              />
              <AiFillHeart
                size={24}
                className="absolute top-2 right-2 text-white cursor-pointer"
              />
            </div>

            {/* Property Details */}
            <span className="text-xl font-semibold">
              <span>{card.price}</span>
            </span>
            <span className="text-2xl">{card.name}</span>
            <span className="text-sm w-60">{card.detail}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyCard;
