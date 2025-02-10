import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text, Card, Badge, Divider } from "@mantine/core";

const DreamHomes = () => {
  const [bookedVisits, setBookedVisits] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

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
    <div className="p-4">
      <Text size="xl" weight={700}>
        Dream Homes
      </Text>
      
      <Divider my="sm" />
      
      <Text size="lg" weight={600}>
        Favorite Properties
      </Text>
      {favorites.length > 0 ? (
        favorites.map((fav) => (
          <Card key={fav._id || Math.random()} shadow="sm" p="lg" mt="sm">
            <Text weight={500}>{fav.title || "Unknown Property"}</Text>
            <Text size="sm" color="gray">Property ID: {fav._id || "Unknown ID"}</Text>
          </Card>
        ))
      ) : (
        <Text size="sm" color="gray">No favorite properties</Text>
      )}

      <Divider my="sm" />
      
      <Text size="lg" weight={600}>
        Booked Visits
      </Text>
      {bookedVisits.length > 0 ? (
        bookedVisits.map((visit) => (
          <Card key={visit._id || visit.id || Math.random()} shadow="sm" p="lg" mt="sm">
            <Text weight={500}>{visit.id?.title || "Unknown Property"}</Text>
            <Text size="sm" color="gray">Property ID: {visit.id?._id || "Unknown ID"}</Text>
            <Text size="sm" color="gray">Date: {visit.date ? new Date(visit.date).toLocaleDateString() : "Invalid Date"}</Text>
          </Card>
        ))
      ) : (
        <Text size="sm" color="gray">No visits booked</Text>
      )}
    </div>
  );
};

export default DreamHomes;
