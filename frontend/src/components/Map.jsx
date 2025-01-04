import React from "react";
import { MapContainer, TileLayer } from 'react-leaflet'; 
import 'leaflet/dist/leaflet.css';
import GeoCoderMarker from "./GeoCoderMarker";

const Map = ({address , city , country}) => {
  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <MapContainer 
        center={[53.53 , 18.8 ]}
        zoom={1}
        scrollWheelZoom={true}  // Enabling scroll zoom for map
        style={{
          height: "100vh",
          width: "100%",
          zIndex: 0,
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoCoderMarker address={`${address} ${city} ${country}`} />
      </MapContainer>
    </div>
  );
};

export default Map ;
