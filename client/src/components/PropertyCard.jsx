import React, { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import truncate from "lodash/truncate";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PropertyCard = ({ card = {} }) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const storedToken = localStorage.getItem("authToken");
        if (!storedToken) return;

        const response = await axios.get("https://ashiyana.onrender.com/api/users/profile", {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        const favoriteProperties = response.data.favResidenciesID || [];
        const isFavorited = favoriteProperties.some((fav) => fav._id === card._id);
        setIsWishlisted(isFavorited);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    checkIfFavorite();
  }, [card._id]);

  const toggleWishlist = async (e) => {
    e.stopPropagation();
    try {
      const storedToken = localStorage.getItem("authToken");
      if (!storedToken) return toast.error("Please log in to use this feature.");

      const url = isWishlisted
        ? "https://ashiyana.onrender.com/api/users/remove-favorite"
        : "https://ashiyana.onrender.com/api/users/add-favorite";

      await axios.post(
        url,
        { residencyId: card._id },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );

      setIsWishlisted(!isWishlisted);
      toast.success(`Property ${isWishlisted ? "removed from" : "added to"} favorites.`);
    } catch (error) {
      console.error("Error updating favorites:", error);
      toast.error("Error updating favorites.");
    }
  };

  return (
    <div
      className="w-full sm:w-72 md:w-80 lg:w-96 xl:w-[300px] relative rounded-xl gap-3 mt-4 m-auto transition-transform ease-in-out max-w-xs flex flex-col p-5 hover:cursor-pointer bg-white shadow-md hover:shadow-xl border border-gray-200"
      onClick={() => card._id && navigate(`/properties/${card._id}`)}
    >
      <div className="w-full h-48 relative rounded-xl overflow-hidden">
        <img
          src={card.image || "placeholder.jpg"}
          alt={card.title || "Property Image"}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
        />
        <div
          className="absolute top-3 right-3 bg-white p-1 rounded-full shadow-md hover:scale-110 transition-transform duration-300"
          onClick={toggleWishlist}
        >
          {isWishlisted ? (
            <AiFillHeart size={24} className="text-red-500" />
          ) : (
            <AiOutlineHeart size={24} className="text-gray-400" />
          )}
        </div>
      </div>
      <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-3 py-1 text-sm rounded-full shadow-md">
        ₹{card.price || "N/A"}
      </div>
      <h2 className="text-lg font-bold text-gray-800 mt-2">
        {truncate(card.title || "Unnamed Property", {
          length: 20,
          separator: " ",
          omission: "...",
        })}
      </h2>
      <p className="text-sm text-gray-600">
        {truncate(card.description || "No details available.", {
          length: 100,
          omission: "...",
        })}
      </p>
      <button
        className="mt-3 py-2 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform"
      >
        View Details
      </button>
    </div>
  );
};

export default PropertyCard;
