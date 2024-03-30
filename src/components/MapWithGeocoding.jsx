import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';

import './Map.scss';
import 'leaflet/dist/leaflet.css';

const MapWithGeocoding = () => {
  const [coordinates, setCoordinates] = useState();
  const [placeName, setPlaceName] = useState('');
  const mapRef = useRef(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${placeName}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setCoordinates([lat, lon]);
        if (mapRef.current) {
          mapRef.current.setView([lat, lon], 12);
        }
      }
    } catch (error) {
      console.error('Error fetching geocoding data:', error);
    }
  };

  const myIcon = L.icon({
    iconUrl: require('../marker.png'),
    iconSize: [64,64],
    iconAnchor: [32, 64],
    className: 'marker-icon'
  });

  return (
    <div>
      <div className="search-container">
        <input
          className=''
          type="text"
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
          placeholder="Enter a place name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="map-container">
        <MapContainer center={coordinates || [51.505, -0.09]} zoom={3} ref={mapRef} style={{ height: '100vh' , zIndex:'0'}} >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {coordinates && <Marker icon={myIcon} position={coordinates}/>}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapWithGeocoding;
