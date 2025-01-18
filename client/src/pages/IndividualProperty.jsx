import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Map from "../components/Map";
import { FaMapMarkerAlt, FaBed, FaBath, FaCar } from "react-icons/fa";
import { HiArrowLeft } from "react-icons/hi";
import { IoHeartCircleOutline } from "react-icons/io5";
import IndividualSkeleton from "../skeletons/IndividualSkeleton";
import Failed from "../skeletons/failed";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        const response = await axios.get(
          `https://ashiyana.onrender.com/api/residencies/${id}`
        );
        setProperty(response.data);
      } catch (err) {
        setError("Failed to fetch property details");
      } finally {
        setIsLoading(false);
      }
    };

    const checkBookingStatus = async () => {
      try {
        const response = await axios.get(
          `https://ashiyana.onrender.com/api/users/check-booking/${id}`,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
        if (response.data.isBooked) {
          setIsVisitBooked(true);
          setBookedDate(response.data.visitDate);
        }
      } catch (err) {
        console.error("Error checking booking status:", err);
      }
    };

    fetchPropertyDetails();

    if (storedToken) {
      checkBookingStatus();
    }

    const fetchUserFavorites = async () => {
      try {
        const storedToken = localStorage.getItem("authToken");
        if (!storedToken) return;

        const response = await axios.get(
          "https://ashiyana.onrender.com/api/profile",
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );

        const favoriteProperties = response.data.favResidenciesID || [];
        const isFavorited = favoriteProperties.some((fav) => fav._id === id);
        setIsFavorite(isFavorited);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchUserFavorites();
  }, [id]);

  const toggleFavorite = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");
      if (!storedToken) return toast.error("Please log in to use this feature.");

      const url = isFavorite
        ? "https://ashiyana.onrender.com/api/users/remove-favorite"
        : "https://ashiyana.onrender.com/api/users/add-favorite";

      await axios.post(
        url,
        { residencyId: id },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );

      setIsFavorite(!isFavorite);
      toast.success(
        `Property ${isFavorite ? "removed from" : "added to"} favorites.`
      );
    } catch (error) {
      console.error("Error updating favorites:", error);
      toast.error("Error updating favorites.");
    }
  };

  const handleBookVisit = async () => {
    if (!visitDate) {
      toast.warn("Please select a date for your visit.");
      return;
    }
    try {
      if (!token) throw new Error("User not logged in.");
      await axios.post(
        "https://ashiyana.onrender.com/api/users/book",
        { residencyId: id, visitDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Visit booked successfully");
      setIsVisitBooked(true);
      setBookedDate(visitDate);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error booking visit:", error.response?.data || error.message);
      toast.error(
        `Error booking visit: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const handleCancelVisit = async () => {
    try {
      if (!token) throw new Error("User not logged in.");
      await axios.post(
        "https://ashiyana.onrender.com/api/users/cancel-visit",
        { residencyId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Visit cancelled successfully");
      setIsVisitBooked(false);
      setBookedDate("");
    } catch (error) {
      console.error("Error cancelling visit:", error.response?.data || error.message);
      toast.error(
        `Error cancelling visit: ${error.response?.data?.message || error.message}`
      );
    }
  };

  if (isLoading) {
    return (
      <div className="text-2xl text-gray-500">
        <IndividualSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-xl">
        <Failed />
      </div>
    );
  }

  if (!property) {
    return (
      <div>
        <Failed />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-2xl rounded-xl">
       <ToastContainer progress={false} />
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
              className="absolute top-4 right-4 cursor-pointer bg-slate-50 bg-opacity-60 rounded-lg p-1"
              onClick={toggleFavorite}
            >
              <IoHeartCircleOutline
                className={`text-4xl ${
                  isFavorite ? "text-red-600 scale-110" : "text-gray-700"
                } transition-transform`}
              />
            </div>
            <div className="absolute bottom-0 left-0  bg-slate-100 rounded-lg py-1 bg-opacity-80 px-4">
              <h1 className="text-4xl font-bold">{property.title}</h1>
              <p className="text-2xl font-semibold text-green-500">
                &#8377;{property.price}
              </p>
            </div>
          </div>
          <div className="mt-6 flex-1 space-y-6">
          <div className="p-6 bg-gray-50 rounded-xl shadow-lg">
              <p className="text-gray-700 leading-relaxed">
                {property.description || "No description available."}
              </p>
            </div>

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
    {(property.facilities || []).map((facility, index) => (
      <div
        key={index}
        className="bg-blue-50 p-4 rounded-lg shadow-md text-center hover:shadow-lg transition"
      >
        <p className="text-gray-700 font-medium capitalize">
          {facility}
        </p>
      </div>
    ))}
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
                  Your Visit for this property is booked on  {bookedDate}
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


