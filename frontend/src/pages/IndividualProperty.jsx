import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Map from "../components/Map"; // Assuming you have a Map component

const IndividualProperty = () => {
  const { propertyid } = useParams();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if propertyid is present
    if (!propertyid) {
      setError("Property ID is missing.");
      setIsLoading(false);
      return;
    }

    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/residencies/${propertyid}`);
        console.log("Fetched property data:", response.data); // Log the response data for debugging
        setProperty(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching property details:", error);
        setError("Failed to load property details. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [propertyid]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <span className="text-lg font-semibold text-gray-600">
          Loading property details...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-8">
        <span className="text-xl font-bold">{error}</span>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center text-red-500 mt-8">
        <span className="text-xl font-bold">Property not found.</span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50">
      <div className="flex flex-wrap lg:flex-nowrap gap-6 p-6">
        <div className="w-full lg:w-1/2 flex flex-col justify-between order-1 lg:order-none">
          <img
            src={property.image || "placeholder.jpg"}
            alt={property.title}
            className="w-full lg:h-80 object-cover rounded-lg mb-6"
          />

          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
              {property.title || "Property Details"}
            </h1>
            <p className="text-2xl font-semibold text-blue-500 pe-4">
              &#8377;{property.price || "N/A"}
            </p>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            {property.description || "No description available."}
          </p>

          <div className="mb-6">
            <p className="text-gray-600">
              <strong className="block text-sm text-gray-800 mb-1">Address:</strong>
              {property.address || "N/A"}, {property.city || "N/A"}, {property.country || "N/A"}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center mb-6">
            <div className="flex flex-col items-center">
              <span className="text-blue-500 text-2xl font-bold">
                {property.facilities?.bathrooms || "N/A"}
              </span>
              <span className="text-gray-500 text-sm">Bathrooms</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-blue-500 text-2xl font-bold">
                {property.facilities?.parking || "N/A"}
              </span>
              <span className="text-gray-500 text-sm">Parking</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-blue-500 text-2xl font-bold">
                {property.facilities?.rooms || "N/A"}
              </span>
              <span className="text-gray-500 text-sm">Rooms</span>
            </div>
          </div>

          <div className="hidden lg:flex flex-wrap gap-4">
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition flex-grow md:flex-grow-[7]">
              Book Your Visit
            </button>
            <button
              onClick={() => window.history.back()}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex-grow md:flex-grow-[3]">
              Go Back
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto flex-shrink-0 overflow-hidden order-2 lg:order-none mt-2">
          <Map />
        </div>

        <div className="flex flex-wrap gap-4 lg:hidden order-3 w-full mt-4">
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition flex-grow">
            Book Your Visit
          </button>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex-grow">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndividualProperty;
