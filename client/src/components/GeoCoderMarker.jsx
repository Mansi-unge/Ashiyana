import React, { useEffect, useState } from 'react';
import { useMap, Marker, Popup } from 'react-leaflet';
import axios from 'axios';

const GeoCoderMarker = ({ address }) => {
  const map = useMap();
  const [position, setPosition] = useState([60, 19]); // Default position
  const [geocodeAddress, setGeocodeAddress] = useState("");

  useEffect(() => {
    // OpenCage API key
    const apiKey = "eb75025bd81f48f480754b6ea5d459c5"; 

    // Construct URL with the provided address and your API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

    // Make GET request to OpenCage API
    axios
      .get(url)
      .then((response) => {
        const results = response.data.results;
        if (results.length > 0) {
          const { lat, lng } = results[0].geometry; // Get latitude and longitude
          const formattedAddress = results[0].formatted; // Get the formatted address
          
          // Update the state with the new position and address
          setPosition([lat, lng]);
          setGeocodeAddress(formattedAddress);

          // Center the map on the new position
          map.flyTo([lat, lng], 6);
        } else {
          console.error("No results found.");
        }
      })
      .catch((error) => {
        console.error("Geocoding error:", error);
      });
  }, [address, map]); // Runs whenever `address` changes

  return (
    <Marker position={position}>
      <Popup>{geocodeAddress || "Address not found"}</Popup>
    </Marker>
  );
};

export default GeoCoderMarker;
