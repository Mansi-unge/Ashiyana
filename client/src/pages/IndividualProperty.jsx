import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Map from "../components/Map";
import { FaMapMarkerAlt, FaBed, FaBath, FaCar } from "react-icons/fa";
import { HiArrowLeft } from "react-icons/hi";
import { IoHeartCircleOutline } from "react-icons/io5";

const IndividualProperty = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visitDate, setVisitDate] = useState("");
  const [isVisitBooked, setIsVisitBooked] = useState(false);
  const [bookedDate, setBookedDate] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Property ID is missing");
      return;
    }

    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    } else {
      console.warn("No token found in localStorage");
    }

    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/residencies/${id}`);
        setProperty(response.data);
      } catch (err) {
        setError("Failed to fetch property details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  const handleBookVisit = async () => {
    if (!visitDate) {
      alert("Please select a date for your visit.");
      return;
    }
    try {
      if (!token) throw new Error("User not logged in.");
      await axios.post(
        "http://localhost:8000/api/users/book",
        { residencyId: id, visitDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Visit booked successfully");
      setIsVisitBooked(true);
      setBookedDate(visitDate);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error booking visit:", error.response?.data || error.message);
      alert(`Error booking visit: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleCancelVisit = async () => {
    try {
      if (!token) throw new Error("User not logged in.");
      await axios.post(
        "http://localhost:8000/api/users/cancel-visit",
        { residencyId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Visit cancelled successfully");
      setIsVisitBooked(false);
      setBookedDate("");
    } catch (error) {
      console.error("Error cancelling visit:", error.response?.data || error.message);
      alert(`Error cancelling visit: ${error.response?.data?.message || error.message}`);
    }
  };

  if (isLoading) {
    return <div className="text-2xl text-gray-500">Loading property details...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-xl">{error}</div>;
  }

  if (!property) {
    return <div className="text-gray-500 text-xl">Property not found.</div>;
  }

  return (
    <div className="p-6 bg-white shadow-2xl rounded-xl">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section */}
        <div className="lg:w-1/2 flex flex-col">
          <div className="relative">
            <img
              src={property.image || "placeholder.jpg"}
              alt={property.title}
              className="w-full h-[400px] object-cover rounded-xl"
            />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={toggleFavorite}
            >
              <IoHeartCircleOutline
                className={`text-4xl ${
                  isFavorite ? "text-red-600 scale-110" : "text-gray-300"
                } transition-transform`}
              />
            </div>
            <div className="absolute bottom-5 left-5 text-white">
              <h1 className="text-4xl font-bold">{property.title}</h1>
              <p className="text-2xl font-semibold text-green-500">
                &#8377;{property.price}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p>{property.description || "No description available."}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Facilities</h2>
            <div className="grid grid-cols-2 gap-4">
              {(property.facilities || []).map((facility, index) => {
                const icons = {
                  bedroom: FaBed,
                  bathroom: FaBath,
                  parking: FaCar,
                };
                const Icon = icons[facility.toLowerCase()] || FaMapMarkerAlt;
                return (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon className="text-blue-500" />
                    <span>{facility}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6">
            {!isVisitBooked ? (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green-500 text-white px-6 py-3 rounded-lg"
              >
                Book Your Visit
              </button>
            ) : (
              <div className="flex gap-4">
                <button className="bg-green-500 text-white px-6 py-3 rounded-lg">
                  Visit on {bookedDate}
                </button>
                <button
                  onClick={handleCancelVisit}
                  className="bg-red-500 text-white px-6 py-3 rounded-lg"
                >
                  Cancel Visit
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2">
          <Map address={property.address} city={property.city} country={property.country} />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold">Select Visit Date</h2>
            <input
              type="date"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              className="w-full p-2 border rounded-lg mt-4"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded-lg">
                Cancel
              </button>
              <button onClick={handleBookVisit} className="px-4 py-2 bg-green-500 text-white rounded-lg">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualProperty;
