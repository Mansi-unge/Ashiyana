import React, { useEffect, useState } from "react";
import { Marker, useMap, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import * as ELG from "esri-leaflet-geocoder";

// Set default icon for markers
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const GeoCoderMarker = ({ address }) => {
  const map = useMap();
  const [position, setPosition] = useState([60, 19]);
  const [geocodeAddress, setGeocodeAddress] = useState("");

  useEffect(() => {
    ELG.geocode()
      .text(address)
      .run((err, results) => {
        if (results?.results?.length > 0) {
          const { lat, lng } = results?.results[0].latlng;
          const fullAddress = results?.results[0].text;  // Get the full address from geocode results
          setPosition([lat, lng]);
          setGeocodeAddress(fullAddress);  // Store the full address
          map.flyTo([lat, lng], 6);
        }
      });
  }, [address, map]);

  return (
    <Marker position={position} icon={DefaultIcon}>
      <Popup>{geocodeAddress || "Address not found"}</Popup> {/* Display the full address */}
    </Marker>
  );
};

export default GeoCoderMarker;
