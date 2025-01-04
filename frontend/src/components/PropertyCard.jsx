import React from "react";
import { AiFillHeart } from "react-icons/ai";
import truncate from "lodash/truncate";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ card }) => { 
  const navigate = useNavigate();

  return (
    <div 
      className="w-full sm:w-72 md:w-80 lg:w-96 xl:w-[300px] relative rounded-lg gap-2 m-auto transition-all ease-in-out max-w-xs flex flex-col p-4 hover:scale-105 hover:cursor-pointer hover:bg-gradient-to-b from-[rgba(255,255,255,0)] to-[rgba(136,160,255,0.46)] hover:drop-shadow-xl" 
      onClick={() => navigate(`/Properties/${card.id}`)} // Navigates to individual property details
    >
      <div className="w-full h-44 relative">
        <img
          src={card.image || "placeholder.jpg"} // Fallback to a placeholder image
          alt={card.title || "Property Image"}
          className="w-full h-full object-cover rounded-lg"
        />
        <AiFillHeart
          size={24}
          className="text-white absolute top-2 right-4 cursor-pointer"
        />
      </div>
      <span className="text-xl font-semibold">{card.price || "N/A"}</span>
      <span className="text-2xl">
        {truncate(card.title || "Unnamed Property", {
          length: 15, // Adjust the character limit as needed
          separator: " ",
          omission: "...",
        })}
      </span>
      <span className="text-sm w-full md:w-60">
        {truncate(card.description || "No details available.", {
          length: 80, // Maximum character limit for description
          omission: "...",
        })}
      </span>
    </div>
  );
};

export default PropertyCard;
