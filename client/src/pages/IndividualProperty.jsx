import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Map from "../components/Map"; // Assuming you have a Map component
import { FaMapMarkerAlt, FaBed, FaBath, FaCar } from "react-icons/fa"; // Keep the other icons
import { HiArrowLeft } from "react-icons/hi";
import { IoHeartCircleOutline } from "react-icons/io5";

const IndividualProperty = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visitDate, setVisitDate] = useState("");
  const [isVisitBooked, setIsVisitBooked] = useState(false); // New state to track booking
  const [bookedDate, setBookedDate] = useState(""); // New state to store booked date
  const [isFavorite, setIsFavorite] = useState(false); // New state for favorites

  useEffect(() => {
    if (!id) {
      setError("Property ID is missing");
      return;
    }

    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/residencies/${id}`
        );
        setProperty(response.data);
      } catch (err) {
        setError("Failed to fetch property details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  const addToFavorites = () => {
    setIsFavorite(true); // Set to true when added to favorites
  };

  const removeFromFavorites = () => {
    setIsFavorite(false); // Set to false when removed from favorites
  };

  const handleBookVisit = () => {
    setBookedDate(visitDate); // Save the booked date
    setIsVisitBooked(true); // Mark the visit as booked
    setIsModalOpen(false); // Close the modal after booking
  };

  const handleCancelVisit = () => {
    setIsVisitBooked(false); // Reset visit booking
    setBookedDate(""); // Clear the booked date
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-500">
          Loading property details...
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-xl">{error}</div>;
  }

  if (!property) {
    return <div className="text-gray-500 text-xl">Property not found.</div>;
  }

  return (
    <div className="p-6 bg-white shadow-2xl rounded-xl">
      <div className="flex flex-col lg:flex-row gap-8 items-stretch h-full">
        {/* Left Section */}
        <div className="lg:w-1/2 flex flex-col">
          <div className="relative flex-1">
            <img
              src={property.image || "placeholder.jpg"}
              alt={property.title}
              className="w-full h-[400px] object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-xl"></div>
            <div className="absolute bottom-5 left-5 text-white">
              <h1 className="text-4xl font-bold">
                {property.title || "Property Details"}
              </h1>
              <p className="text-2xl mt-2 font-semibold text-green-600">
                &#8377;{property.price || "N/A"}
              </p>
            </div>

           {/* Heart Icon for Favorites */}
<div
  className="absolute top-4 right-4 text-white cursor-pointer"
  onClick={isFavorite ? removeFromFavorites : addToFavorites}
>
  <IoHeartCircleOutline
    className={`text-4xl transition-all duration-300 ${
      isFavorite ? "text-red-700 scale-110 pulse" : "text-gray-300"
    }`}
  />
</div>

          </div>

          {/* Description */}
          <div className="mt-6 flex-1 space-y-6">
            <div className="p-6 bg-gray-50 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {property.description || "No description available."}
              </p>
            </div>

            {/* Address */}
            <div className="p-6 bg-gray-50 rounded-xl shadow-lg">
              <div className="text-gray-600">
                <FaMapMarkerAlt className="inline-block text-blue-500 mr-2" />
                <strong>Address:</strong> {property.address || "N/A"},{" "}
                {property.city || "N/A"}, {property.country || "N/A"}
              </div>
            </div>
          </div>

          {/* Facilities */}
          <div className="mt-6 flex-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Facilities
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {(property.facilities || []).map((facility, index) => {
                let Icon = null;
                switch (facility.toLowerCase()) {
                  case "bedroom":
                    Icon = FaBed;
                    break;
                  case "bathroom":
                    Icon = FaBath;
                    break;
                  case "parking":
                    Icon = FaCar;
                    break;
                  default:
                    Icon = FaMapMarkerAlt; // Default icon
                    break;
                }
                return (
                  <div
                    key={index}
                    className="bg-blue-50 p-4 rounded-lg shadow-md text-center hover:shadow-lg transition"
                  >
                    <p className="text-gray-700 font-medium capitalize">
                      {facility}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Booking Visit Button */}
          <div className="mt-6 flex justify-evenly">
            {!isVisitBooked ? (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green-500 text-white w-2/3 px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-300 mx-4"
              >
                Book Your Visit Now!
              </button>
            ) : (
              <div className="flex w-2/3 justify-between space-x-4">
                <button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-300 w-full">
                  Your visit is booked for {bookedDate}
                </button>
                <button
                  onClick={handleCancelVisit}
                  className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-300 w-full"
                >
                  Cancel Visit
                </button>
              </div>
            )}

            <button
              onClick={() => window.history.back()}
              className="bg-gray-200 text-gray-800 w-1/4 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-300 transform hover:scale-105 transition-all duration-300 flex items-center justify-center me-4"
            >
              <HiArrowLeft className="mr-2" /> Go Back
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 flex-1 flex h-auto">
          <Map
            address={property.address}
            city={property.city}
            country={property.country}
          />
        </div>
      </div>

      {/* Modal for Booking Visit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Book Your Visit
            </h2>
            <label className="block text-gray-700 mb-2">Select a date:</label>
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
            />
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleBookVisit}
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
              >
                Book Visit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualProperty;
