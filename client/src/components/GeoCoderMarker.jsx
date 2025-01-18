import React, { useEffect, useState } from 'react';
import { useMap, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import { FaMapMarkerAlt } from 'react-icons/fa'; // React icon

const GeoCoderMarker = ({ address }) => {
  const map = useMap();
  const [position, setPosition] = useState([60, 19]); 
  const [geocodeAddress, setGeocodeAddress] = useState("");

  // Custom React Icon Marker
  const customMarkerIcon = new L.DivIcon({
    html: `<div style="color: red; font-size: 24px;">${FaMapMarkerAlt({})}</div>`,
    className: 'custom-marker-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });

  useEffect(() => {
    const apiKey = "eb75025bd81f48f480754b6ea5d459c5";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

    axios
      .get(url)
      .then((response) => {
        const results = response.data.results;
        if (results.length > 0) {
          const { lat, lng } = results[0].geometry;
          const formattedAddress = results[0].formatted;

          setPosition([lat, lng]);
          setGeocodeAddress(formattedAddress);

          map.flyTo([lat, lng], 6);
        } else {
          console.error("No results found.");
        }
      })
      .catch((error) => {
        console.error("Geocoding error:", error);
      });
  }, [address, map]);

  return (
    <Marker position={position} icon={customMarkerIcon}>
      <Popup>{geocodeAddress || "Address not found"}</Popup>
    </Marker>
  );
};

export default GeoCoderMarker;
