import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineHeart } from "react-icons/ai";
import { MdEventAvailable, MdFavorite } from "react-icons/md";
import { Card, Badge, Text, Divider, Button, Image } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const DreamHomes = () => {
  const [bookedVisits, setBookedVisits] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return console.error("No token found in localStorage");

        const response = await axios.get("https://ashiyana.onrender.com/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBookedVisits(response.data.bookedVisits || []);
        setFavorites(response.data.favResidenciesID || []);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div weight={700} className="text-gray-800 mb-3 text-xl
       flex flex-col text-center">
        <span className="font-bold">🏡 Welcome to Your Dream Homes!</span>
        <span>
          Here, you can find all the properties you've marked as favorites and
          the ones you've booked visits for. Easily keep track of your dream
          homes and manage your visits effortlessly!
        </span>
      </div>

      <Divider my="md" />

      {/* Favorite Properties */}
      <div className="mb-6">
        <div
          size="lg"
          weight={600}
          className="flex items-center justify-center font-bold text-2xl  text-red-500 py-2"
        >
          <MdFavorite className="mr-2 text-red-500" size={2} /> Favorite
          Properties
        </div>
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
            {favorites.map((fav) => (
              <Card
                key={fav._id}
                shadow="sm"
                p="md"
                className="hover:shadow-lg transition w-72"
              >
                <Image
                  src={fav.image || "https://via.placeholder.com/300"}
                  height={120}
                  alt={fav.title || "Property Image"}
                  className="rounded"
                />
                <Text weight={600} className="text-md mt-2">
                  {fav.title || "Unknown Property"}
                </Text>
                <Text size="xs" color="dimmed">
                  Property ID: {fav._id || "Unknown ID"}
                </Text>
                <Button
                  variant="light"
                  color="red"
                  fullWidth
                  mt="md"
                  leftIcon={<AiOutlineHeart />}
                >
                  Remove from Favorites
                </Button>
              </Card>
            ))}
          </div>
        ) : (
          <Text size="sm" color="gray" className="mt-2">
            No favorite properties
          </Text>
        )}
      </div>

      <Divider my="md" />

      {/* Booked Visits */}
      <div>
        <div
          size="lg"
          weight={600}
          className="flex justify-center items-center font-bold text-2xl  text-green-500 py-2"
        >
          <MdEventAvailable className="mr-2 text-green-500" size={28} />Booked
          Visits
        </div>
        {bookedVisits.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
            {bookedVisits.map((visit) => (
              <Card
                key={visit._id}
                shadow="sm"
                p="md"
                className="hover:shadow-lg transition w-72"
              >
                <Image
                  src={visit.id?.image || "https://via.placeholder.com/300"}
                  height={120}
                  alt={visit.id?.title || "Property Image"}
                  className="rounded"
                />
                <Text weight={600} className="text-md mt-2">
                  {visit.id?.title || "Unknown Property"}
                </Text>
                <Text size="xs" color="dimmed">
                  Property ID: {visit.id?._id || "Unknown ID"}
                </Text>
                <Text size="xs" color="dimmed">
                  Date:{" "}
                  {visit.date
                    ? new Date(visit.date).toLocaleDateString()
                    : "Invalid Date"}
                </Text>
                <Badge color="green" variant="light" mt="md">
                  Confirmed
                </Badge>
              </Card>
            ))}
          </div>
        ) : (
          <Text size="sm" color="gray" className="mt-2">
            No visits booked
          </Text>
        )}
      </div>
    </div>
  );
};

export default DreamHomes;
