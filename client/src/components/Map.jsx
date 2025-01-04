import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from 'react-leaflet'; 
import 'leaflet/dist/leaflet.css';
import GeoCoderMarker from "./GeoCoderMarker";
import axios from "axios";

const Map = ({ address, city, country }) => {
  const [coordinates, setCoordinates] = useState([53.53, 18.8]); // Default to a fallback position
  const fullAddress = `${address} ${city} ${country}`;  // Combine address parts

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        console.log("Full Address:", fullAddress);  // Log full address
        // Geocoding API (e.g., Nominatim)
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(fullAddress)}&format=json&limit=1`
        );
        console.log("Geocode Response:", response); // Log the geocode response
        if (response.data && response.data[0]) {
          const { lat, lon } = response.data[0];
          setCoordinates([parseFloat(lat), parseFloat(lon)]);
        }
      } catch (error) {
        console.error("Error fetching geolocation:", error);
      }
    };

    if (fullAddress) {
      fetchCoordinates();
    }
  }, [fullAddress]);

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <MapContainer 
        key={coordinates.join(",")}  // Re-render the map when coordinates change
        center={coordinates}
        zoom={14}
        scrollWheelZoom={true} 
        style={{
          height: "100vh",
          width: "100%",
          zIndex: 0,
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoCoderMarker address={fullAddress} /> {/* Pass full address */}
      </MapContainer>
    </div>
  );
};

export default Map;
